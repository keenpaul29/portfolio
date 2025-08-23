"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { PerformanceMonitor } from "@react-three/drei";

interface Props {
  children: React.ReactNode;
  camera?: { fov?: number; position?: [number, number, number] };
}

export default function SceneCanvas({ children, camera }: Props) {
  const dprRange = useMemo<[number, number]>(() => [0.8, 1.5], []);
  const [canRender, setCanRender] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const reduced = mq.matches;
      const visible = document.visibilityState === "visible";
      setCanRender(!reduced && visible);
    };
    update();
    const onChange = () => update();
    const onVisibility = () => update();
    mq.addEventListener?.("change", onChange);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener?.("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!canRender) return null;

  return (
    <Canvas
      dpr={dprRange}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 60, position: [0, 0, 4], ...camera }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      <PerformanceMonitor onDecline={() => {}} />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
