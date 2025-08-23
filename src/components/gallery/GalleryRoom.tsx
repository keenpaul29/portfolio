"use client";

import React from "react";
import Frame from "./Frame";
import { projects } from "./projects";

export default function GalleryRoom() {
  // Simple room with 3 walls and a floor; positions for 4 frames
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0b1220" roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.4, -2]} receiveShadow>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4, 1.4, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[4, 1.4, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />

      {/* Frames */}
      <Frame id={projects[0].id} title={projects[0].title} image={projects[0].image} position={[0, 1.4, -1.95]} />
      <Frame id={projects[1].id} title={projects[1].title} image={projects[1].image} position={[-2.2, 1.2, -1.95]} />
      <Frame id={projects[2].id} title={projects[2].title} image={projects[2].image} position={[2.2, 1.2, -1.95]} />
      <Frame id={projects[3].id} title={projects[3].title} image={projects[3].image} position={[0, 1.4, -0.2]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}
