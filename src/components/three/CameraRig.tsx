"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScene } from "@/state/useScene";
import { Vector3 } from "three";
import { useRef } from "react";

const vPos = new Vector3();
const vLerp = new Vector3();
const vTarget = new Vector3();

export default function CameraRig() {
  const { camera, pointer } = useThree();
  const { cameraPosition, cameraTarget } = useScene();
  const damping = useRef(0.08); // lower = smoother

  useFrame(() => {
    // desired camera position with slight parallax from pointer
    vPos.set(...cameraPosition);
    const parallax = 0.25;
    vPos.x += pointer.x * parallax;
    vPos.y += pointer.y * parallax * 0.5;

    vLerp.copy(camera.position).lerp(vPos, damping.current);
    camera.position.copy(vLerp);

    vTarget.set(...cameraTarget);
    camera.lookAt(vTarget);
  });

  return null;
}
