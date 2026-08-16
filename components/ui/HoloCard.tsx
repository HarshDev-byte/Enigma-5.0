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

  const handlePointerCoord = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.75,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerCoord(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    sound.playHover();
    if (e.touches.length > 0) {
      handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setRotX(0);
      setRotY(0);
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }, 400);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative hud-bracket overflow-hidden group select-none ${className}`}
    >
      {/* Holographic Prismatic Foil Sheen (Active on Desktop & Mobile Touch) */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 mix-blend-color-dodge"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, rgba(168,85,247,0.3) 30%, rgba(217,70,239,0.2) 60%, transparent 80%)`,
        }}
      />

      {/* Holographic Diagonal Light Scan Streak */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 48%, rgba(0,240,255,0.25) 50%, rgba(168,85,247,0.2) 52%, transparent 60%)`,
        }}
      />

      {children}
    </div>
  );
}
