"use client";

import React, { useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Color } from "three";
import { useCursor } from "@react-three/drei";
import { useScene } from "@/state/useScene";

interface Props {
  id: string;
  image: string;
  onOpen?: (id: string) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Frame({ id, image, onOpen, ...props }: Props) {
  const map = useLoader(TextureLoader, image);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const { focusOn } = useScene();

  const frameColor = useMemo(() => new Color(hovered ? "#93c5fd" : "#334155"), [hovered]);

  return (
    <group {...props}>
      {/* Frame border */}
      <mesh position={[0, 0, 0.02]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          const px = props.position?.[0] ?? 0;
          const py = props.position?.[1] ?? 1.2;
          focusOn([px, py, 1.2], [0, py, 0], id);
          onOpen?.(id);
        }}>
        <boxGeometry args={[1.2, 0.9, 0.05]} />
        <meshStandardMaterial color={frameColor} metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Image plane */}
      <mesh position={[0, 0, 0.05]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <planeGeometry args={[1.05, 0.75]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {/* Caption */}
      {/* Could add <Text> from drei later */}
    </group>
  );
}
