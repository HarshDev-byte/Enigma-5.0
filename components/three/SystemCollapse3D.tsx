'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SystemCollapse3DProps {
  scrollProgress: number;
}

export default function SystemCollapse3D({ scrollProgress }: SystemCollapse3DProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const isVisible = scrollProgress >= 0.40 && scrollProgress <= 0.70;

  // Fragmented debris cubes
  const debrisCount = 45;
  const debris = useMemo(() => {
    return Array.from({ length: debrisCount }, () => ({
      pos: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50 - 30,
        (Math.random() - 0.5) * 80 - 100,
      ] as [number, number, number],
      rotSpeed: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 2.5,
    }));
  }, [debrisCount]);

  useFrame((_, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.children.forEach((child, idx) => {
        const d = debris[idx];
        if (d) {
          child.rotation.x += d.rotSpeed[0] * delta;
          child.rotation.y += d.rotSpeed[1] * delta;
          child.rotation.z += d.rotSpeed[2] * delta;
        }
      });
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef}>
      {/* Pulsing Warning Alarm Beacons */}
      <pointLight position={[0, -20, -100]} color="#ff0044" intensity={8} distance={70} />
      <pointLight position={[20, -30, -80]} color="#ff6600" intensity={5} distance={50} />
      <pointLight position={[-20, -30, -80]} color="#ff0044" intensity={5} distance={50} />

      {/* Floating Wireframe & Solid Debris */}
      {debris.map((d, i) => (
        <mesh key={i} position={d.pos} scale={d.scale}>
          <boxGeometry args={[1, 1, 1]} />
          {i % 2 === 0 ? (
            <meshBasicMaterial color="#ff2a55" wireframe />
          ) : (
            <meshStandardMaterial
              color="#3a0814"
              emissive="#ff1144"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          )}
        </mesh>
      ))}
    </group>
  );
}
