import os
import pandas as pd
from playwright.sync_api import sync_playwright

# --- CONFIGURATION ---
INPUT_CSV = 'safelincs_master_data/master_product_list.csv'
OUTPUT_FOLDER = 'safelincs_data_export'

def main():
    if not os.path.exists(OUTPUT_FOLDER): os.makedirs(OUTPUT_FOLDER)
    
    # 1. Load the URL List
    try:
        df_input = pd.read_csv(INPUT_CSV)
        # Handle different column names
        col_name = 'Product URL' if 'Product URL' in df_input.columns else 'URL'
        urls = df_input[col_name].dropna().unique().tolist()
        
        # Filter junk
        urls = [u for u in urls if 'review' not in u and '#' not in u]
        print(f"Loaded {len(urls)} products to scrape data for.")
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return

    all_data = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True) # HEADLESS = TRUE makes it go super fast
        page = browser.new_page()

        print("Starting High-Speed Text Scraping...")

        for i, link in enumerate(urls):
            try:
                page.goto(link)
                
                # Basic Container
                data = {'Source URL': link}

                # 1. Title
                try: data['Title'] = page.inner_text('h1').strip()
                except: data['Title'] = "Unknown"

                # 2. Product Code (SKU)
                # Safelincs usually puts this in a specific span or table
                try: 
                    sku = page.inner_text('.product-code, .sku').strip()
                    data['Product Code'] = sku
                except: pass

                # 3. Price
                try: 
                    data['Price (Inc VAT)'] = page.inner_text('.price-inc-vat .price').strip()
                    data['Price (Ex VAT)'] = page.inner_text('.price-ex-vat .price').strip()
                except: data['Price'] = "N/A"

                # 4. Description (Clean Text)
                # We grab the text and remove newlines to make it Excel-friendly
                try:
                    desc_el = page.query_selector('#description, .product-description')
                    if desc_el:
                        data['Description'] = desc_el.inner_text().replace('\n', ' ').strip()
                except: data['Description'] = ""

                # 5. Technical Specs (The Gold Mine)
                rows = page.query_selector_all('table tr')
                for row in rows:
                    cols = row.query_selector_all('td, th')
                    if len(cols) == 2:
                        key = cols[0].inner_text().strip()
                        val = cols[1].inner_text().strip()
                        # Avoid saving generic rows
                        if len(key) > 2 and len(val) > 0:
                            data[key] = val

                # 6. PDF Links (Datasheets)
                pdf_links = []
                pdfs = page.query_selector_all('a[href$=".pdf"]')
                for pdf in pdfs:
                    pdf_url = pdf.get_attribute('href')
                    if not pdf_url.startswith('http'): 
                        pdf_url = 'https://www.safelincs.co.uk' + pdf_url
                    pdf_links.append(pdf_url)
                
                if pdf_links:
                    data['PDF Documents'] = " | ".join(list(set(pdf_links)))

                all_data.append(data)
                
                # Progress indicator
                if (i+1) % 10 == 0:
                    print(f"[{i+1}/{len(urls)}] Scraped: {data.get('Title', 'Unknown')}")
                
                # SAVE BACKUP every 50 items
                if (i+1) % 50 == 0:
                    pd.DataFrame(all_data).to_csv(os.path.join(OUTPUT_FOLDER, 'backup_data.csv'), index=False)

            except Exception as e:
                # Don't print every single error, just keep moving
                pass

        browser.close()

    # Final Save
    df_final = pd.DataFrame(all_data)
    # Reorder columns to put Title/Desc first
    cols = ['Title', 'Product Code', 'Price (Inc VAT)', 'Description', 'PDF Documents']
    # Add the rest of the dynamic columns (specs)
    cols += [c for c in df_final.columns if c not in cols and c != 'Source URL']
    cols.append('Source URL')
    
    df_final = df_final.reindex(columns=cols)
    
    final_path = os.path.join(OUTPUT_FOLDER, 'COMPLETE_PRODUCT_DATA.csv')
    df_final.to_csv(final_path, index=False)
    print(f"DONE! Data saved to: {final_path}")

if __name__ == "__main__":
    main()