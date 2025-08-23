"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerformanceMonitor, ScrollControls } from "@react-three/drei";

export type ThreeStageProps = {
  children: React.ReactNode;
  dpr?: [number, number];
  camera?: { position?: [number, number, number]; fov?: number };
  withEnvironment?: boolean | Parameters<typeof Environment>[0];
  withScrollControls?: boolean;
  pages?: number;
  damping?: number;
  fog?: { color: string; near: number; far: number } | false;
};

export function ThreeStage({
  children,
  dpr = [0.8, 1.5],
  camera = { position: [1.8, 1.5, 3.2], fov: 50 },
  withEnvironment = true,
  withScrollControls = false,
  pages = 1,
  damping = 0.18,
  fog = { color: "#0a1020", near: 6, far: 18 },
}: ThreeStageProps) {
  const [canRender, setCanRender] = useState(true);

  // Respect reduced motion and page visibility
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCanRender(!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);

    const onVis = () => setCanRender(document.visibilityState === "visible" && !m.matches);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      m.removeEventListener?.("change", onChange);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const dprRange = useMemo(() => dpr, [dpr]);

  return (
    <div className="absolute inset-0">
      {canRender && (
        <Canvas
          dpr={dprRange}
          shadows
          camera={camera}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
       >
          <PerformanceMonitor onDecline={() => { /* r3f auto-tunes dpr */ }} />
          <Suspense fallback={null}>
            <color attach="background" args={["transparent"]} />
            {fog && <fog attach="fog" args={[fog.color, fog.near, fog.far]} />}
            {withEnvironment && (typeof withEnvironment === "boolean" ? <Environment preset="studio" /> : <Environment {...withEnvironment} />)}
            {withScrollControls ? (
              <ScrollControls pages={pages} damping={damping}>
                {children}
              </ScrollControls>
            ) : (
              <>{children}</>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export default ThreeStage;
