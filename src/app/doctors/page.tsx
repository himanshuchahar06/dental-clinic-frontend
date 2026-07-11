'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Star, GraduationCap, Clock } from 'lucide-react';
import api from '../../utils/api';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  bio: string;
  experience: number;
  rating: number;
  availability: Record<string, string[]>;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await api.getDoctors();
        setDoctors(data.doctors);
      } catch (error) {
        console.error('Failed to load doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-1/4 left-10 w-[300px] h-[300px] bg-teal-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Aura Medical Faculty
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Meet Our <span className="font-extrabold text-gradient-primary">Specialists</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Our practitioners hold doctoral degrees from Ivy League institutions and maintain certifications in aesthetic porcelain and complex implant restorations.
        </p>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[350px] rounded-3xl bg-slate-900/40 border border-slate-950 animate-pulse" />
          ))}
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-900 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Profile Image Cover */}
              <div className="h-64 w-full relative overflow-hidden bg-slate-950">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Rating overlay */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/5 flex items-center gap-1 text-[10px] font-bold text-slate-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doc.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">
                    {doc.specialization}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>
                </div>

                {/* Credentials & Details */}
                <div className="space-y-2.5 pt-4 border-t border-slate-900/60">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>{doc.experience}+ Years Clinical Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span>Available Mon - Fri</span>
                  </div>
                </div>

                {/* Scheduling Button */}
                <div className="pt-2">
                  <Link
                    href={{ pathname: '/book', query: { doctorId: doc.id } }}
                    className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-teal-500 text-slate-300 group-hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-slate-950 group-hover:border-cyan-400"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-xs">No doctors configured. Please seed the database.</p>
        </div>
      )}
    </div>
  );
}
