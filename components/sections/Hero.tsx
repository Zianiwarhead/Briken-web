 'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Blob from '@/components/ui/Blob';
import Marquee from '@/components/ui/Marquee';

export default function Hero() {
  const [heroError, setHeroError] = useState(false);
  return (
    <section className="pt-24 min-h-screen flex flex-col md:flex-row border-b-[3px] border-black relative">
       {/* Background Blob */}
       <Blob />
       
      {/* Left Column: Typography */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between bg-[#F4F4F0]/40 backdrop-blur-md relative overflow-hidden border-r-[3px] border-black z-10">
        
        {/* Top Meta Data */}
        <div className="flex justify-between font-mono text-sm tracking-widest uppercase mb-20">
          <span>Est. 2020</span>
          <span>Nairobi, KE</span>
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] md:text-[8vw] leading-[0.85] font-black uppercase text-black wrap-break-word">
            Shaping<br />
            Safety.
          </h1>
        </motion.div>

        {/* Bottom Description */}
        <div className="mt-20 flex flex-col gap-8">
          <p className="font-mono text-sm md:text-base leading-relaxed border-l-[3px] border-black pl-6">
            {'//'} BRIKEN FIRE ENGINEERING <br/>
            We construct the invisible infrastructure of safety. 
            Precision suppression systems for the modern built environment.
          </p>
          <div className="w-full overflow-hidden border-t-[3px] border-black -mx-8 md:-mx-16 mb:-mb-16 mt-8">
             <Marquee items={['Suppression', 'Detection', 'Compliance', 'Safety', 'Engineering', 'Protection']} />
          </div>
        </div>
      </div>

      {/* Right Column: Imagery */}
      <div className="w-full md:w-1/2 border-t-[3px] md:border-t-0 md:border-l-0px border-black bg-[#E5E5E5]/30 backdrop-blur-md relative min-h-[50vh] md:min-h-auto group overflow-hidden z-10">
        {/* Image Placeholder / Real Image */}
        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
           {/* Attempt to load hero image, fallback to concrete pattern */}
           {!heroError && (
             <Image
               src="/hero.jpg"
               alt="Concrete Structure"
               className="object-cover"
               fill
               onError={() => setHeroError(true)}
               priority
             />
           )}
           {/* Fallback Pattern */}
           <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-50" />
        </div>
        
        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 p-8 bg-black text-white font-mono text-xs uppercase tracking-widest border-t-[3px] border-r-[3px] border-black">
          Fig. 01 — Structural Defense
        </div>
      </div>
    </section>
  );
}