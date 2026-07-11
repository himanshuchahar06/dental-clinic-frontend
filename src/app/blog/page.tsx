'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, BookOpen, User } from 'lucide-react';
import api from '../../utils/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.getBlogs();
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Failed to load journal articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-10 right-10 w-[300px] h-[300px] bg-cyan-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Aura Medical Faculty
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Dental <span className="font-extrabold text-gradient-primary">Journal</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Expert columns and medical summaries reviewing computer-guided surgeries, porcelain alignments, and physiological dental science.
        </p>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div key={n} className="h-[280px] rounded-3xl bg-slate-900/40 border border-slate-950 animate-pulse" />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-900 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="h-56 w-full relative overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-950/85 backdrop-blur-md text-teal-400 border border-white/5">
                  {post.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900 pt-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-500" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-cyan-500 text-slate-300 group-hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-slate-950 group-hover:border-cyan-400"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read Article
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p className="text-xs">No articles published in the dental journal yet.</p>
        </div>
      )}
    </div>
  );
}
