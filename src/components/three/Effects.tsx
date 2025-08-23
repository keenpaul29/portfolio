"use client";

import { EffectComposer, Bloom, SSAO, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

export default function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass>
      <SSAO
        intensity={15}
        radius={0.1}
        distanceThreshold={0.2}
        distanceFalloff={0.6}
        depthAwareUpsampling
        samples={8}
        rings={4}
      />
      <Bloom intensity={0.4} kernelSize={KernelSize.SMALL} luminanceThreshold={0.9} luminanceSmoothing={0.2} />
      <Vignette eskil={false} offset={0.2} darkness={0.3} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
