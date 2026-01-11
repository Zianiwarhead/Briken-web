import os
import time
import requests
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
# We will read the CSV you just pasted to me
INPUT_CSV = 'safelincs_final_products/final_complete_data.csv' 
OUTPUT_FOLDER = 'safelincs_final_products'

def download_image(url, folder, filename):
    if not url: return False
    if not url.startswith('http'): url = 'https://www.safelincs.co.uk' + url
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, stream=True)
        if r.status_code == 200:
            path = os.path.join(folder, filename)
            with open(path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            return True
    except: pass
    return False

def main():
    if not os.path.exists(OUTPUT_FOLDER): os.makedirs(OUTPUT_FOLDER)
    
    # Load your existing data
    try:
        df = pd.read_csv(INPUT_CSV)
        print(f"Loaded {len(df)} products to fix images for.")
    except Exception as e:
        # If the file isn't found, let's create a temporary dataframe from the text you sent me
        print(f"Could not find CSV ({e}). Please ensure 'final_complete_data.csv' is in the folder.")
        return

    # Create a new column for Image Filenames if it doesn't exist
    if 'Image File' not in df.columns:
        df['Image File'] = ""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        for index, row in df.iterrows():
            link = row['URL']
            title = row['Title']
            
            # Skip if we already have an image for this row
            if pd.notna(row['Image File']) and str(row['Image File']).endswith('.jpg'):
                continue

            print(f"[{index+1}/{len(df)}] Fixing image for: {title}")
            
            try:
                page.goto(link)
                page.wait_for_load_state('domcontentloaded')

                # --- THE SECRET WEAPON (og:image) ---
                # This tag is used by Facebook/LinkedIn to show the preview image. 
                # It is almost ALWAYS the high-res product photo.
                img_url = None
                meta_img = page.query_selector('meta[property="og:image"]')
                
                if meta_img:
                    img_url = meta_img.get_attribute('content')
                    print(f" > Found High-Res Image: {img_url}")
                else:
                    # Fallback: Find the biggest image on the page
                    print(" > No meta tag, looking for largest image...")
                    images = page.eval_on_selector_all('img', """
                        imgs => imgs.map(img => ({
                            src: img.src,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        }))
                    """)
                    # Sort by size (Area) and take the biggest one
                    if images:
                        largest = max(images, key=lambda x: x['width'] * x['height'])
                        if largest['width'] > 200: # Ignore tiny icons
                            img_url = largest['src']

                # Download it
                if img_url:
                    safe_name = "".join([c for c in str(title) if c.isalnum() or c==' ']).strip()
                    filename = f"{safe_name}.jpg"
                    
                    if download_image(img_url, OUTPUT_FOLDER, filename):
                        df.at[index, 'Image File'] = filename
                        print(f" > Saved: {filename}")
                    else:
                        print(" > Download failed.")
                else:
                    print(" > No suitable image found.")

                time.sleep(1) # Be polite

            except Exception as e:
                print(f"Error on row {index}: {e}")

        browser.close()

    # Save the updated CSV
    df.to_csv(INPUT_CSV, index=False)
    print("DONE! Images are downloaded and CSV is updated.")

if __name__ == "__main__":
    main()