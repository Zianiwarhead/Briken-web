'use client';

import { motion } from 'framer-motion';
import { Quote, User, Award, Shield, Clock, MapPin } from 'lucide-react';

const stats = [
  { icon: Award, value: '500+', label: 'Projects Completed' },
  { icon: Shield, value: '100%', label: 'Compliance Rate' },
  { icon: Clock, value: '24/7', label: 'Emergency Support' },
  { icon: MapPin, value: '50+', label: 'Cities Served' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F4F4F0] border-t border-black relative overflow-hidden">
      <div className="absolute top-20 right-0 text-[150px] md:text-[250px] font-black leading-none text-black/[0.02] select-none pointer-events-none hidden lg:block">
        BRIKEN
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-[#FF4500]" />
              <span className="text-[#FF4500] font-bold tracking-widest text-xs uppercase">
                Our DNA
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-8">
              Precision is not optional.
              <br />
              <span className="text-gray-400">It is our mandate.</span>
            </h2>

            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                At Briken Fire Engineering, we don&apos;t just sell equipment; we engineer peace of
                mind. In a landscape where safety standards can be ambiguous, Briken stands as
                a beacon of absolute compliance and technical rigor.
              </p>
              <p>
                From high-rise commercial complexes to industrial manufacturing plants, our
                mission is to install systems that remain invisible until the moment they are
                needed most—and in that moment, they perform flawlessly.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 border border-black bg-white"
                >
                  <stat.icon size={24} strokeWidth={2.5} className="text-[#FF4500]" />
                  <div>
                    <div className="text-xl font-black uppercase">{stat.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 bg-white border border-black relative overflow-hidden">
              <Quote
                className="absolute top-6 right-6 text-[#FF4500] opacity-20"
                size={64}
              />

              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-[#F4F4F0] rounded-full flex items-center justify-center border border-black shrink-0 overflow-hidden">
                  <User className="text-black" size={32} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase">Kellen Muthoni Mbogo</h3>
                  <p className="text-[#FF4500] font-bold uppercase tracking-widest text-xs mb-1">
                    Director
                  </p>
                  <p className="font-mono text-[10px] opacity-50">ID: BRK-DIR-001</p>
                </div>
              </div>

              <blockquote className="text-gray-700 italic relative z-10 leading-relaxed text-sm md:text-base">
                We founded Briken on a simple principle: Fire safety is an engineering
                discipline, not just a retail business. Every pipe we lay, every sensor we
                calibrate, carries the weight of human life. We honor that responsibility
                with zero compromise.
              </blockquote>

              <div className="mt-6 pt-6 border-t border-black/10 flex flex-wrap gap-3">
                <span className="text-xs font-mono uppercase px-3 py-1 bg-[#F4F4F0] border border-black/20">
                  NFPA Certified
                </span>
                <span className="text-xs font-mono uppercase px-3 py-1 bg-[#F4F4F0] border border-black/20">
                  KEBS Compliant
                </span>
                <span className="text-xs font-mono uppercase px-3 py-1 bg-[#F4F4F0] border border-black/20">
                  ISO 9001:2015
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-full h-full border border-black -z-10" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-[#FF4500] flex items-center justify-center"
            >
              <Shield className="text-white" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 border-t border-black pt-12"
        >
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black uppercase mb-4">Our Certifications</h3>
            <p className="text-gray-600 max-w-xl">
              We maintain the highest standards of quality and compliance across all our
              operations. Our certifications ensure that every project meets international
              fire safety benchmarks.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
              NFPA Member
            </div>
            <div className="px-4 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
              KEBS Certified
            </div>
            <div className="px-4 py-2 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors">
              ISO 9001:2015
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
