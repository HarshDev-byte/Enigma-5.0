'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ThreeWorlds3DProps {
  scrollProgress: number;
}

export default function ThreeWorlds3D({ scrollProgress }: ThreeWorlds3DProps) {
  const healthGroup = useRef<THREE.Group | null>(null);
  const financeGroup = useRef<THREE.Group | null>(null);
  const earthGroup = useRef<THREE.Group | null>(null);

  const dnaRef = useRef<THREE.Group | null>(null);
  const financeCubeRef = useRef<THREE.Mesh | null>(null);
  const earthGlobeRef = useRef<THREE.Mesh | null>(null);

  // DNA double-helix geometry points
  const dnaPoints = useMemo(() => {
    const points: { x: number; y: number; z: number; isStrandA: boolean }[] = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 4;
      const y = (i - count / 2) * 0.45;
      const radius = 2.4;

      // Strand A
      points.push({
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        isStrandA: true,
      });

      // Strand B (opposite)
      points.push({
        x: Math.cos(angle + Math.PI) * radius,
        y,
        z: Math.sin(angle + Math.PI) * radius,
        isStrandA: false,
      });
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Health DNA rotation
    if (dnaRef.current) {
      dnaRef.current.rotation.y = t * 0.8;
    }

    // 2. Finance Quantum Data Cube rotation
    if (financeCubeRef.current) {
      financeCubeRef.current.rotation.x = t * 0.4;
      financeCubeRef.current.rotation.y = t * 0.6;
    }

    // 3. Earth Gaia Globe rotation
    if (earthGlobeRef.current) {
      earthGlobeRef.current.rotation.y = t * 0.3;
    }
  });

  // Active when camera enters the 3 domain portals (scroll 0.65 to 0.92)
  const isVisible = scrollProgress >= 0.65 && scrollProgress <= 0.95;
  if (!isVisible) return null;

  return (
    <group position={[0, -20, -180]}>
      {/* ========================================================= */}
      {/* 01. WORLD HEALTH // LEFT (Magenta/Pink/Violet)            */}
      {/* ========================================================= */}
      <group ref={healthGroup} position={[-28, 0, 0]}>
        {/* Holographic Platform */}
        <mesh position={[0, -8, 0]}>
          <cylinderGeometry args={[8, 9, 1, 32]} />
          <meshStandardMaterial color="#1a0818" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -7.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 7.5, 32]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Rotating DNA Double Helix */}
        <group ref={dnaRef} position={[0, 2, 0]}>
          {dnaPoints.map((p, idx) => (
            <mesh key={idx} position={[p.x, p.y, p.z]}>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshBasicMaterial color={p.isStrandA ? '#ec4899' : '#d946ef'} />
            </mesh>
          ))}
        </group>

        {/* Bio-Telemetry Holographic Rings */}
        <mesh position={[0, 2, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[5, 0.08, 16, 48]} />
          <meshBasicMaterial color="#ec4899" wireframe />
        </mesh>
        <pointLight color="#ec4899" intensity={4} distance={25} />
      </group>

      {/* ========================================================= */}
      {/* 02. WORLD FINANCE // CENTER (Cyan/Blue/Purple)            */}
      {/* ========================================================= */}
      <group ref={financeGroup} position={[0, 0, 0]}>
        {/* Holographic Dais */}
        <mesh position={[0, -8, 0]}>
          <cylinderGeometry args={[8, 9, 1, 32]} />
          <meshStandardMaterial color="#080e1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -7.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 7.5, 32]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Quantum Algorithmic Data Cube */}
        <mesh ref={financeCubeRef} position={[0, 2, 0]}>
          <boxGeometry args={[4.5, 4.5, 4.5]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            emissive="#8b5cf6"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Inner Solid Core */}
        <mesh position={[0, 2, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Network Node Satellite Rings */}
        <mesh position={[0, 2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[5.5, 0.06, 16, 48]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <pointLight color="#8b5cf6" intensity={4} distance={25} />
      </group>

      {/* ========================================================= */}
      {/* 03. WORLD SUSTAINABILITY // RIGHT (Green/Cyan/Emerald)    */}
      {/* ========================================================= */}
      <group ref={earthGroup} position={[28, 0, 0]}>
        {/* Holographic Dais */}
        <mesh position={[0, -8, 0]}>
          <cylinderGeometry args={[8, 9, 1, 32]} />
          <meshStandardMaterial color="#06180f" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -7.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 7.5, 32]} />
          <meshBasicMaterial color="#10ff88" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Holographic Gaia Biosphere Globe */}
        <mesh ref={earthGlobeRef} position={[0, 2, 0]}>
          <sphereGeometry args={[3.2, 24, 24]} />
          <meshStandardMaterial
            color="#10ff88"
            wireframe
            emissive="#10ff88"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Orbiting Clean-Energy Ring */}
        <mesh position={[0, 2, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[5.2, 0.1, 16, 48]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <pointLight color="#10ff88" intensity={4} distance={25} />
      </group>
    </group>
  );
}
