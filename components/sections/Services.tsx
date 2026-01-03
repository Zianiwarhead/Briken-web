'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Installation',
    description: 'Precision fitting of fire detection and suppression systems.',
    image: '/services/install.jpg',
    colSpan: 'lg:col-span-2'
  },
  {
    title: 'Equipment Supply',
    description: 'Sourcing premium extinguishers and hydrants.',
    image: '/services/supply.jpg',
    colSpan: 'lg:col-span-1'
  },
  {
    title: 'Maintenance',
    description: 'Repair and servicing of firefighting hardware.',
    image: '/services/repair.jpg',
    colSpan: 'lg:col-span-1'
  },
  {
    title: 'Safety Training',
    description: 'Staff preparedness drills and emergency protocols.',
    image: '/services/training.jpg',
    colSpan: 'lg:col-span-2'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Engineered Solutions</h2>
          </div>
          <p className="text-slate-500 max-w-md mt-4 md:mt-0">
            We don't just sell products; we deliver complete safety ecosystems tailored to your building's architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative h-80 overflow-hidden rounded-2xl bg-slate-200 ${service.colSpan}`}
            >
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 bg-slate-300">
                 {/* Try to load real image */}
                 <img 
                   src={service.image} 
                   alt={service.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   onError={(e) => (e.currentTarget.style.display = 'none')}
                 />
              </div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-300 text-sm">{service.description}</p>
                  </div>
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="text-orange-600" size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}