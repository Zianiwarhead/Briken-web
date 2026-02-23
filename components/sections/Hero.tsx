'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [heroError, setHeroError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="pt-20 min-h-screen flex flex-col md:flex-row border-b border-black relative overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between bg-[#F4F4F0]/40 relative overflow-hidden z-10 min-h-[60vh] md:min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between font-mono text-xs md:text-sm tracking-widest uppercase mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            Est. 2020
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FF4500]" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nairobi, Kenya
          </motion.span>
        </motion.div>

        <div className="flex-1 flex items-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
              className="text-[12vw] md:text-[7vw] leading-[0.8] font-black uppercase text-black wrap-break-word"
            >
              Shaping
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="w-4 h-4 md:w-6 md:h-6 bg-[#FF4500] rounded-full ml-4 mt-[-10vw] md:mt-[-5vw]"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
          className="text-[12vw] md:text-[7vw] leading-[0.8] font-black uppercase text-black wrap-break-word -mt-2 md:-mt-4"
        >
          Safety.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 md:mt-16"
        >
          <div className="relative pl-4 md:pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4500]" />
            <p className="font-mono text-xs md:text-sm leading-relaxed max-w-md">
              <span className="text-[#FF4500] font-bold">/</span>/ Briken Fire Engineering
              <br />
              <span className="opacity-70">
                We construct the invisible infrastructure of safety.
                Precision suppression systems for the modern built environment.
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex items-center gap-4"
        >
          <motion.a
            href="/products"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-black text-white font-bold uppercase text-xs md:text-sm tracking-widest hover:bg-[#FF4500] transition-colors"
          >
            View Products
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border border-black text-black font-bold uppercase text-xs md:text-sm tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Get Quote
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-black bg-[#E5E5E5]/30 relative min-h-[40vh] md:min-h-screen overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {!heroError && (
            <Image
              src="/hero.jpg"
              alt="Concrete Structure - Fire Safety Infrastructure"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={85}
              onError={() => setHeroError(true)}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-0 left-0 p-4 md:p-6 bg-black text-white font-mono text-[10px] md:text-xs uppercase tracking-widest border-t border-r border-black"
        >
          <span className="text-[#FF4500] mr-2">Fig. 01</span>
          Structural Defense Systems
        </motion.div>
      </motion.div>
    </section>
  );
}
