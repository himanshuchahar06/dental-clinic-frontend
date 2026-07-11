'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface SmileGallery3DProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category: string;
}

export default function SmileGallery3D({
  beforeImage,
  afterImage,
  title,
  category,
}: SmileGallery3DProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Category Tag */}
      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 bg-teal-950/40 border border-teal-800/40 rounded-full mb-3">
        {category}
      </span>
      
      {/* Before/After Container */}
      <div
        ref={containerRef}
        className="w-full max-w-[550px] aspect-video relative rounded-2xl overflow-hidden glass-panel select-none cursor-ew-resize border border-slate-800"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Background) */}
        <img
          src={afterImage}
          alt="After Treatment"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute right-4 bottom-4 bg-slate-950/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium tracking-wide z-10 border border-white/5">
          AFTER
        </div>

        {/* BEFORE Image (Overlay - width controlled by slider) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Treatment"
            className="absolute inset-y-0 left-0 w-[550px] aspect-video max-w-none object-cover pointer-events-none filter grayscale opacity-90"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          />
          <div className="absolute left-4 bottom-4 bg-teal-950/70 backdrop-blur-md text-teal-300 text-xs px-2.5 py-1 rounded-md font-medium tracking-wide z-10 border border-teal-500/20">
            BEFORE
          </div>
        </div>

        {/* Vertical Split Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-cyan-400/80 shadow-[0_0_8px_#22d3ee] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Slider Handle (Glass circle in center of the split line) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-panel border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)] z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="flex gap-1 justify-between items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 text-center max-w-[450px] mt-1">
        Drag or hover your cursor across the gallery image to reveal the luxury smile makeover results.
      </p>
    </div>
  );
}
