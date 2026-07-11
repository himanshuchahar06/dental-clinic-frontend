'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Sparkles, Loader2 } from 'lucide-react';
import api from '../../../utils/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await api.getBlogBySlug(resolvedParams.slug);
        setBlog(data.blog);
      } catch (err) {
        console.error('Failed to load article detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-xl font-bold text-white">Article Not Found</h1>
        <p className="text-slate-400 text-xs">The requested column has been archived or does not exist.</p>
        <button
          onClick={() => router.push('/blog')}
          className="px-6 py-2 bg-slate-900 border border-slate-800 text-xs uppercase font-bold tracking-wider text-slate-300 rounded-full"
        >
          Return to Journal
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => router.push('/blog')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white uppercase font-bold tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-950/40 border border-cyan-800/20 text-cyan-400">
          {blog.category}
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
          {blog.title}
        </h1>
        <p className="text-slate-400 text-xs md:text-sm italic border-l-2 border-cyan-500 pl-4 py-1">
          {blog.summary}
        </p>

        {/* Metadata */}
        <div className="flex gap-6 items-center text-xs text-slate-500 pt-2">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-cyan-500" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-teal-500" />
            <span>Published {new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Image Banner */}
      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-xl">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="text-slate-300 text-sm leading-relaxed space-y-6 pt-4 font-normal">
        {blog.content.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-950 to-cyan-950/40 border border-slate-900 text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-cyan-950/20 border border-cyan-800/10 flex items-center justify-center mx-auto">
          <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
        </div>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Have questions regarding cosmetic veneers or laser alignments? Schedule a physical diagnostic scan with Dr. Mercer.
        </p>
        <Link
          href="/book"
          className="inline-flex px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
        >
          Book Consultation
        </Link>
      </div>
    </article>
  );
}
