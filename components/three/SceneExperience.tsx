'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import AtmosphericEffects from './AtmosphericEffects';
import CyberCity from './CyberCity';
import GenesisCore3D from './GenesisCore3D';
import SystemCollapse3D from './SystemCollapse3D';
import ThreeWorlds3D from './ThreeWorlds3D';

interface SceneExperienceProps {
  scrollProgress: number;
}

export default function SceneExperience({ scrollProgress }: SceneExperienceProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030509]">
      <Canvas
        camera={{ position: [0, 32, 25], fov: 60, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Base Ambient Illumination */}
          <ambientLight intensity={0.6} />

          {/* Directional Cyberpunk Sky Light */}
          <directionalLight
            position={[40, 60, 20]}
            intensity={1.2}
            color="#00f0ff"
          />
          <directionalLight
            position={[-40, 40, -30]}
            intensity={0.8}
            color="#ec4899"
          />

          {/* Atmospheric Rain, Dust & Fog */}
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
