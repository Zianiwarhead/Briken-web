'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/#about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F4F4F0] border-b-[3px] border-black h-24 flex">
      {/* Logo Section */}
      <div className="flex-shrink-0 w-1/2 md:w-1/3 border-r-[3px] border-black flex items-center justify-center bg-[#F4F4F0] hover:bg-black hover:text-white transition-colors duration-300">
        <Link href="/" className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase">
          Briken.
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex flex-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex-1 flex items-center justify-center border-r-[3px] border-black text-xl font-bold uppercase tracking-tight hover:bg-[#FF4500] hover:text-white transition-colors duration-0 last:border-r-0"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex-1 flex justify-end">
        <button
          className="w-24 h-full border-l-[3px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed top-24 left-0 w-full h-[calc(100vh-6rem)] bg-[#F4F4F0] z-40 flex flex-col border-t-[3px] border-black">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex-1 border-b-[3px] border-black flex items-center justify-center text-4xl font-black uppercase hover:bg-[#FF4500] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
