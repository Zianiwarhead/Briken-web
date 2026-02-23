'use client';

import { motion } from 'framer-motion';

export default function SkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border-[3px] border-black overflow-hidden"
        >
          <div className="aspect-square relative bg-[#E5E5E5] animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-[#E5E5E5] rounded animate-shimmer w-3/4" />
            <div className="h-3 bg-[#E5E5E5] rounded animate-shimmer w-1/2" />
            <div className="h-6 bg-[#E5E5E5] rounded animate-shimmer w-1/3 mt-4" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#F4F4F0] z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-[4px] border-black border-t-[#FF4500] rounded-full mx-auto mb-6"
        />
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2">
          Briken.
        </h2>
        <p className="font-mono text-sm uppercase tracking-widest opacity-50">
          Loading...
        </p>
      </motion.div>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="flex items-center justify-center gap-2"
    >
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </motion.div>
  );
}
