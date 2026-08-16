'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
}

export default function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Defined camera path waypoints along the 2097 narrative journey
  const waypoints = [
    // 0%: Floating above Megacity
    { p: 0.0, pos: new THREE.Vector3(0, 32, 25), target: new THREE.Vector3(0, 15, -40) },
    // 18%: Descending between skyscrapers
    { p: 0.18, pos: new THREE.Vector3(0, 10, -10), target: new THREE.Vector3(0, 6, -60) },
    // 35%: Entering subterranean Genesis Chamber
    { p: 0.35, pos: new THREE.Vector3(0, -28, -75), target: new THREE.Vector3(0, -42, -120) },
    // 52%: System Collapse & Red Alert
    { p: 0.52, pos: new THREE.Vector3(0, -38, -92), target: new THREE.Vector3(0, -46, -120) },
    // 72%: Three Domains Portals (Health, Finance, Earth)
    { p: 0.72, pos: new THREE.Vector3(0, -12, -145), target: new THREE.Vector3(0, -18, -180) },
    // 90% - 100%: Genesis Rebuilt & Final Activation Core
    { p: 1.0, pos: new THREE.Vector3(0, -42, -98), target: new THREE.Vector3(0, -38, -120) },
  ];

  const currentPos = useRef(new THREE.Vector3(0, 32, 25));
  const currentTarget = useRef(new THREE.Vector3(0, 15, -40));

  useFrame((_, delta) => {
    // Interpolate waypoint index based on scrollProgress
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Find bounding waypoints
    let startWp = waypoints[0];
    let endWp = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (p >= waypoints[i].p && p <= waypoints[i + 1].p) {
        startWp = waypoints[i];
        endWp = waypoints[i + 1];
        break;
      }
    }

    const range = endWp.p - startWp.p;
    const factor = range > 0 ? (p - startWp.p) / range : 0;
    // Smooth easeInOut
    const ease = factor < 0.5 ? 2 * factor * factor : 1 - Math.pow(-2 * factor + 2, 2) / 2;

    const targetPos = new THREE.Vector3().lerpVectors(startWp.pos, endWp.pos, ease);
    const targetLook = new THREE.Vector3().lerpVectors(startWp.target, endWp.target, ease);

    // Mouse parallax contribution
    const parallaxX = mouse.current.x * 2.5;
    const parallaxY = mouse.current.y * 1.5;

    // Subtle glitch camera shake during collapse
    const isCollapse = p >= 0.45 && p <= 0.65;
    const shakeX = isCollapse ? (Math.random() - 0.5) * 0.4 : 0;
    const shakeY = isCollapse ? (Math.random() - 0.5) * 0.4 : 0;

    targetPos.x += parallaxX + shakeX;
    targetPos.y += parallaxY + shakeY;

    // Smooth lerp camera
    currentPos.current.lerp(targetPos, Math.min(1, delta * 4));
    currentTarget.current.lerp(targetLook, Math.min(1, delta * 5));

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
