'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GenesisCore3DProps {
  scrollProgress: number;
}

export default function GenesisCore3D({ scrollProgress }: GenesisCore3DProps) {
  const ring1 = useRef<THREE.Mesh | null>(null);
  const ring2 = useRef<THREE.Mesh | null>(null);
  const ring3 = useRef<THREE.Mesh | null>(null);
  const ring4 = useRef<THREE.Mesh | null>(null);
  const coreOrb = useRef<THREE.Mesh | null>(null);
  const corePoly = useRef<THREE.Mesh | null>(null);
  const energyBeam = useRef<THREE.Mesh | null>(null);
  const plasmaParticlesRef = useRef<THREE.Points | null>(null);
  const chamberGroup = useRef<THREE.Group | null>(null);

  const isRebuilt = scrollProgress >= 0.85;
  const isCollapse = scrollProgress >= 0.45 && scrollProgress < 0.65;

  // Swirling Quantum Singularity Plasma Particles
  const particleCount = 450;
  const [particlePositions, particleSpeeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16 + 12;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      spd[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, spd];
  }, [particleCount]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speedMultiplier = isRebuilt ? 2.5 : isCollapse ? 0.3 : 1.0;

    if (ring1.current) {
      ring1.current.rotation.z = t * 0.45 * speedMultiplier;
      ring1.current.rotation.x = Math.sin(t * 0.25) * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.65 * speedMultiplier;
      ring2.current.rotation.y = Math.cos(t * 0.35) * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.85 * speedMultiplier;
      ring3.current.rotation.x = -Math.sin(t * 0.4) * 0.3;
    }
    if (ring4.current) {
      ring4.current.rotation.y = -t * 1.1 * speedMultiplier;
      ring4.current.rotation.z = Math.cos(t * 0.5) * 0.2;
    }
    if (coreOrb.current) {
      const s = (isRebuilt ? 1.4 : 1.0) + Math.sin(t * 4) * 0.12;
      coreOrb.current.scale.set(s, s, s);
    }
    if (corePoly.current) {
      corePoly.current.rotation.x = t * 0.8;
      corePoly.current.rotation.y = t * 1.2;
    }
    if (energyBeam.current) {
      energyBeam.current.rotation.y = t * 0.6;
    }

    // Orbiting plasma particles towards the singularity
    if (plasmaParticlesRef.current) {
      const positions = plasmaParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const currentRadius = Math.sqrt(positions[idx] ** 2 + positions[idx + 2] ** 2);
        let currentAngle = Math.atan2(positions[idx + 2], positions[idx]);

        currentAngle += 0.02 * particleSpeeds[i] * speedMultiplier;
        positions[idx] = Math.cos(currentAngle) * currentRadius;
        positions[idx + 2] = Math.sin(currentAngle) * currentRadius;
        positions[idx + 1] += Math.sin(t * 2 + i) * 0.03;
      }
      plasmaParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const coreColor = isCollapse ? '#ff2a55' : isRebuilt ? '#10ff88' : '#00f0ff';
  const secondaryColor = isRebuilt ? '#00f0ff' : '#d946ef';
  const beamOpacity = isRebuilt ? 0.9 : isCollapse ? 0.2 : 0.65;

  return (
    <group ref={chamberGroup} position={[0, -50, -120]}>
      {/* 1. Subterranean Obsidian Chamber Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[55, 64]} />
        <meshStandardMaterial color="#040308" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Cyberpunk Ground Hologram Rune Ring */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 48, 64]} />
        <meshBasicMaterial color="#312856" wireframe />
      </mesh>

      {/* 2. Stepped Circular Quantum Dais Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[24, 26, 2.5, 48]} />
        <meshStandardMaterial color="#080614" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* 3. Glowing Floor Portal Aperture */}
      <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 20, 48]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Concentric Sacred Cyber Rings (Dyson Gyroscope) */}
      <mesh ref={ring1} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[16, 0.35, 16, 64]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={3.0}
        />
      </mesh>

      <mesh ref={ring2} position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[12, 0.4, 16, 64]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={2.5}
        />
      </mesh>

      <mesh ref={ring3} position={[0, 14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.3, 16, 48]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={3.5}
        />
      </mesh>

      <mesh ref={ring4} position={[0, 18, 0]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[5, 0.25, 16, 36]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={3.0}
        />
      </mesh>

      {/* 5. Central Quantum Singularity Core */}
      <mesh ref={coreOrb} position={[0, 12, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Rotating Polyhedral Geometric Shield */}
      <mesh ref={corePoly} position={[0, 12, 0]}>
        <icosahedronGeometry args={[4.2, 1]} />
        <meshBasicMaterial
          color={coreColor}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      <pointLight
        position={[0, 12, 0]}
        color={coreColor}
        intensity={isRebuilt ? 16 : 8}
        distance={70}
      />

      {/* 6. Vertical Volumetric Energy Column */}
      <mesh ref={energyBeam} position={[0, 40, 0]}>
        <cylinderGeometry args={[2.5, 5.5, 80, 32, 1, true]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={beamOpacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 7. Swirling Quantum Plasma Particles */}
      <points ref={plasmaParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color={coreColor}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 8. Ancient Architectural Peripheral Monoliths */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const px = Math.cos(angle) * 36;
        const pz = Math.sin(angle) * 36;

        return (
          <group key={i} position={[px, 22, pz]}>
            <mesh>
              <boxGeometry args={[4, 50, 4]} />
              <meshStandardMaterial color="#080614" roughness={0.8} metalness={0.4} />
            </mesh>
            {/* Holographic Pillar Glyph Matrix */}
            <mesh position={[0, 0, 2.1]}>
              <planeGeometry args={[2.5, 16]} />
              <meshBasicMaterial
                color={coreColor}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
