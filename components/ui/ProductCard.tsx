'use client';

import { motion } from 'framer-motion';
import { ChevronRight, FileText, MessageSquare, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/products';
import { useQuote } from '@/contexts/QuoteContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const imgSrc = product.image_url || `/products/${product.id}.jpg`;
  const [hasError, setHasError] = useState(false);
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();
  const selected = isInQuote(product.id);

  if (variant === 'list') {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="group bg-white flex flex-col md:flex-row h-auto relative rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="md:w-48 lg:w-56 relative aspect-square md:aspect-auto bg-gray-50/50 p-6">
          {!hasError && imgSrc ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
              onError={() => setHasError(true)}
              unoptimized={!!product.image_url}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-mono text-[10px]">
              IMAGE PENDING
            </div>
          )}
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-gray-400 text-[10px] font-mono">
                {product.product_code || product.id}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF4500] transition-colors mb-3 leading-tight">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {product.spec && <span className="flex items-center gap-1"><FileText size={12}/> {product.spec}</span>}
              {product.brand && <span>Brand: <span className="font-semibold text-gray-700">{product.brand}</span></span>}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => selected ? removeFromQuote(product.id) : addToQuote(product)}
              className={`px-5 py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all ${
                selected ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-[#FF4500]'
              }`}
            >
              {selected ? <Check size={14} /> : <MessageSquare size={14} />}
              {selected ? 'In Quote' : 'Request Quote'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-white flex flex-col h-full relative rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Top Header */}
      <div className="p-3 flex justify-between items-center bg-gray-50/50">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter truncate max-w-[60%]">
          {product.category}
        </span>
        <span className="text-[9px] font-mono text-gray-400">
          {product.product_code || product.id}
        </span>
      </div>

      {/* Image Container with more Padding */}
      <div className="relative aspect-square bg-white overflow-hidden p-8">
        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            onError={() => setHasError(true)}
            unoptimized={!!product.image_url}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 font-mono text-[10px]">
            NO IMAGE
          </div>
        )}
        
        {/* Floating Action Button */}
        <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => selected ? removeFromQuote(product.id) : addToQuote(product)}
            className={`p-3 rounded-full shadow-lg transition-colors ${
              selected ? 'bg-green-500 text-white' : 'bg-white text-gray-900 hover:bg-[#FF4500] hover:text-white border border-gray-100'
            }`}
          >
            {selected ? <Check size={18} /> : <MessageSquare size={18} />}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col justify-between grow">
        <div>
          <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#FF4500] transition-colors">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
              {product.brand}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center text-[10px] font-bold text-[#FF4500] opacity-0 group-hover:opacity-100 transition-all">
          VIEW DETAILS <ChevronRight size={12} className="ml-1" />
        </div>
      </div>
    </motion.div>
  );
}