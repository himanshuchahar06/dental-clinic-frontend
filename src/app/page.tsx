'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ShieldCheck, Heart, Award, Star, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import SmileGallery3D from '../components/SmileGallery3D';

export default function HomePage() {

  const stats = [
    { value: '18+', label: 'Years Expert Surgery', icon: Award },
    { value: '5.0', label: 'Patient Star Rating', icon: Star },
    { value: '12K+', label: 'Completed Smile Designs', icon: Heart },
    { value: '99.8%', label: 'Implant Success Rate', icon: ShieldCheck },
  ];

  const services = [
    {
      id: 'implants',
      name: 'Dental Implants',
      description: 'Bio-compatible root restorations providing permanent foundation for replacement crown.',
      price: '$2,500',
    },
    {
      id: 'veneers',
      name: 'Porcelain Veneers',
      description: 'Handcrafted ultra-thin glass shells bonded to teeth for Hollywood alignments.',
      price: '$1,200',
    },
    {
      id: 'invisalign',
      name: 'Invisalign Aligners',
      description: 'Clear, removable aligner sheets to straighten smiles comfortably without wire brackets.',
      price: '$4,500',
    },
    {
      id: 'whitening',
      name: 'Laser Whitening',
      description: 'Advanced clinical cold-light technology restoring up to 8 shades in a single hour.',
      price: '$400',
    },
  ];

  const technologies = [
    { title: 'Intraoral 3D Scanner', desc: 'Captures 6,000 frames/sec for dental impressions without molding putty.' },
    { title: 'CAD/CAM Ceramic Mill', desc: 'Milled porcelain veneers and dental crowns in-house in under 20 minutes.' },
    { title: 'Waterlase Dental Laser', desc: 'Performs micro-laser soft tissue contouring with virtually zero bleeding.' },
    { title: 'Cone Beam 3D CT', desc: 'Generates high-definition anatomical structures of jawbone thickness.' },
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Glow Blobs */}
      <div className="ambient-glow top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/5" />
      <div className="ambient-glow top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/5" />

      {/* --- HERO SECTION --- */}
      <section className="min-h-[85vh] max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/50">
            <Sparkles className="w-3.5 h-3.5" /> Luxury Private Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-none text-slate-900">
            Engineering <br />
            <span className="font-extrabold text-gradient-primary">Symmetrical</span> <br />
            Dental Masterpieces
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-lg leading-relaxed">
            Integrating Harvard-trained surgical expertise with CAD/CAM dental mills and interactive 3D mapping. We redefine luxury clinical aesthetics in Beverly Hills.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/book"
              className="px-6 py-3 font-semibold uppercase tracking-wider text-xs rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center gap-2 hover:shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:scale-[1.01] transition-all"
            >
              Schedule 3D Scan <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 font-semibold uppercase tracking-wider text-xs rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Explore Solutions
            </Link>
          </div>
        </motion.div>

        {/* Clinical Anatomy Picture Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="h-[450px] lg:h-[550px] w-full relative flex items-center justify-center rounded-3xl glass-panel overflow-hidden border border-slate-200 shadow-xl bg-white group/hero"
        >
          <img
            src="/images/clinical_anatomy.png"
            alt="Aura Clinical Anatomy and Dental Surgery Setting"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-105"
          />
          <div className="absolute bottom-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] text-slate-600 tracking-wider font-semibold">
            Interactive Smile & Diagnostic Center
          </div>
        </motion.div>
      </section>

      {/* --- STATISTICS --- */}
      <section className="bg-slate-50/60 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-1">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</span>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SMILE GALLERY TRANSFORMATION --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Interactive Smile Transformation</span>
          <h2 className="text-3xl md:text-5xl font-light text-slate-900">
            Witness Symmetrical <span className="font-extrabold text-gradient-teal">Aesthetics</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-lg mx-auto">
            Interact with our patient mapping logs. Drag the horizontal handle to compare pre-clinical dentitions with completed porcelain layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SmileGallery3D
            beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"
            afterImage="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600"
            title="Full Arch Porcelain Veneer Restoration"
            category="Aesthetic Veneers"
          />

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Bespoke Veneer Placement</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every porcelain veneer is handcrafted in our clinical laboratory to match the light-diffusion profile of biological enamel. We correct spacing, discoloration, and structural fractures in under 3 visits.
            </p>
            <div className="space-y-3">
              {[
                'Digitally aligned smile design curves',
                'Handcrafted feldspathic porcelain materials',
                'Minimal-prep microabrasion protecting base teeth',
                'Lifetime porcelain durability guarantees',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors"
              >
                View Full Smile Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES CARDS --- */}
      <section className="bg-slate-50/30 border-t border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Comprehensive Solutions</span>
              <h2 className="text-3xl md:text-5xl font-light text-slate-900">
                Pristine <span className="font-extrabold text-gradient-primary">Treatments</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 flex items-center gap-1.5 transition-colors"
            >
              Browse All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="glass-panel p-6 rounded-2xl border border-slate-200 relative group flex flex-col justify-between h-[230px] hover:border-blue-500/20 transition-all duration-300 bg-white"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold text-blue-600">{svc.price}</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{svc.description}</p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <Link href="/book" className="text-[10px] font-bold text-slate-500 hover:text-slate-950 uppercase tracking-wider">
                    Schedule Slot
                  </Link>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CLINICAL TECHNOLOGY USED --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Clinical Technology</span>
          <h2 className="text-3xl md:text-5xl font-light text-slate-900">
            State-of-the-Art <span className="font-extrabold text-gradient-teal">Equipment</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl flex items-start gap-4 hover:border-slate-300 transition-colors bg-white">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Zap className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">{tech.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- APPOINTMENT CALL TO ACTION --- */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-tr from-blue-50 to-slate-50 border border-blue-100 p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Ready to Design Your <span className="font-extrabold text-gradient-primary">Perfect Smile</span>?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-lg mx-auto">
            Book an intraoral 3D scan session today. Meet our Harvard reconstructive surgeons and preview your final aesthetic alignment.
          </p>
          <div className="pt-4">
            <Link
              href="/book"
              className="inline-flex px-8 py-3.5 font-bold uppercase tracking-wider text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 shadow-[0_4px_15px_rgba(37,99,235,0.2)]"
            >
              Book Consultation Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
