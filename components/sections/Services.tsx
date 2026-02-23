'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const services = [
  {
    title: 'Installation',
    description: 'Precision fitting of fire detection and suppression systems engineered for maximum protection.',
    image: '/services/install.jpg',
    colSpan: 'lg:col-span-2',
    features: ['System Design', 'Professional Fitting', 'Compliance Testing'],
  },
  {
    title: 'Equipment Supply',
    description: 'Premium extinguishers, hydrants, and safety equipment from certified manufacturers.',
    image: '/services/supply.jpg',
    colSpan: 'lg:col-span-1',
    features: ['Quality Assured', 'Warranty Included', 'Fast Delivery'],
  },
  {
    title: 'Maintenance',
    description: 'Repair and servicing of firefighting hardware to ensure optimal performance.',
    image: '/services/repair.jpg',
    colSpan: 'lg:col-span-1',
    features: ['Annual Inspections', 'Parts Replacement', 'System Upgrades'],
  },
  {
    title: 'Safety Training',
    description: 'Staff preparedness drills and emergency protocols for effective response.',
    image: '/services/training.jpg',
    colSpan: 'lg:col-span-2',
    features: ['Fire Warden Training', 'Evacuation Drills', 'Equipment Usage'],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#FF4500]" />
              <span className="text-[#FF4500] font-bold tracking-widest text-xs uppercase">
                Our Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
              Engineered
              <br />
              <span className="text-[#FF4500]">Solutions</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-sm md:text-base leading-relaxed">
            We don&apos;t just sell products; we deliver complete safety ecosystems tailored to
            your building&apos;s architecture and compliance requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className={`group relative h-80 md:h-96 overflow-hidden border border-black bg-[#F4F4F0] ${service.colSpan}`}
            >
              <div className="absolute inset-0 bg-slate-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-white/60 uppercase tracking-widest">
                    0{index + 1}
                  </span>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ArrowUpRight className="text-black" size={20} />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 leading-none">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-white/20 text-white border border-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 border border-black bg-[#FF4500] text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">
            Need a Custom Solution?
          </h3>
          <p className="font-mono text-sm mb-6 max-w-2xl mx-auto opacity-90">
            Our engineering team specializes in bespoke fire safety systems for complex environments.
            Contact us for a consultation and personalized proposal.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Get Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
