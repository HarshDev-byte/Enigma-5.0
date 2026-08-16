'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberCityProps {
  scrollProgress: number;
}

export default function CyberCity({ scrollProgress }: CyberCityProps) {
  const cityGroup = useRef<THREE.Group | null>(null);
  const vehiclesRef = useRef<THREE.Group | null>(null);

  // Instanced skyscrapers matrix
  const buildingCount = 75;
  const { buildingData, instancedMatrix, instancedColors } = useMemo(() => {
    const data: { x: number; z: number; width: number; height: number; depth: number }[] = [];
    const matrix = new Float32Array(buildingCount * 16);
    const colors = new Float32Array(buildingCount * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < buildingCount; i++) {
      const radius = 25 + Math.random() * 80;
      const angle = (i / buildingCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 40;
      const width = 4 + Math.random() * 8;
      const depth = 4 + Math.random() * 8;
      const height = 20 + Math.random() * 65;

      data.push({ x, z, width, height, depth });

      dummy.position.set(x, height / 2, z);
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      dummy.matrix.toArray(matrix, i * 16);

      // Color scheme (deep charcoal with cyan/magenta neon edge tints)
      const isCyan = Math.random() > 0.4;
      colors[i * 3] = isCyan ? 0.03 : 0.12;
      colors[i * 3 + 1] = isCyan ? 0.12 : 0.03;
      colors[i * 3 + 2] = isCyan ? 0.2 : 0.18;
    }

    return { buildingData: data, instancedMatrix: matrix, instancedColors: colors };
  }, [buildingCount]);

  // Flying Vehicles Data
  const vehicleCount = 18;
  const vehicles = useMemo(() => {
    return Array.from({ length: vehicleCount }, (_, idx) => ({
      id: idx,
      radius: 30 + Math.random() * 50,
      altitude: 15 + Math.random() * 45,
      speed: 0.25 + Math.random() * 0.5,
      offset: (idx / vehicleCount) * Math.PI * 2,
      isMagenta: Math.random() > 0.5,
    }));
  }, [vehicleCount]);

  // City animation & opacity fade based on scroll
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (vehiclesRef.current) {
      vehiclesRef.current.children.forEach((v, idx) => {
        const d = vehicles[idx];
        const angle = t * d.speed + d.offset;
        v.position.x = Math.cos(angle) * d.radius;
        v.position.z = Math.sin(angle) * d.radius - 40;
        v.position.y = d.altitude + Math.sin(t * 1.5 + idx) * 1.5;
        v.rotation.y = -angle + Math.PI / 2;
      });
    }
  });

  // Calculate city visibility fade as camera goes into the underground core
  const cityOpacity = scrollProgress < 0.45 ? 1.0 : Math.max(0, 1 - (scrollProgress - 0.45) * 4);

  if (cityOpacity <= 0.01) return null;

  return (
    <group ref={cityGroup} visible={cityOpacity > 0.01}>
      {/* Wet Reflective Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -40]}>
        <planeGeometry args={[260, 260]} />
        <meshStandardMaterial
          color="#04060b"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Instanced Skyscrapers */}
      <instancedMesh
        args={[undefined, undefined, buildingCount]}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#070d18"
          roughness={0.4}
          metalness={0.6}
          emissive="#002233"
          emissiveIntensity={0.3}
        />
      </instancedMesh>

      {/* Neon Billboards & Holographic Sign Pillars */}
      {buildingData.slice(0, 12).map((b, i) => (
        <group key={i} position={[b.x, b.height * 0.7, b.z + b.depth / 2 + 0.1]}>
          <mesh>
            <planeGeometry args={[b.width * 0.7, 4]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00f0ff' : '#ec4899'}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight
            color={i % 2 === 0 ? '#00f0ff' : '#ec4899'}
            intensity={2.5}
            distance={15}
          />
        </group>
      ))}

      {/* Flying Vehicles with Light Trails */}
      <group ref={vehiclesRef}>
        {vehicles.map((v) => (
          <group key={v.id}>
            {/* Vehicle Hull */}
            <mesh>
              <boxGeometry args={[1.6, 0.4, 3.2]} />
              <meshStandardMaterial color="#0e1726" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Front Headlights */}
            <mesh position={[0, 0, 1.7]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Rear Thruster Trail */}
            <mesh position={[0, 0, -1.8]}>
              <boxGeometry args={[0.8, 0.2, 1.2]} />
              <meshBasicMaterial color={v.isMagenta ? '#ec4899' : '#00f0ff'} />
            </mesh>
            <pointLight
              color={v.isMagenta ? '#ec4899' : '#00f0ff'}
              intensity={2}
              distance={10}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
