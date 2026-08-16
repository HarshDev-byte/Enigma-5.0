'use client';

import React, { useRef, useState } from 'react';
import { sound } from '@/lib/audio';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export default function HoloCard({
  children,
  className = '',
  glowColor = 'rgba(0, 240, 255, 0.4)',
  onClick,
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative hud-bracket overflow-hidden group select-none ${className}`}
    >
      {/* Holographic Prismatic Foil Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 mix-blend-color-dodge"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, rgba(168,85,247,0.2) 30%, rgba(217,70,239,0.1) 60%, transparent 80%)`,
        }}
      />

      {/* Holographic Diagonal Light Scan Streak */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 48%, rgba(0,240,255,0.2) 50%, rgba(168,85,247,0.15) 52%, transparent 60%)`,
        }}
      />

      {children}
    </div>
  );
}
