"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="rounded bg-black/60 px-3 py-2 text-xs text-white">Loading {progress.toFixed(0)}%</div>
    </Html>
  );
}
