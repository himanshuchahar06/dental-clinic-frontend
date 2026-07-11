'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ShieldCheck, Mail, Lock } from 'lucide-react';
import api from '../../../utils/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in as admin, redirect directly to dashboard
    const role = localStorage.getItem('clinic_role');
    const token = localStorage.getItem('clinic_token');
    if (token && role === 'ADMIN') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    setError('');

    try {
      const data = await api.loginAdmin({ email, password });
      
      localStorage.setItem('clinic_token', data.token);
      localStorage.setItem('clinic_role', 'ADMIN');
      localStorage.setItem('clinic_user', JSON.stringify(data.user));

      // Dispatch event to update navbar state
      window.dispatchEvent(new Event('storage'));
      
      router.push('/admin/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Invalid administrator credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="ambient-glow top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-950/20" />

      <div className="w-full max-w-sm glass-panel p-8 rounded-3xl border border-slate-900 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/30 border border-cyan-800/20 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Staff Secure Portal</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Authorized Clinical Directors Only</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                placeholder="director@luxurydental.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-rose-400 text-[10px] font-semibold text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all hover:scale-[1.01] cursor-pointer"
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-slate-600 space-y-1">
          <p>IP Address logged for security audits.</p>
          <p>Default credentials: <span className="text-cyan-600">admin@luxurydental.com / adminpass2026</span></p>
        </div>
      </div>
    </div>
  );
}
