'use client';

import React, { useState, useEffect } from 'react';
import { Crosshair, Eye, Zap, Radio, Cpu, Compass } from 'lucide-react';
import { sound } from '@/lib/audio';

interface CyberLensOverlayProps {
  isActive: boolean;
  onToggle: () => void;
  scrollProgress: number;
}

export default function CyberLensOverlay({ isActive, onToggle, scrollProgress }: CyberLensOverlayProps) {
  const [coords, setCoords] = useState({ x: -500, y: -500 });
  const [pulseAngle, setPulseAngle] = useState(0);

  // Dynamic theme matching current scroll: Grey at top -> Red on scroll
  const isRedPhase = scrollProgress >= 0.15;
  const primaryColor = isRedPhase ? '#ff2a55' : '#ffffff';

  useEffect(() => {
    if (!isActive) return;

    const handlePointer = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCoords({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handlePointer, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    const rotInterval = setInterval(() => {
      setPulseAngle((prev) => (prev + 3) % 360);
    }, 30);

    return () => {
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('touchmove', handleTouch);
      clearInterval(rotInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden font-mono select-none">
      {/* 1. Global Scanline & CRT Lens Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(16,255,136,0.02)] to-transparent bg-[length:100%_4px] opacity-70 animate-pulse pointer-events-none" />

      {/* 2. Top-Left Active HUD Status Badge */}
      <div
        className="absolute top-16 sm:top-20 left-3 sm:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-[#060410]/95 backdrop-blur-md border text-[10px] sm:text-xs shadow-2xl transition-colors duration-500 hud-bracket"
        style={{ borderColor: primaryColor }}
      >
        <Eye className="w-3.5 h-3.5 animate-pulse" style={{ color: primaryColor }} />
        <span className="font-black uppercase tracking-wider" style={{ color: primaryColor }}>
          HOLO-VISION™ MATRIX ACTIVE
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300 hidden xs:inline">FPS: 60 // 2097.LENS</span>
      </div>

      {/* 3. Interactive Target Reticle Following Cursor / Touch */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${coords.x - 75}px, ${coords.y - 75}px, 0)`,
          opacity: coords.x > 0 ? 1 : 0,
        }}
      >
        {/* Outer Rotating Radar Ring */}
        <div
          className="w-[150px] h-[150px] rounded-full border border-dashed transition-colors duration-500 flex items-center justify-center relative"
          style={{
            borderColor: `${primaryColor}60`,
            transform: `rotate(${pulseAngle}deg)`,
          }}
        >
          {/* Top/Bottom Crosshair ticks */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-white" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-white" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 h-1 w-3 bg-white" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-1 w-3 bg-white" />
        </div>

        {/* Center Target Cross */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-4 h-4 rounded-full border border-white flex items-center justify-center shadow-lg"
            style={{ backgroundColor: `${primaryColor}40` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </div>

        {/* Live Floating Telemetry Data Tag */}
        <div
          className="absolute -top-8 left-20 px-2.5 py-1 bg-[#060410]/95 backdrop-blur-md border text-[9px] whitespace-nowrap shadow-2xl flex flex-col gap-0.5"
          style={{ borderColor: primaryColor }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: primaryColor }} />
            <span className="font-bold text-white uppercase">COORD SCAN</span>
          </div>
          <div className="text-slate-400">
            X: {coords.x}px | Y: {coords.y}px
          </div>
          <div className="text-[8px] font-bold" style={{ color: primaryColor }}>
            SIES GST // 19.043°N, 73.023°E
          </div>
        </div>
      </div>

      {/* 4. Four Futuristic Corner Reticles */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: primaryColor }} />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: primaryColor }} />
    </div>
  );
}
