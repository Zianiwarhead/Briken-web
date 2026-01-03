'use client';

import { Linkedin, Facebook, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#F4F4F0] border-t-[3px] border-black text-black">
      
      {/* Massive Brand Title */}
      <div className="border-b-[3px] border-black py-10 px-6 overflow-hidden">
        <h2 className="text-[20vw] font-black uppercase leading-[0.75] tracking-tighter opacity-10 select-none">
          Briken.
        </h2>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        
        {/* Column 1: Address */}
        <div className="p-10 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black flex flex-col justify-between h-80">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">// Location</h3>
            <p className="text-2xl font-black uppercase leading-tight">
              Star House, Ngara<br />
              Nairobi, Kenya
            </p>
            <p className="font-mono text-sm mt-4">P.O. Box 62725-00200</p>
          </div>
          <p className="font-mono text-xs opacity-50 italic">Coordinates: 1.2921° S, 36.8219° E</p>
        </div>

        {/* Column 2: Contact */}
        <div className="p-10 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black flex flex-col justify-between h-80">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">// Inquiry</h3>
            <div className="space-y-2">
              <a href="tel:+254799347535" className="block text-2xl font-black uppercase hover:text-[#FF4500] transition-colors leading-none">+254 799 347 535</a>
              <a href="tel:0202221394" className="block text-2xl font-black uppercase hover:text-[#FF4500] transition-colors leading-none">020 2221394</a>
              <a href="mailto:info@briken.co.ke" className="block text-xl font-bold lowercase underline decoration-2 mt-4 hover:text-[#FF4500]">info@briken.co.ke</a>
            </div>
          </div>
          <div className="bg-black text-white p-4 font-mono text-xs uppercase text-center cursor-pointer hover:bg-[#FF4500] transition-colors">
            Request Specs.
          </div>
        </div>

        {/* Column 3: Social & Meta */}
        <div className="p-10 flex flex-col justify-between h-80 bg-[#E5E5E5]">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest mb-6 opacity-50">// Connection</h3>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FF4500] transition-colors"><Linkedin size={32} strokeWidth={3} /></a>
              <a href="#" className="hover:text-[#FF4500] transition-colors"><Twitter size={32} strokeWidth={3} /></a>
              <a href="#" className="hover:text-[#FF4500] transition-colors"><Facebook size={32} strokeWidth={3} /></a>
            </div>
          </div>
          <div className="flex justify-between items-end">
             <button 
               onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
               className="h-16 w-16 border-[3px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
             >
               <ArrowUp size={32} strokeWidth={3} />
             </button>
             <div className="text-right">
               <span className="block font-mono text-[10px] uppercase opacity-50">Local Time</span>
               <span className="font-bold text-xl uppercase">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT+3</span>
             </div>
          </div>
        </div>

      </div>

      {/* Black Bottom Bar */}
      <div className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-[0.2em]">
        <span>© {new Date().getFullYear()} Briken Fire Engineering</span>
        <div className="flex gap-8 mt-4 md:mt-0 opacity-60">
          <span>Standards: KEBS / NFPA</span>
          <span>ISO 9001:2015</span>
        </div>
      </div>
    </footer>
  );
}