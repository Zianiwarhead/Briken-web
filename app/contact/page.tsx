'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const services = [
  'Product Inquiry',
  'Installation Quote',
  'Maintenance Service',
  'Training Request',
  'Compliance',
  'Emergency Support',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { quoteProducts, removeFromQuote, clearQuote } = useQuote();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      clearQuote();
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      lines: ['+254 799 347 535', '020 2221394'],
      href: 'tel:+254799347535',
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['info@briken.co.ke', 'sales@briken.co.ke'],
      href: 'mailto:info@briken.co.ke',
    },
    {
      icon: MapPin,
      title: 'Address',
      lines: ['Star House, Ngara', 'Nairobi, Kenya', 'P.O. Box 62725-00200'],
      href: 'https://maps.google.com/?q=Star+House+Ngara+Nairobi',
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
      href: null,
    },
  ];

  return (
    <>
      <section className="pt-24 pb-12 border-b border-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="font-mono text-sm max-w-2xl mx-auto border-l-[3px] border-[#FF4500] pl-4 text-left">
              Ready to enhance your fire safety? Our team is here to help with quotes,
              consultations, and emergency support.
            </p>
          </motion.div>
        </div>
      </section>

      {quoteProducts.length > 0 && (
        <section className="py-8 px-6 bg-[#FF4500] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase">
                Your Quote Request ({quoteProducts.length})
              </h2>
              <button
                onClick={clearQuote}
                className="px-4 py-2 bg-black text-white font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
              >
                <X size={14} />
                Clear All
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quoteProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white text-black p-4 border border-black flex gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold uppercase text-sm leading-tight mb-1">
                      {product.name}
                    </h3>
                    <p className="font-mono text-[10px] opacity-60">
                      {product.category}
                      {product.product_code && ` • ${product.product_code}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromQuote(product.id)}
                    className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              {contactInfo.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href || undefined}
                  target={item.href ? '_blank' : undefined}
                  rel={item.href ? 'noopener noreferrer' : undefined}
                  whileHover={{ x: 4 }}
                  className={`block p-6 border border-black bg-white transition-colors ${
                    item.href ? 'hover:bg-[#FF4500] hover:text-white cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <item.icon size={24} strokeWidth={2.5} className="mt-1" />
                    <div>
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">
                        {item.title}
                      </h3>
                      {item.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="font-mono text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}

              <div className="p-6 border border-black bg-black text-white">
                <h3 className="font-bold uppercase tracking-widest text-xs mb-4 opacity-60">
                  Emergency?
                </h3>
                <p className="font-mono text-sm mb-4">
                  24/7 emergency support for critical fire safety issues.
                </p>
                <a
                  href="tel:+254799347535"
                  className="block text-center py-3 bg-[#FF4500] font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors"
                >
                  Call Emergency Line
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="border border-black bg-white p-8">
                <h2 className="text-2xl font-black uppercase mb-6">Send us a Message</h2>

                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-20 h-20 mx-auto mb-4 text-[#22C55E]" />
                    <h3 className="text-2xl font-black uppercase mb-2">Message Sent!</h3>
                    <p className="font-mono text-sm opacity-70 mb-6">
                      Thank you for contacting us. We will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-3 border border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border font-mono text-sm focus:outline-none transition-colors ${
                            errors.name
                              ? 'border-red-500 bg-red-50'
                              : 'border-black focus:border-[#FF4500]'
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs font-mono mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border font-mono text-sm focus:outline-none transition-colors ${
                            errors.email
                              ? 'border-red-500 bg-red-50'
                              : 'border-black focus:border-[#FF4500]'
                          }`}
                          placeholder="email@company.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs font-mono mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border font-mono text-sm focus:outline-none transition-colors ${
                            errors.phone
                              ? 'border-red-500 bg-red-50'
                              : 'border-black focus:border-[#FF4500]'
                          }`}
                          placeholder="+254 XXX XXX XXX"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs font-mono mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-black font-mono text-sm focus:outline-none focus:border-[#FF4500] transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                        Service Type
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-black font-mono text-sm focus:outline-none focus:border-[#FF4500] transition-colors bg-white"
                      >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-widest mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border font-mono text-sm focus:outline-none transition-colors resize-none ${
                          errors.message
                            ? 'border-red-500 bg-red-50'
                            : 'border-black focus:border-[#FF4500]'
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs font-mono mt-1">{errors.message}</p>
                      )}
                    </div>

                    {submitStatus === 'error' && (
                      <div className="p-4 border border-red-500 bg-red-50 flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="font-mono text-sm text-red-600">
                          Something went wrong. Please try again.
                        </p>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FF4500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black uppercase mb-2">Visit Our Showroom</h3>
              <p className="font-mono text-sm opacity-70">
                See our products in person and get expert advice.
              </p>
            </div>
            <div className="h-64 bg-[#E5E5E5] border border-white/20 flex items-center justify-center">
              <span className="font-mono text-sm opacity-50">Map Loading...</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
