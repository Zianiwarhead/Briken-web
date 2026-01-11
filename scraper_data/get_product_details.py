import os
import time
import requests
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
INPUT_CSV = 'safelincs_master_data/master_product_list.csv' 
OUTPUT_FOLDER = 'safelincs_full_catalog'

def download_image(url, folder, filename):
    if not url: return None
    if not url.startswith('http'): url = 'https://www.safelincs.co.uk' + url
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, stream=True)
        if r.status_code == 200:
            path = os.path.join(folder, filename)
            with open(path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            return path
    except: pass
    return None

def main():
    if not os.path.exists(OUTPUT_FOLDER): os.makedirs(OUTPUT_FOLDER)
    
    # 1. READ AND CLEAN THE LIST
    try:
        df_input = pd.read_csv(INPUT_CSV)
        
        # Fix column name issue (detect 'Product URL' or 'URL')
        url_col = 'Product URL' if 'Product URL' in df_input.columns else 'URL'
        
        raw_links = df_input[url_col].dropna().unique().tolist()
        
        # FILTER OUT JUNK LINKS
        urls_to_visit = []
        for link in raw_links:
            # We skip reviews, popups, and broken links
            if 'review' in link or 'moreinfo' in link or '#' in link or 'javascript' in link:
                continue
            urls_to_visit.append(link)
            
        print(f"Loaded {len(raw_links)} links. Filtered down to {len(urls_to_visit)} REAL products.")
        
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    full_data = []

    # 2. START SCRAPING
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        for i, link in enumerate(urls_to_visit):
            print(f"[{i+1}/{len(urls_to_visit)}] Visiting: {link}")
            try:
                page.goto(link)
                
                # Fast fail if it's a 404 page
                if "404" in page.title():
                    print(" > Page not found (404), skipping.")
                    continue

                # Wait slightly for dynamic content
                try: page.wait_for_selector('h1', timeout=2000)
                except: pass

                product_info = {'URL': link}

                # A. GET TEXT (Title, Price, Desc)
                try: 
                    product_info['Title'] = page.inner_text('h1').strip()
                except: 
                    product_info['Title'] = "Unknown Title"

                # Description Hunt (Try multiple spots)
                desc = ""
                for sel in ['#description', 'div[itemprop="description"]', '.product-description', '.tab-content']:
                    if page.query_selector(sel):
                        desc = page.inner_text(sel).strip()
                        break
                product_info['Description'] = desc[:1000] # Limit length to keep Excel happy

                # B. GET SPECS (The Table)
                rows = page.query_selector_all('table tr')
                for row in rows:
                    cols = row.query_selector_all('td, th')
                    if len(cols) == 2:
                        key = cols[0].inner_text().strip()
                        val = cols[1].inner_text().strip()
                        if len(key) > 1 and len(val) > 0:
                            product_info[key] = val

                # C. GET IMAGE (Try Meta Tag First -> Best Quality)
                img_url = None
                meta_img = page.query_selector('meta[property="og:image"]')
                if meta_img:
                    img_url = meta_img.get_attribute('content')
                else:
                    # Fallback to standard ID
                    img_el = page.query_selector('#main-image, .product-gallery-image')
                    if img_el: img_url = img_el.get_attribute('src')

                if img_url:
                    # Clean filename
                    safe_name = "".join([c for c in product_info['Title'] if c.isalnum() or c==' ']).strip()
                    img_filename = f"{safe_name}.jpg"
                    
                    download_image(img_url, OUTPUT_FOLDER, img_filename)
                    product_info['Image File'] = img_filename

                full_data.append(product_info)
                
                # Save progress every 10 items (so you don't lose data if it crashes)
                if i % 10 == 0:
                    pd.DataFrame(full_data).to_csv(os.path.join(OUTPUT_FOLDER, 'partial_data.csv'), index=False)

            except Exception as e:
                print(f"Skipped {link}: {e}")

        browser.close()

    # Save Final Data
    df_final = pd.DataFrame(full_data)
    final_csv = os.path.join(OUTPUT_FOLDER, 'final_complete_catalog.csv')
    df_final.to_csv(final_csv, index=False)
    print(f"DONE! Your full database is in '{final_csv}'")

if __name__ == "__main__":
    main()