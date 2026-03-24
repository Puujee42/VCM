"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function SmoothScroll() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Disable on mobile/tablet (simplest check)
    if (window.innerWidth < 1024) return;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Sync Lenis with Framer Motion's update loop to avoid double RAF
  useAnimationFrame(() => {
    if (lenisRef.current) {
      lenisRef.current.raf(performance.now());
    }
  });

  return null;
}
