'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import { Filter, Search, X, AlertCircle } from 'lucide-react';
import { CATEGORIES, fetchProducts, Product } from '@/lib/products';
import { motion } from 'framer-motion';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(activeCategory);
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(debounce);
  }, [loadProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  const hasActiveFilters = activeCategory !== 'All' || searchQuery !== '';

  return (
    <>
      <section className="pt-24 pb-8 px-6 border-b border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-black uppercase mb-3 tracking-tight">
                Catalogue.
              </h1>
              <p className="font-mono text-sm max-w-xl border-l-[3px] border-[#FF4500] pl-4">
                Certified fire safety hardware.
                <br />
                Index of available engineering assets.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-12 pr-4 py-3 bg-[#F4F4F0] border border-black font-mono text-sm uppercase placeholder:opacity-50 focus:outline-none focus:border-[#FF4500] transition-colors w-48 md:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#FF4500] transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex border border-black">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 border-l border-black transition-colors ${
                    viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="4" width="18" height="4" />
                    <rect x="3" y="10" width="18" height="4" />
                    <rect x="3" y="16" width="18" height="4" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="border border-black bg-white sticky top-28">
              <div className="flex items-center justify-between p-4 border-b border-black">
                <div className="flex items-center gap-2 font-black uppercase">
                  <Filter size={18} />
                  <span>Index</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-mono uppercase text-[#FF4500] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-black p-2">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`w-full text-left px-4 py-3 font-mono text-xs uppercase border-b border-black/10 last:border-b-0 transition-colors ${
                    activeCategory === 'All'
                      ? 'bg-black text-white font-bold'
                      : 'hover:bg-[#FF4500] hover:text-white'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 font-mono text-xs uppercase border-b border-black/10 last:border-b-0 transition-colors ${
                      activeCategory === cat
                        ? 'bg-black text-white font-bold'
                        : 'hover:bg-[#FF4500] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-black bg-[#E5E5E5] hover:bg-[#FF4500] hover:text-white transition-colors group cursor-pointer"
            >
              <h4 className="font-black uppercase text-lg mb-2">Full PDF Index</h4>
              <p className="font-mono text-xs mb-3 opacity-70">
                Download technical specifications manual.
              </p>
              <div className="text-right font-bold text-2xl group-hover:translate-x-2 transition-transform">
                ↓
              </div>
            </motion.div>

            <div className="p-4 border border-black bg-black text-white">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
                Need Help?
              </h4>
              <p className="font-mono text-xs mb-3">
                Our engineers are available for consultation.
              </p>
              <a
                href="tel:+254799347535"
                className="block text-center py-2 bg-[#FF4500] font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="space-y-6">
                <SkeletonLoader count={6} />
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 border border-black border-dashed bg-red-50 text-center"
              >
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <h3 className="text-2xl font-black uppercase mb-2">Error Loading Products</h3>
                <p className="font-mono text-sm mb-4">{error}</p>
                <button
                  onClick={loadProducts}
                  className="px-6 py-3 bg-black text-white font-bold uppercase text-sm hover:bg-[#FF4500] transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 flex items-center justify-between"
                >
                  <p className="font-mono text-sm uppercase tracking-widest opacity-60">
                    {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
                  </p>
                  {hasActiveFilters && (
                    <p className="font-mono text-xs uppercase opacity-50">
                      Showing results for &quot;{activeCategory}&quot;
                      {searchQuery && ` and &quot;${searchQuery}&quot;`}
                    </p>
                  )}
                </motion.div>

                {products.length > 0 ? (
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} variant={viewMode as 'grid' | 'list'} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-20 text-center border border-black border-dashed opacity-50"
                  >
                    <div className="mb-4">
                      <Search className="w-16 h-16 mx-auto opacity-30" />
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-2">No Products Found</h3>
                    <p className="font-mono text-sm mb-4">
                      Try adjusting your search or filter criteria.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
