'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericEffectsProps {
  scrollProgress: number;
}

export default function AtmosphericEffects({ scrollProgress }: AtmosphericEffectsProps) {
  const rainRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);

  // Cyber Rain Particles
  const rainCount = 1500;
  const [rainPositions, rainVelocities] = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    const vel = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 180;
      pos[i * 3 + 1] = Math.random() * 140 - 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 180;
      vel[i] = 1.4 + Math.random() * 2.2;
    }
    return [pos, vel];
  }, [rainCount]);

  // Swirling Cyberpunk Aurora Nebula Wave
  const nebulaCount = 1200;
  const [nebulaPositions, nebulaColors] = useMemo(() => {
    const pos = new Float32Array(nebulaCount * 3);
    const col = new Float32Array(nebulaCount * 3);

    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#d946ef'),
      new THREE.Color('#10ff88'),
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const u = (i / nebulaCount) * Math.PI * 6;
      const radius = 30 + Math.sin(u * 2) * 15 + Math.random() * 20;
      const x = Math.cos(u) * radius + (Math.random() - 0.5) * 15;
      const y = Math.sin(u * 3) * 20 + Math.random() * 25 + 10;
      const z = Math.sin(u) * radius - 40 + (Math.random() - 0.5) * 15;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [nebulaCount]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 1. Rain falling animation
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= rainVelocities[i] * 60 * delta;
        if (positions[i * 3 + 1] < -35) {
          positions[i * 3 + 1] = 100;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Aurora Nebula organic fluid wave
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = t * 0.05;
      const positions = nebulaRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nebulaCount; i++) {
        positions[i * 3 + 1] += Math.sin(t * 1.5 + i * 0.1) * 0.04;
      }
      nebulaRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const isCollapse = scrollProgress >= 0.45 && scrollProgress < 0.65;
  const isRebuilt = scrollProgress >= 0.85;
  const fogColor = isCollapse ? '#150308' : isRebuilt ? '#02080a' : '#040308';

  return (
    <group>
      {/* Dynamic atmospheric volumetric fog */}
      <fog attach="fog" args={[fogColor, 25, 180]} />

      {/* Cyber Rain Streaks */}
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[rainPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          color={isCollapse ? '#ff2a55' : '#00f0ff'}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Swirling Cyberpunk Aurora Nebula */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nebulaColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.65}
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
