'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  spec?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(`/products/${product.id}.jpg`);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group border-[3px] border-black bg-white flex flex-col h-full relative hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
      
      {/* Header / ID */}
      <div className="border-b-[3px] border-black p-2 flex justify-between items-center bg-[#F4F4F0]">
        <span className="font-mono text-xs font-bold uppercase">{product.category}</span>
        <span className="font-mono text-xs font-bold">#{product.id}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square border-b-[3px] border-black overflow-hidden bg-gray-200">
        {!hasError ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={() => setHasError(true)}
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
           <h3 className="text-xl font-black uppercase leading-none mb-2">{product.name}</h3>
           {product.spec && <p className="font-mono text-xs opacity-70 border-l-2 border-current pl-2">{product.spec}</p>}
        </div>
        
        <div className="mt-4 flex justify-end">
           <Plus size={24} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
