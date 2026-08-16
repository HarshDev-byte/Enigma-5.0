'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericEffectsProps {
  scrollProgress: number;
}

export default function AtmosphericEffects({ scrollProgress }: AtmosphericEffectsProps) {
  const rainRef = useRef<THREE.Points | null>(null);
  const dustRef = useRef<THREE.Points | null>(null);

  // Rain particles in city
  const rainCount = 1200;
  const [rainPositions, rainVelocities] = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    const vel = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 160;
      pos[i * 3 + 1] = Math.random() * 120 - 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 160;
      vel[i] = 1.2 + Math.random() * 1.8;
    }
    return [pos, vel];
  }, [rainCount]);

  // Floating cyber dust
  const dustCount = 800;
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200;
      pos[i * 3 + 1] = Math.random() * 100 - 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return pos;
  }, [dustCount]);

  useFrame((_, delta) => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= rainVelocities[i] * 60 * delta;
        if (positions[i * 3 + 1] < -30) {
          positions[i * 3 + 1] = 90;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.02;
    }
  });

  const isCollapse = scrollProgress >= 0.45 && scrollProgress < 0.65;
  const fogColor = isCollapse ? '#150308' : '#030509';

  return (
    <group>
      {/* Dynamic atmospheric fog */}
      <fog attach="fog" args={[fogColor, 20, 160]} />

      {/* Cyber Rain */}
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[rainPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color={isCollapse ? '#ff2a55' : '#00f0ff'}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient Floating Dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color={scrollProgress > 0.65 ? '#10ff88' : '#00f0ff'}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
