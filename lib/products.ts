// Avoid importing a Supabase client at module scope to prevent bundling
// server-only (secret) keys into the browser bundle.

export interface Product {
  id: string;
  name: string;
  category: string;
  spec?: string; // Derived or mapped
  image_url?: string;
  product_code?: string;
  brand?: string;
  price?: number;
  specifications?: Record<string, unknown>;
}

export const CATEGORIES = [
  'All',
  'All Fire Extinguishers',
  'Water Mist Extinguishers',
  'CO2 Extinguishers',
  'Water Extinguishers',
  'Foam Extinguishers',
  'Powder Extinguishers',
  'Wet Chemical Extinguishers',
  'Fire Blankets',
  'Automatic Extinguishers',
  'Lithium Ion Extinguishers',
  'ID Signs',
  'Wheeled Extinguishers',
  'Domestic Extinguishers',
  'Car Extinguishers',
  'Truck Extinguishers',
  'Caravan Extinguishers',
  'Extinguisher Stands',
  'Cabinets and Covers',
  'Theft Stoppers',
  'Brackets',
  'Trolleys',
  'Hose Reels',
  'Buckets',
  'Servicing Tools',
  'Servicing Spares',
  'Gas Detectors',
  'Tester Equipment',
  'Call Point Covers',
  'Air Quality Monitors'
];

// Fallback data if Supabase is empty or offline (kept for reference/dev)
export const FALLBACK_PRODUCTS: Product[] = [
  { id: 'ext-1', name: 'APW Water Extinguisher', category: 'Extinguishers', spec: 'Air-Pressurized Water' },
  // ... (we can leave this empty or minimal)
];

export async function fetchProducts(category: string = 'All') {
  // If running on the server, dynamically import a server-side Supabase client
  // so we never bundle a secret key into client code. If running in the
  // browser, call the server API route which performs the DB query.
  if (typeof window === 'undefined') {
    const { supabase } = await import('./supabase');

    let query = supabase.from('products').select('*');
    if (category !== 'All') query = query.eq('category', category);
    const { data, error } = await query.limit(100);
    if (error) {
      console.error('Error fetching products:', error.message || error);
      return [];
    }
    if (!data) return [];

    return data.map((p: Record<string, unknown>) => {
    let spec = '';
    if (p.specifications) {
        // Try to construct a useful spec string
        const specs = p.specifications as Record<string, unknown>;
        const parts = [];
        if (specs['Capacity']) parts.push(specs['Capacity']);
        if (specs['Extinguisher Rating']) parts.push(specs['Extinguisher Rating']);
        if (specs['Dimensions (HxDia)']) parts.push(specs['Dimensions (HxDia)']);
        
        if (parts.length > 0) {
            spec = parts.join(' • ');
        } else {
            // Fallback: grab the first non-price value
             const firstKey = Object.keys(specs).find(k => !k.includes('unit') && !k.includes('Price'));
             if (firstKey) spec = `${firstKey}: ${specs[firstKey]}`;
        }
    }

      return {
        ...p,
        spec: spec || p.brand || p.category // Fallback if no specs found
      };
    }) as Product[];
  }

  // Client-side: call the server API endpoint
  try {
    const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) {
      console.error('Error fetching products from API:', res.statusText || res.status);
      return [];
    }
    const json = await res.json();
    return json as Product[];
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Error fetching products (network):', msg);
    return [];
  }
}

export async function fetchCategories() {
  // Ideally, distinct query:
  // const { data } = await supabase.from('products').select('category', { count: 'exact', head: false }).distinct();
  // But for now we use the static list to ensure UI consistency
  return CATEGORIES;
}