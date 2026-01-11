import os
import time
import requests
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
INPUT_CSV = 'safelincs_debug_data/debug_results.csv' 
OUTPUT_FOLDER = 'safelincs_final_products'

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
    
    # Load the URLs you just found
    try:
        df_input = pd.read_csv(INPUT_CSV)
        urls_to_visit = df_input['URL'].dropna().unique().tolist()
        print(f"Loaded {len(urls_to_visit)} products to scrape.")
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    full_data = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        for i, link in enumerate(urls_to_visit):
            print(f"[{i+1}/{len(urls_to_visit)}] Visiting: {link}")
            try:
                page.goto(link)
                # Wait for content
                try: page.wait_for_selector('h1', timeout=3000)
                except: pass

                product_info = {'URL': link}

                # 1. GET TITLE (Try standard H1)
                try: 
                    product_info['Title'] = page.inner_text('h1').strip()
                except: 
                    product_info['Title'] = "Unknown Title"

                # 2. GET DESCRIPTION (Try 3 different places)
                # Many sites hide it in tabs or different divs
                desc = ""
                potential_desc_selectors = [
                    '#description',           # Standard
                    'div[itemprop="description"]', # Google Structured Data
                    '.product-description',   # Generic
                    '.tab-content'            # If inside a tab
                ]
                for sel in potential_desc_selectors:
                    if page.query_selector(sel):
                        desc = page.inner_text(sel).strip()
                        break # Stop looking if we found it
                product_info['Description'] = desc[:500] + "..." if len(desc) > 500 else desc

                # 3. GET SPECS (The Table)
                # We look for ANY table rows <tr>
                rows = page.query_selector_all('table tr')
                for row in rows:
                    cols = row.query_selector_all('td, th')
                    if len(cols) == 2:
                        key = cols[0].inner_text().strip()
                        val = cols[1].inner_text().strip()
                        # Only save if it looks like a spec (avoid empty rows)
                        if len(key) > 1:
                            product_info[key] = val

                # 4. GET IMAGE
                img_el = page.query_selector('#main-image, .product-gallery-image, .magic-slide img')
                if img_el:
                    img_url = img_el.get_attribute('src')
                    # Create clean filename
                    safe_name = "".join([c for c in product_info['Title'] if c.isalnum() or c==' ']).strip()
                    img_filename = f"{safe_name}.jpg"
                    
                    download_image(img_url, OUTPUT_FOLDER, img_filename)
                    product_info['Image File'] = img_filename
                    print(f" > Downloaded Image: {img_filename}")

                full_data.append(product_info)
                # Sleep briefly to be polite
                time.sleep(1)

            except Exception as e:
                print(f"Skipped {link}: {e}")

        browser.close()

    # Save Final Data
    df_final = pd.DataFrame(full_data)
    final_csv = os.path.join(OUTPUT_FOLDER, 'final_complete_data.csv')
    df_final.to_csv(final_csv, index=False)
    print(f"DONE! Check the folder '{OUTPUT_FOLDER}' for images and data.")

if __name__ == "__main__":
    main()