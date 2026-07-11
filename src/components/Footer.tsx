'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sparkles, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200/80 pt-20 pb-8 overflow-hidden z-10">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Aura Intro */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center border border-blue-400">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest text-slate-900 uppercase block">
                AURA
              </span>
              <span className="text-[8px] font-semibold text-blue-600 tracking-wider uppercase block">
                Dental Clinic
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrating cutting-edge 3D diagnostic technologies and customized cosmetic art to deliver state-of-the-art dental care in a luxury private setting.
          </p>
          <div className="pt-2 text-slate-500 text-[10px] space-y-1">
            <p>Member of US Aesthetic Dental Academy</p>
            <p>Certified ISO 9001:2026 Hospital</p>
          </div>
        </div>

        {/* Treatment Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-5">Treatments</h4>
          <ul className="space-y-3 text-xs text-slate-600">
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Dental Implants</Link></li>
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Porcelain Veneers</Link></li>
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Invisalign Aligners</Link></li>
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Laser Whitening</Link></li>
            <li><Link href="/services" className="hover:text-blue-600 transition-colors">Smile Makeovers</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-5">Quick Links</h4>
          <ul className="space-y-3 text-xs text-slate-600">
            <li><Link href="/doctors" className="hover:text-blue-600 transition-colors">Meet Doctors</Link></li>
            <li><Link href="/gallery" className="hover:text-blue-600 transition-colors">Smile Gallery</Link></li>
            <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Treatment Fees</Link></li>
            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Dental Journal</Link></li>
            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Contact & Journal</h4>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>742 Evergreen Terrace, Beverly Hills, CA 90210</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>+1 (310) 555-0199</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>appointments@auradental.com</span>
            </div>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              placeholder="Join Aura Dental Journal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 pr-10"
            />
            <button
              type="submit"
              className="absolute right-1.5 w-7 h-7 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-blue-600 animate-pulse font-medium">Thank you for joining our exclusive newsletter.</p>
          )}
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-200/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
        <p>© 2026 Aura Luxury Private Clinics. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
