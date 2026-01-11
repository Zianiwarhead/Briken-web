const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL:", supabaseUrl);
// console.log("Key:", supabaseKey); // Don't log full key

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugFetch() {
  console.log("Attempting to fetch products...");
  
  // Mimic 'All' category fetch
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(100);

  if (error) {
    console.error("Supabase Error Object:", error);
    console.error("Error Message:", error.message);
    console.error("Error Details:", error.details);
    console.error("Error Hint:", error.hint);
    console.error("Error Code:", error.code);
  } else {
    console.log("Success! Found", data.length, "products.");
  }
}

debugFetch();