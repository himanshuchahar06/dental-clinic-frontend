'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, BadgeDollarSign, HeartPulse, ShieldAlert } from 'lucide-react';
import api from '../../utils/api';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data.services);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Preventive', 'Cosmetic', 'Surgical', 'Orthodontics'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* Background Blobs */}
      <div className="ambient-glow top-10 right-10 w-[300px] h-[300px] bg-cyan-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Aura Medical Catalog
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Clinical <span className="font-extrabold text-gradient-primary">Treatments</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Explore our range of biological therapies, computer-milled restorations, and microscopic surgical alignments performed by certified specialists.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
              activeCategory === cat
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/50 text-slate-400 border-slate-950 hover:text-white hover:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[280px] rounded-2xl bg-slate-900/40 border border-slate-950 animate-pulse" />
          ))}
        </div>
      ) : filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((svc, index) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-900 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Card Image Cover */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                {svc.image ? (
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950">
                    <HeartPulse className="w-12 h-12 text-slate-800" />
                  </div>
                )}
                {/* Category Tag overlay */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-white/5">
                  {svc.category}
                </span>
              </div>

              {/* Info content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                {/* Duration & Price Details */}
                <div className="flex justify-between items-center text-xs border-t border-slate-900 pt-4 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{svc.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BadgeDollarSign className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-semibold text-slate-200">From ${svc.price}</span>
                  </div>
                </div>

                {/* Scheduling CTA */}
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-cyan-500 text-slate-300 group-hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-slate-950 group-hover:border-cyan-400"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Slot
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-2">
          <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-xs">No services found for this category. Please check again later.</p>
        </div>
      )}
    </div>
  );
}
