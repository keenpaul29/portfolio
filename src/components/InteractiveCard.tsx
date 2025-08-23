"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

type MotionDivProps = React.ComponentProps<typeof motion.div>;

interface InteractiveCardProps extends MotionDivProps {
  children: React.ReactNode;
  intensity?: number; // tilt intensity
  glare?: boolean;
}

/**
 * InteractiveCard: lightweight 3D tilt + glare microinteraction without new deps.
 * - Uses CSS variables to drive transform and a radial glare spot.
 * - Safe for SSR; does nothing on touch or reduced-motion.
 */
export default function InteractiveCard({
  children,
  className = "",
  intensity = 10,
  glare = true,
  ...rest
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1..1
    const py = (y / rect.height) * 2 - 1;

    el.style.setProperty("--rx", `${(-py * intensity).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * intensity).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${x.toFixed(1)}px`);
    el.style.setProperty("--my", `${y.toFixed(1)}px`);
  };

  const onLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative will-change-transform [transform-style:preserve-3d] transition-transform duration-200 ${className}`}
      style={{
        transform: `rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(0)`,
      }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(120px 120px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.15), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </motion.div>
  );
}
