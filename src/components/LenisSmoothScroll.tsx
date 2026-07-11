'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function LenisSmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP scroll triggers if GSAP is loaded globally (optional/safe check)
    // if (typeof window !== 'undefined') {
    //   window.scrollTo(0, 0);
    // }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
