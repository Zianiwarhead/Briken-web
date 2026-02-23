'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Facebook, Twitter, ArrowUp, Instagram, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' GMT+3'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/contact' },
  ];

  const productCategories = [
    'Fire Extinguishers',
    'Sprinkler Systems',
    'Smoke Detectors',
    'Fire Hoses',
    'Safety Signs',
    'Emergency Lighting',
  ];

  return (
    <footer id="footer" className="bg-[#F4F4F0] border-t border-black text-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-b border-black py-10 px-6 overflow-hidden relative"
      >
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase leading-[0.7] tracking-tighter opacity-10 select-none whitespace-nowrap">
          Briken.
        </h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-mono text-sm uppercase tracking-widest mb-2">Building Safety Since</p>
          <p className="text-4xl font-black">2020</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between h-auto lg:h-96">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">
              Location
            </h3>
            <p className="text-xl md:text-2xl font-black uppercase leading-tight mb-2">
              Star House, Ngara
            </p>
            <p className="text-lg font-bold uppercase mb-1">Nairobi, Kenya</p>
            <p className="font-mono text-sm opacity-70">P.O. Box 62725-00200</p>
          </div>
          <div className="mt-6">
            <a
              href="https://maps.google.com/?q=Star+House+Ngara+Nairobi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:text-[#FF4500] transition-colors"
            >
              <MapPin size={16} />
              View on Map
            </a>
          </div>
        </div>

        <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black flex flex-col justify-between h-auto lg:h-96">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">
              Quick Contact
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+254799347535"
                className="block text-xl font-black uppercase hover:text-[#FF4500] transition-colors"
              >
                +254 799 347 535
              </a>
              <a
                href="tel:0202221394"
                className="block text-lg font-bold uppercase hover:text-[#FF4500] transition-colors"
              >
                020 2221394
              </a>
              <a
                href="mailto:info@briken.co.ke"
                className="block text-sm font-bold lowercase underline decoration-2 mt-4 hover:text-[#FF4500]"
              >
                info@briken.co.ke
              </a>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 py-3 px-6 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-[#FF4500] transition-colors w-fit"
          >
            Request Quote
          </motion.button>
        </div>

        <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between h-auto lg:h-96">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block font-bold uppercase hover:text-[#FF4500] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-3 opacity-50">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {productCategories.slice(0, 4).map((cat) => (
                <a
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="text-xs font-mono px-2 py-1 border border-black/30 hover:bg-black hover:text-white transition-colors"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-between h-auto lg:h-96 bg-black text-white">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-70">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors"
              >
                <Linkedin size={22} strokeWidth={2} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors"
              >
                <Twitter size={22} strokeWidth={2} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors"
              >
                <Facebook size={22} strokeWidth={2} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-[#FF4500] transition-colors"
              >
                <Instagram size={22} strokeWidth={2} />
              </motion.a>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:info@briken.co.ke"
                className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <Mail size={16} />
                Newsletter Signup
              </a>
            </div>
          </div>

          <div className="flex justify-between items-end mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTop}
              className="w-14 h-14 border-2 border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ArrowUp size={24} strokeWidth={2.5} />
            </motion.button>
            <div className="text-right">
              <span className="block font-mono text-[10px] uppercase opacity-50">Local Time</span>
              <span className="font-bold text-lg uppercase">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-[0.15em] gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          <span>© {new Date().getFullYear()} Briken Fire Engineering</span>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:text-[#FF4500] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#FF4500] transition-colors">
            Terms of Service
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 opacity-60">
          <span>Standards: KEBS / NFPA</span>
          <span className="hidden md:inline">|</span>
          <span>ISO 9001:2015</span>
        </div>
      </div>
    </footer>
  );
}
