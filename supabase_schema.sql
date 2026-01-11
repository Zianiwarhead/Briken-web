-- 1. Create the products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  product_code text unique,
  name text not null,
  category text,
  brand text,
  price numeric,
  image_url text,
  specifications jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create the Storage Bucket (You usually do this in the Dashboard, but here is the SQL if supported or for reference)
-- insert into storage.buckets (id, name, public) values ('products', 'products', true);

-- 3. Security Policies (RLS)
alter table products enable row level security;

-- Allow public read access (so your website can display them)
create policy "Public products are viewable by everyone"
  on products for select
  using ( true );

-- TEMPORARY: Allow anonymous inserts for the seeding script to work with the publishable key.
-- IMPORTANT: Disable or delete this policy after seeding is complete!
create policy "Allow anon insert for seeding"
  on products for insert
  with check ( true );

-- Allow public access to storage (if you created the bucket via SQL)
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'products' ); 
-- create policy "Allow Uploads" on storage.objects for insert with check ( bucket_id = 'products' );
