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
        className="group border border-black bg-white flex flex-col md:flex-row h-auto relative"
      >
        <div className="md:w-48 lg:w-56 relative aspect-square md:aspect-auto border-b md:border-b-0 md:border-r border-black overflow-hidden bg-white p-4">
          {!hasError && imgSrc ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain transition-all duration-300"
              onError={() => setHasError(true)}
              unoptimized={!!product.image_url}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5] text-gray-400 font-mono text-xs">
              NO IMAGE
            </div>
          )}
        </div>

        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-200">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {product.category}
                </span>
                <span className="font-mono text-[10px] font-bold">
                  {product.product_code || product.id}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase leading-none mb-2">
                {product.name}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                {product.spec && (
                  <span className="opacity-70 border-l-2 border-current pl-2">
                    {product.spec}
                  </span>
                )}
                {product.brand && (
                  <span className="opacity-70">
                    Brand: <span className="font-bold">{product.brand}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selected ? removeFromQuote(product.id) : addToQuote(product)}
                className={`px-4 py-2 font-bold uppercase text-xs tracking-wider flex items-center gap-2 transition-colors ${
                  selected
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-black text-white hover:bg-[#FF4500]'
                }`}
              >
                {selected ? <Check size={14} /> : <MessageSquare size={14} />}
                {selected ? 'Added' : 'Request Quote'}
              </motion.button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-black/20 flex items-center justify-between">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              <FileText size={14} />
              View Specs
            </button>
            <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group border border-black bg-white flex flex-col h-full relative hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
    >
      <div className="border-b border-black p-2 flex justify-between items-center bg-[#F4F4F0]">
        <span className="font-mono text-[10px] font-bold uppercase truncate max-w-[70%]">
          {product.category}
        </span>
        <span className="font-mono text-[10px] font-bold">
          {product.product_code || product.id}
        </span>
      </div>

      <div className="relative aspect-square border-b border-black overflow-hidden bg-white p-4">
        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-all duration-300"
            onError={() => setHasError(true)}
            unoptimized={!!product.image_url}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5] text-gray-400 font-mono text-xs">
            NO IMAGE
          </div>
        )}
        <div className="absolute top-2 right-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selected ? removeFromQuote(product.id) : addToQuote(product)}
            className={`px-3 py-1.5 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${
              selected
                ? 'bg-[#22C55E] text-white'
                : 'bg-black text-white hover:bg-[#FF4500]'
            }`}
          >
            {selected ? <Check size={12} /> : <MessageSquare size={12} />}
            {selected ? 'Added' : 'Quote'}
          </motion.button>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between grow group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-200">
        <div>
          <h3 className="text-lg font-black uppercase leading-none mb-2 line-clamp-3">
            {product.name}
          </h3>
          {(product.spec || product.brand) && (
            <p className="font-mono text-[10px] opacity-70 border-l-2 border-current pl-2">
              {product.spec || product.brand}
            </p>
          )}
        </div>

        <div className="mt-4 flex justify-between items-end">
          <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
