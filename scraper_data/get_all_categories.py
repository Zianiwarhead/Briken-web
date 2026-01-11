import os
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
# We start at the "All Products" or Homepage
START_URL = 'https://www.safelincs.co.uk/' 
OUTPUT_FOLDER = 'safelincs_master_data'

def main():
    if not os.path.exists(OUTPUT_FOLDER): os.makedirs(OUTPUT_FOLDER)
    
    cat_links = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print(f"Going to {START_URL} to find all categories...")
        page.goto(START_URL)
        page.wait_for_timeout(2000) # Wait for menu to load

        # STRATEGY: Find the main Navigation Menu
        # We look for links inside the main navigation bar or "Mega Menu"
        # Common selectors for menus: 'nav a', '.navigation a', '.menu a'
        # Safelincs likely uses a "Products" dropdown.
        
        print("Scanning for Category links...")
        
        # We grab ALL links on the page, then filter them
        links = page.query_selector_all('a')
        
        print(f"Found {len(links)} total links. Filtering for categories...")

        for link in links:
            try:
                href = link.get_attribute('href')
                text = link.inner_text().strip()
                
                # FILTER LOGIC: 
                # We only want links that look like product categories.
                # We skip "Contact Us", "Login", "Cart", etc.
                if href and len(text) > 3:
                    # Fix relative links
                    if not href.startswith('http'): 
                        href = 'https://www.safelincs.co.uk' + href
                    
                    # Exclude boring pages
                    exclude_terms = ['login', 'account', 'basket', 'contact', 'terms', 'privacy', 'blog', 'checkout']
                    if any(term in href.lower() for term in exclude_terms):
                        continue
                        
                    # Only save unique links
                    if href not in [x['URL'] for x in cat_links]:
                        # Optional: Print it so you can see what it found
                        # print(f"Found: {text} -> {href}")
                        cat_links.append({'Category Name': text, 'URL': href})
            except:
                pass

        browser.close()

    # Save to CSV
    df = pd.read_json(pd.DataFrame(cat_links).to_json()) # Clean format
    df.to_csv(os.path.join(OUTPUT_FOLDER, 'all_categories_map.csv'), index=False)
    print(f"DONE! Found {len(cat_links)} potential categories.")
    print(f"Check 'safelincs_master_data/all_categories_map.csv' and DELETE the rows you don't want.")

if __name__ == "__main__":
    main()