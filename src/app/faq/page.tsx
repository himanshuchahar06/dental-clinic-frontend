'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: 'How long does a complete porcelain veneer smile makeover take?',
      a: 'Typically, it takes just 2 to 3 visits. During the first visit, we perform a 3D intraoral scan and design your custom mockups. On the second visit, we prepare the teeth and place temporary aesthetic veneers. By the third visit, we secure your final handcrafted porcelain veneers.',
    },
    {
      q: 'Are your micro-laser root canal procedures painful?',
      a: 'Not at all. We utilize Waterlase dental lasers and advanced computer-controlled anesthesia (The Wand) that delivers targeted numbing. Laser endodontics sterilizes the root canal microscopically, resulting in minimal post-treatment swelling and a completely painless process.',
    },
    {
      q: 'Do you accept international patients or offer translation services?',
      a: 'Yes, Aura Clinic frequently accommodates international patients seeking full mouth reconstruction. We coordinate airport pickups, secure luxury hotel bookings in Beverly Hills, and offer private translation support throughout your clinical stay.',
    },
    {
      q: 'What is your appointment cancellation or rescheduling policy?',
      a: 'We request that you reschedule or cancel appointments at least 24 hours in advance. Because we reserve dedicated surgical suits and doctor blocks for each luxury session, late cancellations may incur a standard reservation fee.',
    },
    {
      q: 'What financing programs are available for cosmetic smile packages?',
      a: 'We offer 0% APR interest financing for 6, 12, or 24 months through CareCredit and LendingClub. Patients can distribute payments in affordable monthly installments. We also work directly with all major PPO insurance companies.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-20 left-10 w-[300px] h-[300px] bg-cyan-950/20" />

      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3.5 h-3.5" /> Clinical FAQ
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Frequently Asked <span className="font-extrabold text-gradient-primary">Questions</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          Learn about our advanced micro-laser technologies, custom porcelain layering procedures, and patient payment plans.
        </p>
      </div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-slate-900 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center cursor-pointer hover:bg-slate-900/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 ${isOpen ? 'text-cyan-400' : 'text-slate-500'} shrink-0`} />
                  <span className="text-sm font-bold text-slate-100">{faq.q}</span>
                </div>
                <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-400 text-xs leading-relaxed border-t border-slate-900/60 mt-1">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
