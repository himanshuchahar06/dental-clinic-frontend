'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, BadgePercent, Landmark } from 'lucide-react';

export default function PricingPage() {
  const feesList = [
    { name: 'Prophylactic Hygiene Cleaning', price: '$150', category: 'Preventive', note: 'Standard dental cleaning & scaling' },
    { name: 'Laser Teeth Whitening', price: '$400', category: 'Cosmetic', note: 'Single session 45-minute treatment' },
    { name: 'Porcelain Veneers', price: '$1,200', category: 'Cosmetic', note: 'Per unit, handcrafted glass ceramic' },
    { name: 'Dental Implants', price: '$2,500', category: 'Surgical', note: 'Complete biometric post & custom crown' },
    { name: 'Micro-Laser Root Canal', price: '$850', category: 'Surgical', note: 'Painless microscopic nerve therapy' },
    { name: 'Invisalign Clear Aligners', price: '$4,500', category: 'Orthodontics', note: 'Full comprehensive correction track' },
  ];

  const packages = [
    {
      name: 'Aesthetic Smile Design',
      price: '$5,999',
      features: [
        '3D intraoral digital mapping session',
        'Digital preview and visual smile mockups',
        'Up to 6 premium hand-layered veneers',
        'Free home touch-up whitening kit',
        '2 post-placement maintenance sessions',
      ],
    },
    {
      name: 'Full Arch Restoration',
      price: '$12,500',
      features: [
        '3D Cone Beam CT structural bone analysis',
        'Biocompatible titanium implants (4 units)',
        'Temporary screw-retained bridges',
        'Computer-guided surgical placement',
        'Final zirconia prosthetic arches',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="ambient-glow top-1/4 right-5 w-[300px] h-[300px] bg-cyan-950/20" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/20">
          <Sparkles className="w-3 h-3" /> Financial Clarity
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Treatment <span className="font-extrabold text-gradient-primary">Investment</span>
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          Pristine results require pristine craftsmanship. We provide direct details of clinical fees, payment plans, and orthodontic insurance benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Fees list */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Catalog of Fees
          </h2>
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-900 division-y divide-slate-900">
            {feesList.map((fee, idx) => (
              <div key={idx} className="p-5 flex justify-between items-center hover:bg-slate-900/25 transition-colors border-b border-slate-900 last:border-0">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">{fee.category}</span>
                  <span className="text-sm font-bold text-slate-200">{fee.name}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{fee.note}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-cyan-400 block">{fee.price}</span>
                  <Link href="/book" className="text-[10px] text-slate-500 hover:text-white underline">Schedule</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financing Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-teal-400" /> Financing Plans
          </h2>
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-900 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-800/10 flex items-center justify-center shrink-0">
                <BadgePercent className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">0% APR Interest Financing</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  We partner with CareCredit and LendingClub to offer flexible 6, 12, or 24-month payment programs with zero interest.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-slate-900 pt-6">
              <div className="w-10 h-10 rounded-xl bg-teal-950/20 border border-teal-800/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Insurance Friendly</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  We accept all major PPO insurance plans (Delta Dental, Aetna, Cigna, MetLife) and file claim documents on your behalf.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all"
              >
                Inquire About Payment Plans
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic packages */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" /> Aesthetic Suite Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-slate-900 relative overflow-hidden group hover:border-cyan-500/20 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{pkg.name}</h3>
                  <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block mt-1">All-Inclusive Pack</span>
                </div>
                <span className="text-2xl font-extrabold text-white">{pkg.price}</span>
              </div>
              <ul className="space-y-3.5 mb-8">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
