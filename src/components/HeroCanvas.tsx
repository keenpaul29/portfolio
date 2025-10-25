"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree, type RootState } from "@react-three/fiber";
import { Float, ContactShadows, MeshReflectorMaterial, Sparkles, CameraShake, Environment, MeshTransmissionMaterial, useGLTF, Bounds, Center } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { ThreeStage } from "./ThreeStage";

function GlassOrb() {
  const ref = useRef<Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        {/* Premium glassy/translucent look */}
        <MeshTransmissionMaterial
          thickness={0.65}
          roughness={0.05}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.02}
          anisotropy={0.05}
          distortion={0.12}
          distortionScale={0.15}
          temporalDistortion={0.08}
          attenuationColor="#9bd1ff"
          attenuationDistance={2}
          samples={10}
        />
      </mesh>
      {/* Accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.01, 16, 128]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#60a5fa" emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
      </mesh>
    </Float>
  );
}

function Orbiters() {
  const g = useRef<Group>(null!);
  useFrame((state: RootState) => {
    const t = state.clock.getElapsedTime();
    if (!g.current) return;
    g.current.children.forEach((m, i) => {
      const r = 1.8 + i * 0.35;
      const a = t * (0.5 + i * 0.1) + i;
      m.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 0.4, Math.sin(a) * r);
    });
  });
  return (
    <group ref={g}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} castShadow>
          <sphereGeometry args={[0.08 + i * 0.02, 16, 16]} />
          <meshStandardMaterial emissive={[0.4, 0.7 - i * 0.15, 1]} emissiveIntensity={1.2 - i * 0.2} color="#93c5fd" />
        </mesh>
      ))}
    </group>
  );
}

// Replace shards with a subtle halo of sparkles only (cleaner aesthetic)

function Scene({ hovered = false }: { hovered?: boolean }) {
  const group = useRef<Group>(null!);
  const { camera } = useThree();
  // Load Thinker model
  const thinker = useGLTF("/the_thinker_by_auguste_rodin.glb");
  // Subtle camera drift + parallax on group
  useFrame((state: RootState) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x; // -1..1
    const my = state.pointer.y; // -1..1
    // Target rotations driven by cursor, stronger on hover
    const pitchBase = my * 0.08 + Math.sin(t * 0.3) * 0.02;
    const yawStrength = hovered ? 0.55 : 0.28;
    const yawBase = mx * yawStrength + Math.cos(t * 0.2) * 0.02;
    // Smoothly lerp towards target to feel premium
    group.current.rotation.x += (pitchBase - group.current.rotation.x) * 0.08;
    group.current.rotation.y += (yawBase - group.current.rotation.y) * 0.08;
    group.current.position.y = Math.sin(t * 0.6) * 0.05;

    // Parallax camera drift (subtle) and hover zoom-out to reveal full model
    const s = 0; // 0..1, scroll disabled
    const baseZ = 3.2 - s * 0.8; // move camera closer on scroll
    const baseY = 1.5 + s * 0.4; // slight vertical travel
    const targetZ = hovered ? baseZ + 0.8 : baseZ; // zoom out a bit on hover
    const targetY = hovered ? baseY + 0.1 : baseY; // raise a touch on hover
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      {/* Environment reflections for the glass orb */}
      <Environment preset="studio" background={false} />
      {/* Key lights for cinematic look */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.0} castShadow />
      {/* Cool and warm kickers for marble sheen */}
      <pointLight position={[-5, 2, -3]} intensity={0.5} color="#7dd3fc" />
      <pointLight position={[2, -1, 4]} intensity={0.45} color="#a78bfa" />
      {/* Rim light */}
      <spotLight position={[0, 4, -4]} angle={0.5} penumbra={0.6} intensity={0.7} color="#cbd5e1" castShadow />

      {/* Gentle ambient so the model doesn't sink into darkness */}
      <ambientLight intensity={0.28} />
      <hemisphereLight color={"#bcd7ff"} groundColor={"#22324a"} intensity={0.35} />

      {/* Subtle sparkles for atmosphere */}
      <Sparkles count={70} scale={[6, 3, 6]} size={1.8} speed={0.35} opacity={0.5} color="#99c9ff" />

      {/* Subtle camera shake for life */}
      <CameraShake maxYaw={0.02} maxPitch={0.02} maxRoll={0.01} yawFrequency={0.25} pitchFrequency={0.2} rollFrequency={0.15} />

      {thinker?.scene ? (
        <group position={[0, -0.6, 0]}>
          {/* Auto-frame + center to ensure full visibility across breakpoints */}
          <Bounds fit observe margin={1.6}>
            <Center disableX disableZ>
              <primitive object={thinker.scene} castShadow receiveShadow />
            </Center>
          </Bounds>
        </group>
      ) : (
        <GlassOrb />
      )}
      <Orbiters />

      {/* Soft ground contact shadows for grounding */}
      <ContactShadows
        opacity={0.35}
        scale={10}
        blur={2.4}
        far={6}
        resolution={512}
        color="#0a0a0a"
      />

      {/* (Caustics removed due to type mismatch in current drei version) */}

      {/* Reflective floor for premium feel (lowered and lightened) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 60]}
          resolution={1024}
          mixBlur={1}
          mixStrength={5}
          roughness={0.6}
          depthScale={0.55}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.2}
          color="#254b7a"
          metalness={0.45}
        />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  const [canRender, setCanRender] = useState(true);
  const [hovered, setHovered] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pause when hero is offscreen
    if (!hostRef.current) return;
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setCanRender(entry.isIntersecting);
    }, { threshold: 0 });
    io.observe(hostRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {canRender && (
        <ThreeStage withScrollControls={false} damping={0.18} camera={{ position: [0.6, 1.6, 6.8], fov: 58 }}>
          <Scene hovered={hovered} />
        </ThreeStage>
      )}
    </div>
  );
}

// Preload Thinker model if available to speed up first paint
try { useGLTF.preload("/the_thinker_by_auguste_rodin.glb"); } catch {}
