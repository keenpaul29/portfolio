"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
        {/* Shader-like SVG noise/displacement overlay (no new deps) */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
            <defs>
              <filter id="awwipe" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="2" result="noise">
                  <animate attributeName="baseFrequency" from="0.018" to="0.28" dur="420ms" fill="freeze" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0">
                  <animate attributeName="scale" from="0" to="60" dur="420ms" fill="freeze" />
                </feDisplacementMap>
              </filter>
              <linearGradient id="awgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.85)" />
                <stop offset="100%" stopColor="rgba(20,184,166,0.85)" />
              </linearGradient>
            </defs>
            {/* Wipe grows by animating rect height via SMIL */}
            <rect x="0" y="100" width="100" height="100" fill="url(#awgrad)" filter="url(#awwipe)">
              <animate attributeName="y" from="100" to="0" dur="420ms" fill="freeze" />
            </rect>
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
