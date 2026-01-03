'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Filter } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/lib/products';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F4F0] pt-24 text-black">
      <Navbar />
      
      {/* Header */}
      <section className="py-12 px-6 border-b-[3px] border-black bg-[#F4F4F0]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black uppercase mb-4">Catalogue.</h1>
          <p className="font-mono text-sm max-w-2xl border-l-[3px] border-black pl-4">
            Certified fire safety hardware. <br/>
            Index of available engineering assets.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="border-[3px] border-black p-4 bg-white">
              <div className="flex items-center gap-2 font-black uppercase mb-6 border-b-[3px] border-black pb-2">
                <Filter size={18} />
                <span>Index</span>
              </div>
              <div className="space-y-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-3 font-mono text-xs uppercase border-b border-black last:border-b-0 hover:bg-[#FF4500] hover:text-white transition-colors ${
                      activeCategory === cat 
                        ? 'bg-black text-white font-bold' 
                        : 'text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalogue Download CTA */}
            <div className="p-4 border-[3px] border-black bg-[#E5E5E5] hover:bg-[#FF4500] hover:text-white transition-colors group cursor-pointer">
              <h4 className="font-black uppercase text-sm mb-2">Full PDF Index</h4>
              <p className="font-mono text-xs mb-3 opacity-70">Download technical specifications manual.</p>
              <div className="text-right font-bold text-xl">↓</div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
             </div>
             
             {filteredProducts.length === 0 && (
               <div className="py-20 text-center font-mono border-[3px] border-black border-dashed opacity-50">
                 // NO ASSETS FOUND
               </div>
             )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
