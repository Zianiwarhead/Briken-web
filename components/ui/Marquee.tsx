'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export default function Marquee({
  items,
  direction = 'left',
  speed = 20,
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative flex overflow-hidden border-y-[3px] border-black bg-[#FF4500] text-white py-3 select-none ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap font-mono text-sm md:text-base font-bold uppercase tracking-widest"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        initial={{ x: 0 }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {duplicatedItems.map((item, index) => (
          <span key={index} className="mx-6 md:mx-10 flex items-center">
            {item}
            <span className="ml-6 md:ml-10 text-black/30">{'\u25AA'}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface BrandMarqueeProps {
  speed?: number;
}

export function BrandMarquee({ speed = 40 }: BrandMarqueeProps) {
  const brands = [
    'Chubb',
    'Ansul',
    'Kidde',
    'Honeywell',
    'Siemens',
    'Bosch',
    'Tyco',
    'Notifier',
  ];

  return (
    <div className="py-8 bg-[#F4F4F0] border-b-[3px] border-black">
      <p className="text-center font-mono text-xs uppercase tracking-widest opacity-50 mb-6">
        Authorized Dealer For
      </p>
      <Marquee items={brands} speed={speed} className="border-y-0 bg-transparent text-black" />
    </div>
  );
}
