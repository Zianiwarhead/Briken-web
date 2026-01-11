'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  // Prefer image_url, fallback to local ID based (legacy), then placeholder
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (product.image_url) {
      setImgSrc(product.image_url);
    } else {
      setImgSrc(`/products/${product.id}.jpg`);
    }
  }, [product]);

  return (
    <div className="group border-[3px] border-black bg-white flex flex-col h-full relative hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
      
      {/* Header / ID */}
      <div className="border-b-[3px] border-black p-2 flex justify-between items-center bg-[#F4F4F0]">
        <span className="font-mono text-xs font-bold uppercase truncate max-w-[70%]">{product.category}</span>
        <span className="font-mono text-xs font-bold">{product.product_code || product.id}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square border-b-[3px] border-black overflow-hidden bg-white p-4">
        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={() => setHasError(true)}
            unoptimized={!!product.image_url} // Allow Supabase URLs without next/image config for now
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5] text-gray-400 font-mono text-xs">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Footer Content */}
      <div className="p-4 flex flex-col justify-between flex-grow group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-200">
        <div>
           <h3 className="text-lg font-black uppercase leading-none mb-2 line-clamp-3">{product.name}</h3>
           {product.spec && <p className="font-mono text-xs opacity-70 border-l-2 border-current pl-2">{product.spec}</p>}
           {!product.spec && product.brand && <p className="font-mono text-xs opacity-70 border-l-2 border-current pl-2">{product.brand}</p>}
        </div>
        
        <div className="mt-4 flex justify-between items-end">
           {product.price && <span className="font-mono font-bold">£{product.price.toFixed(2)}</span>}
           <Plus size={24} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}