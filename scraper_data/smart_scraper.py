import os
import time
import random
import requests
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
# We use the map you already made
INPUT_CSV = 'safelincs_master_data/all_categories_map.csv' 
OUTPUT_FOLDER = 'safelincs_final_data'

# --- SPEED SETTINGS ---
# Faster than before, but still careful
MIN_WAIT = 2.5   
MAX_WAIT = 6.0  

def download_image(url, folder, filename):
    if not url: return None
    if not url.startswith('http'): url = 'https://www.safelincs.co.uk' + url
    try:
        # Standard download (No Tor = Much Faster)
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, stream=True, timeout=15)
        if r.status_code == 200:
            path = os.path.join(folder, filename)
            with open(path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            return path
    except Exception as e:
        print(f"     [!] Image download failed: {e}")
    return None

def main():
    if not os.path.exists(OUTPUT_FOLDER): os.makedirs(OUTPUT_FOLDER)
    
    # 1. READ CATEGORIES
    try:
        df_input = pd.read_csv(INPUT_CSV)
        categories = df_input.to_dict('records')
        print(f"Loaded {len(categories)} categories.")
    except:
        print(f"Error: Could not find {INPUT_CSV}")
        return

    full_data = []
    
    # Check for existing progress to resume
    backup_file = os.path.join(OUTPUT_FOLDER, 'backup_progress.csv')
    if os.path.exists(backup_file):
        print("Resuming from backup...")
        full_data = pd.read_csv(backup_file).to_dict('records')
        print(f"Already have {len(full_data)} products scraped.")

    with sync_playwright() as p:
        # Launch Browser
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        for i, cat in enumerate(categories):
            cat_name = cat['Category Name']
            cat_url = cat['URL']
            
            print(f"\n--- Processing Category [{i+1}/{len(categories)}]: {cat_name} ---")
            
            try:
                # Go to Category Page
                try:
                    page.goto(cat_url, timeout=30000)
                except:
                    print("   ! Page crash detected. Restarting context...")
                    context.close()
                    context = browser.new_context()
                    page = context.new_page()
                    page.goto(cat_url, timeout=30000)

                # Get all products on page
                product_links = page.eval_on_selector_all('.product-list-item h3 a', "els => els.map(e => e.href)")
                if not product_links:
                    product_links = page.eval_on_selector_all('.product-box a', "els => els.map(e => e.href)")

                print(f"   > Found {len(product_links)} products.")

                for link in product_links:
                    # Skip if we already scraped this URL
                    if any(d['URL'] == link for d in full_data):
                        continue

                    # Visit Product
                    try:
                        time.sleep(random.uniform(0.5, 1.5)) # Tiny pause before click
                        page.goto(link)
                        
                        # Check for Ban
                        if "Error 1015" in page.title():
                            print("!!! RATE LIMIT HIT. Sleeping 60s...")
                            time.sleep(60)
                            page.reload()

                        # DATA SCRAPE
                        item = {'Category': cat_name, 'URL': link}
                        
                        # Title
                        try: item['Title'] = page.inner_text('h1').strip()
                        except: item['Title'] = "Unknown"

                        # Image (High Quality)
                        img_url = None
                        meta_img = page.query_selector('meta[property="og:image"]')
                        if meta_img: img_url = meta_img.get_attribute('content')
                        
                        if img_url:
                            # Save image
                            safe_name = "".join([c for c in item['Title'] if c.isalnum() or c==' ']).strip()
                            img_filename = f"{safe_name}.jpg"
                            # Check if image exists before downloading
                            if not os.path.exists(os.path.join(OUTPUT_FOLDER, img_filename)):
                                download_image(img_url, OUTPUT_FOLDER, img_filename)
                            item['Image File'] = img_filename

                        # Specs
                        rows = page.query_selector_all('table tr')
                        for row in rows:
                            cols = row.query_selector_all('td, th')
                            if len(cols) == 2:
                                item[cols[0].inner_text().strip()] = cols[1].inner_text().strip()

                        full_data.append(item)
                        print(f"     + Scraped: {item['Title'][:30]}...")

                        # SAVE PROGRESS INSTANTLY
                        # This prevents data loss if it crashes
                        pd.DataFrame(full_data).to_csv(backup_file, index=False)

                        # Human Wait
                        time.sleep(random.uniform(MIN_WAIT, MAX_WAIT))

                    except Exception as e:
                        print(f"     ! Failed to scrape product: {e}")
                        # If critical error, reset page
                        try: page = context.new_page()
                        except: pass

            except Exception as e:
                print(f"   ! Category Error: {e}")

        browser.close()

    # Final Save
    pd.DataFrame(full_data).to_csv(os.path.join(OUTPUT_FOLDER, 'COMPLETE_CATALOG.csv'), index=False)
    print("DONE! All data saved.")

if __name__ == "__main__":
    main()