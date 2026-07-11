'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await api.submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError((err as Error).message || 'Failed to submit contact message. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactDetails = [
    { label: 'Address', val: '742 Evergreen Terrace, Beverly Hills, CA 90210', icon: MapPin },
    { label: 'Telephone', val: '+1 (310) 555-0199', icon: Phone },
    { label: 'Email Support', val: 'concierge@auradental.com', icon: Mail },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-20 right-10 w-[300px] h-[300px] bg-teal-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Concierge Services
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Contact <span className="font-extrabold text-gradient-primary">Us</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Request private clinical tours, verify insurance plans, or send questions regarding custom smile treatments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-900 space-y-6">
          <h2 className="text-lg font-bold text-slate-100">Send an Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                placeholder="e.g. Victoria Sterling"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                  placeholder="e.g. victoria@sterling.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                  placeholder="e.g. +1 (310) 555-0199"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Your Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                placeholder="How can our clinical directors assist your smile design?"
              />
            </div>

            {error && <p className="text-rose-400 text-[11px] font-medium animate-pulse">{error}</p>}
            
            {success && (
              <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-800/20 text-teal-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Message sent successfully! We will contact you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Send className="w-4 h-4" /> {submitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>

        {/* Location & Hours */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-slate-900 space-y-6">
            <h2 className="text-lg font-bold text-slate-100">Location Contacts</h2>
            <div className="space-y-4">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/20 border border-cyan-800/10 flex items-center justify-center shrink-0">
                    <detail.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">{detail.label}</span>
                    <span className="text-xs text-slate-300 font-medium leading-relaxed">{detail.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-900 space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" /> Operating Schedule
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Monday - Friday</span>
                <span className="text-slate-200 font-medium">09:00 AM - 06:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 border-t border-slate-900/60 pt-3">
                <span>Saturday</span>
                <span className="text-slate-200 font-medium">10:00 AM - 03:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 border-t border-slate-900/60 pt-3">
                <span>Sunday</span>
                <span className="text-rose-400 font-semibold uppercase">Emergencies Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
