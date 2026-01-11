const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CSV_PATH = 'scraper_data/safelincs_final_data/COMPLETE_CATALOG.csv';
const IMAGES_DIR = 'scraper_data/safelincs_final_data';
const BUCKET_NAME = 'products';
const MISSING_IMAGES_LOG = 'missing_images.txt';

// Clear missing images log
if (fs.existsSync(MISSING_IMAGES_LOG)) {
  fs.unlinkSync(MISSING_IMAGES_LOG);
}

// Cache directory listing for performance and matching
let filesInDir = [];
try {
  if (fs.existsSync(IMAGES_DIR)) {
    filesInDir = fs.readdirSync(IMAGES_DIR);
  } else {
    console.warn(`Warning: Images directory not found at ${IMAGES_DIR}`);
  }
} catch (e) {
  console.warn(`Warning: Could not read images directory: ${e.message}`);
}

function findBestMatch(targetFilename) {
  if (!targetFilename) return null;
  
  // 0. Exact match (fastest)
  if (filesInDir.includes(targetFilename)) return targetFilename;

  const targetBase = path.parse(targetFilename).name;
  const targetExt = path.parse(targetFilename).ext;
  const targetNormalized = targetFilename.toLowerCase().replace(/\s+/g, ' ').trim();

  // 1. Case-insensitive & Whitespace insensitive match
  const looseMatch = filesInDir.find(f => 
    f.toLowerCase().replace(/\s+/g, ' ').trim() === targetNormalized
  );
  if (looseMatch) return looseMatch;

  // 2. Truncation match (File on disk is a prefix of the CSV filename)
  // CSV: "Very Long Title That Gets Cut.jpg" -> Base: "Very Long Title That Gets Cut"
  // Disk: "Very Long Title Tha.jpg" -> Base: "Very Long Title Tha"
  // Logic: CSV_Base startsWith Disk_Base
  const truncationMatch = filesInDir.find(f => {
    const fBase = path.parse(f).name;
    const fExt = path.parse(f).ext;
    
    // Only check if extensions match (or if disk file has no extension, which is rare but possible)
    if (fExt && fExt.toLowerCase() !== targetExt.toLowerCase()) return false;

    // Safety: Don't match very short filenames to avoid false positives
    if (fBase.length < 5) return false;

    return targetBase.toLowerCase().startsWith(fBase.toLowerCase());
  });

  if (truncationMatch) {
    return truncationMatch;
  }

  return null;
}

async function uploadImage(filename, productCode) {
  if (!filename) return null;
  
  const bestMatch = findBestMatch(filename);
  
  if (!bestMatch) {
    const msg = `Missing image for ${productCode}: ${filename}\n`;
    fs.appendFileSync(MISSING_IMAGES_LOG, msg);
    console.warn(`Warning: Image file not found: ${filename}`);
    return null;
  }

  const filePath = path.join(IMAGES_DIR, bestMatch);
  
  const fileBuffer = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filename, fileBuffer, { 
      contentType: 'image/jpeg', 
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${filename}:`, error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filename);

  return publicUrlData.publicUrl;
}

function parsePrice(row) {
  for (const key in row) {
    const val = row[key];
    if (typeof val === 'string' && val.includes('ex VAT')) {
      const match = val.match(/£([\d,.]+)\s*ex VAT/);
      if (match) {
        return parseFloat(match[1].replace(/,/g, ''));
      }
    }
  }
  return null;
}

// Helper to determine fire class and usage based on product name/type
function enrichProductData(name, category) {
  const n = name.toLowerCase();
  const c = category ? category.toLowerCase() : '';
  
  let info = {
    fire_class: null,
    suitable_for: null,
    not_suitable_for: null
  };

  // 1. Extinguishers
  if (n.includes('water') && n.includes('extinguisher') && !n.includes('mist')) {
    info.fire_class = 'Class A';
    info.suitable_for = ['Solid materials', 'Wood', 'Paper', 'Textiles'];
    info.not_suitable_for = ['Electrical fires', 'Flammable liquids', 'Cooking oils'];
  } else if (n.includes('foam') && n.includes('extinguisher')) {
    info.fire_class = 'Class A, Class B';
    info.suitable_for = ['Solid materials', 'Flammable liquids', 'Wood', 'Paper', 'Petrol', 'Paint'];
    info.not_suitable_for = ['Cooking oils', 'Electrical fires (unless specified otherwise)'];
  } else if (n.includes('powder') && n.includes('extinguisher')) {
    info.fire_class = 'Class A, Class B, Class C';
    info.suitable_for = ['Solid materials', 'Flammable liquids', 'Flammable gases', 'Electrical fires'];
    info.not_suitable_for = ['Cooking oils', 'Confined spaces (vision obscuration)'];
  } else if (n.includes('co2') && n.includes('extinguisher')) {
    info.fire_class = 'Class B, Electrical';
    info.suitable_for = ['Flammable liquids', 'Electrical equipment', 'Server rooms', 'Offices'];
    info.not_suitable_for = ['Solid materials (wood, paper)', 'Cooking oils', 'Gases'];
  } else if (n.includes('wet chemical') && n.includes('extinguisher')) {
    info.fire_class = 'Class A, Class F';
    info.suitable_for = ['Cooking oils', 'Deep fat fryers', 'Solid materials'];
    info.not_suitable_for = ['Electrical fires', 'Flammable gases'];
  } else if (n.includes('water mist') && n.includes('extinguisher')) {
    info.fire_class = 'Class A, Class B, Class C, Class F, Electrical';
    info.suitable_for = ['Broad spectrum use', 'Solid materials', 'Liquids', 'Gases', 'Cooking oils', 'Electrical equipment'];
    info.not_suitable_for = [];
  } 
  // 2. Fire Blankets
  else if (n.includes('blanket')) {
    info.fire_class = 'Class F (Small)';
    info.suitable_for = ['Small kitchen fires', 'Clothing fires', 'Waste bin fires'];
    info.not_suitable_for = ['Large fires'];
  }
  // 3. Alarms & Detectors
  else if (n.includes('smoke alarm') || n.includes('smoke detector')) {
    info.suitable_for = ['Detecting slow smoldering fires (Optical)', 'Detecting fast flaming fires (Ionisation)'];
    info.fire_class = 'Detection';
  } else if (n.includes('heat alarm') || n.includes('heat detector')) {
    info.suitable_for = ['Kitchens', 'Garages', 'Dusty areas where smoke alarms cause false alarms'];
    info.fire_class = 'Detection';
  } else if (n.includes('co detector') || n.includes('carbon monoxide')) {
    info.suitable_for = ['Detecting Carbon Monoxide gas'];
    info.fire_class = 'Gas Detection';
  } else if (n.includes('gong') || n.includes('bell') || n.includes('manual call point')) {
     info.suitable_for = ['Manual fire warning'];
     info.fire_class = 'Manual Alarm';
  }

  return info;
}

async function processRow(row) {
  const productCode = row['Product Code'] || row['Product ID']; // Fallback
  if (!productCode) return; // Skip if no code

  const name = row['Title'];
  let category = row['Category'];
  const brand = row['Brand'];
  const imageFile = row['Image File'];
  const price = parsePrice(row);

  // --- Enrichment Logic ---
  const enrichment = enrichProductData(name, category);
  
  // Refine Category for Alarms if vague
  const nLower = name.toLowerCase();
  if ((nLower.includes('alarm') || nLower.includes('detector') || nLower.includes('gong') || nLower.includes('bell')) && 
      (!category || category === 'Uncategorized' || category.includes('Access'))) {
      category = 'Fire Alarms & Detection';
  }
  // ------------------------

  // Construct specifications JSON
  const specs = { ...enrichment }; // Add enriched data first
  for (const key in row) {
    if (!['Title', 'Category', 'Product Code', 'Brand', 'Image File', 'URL'].includes(key) && row[key]) {
      specs[key] = row[key];
    }
  }

  console.log(`Processing: ${name} (${productCode})`);

  let imageUrl = null;
  if (imageFile) {
    imageUrl = await uploadImage(imageFile, productCode);
  } else {
    fs.appendFileSync(MISSING_IMAGES_LOG, `No image file specified for ${productCode}\n`);
  }

  const { error } = await supabase
    .from('products')
    .insert({
      product_code: productCode,
      name: name,
      category: category,
      brand: brand,
      price: price,
      image_url: imageUrl,
      specifications: specs
    });

  if (error) {
    console.error(`Error inserting ${productCode}:`, error.message);
  } else {
    console.log(`Inserted: ${productCode}`);
  }
}

const results = [];

fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log(`Found ${results.length} products.`);
    
    // Clear the table first
    console.log('Clearing existing products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .neq('product_code', 'placeholder_for_delete_all'); // Deletes all rows where product_code is not this string
      
    if (deleteError) {
        console.error('Error clearing table:', deleteError);
        // Continue anyway? Usually yes, to try and upsert/insert.
    }

    console.log('Starting import...');
    // Process in chunks to avoid rate limits
    for (let i = 0; i < results.length; i++) {
        await processRow(results[i]);
    }

    // --- NEW: Process Orphan Images ---
    console.log('Checking for unused images to add as new products...');
    
    // Refresh file list (in case it changed or we want to be sure)
    let currentFilesInDir = [];
    try {
      if (fs.existsSync(IMAGES_DIR)) {
        currentFilesInDir = fs.readdirSync(IMAGES_DIR).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });
      }
    } catch (e) {
      console.warn(`Warning: Could not read images directory for orphan check: ${e.message}`);
    }

    // We need to track what was used. 
    // Since processRow calls uploadImage which finds matches, we might not have tracked matched filenames explicitly.
    // Let's re-scan the CSV data in memory to see what matched, or better, 
    // let's modify uploadImage to track matched files, OR just re-run the matching logic here.
    // Re-running matching is safer to avoid global state issues if we didn't track it.
    
    const usedFilenames = new Set();
    results.forEach(row => {
        if (row['Image File']) {
             const match = findBestMatch(row['Image File']);
             if (match) usedFilenames.add(match);
        }
    });

    const orphanImages = currentFilesInDir.filter(f => !usedFilenames.has(f));

    console.log(`Found ${orphanImages.length} orphan images.`);

    for (const imageFile of orphanImages) {
        console.log(`Processing orphan image: ${imageFile}`);
        
        // Generate a simple product code and name
        const cleanName = path.parse(imageFile).name
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
            
        // Create a unique hash or timestamp for code
        const uniqueSuffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        const productCode = `NEW-${uniqueSuffix.toUpperCase()}`;
        
        const imageUrl = await uploadImage(imageFile, productCode);

        const { error } = await supabase
        .from('products')
        .insert({
          product_code: productCode,
          name: cleanName,
          category: 'Uncategorized', // Special category for these
          brand: 'Generic',
          price: 0.00, // Default price
          image_url: imageUrl,
          specifications: { description: 'Automatically imported from image file.' }
        });

        if (error) {
            console.error(`Error inserting orphan ${productCode}:`, error.message);
        } else {
            console.log(`Inserted Orphan: ${cleanName}`);
        }
    }
    // ----------------------------------

    console.log('Done! Check missing_images.txt for any missing assets.');
  });
