'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuote } from '@/contexts/QuoteContext';

const navLinks = [
  { name: 'Products', href: '/products', hasDropdown: true },
  { name: 'Services', href: '/#services', hasDropdown: false },
  { name: 'About', href: '/#about', hasDropdown: false },
  { name: 'Contact', href: '/contact', hasDropdown: false },
];

const productCategories = [
  'Fire Extinguishers',
  'Fire Suppression',
  'Smoke Detectors',
  'Sprinkler Systems',
  'Fire Hoses',
  'Safety Signs',
  'Emergency Lighting',
  'Fire Hydrants',
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { quoteCount } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F4F4F0]/95 shadow-lg'
            : 'bg-[#F4F4F0]'
        } border-b border-black h-20 flex`}
      >
        <motion.div
          className={`flex-shrink-0 w-1/3 md:w-1/4 border-r border-black flex items-center justify-center transition-colors duration-300 ${
            scrolled ? 'bg-white' : 'bg-[#F4F4F0]'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/" className="text-3xl md:text-4xl font-extrabold tracking-tighter uppercase group">
            <span className="relative inline-block">
              Briken.
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#FF4500] transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </motion.div>

        <div className="hidden lg:flex flex-1">
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`h-full flex items-center justify-center px-8 text-sm font-bold uppercase tracking-wide border-r border-black transition-all duration-300 hover:bg-[#FF4500] hover:text-white ${
                    activeDropdown === link.name ? 'bg-[#FF4500] text-white' : ''
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`ml-2 transition-transform duration-300 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>
              </motion.div>

              {link.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, pointerEvents: 'none' }}
                      animate={{ opacity: 1, y: 0, pointerEvents: 'auto' }}
                      exit={{ opacity: 0, y: 10, pointerEvents: 'none' }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white border border-black shadow-xl"
                    >
                      <div className="py-2">
                        {productCategories.map((category, idx) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              href={`/products?category=${encodeURIComponent(category)}`}
                              className="block px-6 py-3 text-sm font-mono uppercase hover:bg-[#FF4500] hover:text-white transition-colors border-b border-black/10 last:border-b-0"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              {category}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center border-l border-black">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="h-20 px-6 flex items-center justify-center hover:bg-[#FF4500] hover:text-white transition-colors group"
          >
            <Search size={22} strokeWidth={3} />
            <span className="ml-2 text-sm font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Search
            </span>
          </motion.button>
          <Link
            href="/contact"
            className="h-20 px-6 flex items-center justify-center border-l border-black hover:bg-[#FF4500] hover:text-white transition-colors relative"
          >
            <FileText size={22} strokeWidth={3} />
            {quoteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4500] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {quoteCount}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden flex-1 flex justify-end">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-20 h-full border-l border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#F4F4F0]"
          >
            <div className="pt-24 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-black py-8 px-6 text-4xl font-black uppercase hover:bg-[#FF4500] hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 mt-8"
                >
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-4 opacity-50">
                    Quick Contact
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+254799347535"
                      className="block text-2xl font-bold uppercase hover:text-[#FF4500] transition-colors"
                    >
                      +254 799 347 535
                    </a>
                    <a
                      href="mailto:info@briken.co.ke"
                      className="block text-lg font-bold lowercase underline decoration-2 hover:text-[#FF4500]"
                    >
                      info@briken.co.ke
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="border-t border-black p-6"
              >
                <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest">
                  <span>© 2026 Briken</span>
                  <span className="text-[#FF4500]">Fire Engineering</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
