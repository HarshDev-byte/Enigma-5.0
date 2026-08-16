'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GenesisCore3DProps {
  scrollProgress: number;
}

export default function GenesisCore3D({ scrollProgress }: GenesisCore3DProps) {
  const ring1 = useRef<THREE.Mesh | null>(null);
  const ring2 = useRef<THREE.Mesh | null>(null);
  const ring3 = useRef<THREE.Mesh | null>(null);
  const coreOrb = useRef<THREE.Mesh | null>(null);
  const energyBeam = useRef<THREE.Mesh | null>(null);
  const chamberGroup = useRef<THREE.Group | null>(null);

  const isRebuilt = scrollProgress >= 0.85;
  const isCollapse = scrollProgress >= 0.45 && scrollProgress < 0.65;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speedMultiplier = isRebuilt ? 2.5 : isCollapse ? 0.3 : 1.0;

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.4 * speedMultiplier;
      ring1.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.6 * speedMultiplier;
      ring2.current.rotation.y = Math.cos(t * 0.3) * 0.2;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.8 * speedMultiplier;
    }
    if (coreOrb.current) {
      const s = (isRebuilt ? 1.4 : 1.0) + Math.sin(t * 3) * 0.1;
      coreOrb.current.scale.set(s, s, s);
    }
    if (energyBeam.current) {
      energyBeam.current.rotation.y = t * 0.5;
    }
  });

  const coreColor = isCollapse ? '#ff2a55' : isRebuilt ? '#10ff88' : '#00f0ff';
  const beamOpacity = isRebuilt ? 0.85 : isCollapse ? 0.2 : 0.6;

  return (
    <group ref={chamberGroup} position={[0, -50, -120]}>
      {/* 1. Ancient Subterranean Stone/Metal Chamber Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[45, 64]} />
        <meshStandardMaterial color="#080c14" roughness={0.7} metalness={0.5} />
      </mesh>

      {/* 2. Stepped Circular Quantum Dais Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[22, 24, 2.5, 48]} />
        <meshStandardMaterial color="#0c1524" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 3. Glowing Floor Portal Aperture */}
      <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 18, 48]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Concentric Holographic Floating Rings */}
      <mesh ref={ring1} position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[14, 0.35, 16, 64]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={2.5}
        />
      </mesh>

      <mesh ref={ring2} position={[0, 12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.45, 16, 64]} />
        <meshStandardMaterial
          color={isRebuilt ? '#00f0ff' : '#ec4899'}
          emissive={isRebuilt ? '#00f0ff' : '#ec4899'}
          emissiveIntensity={2.0}
        />
      </mesh>

      <mesh ref={ring3} position={[0, 16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.3, 16, 48]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={3.0}
        />
      </mesh>

      {/* 5. Central Quantum Core Orb */}
      <mesh ref={coreOrb} position={[0, 12, 0]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight
        position={[0, 12, 0]}
        color={coreColor}
        intensity={isRebuilt ? 12 : 6}
        distance={60}
      />

      {/* 6. Vertical Volumetric Energy Column */}
      <mesh ref={energyBeam} position={[0, 35, 0]}>
        <cylinderGeometry args={[2.5, 4.5, 70, 32, 1, true]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={beamOpacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 7. Ancient Architectural Peripheral Pillars */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const px = Math.cos(angle) * 32;
        const pz = Math.sin(angle) * 32;

        return (
          <group key={i} position={[px, 20, pz]}>
            <mesh>
              <boxGeometry args={[4, 45, 4]} />
              <meshStandardMaterial color="#060910" roughness={0.8} />
            </mesh>
            {/* Holographic Pillar Glyph */}
            <mesh position={[0, 0, 2.1]}>
              <planeGeometry args={[2.5, 12]} />
              <meshBasicMaterial
                color={coreColor}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
