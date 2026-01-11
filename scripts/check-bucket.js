const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
  const { data, error } = await supabase
    .storage
    .from('products')
    .list('', { limit: 10, search: 'P50' });

  if (error) {
    console.error('Error listing bucket:', error);
  } else {
    console.log('Bucket Files:', data);
  }
}

checkBucket();