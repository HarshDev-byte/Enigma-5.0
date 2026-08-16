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
  const searchlightsRef = useRef<THREE.Group | null>(null);
  const holoRingsRef = useRef<THREE.Group | null>(null);

  // Instanced skyscrapers matrix with Moodboard Cyber Violet, Cyan & Magenta accents
  const buildingCount = 95;
  const { buildingData, instancedMatrix, instancedColors } = useMemo(() => {
    const data: { x: number; z: number; width: number; height: number; depth: number; hasBeacon: boolean }[] = [];
    const matrix = new Float32Array(buildingCount * 16);
    const colors = new Float32Array(buildingCount * 3);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < buildingCount; i++) {
      const radius = 22 + Math.random() * 85;
      const angle = (i / buildingCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 45;
      const width = 4 + Math.random() * 9;
      const depth = 4 + Math.random() * 9;
      const height = 22 + Math.random() * 75;
      const hasBeacon = i % 14 === 0;

      data.push({ x, z, width, height, depth, hasBeacon });

      dummy.position.set(x, height / 2, z);
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      dummy.matrix.toArray(matrix, i * 16);

      // Color palette: deep obsidian slate with neon violet/cyan/magenta emissive highlights
      const rand = Math.random();
      if (rand < 0.4) {
        // Cyber Cyan
        colors[i * 3] = 0.02;
        colors[i * 3 + 1] = 0.15;
        colors[i * 3 + 2] = 0.28;
      } else if (rand < 0.7) {
        // Neon Magenta/Violet
        colors[i * 3] = 0.22;
        colors[i * 3 + 1] = 0.04;
        colors[i * 3 + 2] = 0.26;
      } else {
        // Deep Obsidian
        colors[i * 3] = 0.04;
        colors[i * 3 + 1] = 0.05;
        colors[i * 3 + 2] = 0.09;
      }
    }

    return { buildingData: data, instancedMatrix: matrix, instancedColors: colors };
  }, [buildingCount]);

  // Flying Vehicles Data (Traffic streams with light trails)
  const vehicleCount = 28;
  const vehicles = useMemo(() => {
    return Array.from({ length: vehicleCount }, (_, idx) => ({
      id: idx,
      radius: 28 + Math.random() * 60,
      altitude: 12 + Math.random() * 55,
      speed: 0.3 + Math.random() * 0.6 * (idx % 2 === 0 ? 1 : -1),
      offset: (idx / vehicleCount) * Math.PI * 2,
      isCyan: idx % 3 === 0,
      isAmber: idx % 3 === 1,
    }));
  }, [vehicleCount]);

  // Beacon Sky Lasers
  const beaconBuildings = useMemo(() => {
    return buildingData.filter((b) => b.hasBeacon);
  }, [buildingData]);

  // City animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 1. Flying traffic streams
    if (vehiclesRef.current) {
      vehiclesRef.current.children.forEach((v, idx) => {
        const d = vehicles[idx];
        const angle = t * d.speed + d.offset;
        v.position.x = Math.cos(angle) * d.radius;
        v.position.z = Math.sin(angle) * d.radius - 45;
        v.position.y = d.altitude + Math.sin(t * 2 + idx) * 1.2;
        v.rotation.y = -angle + (d.speed > 0 ? Math.PI / 2 : -Math.PI / 2);
      });
    }

    // 2. Rotating rooftop searchlight beams
    if (searchlightsRef.current) {
      searchlightsRef.current.children.forEach((s, idx) => {
        s.rotation.y = t * 0.6 + idx;
        s.rotation.x = Math.sin(t * 0.4 + idx) * 0.25;
      });
    }

    // 3. Floating hologram sign rings
    if (holoRingsRef.current) {
      holoRingsRef.current.children.forEach((r, idx) => {
        r.rotation.y = t * (0.3 + idx * 0.1);
        r.rotation.z = Math.sin(t * 0.5 + idx) * 0.15;
      });
    }
  });

  // Calculate city visibility fade as camera enters underground core
  const cityOpacity = scrollProgress < 0.45 ? 1.0 : Math.max(0, 1 - (scrollProgress - 0.45) * 4);
  if (cityOpacity <= 0.01) return null;

  return (
    <group ref={cityGroup} visible={cityOpacity > 0.01}>
      {/* 1. Wet Reflective Asphalt Ground with Neon Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -45]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#040308"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Cyberpunk Ground Hologram Wireframe Grid */}
      <gridHelper
        args={[280, 70, '#00f0ff', '#312856']}
        position={[0, 0.05, -45]}
      />

      {/* 2. Instanced High-Tech Skyscrapers */}
      <instancedMesh
        args={[undefined, undefined, buildingCount]}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          roughness={0.25}
          metalness={0.75}
          color="#080714"
        />
      </instancedMesh>

      {/* 3. Glowing Skyscraper Rooftop Beacons & Sky Lasers */}
      <group ref={searchlightsRef}>
        {beaconBuildings.map((b, idx) => (
          <group key={idx} position={[b.x, b.height, b.z]}>
            {/* Rooftop Emitter Node */}
            <mesh>
              <sphereGeometry args={[1.2, 16, 16]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#00f0ff' : '#d946ef'} />
            </mesh>
            {/* Vertical Sky Laser Column */}
            <mesh position={[0, 45, 0]}>
              <cylinderGeometry args={[0.3, 1.2, 90, 16, 1, true]} />
              <meshBasicMaterial
                color={idx % 2 === 0 ? '#00f0ff' : '#d946ef'}
                transparent
                opacity={0.45}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Local Pointlight */}
            <pointLight
              color={idx % 2 === 0 ? '#00f0ff' : '#d946ef'}
              intensity={4}
              distance={35}
            />
          </group>
        ))}
      </group>

      {/* 4. Giant Floating Hologram City Rings */}
      <group ref={holoRingsRef}>
        <mesh position={[0, 70, -45]} rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[38, 0.4, 16, 64]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
        <mesh position={[0, 85, -45]} rotation={[-Math.PI / 8, 0, 0]}>
          <torusGeometry args={[28, 0.35, 16, 48]} />
          <meshBasicMaterial
            color="#d946ef"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </group>

      {/* 5. Flying Photon Vehicles with Light Trails */}
      <group ref={vehiclesRef}>
        {vehicles.map((v) => {
          const mainColor = v.isCyan ? '#00f0ff' : v.isAmber ? '#fcee0a' : '#d946ef';
          return (
            <group key={v.id}>
              {/* Vehicle Body */}
              <mesh>
                <boxGeometry args={[1.2, 0.4, 3.2]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive={mainColor}
                  emissiveIntensity={2.5}
                />
              </mesh>
              {/* Front Headlight Glow */}
              <mesh position={[0, 0, -1.8]}>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* Rear Photon Thruster Trail */}
              <mesh position={[0, 0, 2.0]}>
                <coneGeometry args={[0.4, 2.5, 8]} />
                <meshBasicMaterial
                  color={mainColor}
                  transparent
                  opacity={0.75}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
