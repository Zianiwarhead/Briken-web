import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkMissingImages() {
  console.log('Fetching products...\n');

  const { data: products, error } = await supabase.from('products').select('id, name, image_url');

  if (error) {
    console.error('Error fetching products:', error.message);
    return;
  }

  if (!products || products.length === 0) {
    console.log('No products found.');
    return;
  }

  console.log(`Total products: ${products.length}\n`);
  console.log('Fetching storage files...\n');

  const { data: files, error: filesError } = await supabase.storage.from('products').list();

  if (filesError) {
    console.error('Error fetching storage files:', filesError.message);
    return;
  }

  const existingFiles = new Set(files?.map(f => f.name) || []);
  console.log(`Storage files found: ${existingFiles.size}\n`);

  const missingImages: { id: string; name: string; image_url: string | null }[] = [];
  const noImageUrl: { id: string; name: string }[] = [];

  for (const product of products) {
    if (!product.image_url) {
      noImageUrl.push({ id: product.id, name: product.name });
      continue;
    }

    try {
      const url = new URL(product.image_url);
      const path = url.pathname.split('/').pop() || url.pathname;

      if (!existingFiles.has(path)) {
        missingImages.push({ id: product.id, name: product.name, image_url: product.image_url });
      }
    } catch (err) {
      console.error(`Invalid URL for product ${product.id}:`, product.image_url);
    }
  }

  const csvHeader = 'ID,Name,Image URL\n';
  const missingCsvRows = missingImages.map(p => 
    `"${p.id}","${p.name.replace(/"/g, '""')}","${p.image_url}"`
  ).join('\n');

  writeFileSync(resolve(process.cwd(), 'missing-images.csv'), csvHeader + missingCsvRows);
  console.log('Exported missing images to: missing-images.csv\n');

  const noImageCsvRows = noImageUrl.map(p => `"${p.id}","${p.name.replace(/"/g, '""')}"`).join('\n');
  writeFileSync(resolve(process.cwd(), 'products-no-image.csv'), csvHeader + noImageCsvRows);
  console.log('Exported products without images to: products-no-image.csv\n');

  console.log('=== SUMMARY ===');
  console.log(`Total products: ${products.length}`);
  console.log(`Missing images: ${missingImages.length}`);
  console.log(`No image set: ${noImageUrl.length}`);
  console.log(`Storage files: ${existingFiles.size}`);
}

checkMissingImages().catch(console.error);
