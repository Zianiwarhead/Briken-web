'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function Marquee({ items, direction = 'left', speed = 20 }: MarqueeProps) {
  return (
    <div className="relative flex overflow-hidden border-y-[3px] border-black bg-[#FF4500] text-white py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap font-mono text-sm md:text-base font-bold uppercase tracking-widest"
        animate={{ x: direction === 'left' ? '-50%' : '50%' }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        initial={{ x: 0 }}
      >
        {/* Repeat items multiple times to ensure seamless loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex">
            {items.map((item, index) => (
              <span key={index} className="mx-8 flex items-center">
                {item} <span className="ml-8 text-black/40">{'//'}</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
