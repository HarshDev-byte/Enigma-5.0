'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraRig from './CameraRig';
import AtmosphericEffects from './AtmosphericEffects';
import CyberCity from './CyberCity';
import GenesisCore3D from './GenesisCore3D';
import SystemCollapse3D from './SystemCollapse3D';
import ThreeWorlds3D from './ThreeWorlds3D';

interface SceneExperienceProps {
  scrollProgress: number;
}

// 3D Cursor Light Probe that illuminates geometry under the user's pointer
function CursorLightProbe() {
  const lightRef = useRef<THREE.PointLight | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    if (lightRef.current) {
      // Position light ahead of camera, mapped to mouse
      const vector = new THREE.Vector3(mouse.current.x * 20, mouse.current.y * 15, -20);
      vector.applyMatrix4(camera.matrixWorld);
      lightRef.current.position.lerp(vector, 0.1);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#a855f7"
      intensity={3.5}
      distance={45}
      decay={2}
    />
  );
}

// Deep Cyber Nebula Starfield
function CyberStarfield() {
  const starsRef = useRef<THREE.Points | null>(null);
  const count = 2500;

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#d946ef'),
      new THREE.Color('#10ff88'),
      new THREE.Color('#fcee0a'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 60;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.015;
      starsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SceneExperience({ scrollProgress }: SceneExperienceProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#040308]">
      <Canvas
        camera={{ position: [0, 32, 25], fov: 60, near: 0.1, far: 350 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Base Ambient Illumination */}
          <ambientLight intensity={0.5} color="#0c081e" />

          {/* Directional Cyberpunk Sky Lights */}
          <directionalLight
            position={[50, 80, 30]}
            intensity={1.8}
            color="#00f0ff"
          />
          <directionalLight
            position={[-50, 60, -40]}
            intensity={1.4}
            color="#d946ef"
          />
          <directionalLight
            position={[0, -40, -100]}
            intensity={1.0}
            color="#a855f7"
          />

          {/* Dynamic 3D Cursor Light Probe */}
          <CursorLightProbe />

          {/* 3D Deep Cyber Starfield Nebula */}
          <CyberStarfield />

          {/* Atmospheric Rain, Dust & Aurora Fog */}
          <AtmosphericEffects scrollProgress={scrollProgress} />

          {/* 3D Camera Choreography Rig */}
          <CameraRig scrollProgress={scrollProgress} />

          {/* World 01: 2097 Cyberpunk Megacity */}
          <CyberCity scrollProgress={scrollProgress} />

          {/* World 02: Genesis Core Chamber */}
          <GenesisCore3D scrollProgress={scrollProgress} />

          {/* World 03: Collapse & Anomaly Breach Debris */}
          <SystemCollapse3D scrollProgress={scrollProgress} />

          {/* World 04: Three 3D Domain Portals (Health, Finance, Sustainability) */}
          <ThreeWorlds3D scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
