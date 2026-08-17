'use client';

import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Terminal } from 'lucide-react';
import { sound } from '@/lib/audio';

interface MatrixOverloadCanvasProps {
  isActive: boolean;
  onClose: () => void;
}

export default function MatrixOverloadCanvas({ isActive, onClose }: MatrixOverloadCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = '0123456789ABCDEFENIGMA5.0GENESIS2097ΨΩΞ<>{}[]/*+=-';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));

    let mouseX = -500;
    let mouseY = -500;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Translucent dark wash for phosphor trail
      ctx.fillStyle = 'rgba(4, 3, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Mouse repelling physics
        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#ff2a55';
        } else if (drops[i] % 3 === 0) {
          ctx.fillStyle = '#ff2a55';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff2a55';
        } else {
          ctx.fillStyle = '#94a3b8';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto select-none font-mono">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black/85 backdrop-blur-sm" />

      {/* Top Overlay Bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-[#060410]/95 border border-red-500/80 px-4 py-2 shadow-2xl hud-bracket">
        <div className="flex items-center gap-2 text-xs text-red-400 font-bold uppercase">
          <Terminal className="w-4 h-4 animate-pulse" />
          <span>QUANTUM MATRIX OVERDRIVE // ACTIVE</span>
        </div>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="p-1 text-slate-400 hover:text-white border border-transparent hover:border-slate-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
