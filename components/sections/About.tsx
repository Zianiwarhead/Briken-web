'use client';

import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-20 right-0 text-[200px] font-bold text-slate-50 leading-none select-none pointer-events-none hidden lg:block">
        LEAD
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: The Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-orange-600" />
              <span className="text-orange-600 font-mono text-sm tracking-widest uppercase">Our DNA</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Precision is not optional.<br />
              <span className="text-slate-400">It is our mandate.</span>
            </h2>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                At Briken Fire Engineering, we don't just sell equipment; we engineer peace of mind. 
                In a landscape where safety standards can be ambiguous, Briken stands as a beacon of 
                absolute compliance and technical rigor.
              </p>
              <p>
                From high-rise commercial complexes to industrial manufacturing plants, our mission 
                is to install systems that remain invisible until the moment they are needed most—and 
                in that moment, they perform flawlessly.
              </p>
            </div>
          </motion.div>

          {/* Right: The Director */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-panel p-8 rounded-2xl relative border border-white/50 shadow-xl group hover:border-orange-200 transition-colors duration-500">
              <Quote className="absolute top-8 right-8 text-orange-100" size={64} />
              
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-md overflow-hidden shrink-0">
                  <User className="text-slate-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Kellen Muthoni Mbogo</h3>
                  <p className="text-orange-600 font-medium mb-1">Director</p>
                  <p className="text-xs text-slate-400 font-mono">ID: BRK-DIR-001</p>
                </div>
              </div>

              <blockquote className="text-slate-600 italic relative z-10">
                "We founded Briken on a simple principle: Fire safety is an engineering discipline, not just a retail business. Every pipe we lay, every sensor we calibrate, carries the weight of human life. We honor that responsibility with zero compromise."
              </blockquote>
            </div>
            
            {/* Decorative element behind card */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-slate-100 rounded-2xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
