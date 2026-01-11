const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
// ideally this needs SERVICE_ROLE_KEY to modify storage settings, 
// but sometimes ANON works if RLS is loose or if we are just inserting policies.
// If this fails, we might need the user to provide the service role key or do it in dashboard.

const supabase = createClient(supabaseUrl, supabaseKey);

async function makeBucketPublic() {
  console.log("Attempting to make 'products' bucket public...");

  // 1. Update the bucket to be public
  const { data: updateData, error: updateError } = await supabase
    .from('buckets')
    .update({ public: true })
    .eq('id', 'products')
    .schema('storage'); // Access storage schema

  if (updateError) {
    console.error('Error updating bucket public status:', updateError);
  } else {
    console.log('Bucket updated to public:', updateData);
  }

  // 2. Create/Update Policy for Public Access
  // We can't execute raw SQL via client usually unless we use rpc.
  // But we can check if we can read the table.
  
  // Note: Modifying policies usually requires SQL Editor or Service Role.
  // We will just try the update first.
}

makeBucketPublic();
