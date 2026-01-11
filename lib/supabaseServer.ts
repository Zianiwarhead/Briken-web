import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('CRITICAL: Missing server Supabase environment variables!', {
    url: !!supabaseUrl,
    serviceRole: !!supabaseServiceRole,
  });
}

export const supabaseServer = createClient(supabaseUrl!, supabaseServiceRole!);
