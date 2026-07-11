'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';
import SmileGallery3D from '../../components/SmileGallery3D';

interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  category: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await api.getGallery();
        setItems(data.items);
      } catch (error) {
        console.error('Failed to load gallery items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-10 left-10 w-[300px] h-[300px] bg-cyan-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Smile Makeovers
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Smile <span className="font-extrabold text-gradient-primary">Gallery</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Hover or slide across each canvas below to view the structural symmetry and cosmetic shade enhancements designed at Aura.
        </p>
      </div>

      {/* Gallery List */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[1, 2].map((n) => (
            <div key={n} className="aspect-video rounded-3xl bg-slate-900/40 border border-slate-950 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {items.map((item, index) => (
            <div key={item.id} className="space-y-4">
              <SmileGallery3D
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                title={item.description}
                category={item.category}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-2 text-slate-500">
          <ImageIcon className="w-8 h-8 text-slate-700 mx-auto" />
          <p className="text-xs">No gallery makeovers added yet.</p>
        </div>
      )}
    </div>
  );
}
