'use client';

import { motion } from 'framer-motion';

export default function Blob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full bg-[#FF4500] blur-[120px] opacity-40"
        animate={{
          x: ['-10%', '110%', '-10%'],
          y: ['-10%', '70%', '-10%'],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: '5%', left: '5%' }}
      />
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-black blur-[150px] opacity-25"
        animate={{
          x: ['90%', '-40%', '90%'],
          y: ['60%', '-10%', '60%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: '30%', right: '5%' }}
      />
    </div>
  );
}
