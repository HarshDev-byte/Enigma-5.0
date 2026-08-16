'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FastForward, ShieldAlert, Cpu, Terminal, Radio, Lock, Zap } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [decryptedTitle, setDecryptedTitle] = useState('01010101 0.0');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [isWarping, setIsWarping] = useState(false);

  // Decryption effect for title
  useEffect(() => {
    const targetTitle = 'ENIGMA 5.0';
    const glyphs = '01#@$%&*<>[]{}░▒▓█ΞΨΩ';
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const current = targetTitle
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (frame > index * 3) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      setDecryptedTitle(current);
      if (frame > targetTitle.length * 3 + 10) {
        clearInterval(interval);
        setDecryptedTitle(targetTitle);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // System Boot Logs Feed
  useEffect(() => {
    const logs = [
      '>> INITIALIZING ARCHITECT QUANTUM INTERFACE [0x2097]...',
      '>> ESTABLISHING SECURE TLS-GENESIS UPLINK TO NODE_07...',
      '>> CHECKING SYSTEM PARITY: HEALTHCARE (63%) // FINTECH (41%) // GAIA (19%)...',
      '>> QUANTUM ARCHITECT CLEARANCE IDENTIFIED: ARCHITECT LEVEL 0...',
      '>> UNSEALING 3D CYBER MEGACITY GRAPHICS ENGINE...',
      '>> 2097 GENESIS PROTOCOL READY FOR RECONSTRUCTION.',
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setLogLines((prev) => [...prev.slice(-4), log]);
      }, (index + 1) * 450);
    });
  }, []);

  // Interactive High-Speed Warp Canvas Background
  useEffect(() => {
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

    // Particle Warp Starfield
    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      color: Math.random() > 0.3 ? '#00f0ff' : '#ec4899',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 4, 8, 0.35)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= 6; // Warp speed
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.8, (1 - star.z / width) * 3);
          const alpha = (1 - star.z / width) * 0.9;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Subtle Grid Horizon Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Progress Counter & Auto-Launch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', keyListener);

    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds punchy and cinematic

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setIsWarping(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 25);

    return () => {
      window.removeEventListener('keydown', keyListener);
      clearInterval(interval);
    };
  }, [onComplete]);

  const skipBoot = () => {
    setIsWarping(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      role="region"
      aria-label="System Diagnostic Quantum Boot Experience"
      className={`fixed inset-0 z-50 bg-[#020408] flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono text-slate-200 select-none scanlines transition-all duration-500 overflow-hidden ${
        isWarping ? 'opacity-0 scale-110 blur-md pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Real-time Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cyber Corner Reticles */}
      <div className="absolute top-4 left-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none">
        ┌─ [SYS_2097.BOOT] ────────
      </div>
      <div className="absolute top-4 right-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none text-right">
        ──────── [NODE_07.ACTIVE] ─┐
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none">
        └─ [SEC_LEVEL_0] ──────────
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none text-right">
        ──────── [GATEWAY.ONLINE] ─┘
      </div>

      {/* Top Aerospace Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-b border-[#162436]/90 pb-4 gap-4 bg-[#03060c]/60 backdrop-blur-md px-4 py-2 border-t border-x hud-bracket">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="text-xs tracking-widest text-cyan-300 font-black flex items-center gap-2">
            <span>ENIGMA 5.0 // GENESIS SYSTEM BOOT</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 text-[11px] font-bold">ALL CHANNELS ONLINE</span>
          </div>
        </div>

        <button
          onClick={skipBoot}
          className="group text-xs text-slate-300 hover:text-cyan-300 border border-[#162436] hover:border-cyan-400 px-4 py-1.5 bg-[#070c14] tracking-widest transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2"
        >
          <span>[ ESC / SKIP ]</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-cyan-400" />
        </button>
      </div>

      {/* Central Holographic Gyroscope & Quantum Alignment Matrix */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
        {/* Holographic Radar Gyroscope */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Hex Decoders & Dual Rotating Rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_16s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-pink-500 border-l-transparent animate-[spin_7s_linear_infinite_reverse] shadow-[0_0_20px_rgba(0,240,255,0.3)]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-emerald-400/40 animate-[spin_22s_linear_infinite]" />
          <div className="absolute inset-10 rounded-full border border-pink-500/20 animate-pulse" />

          {/* Crosshair Center Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-cyan-500/20" />
            <div className="h-full w-px bg-cyan-500/20 absolute" />
          </div>

          {/* Central Live Digit Progress & Pulse */}
          <div className="relative flex flex-col items-center justify-center z-10 bg-[#03060c]/80 backdrop-blur-md rounded-full w-32 h-32 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.7)]">
              {progress}%
            </span>
            <span className="text-[9px] sm:text-[10px] text-cyan-400 tracking-widest font-black uppercase mt-1 animate-pulse">
              CALIBRATING
            </span>
          </div>
        </div>

        {/* Monumental Decrypting Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#070c14]/90 px-4 py-1.5 border border-cyan-500/50 uppercase tracking-[0.3em] shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>GENESIS PROTOCOL // 2097.RECONSTRUCTION</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-mono font-black tracking-tight text-white uppercase drop-shadow-[0_0_40px_rgba(0,240,255,0.5)]">
            {decryptedTitle}
          </h1>

          <div className="font-mono text-xs sm:text-sm text-slate-300 tracking-[0.3em] uppercase flex items-center justify-center gap-3">
            <span className="text-pink-400 font-bold">HEALTHCARE</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-bold">FINTECH</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-bold">SUSTAINABILITY</span>
          </div>
        </div>

        {/* Live Cyber Diagnostic Console */}
        <div className="w-full max-w-2xl bg-[#03060c]/90 border border-[#162436] p-4 font-mono text-left space-y-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-[#162436] pb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-3 h-3" />
              <span>DIAGNOSTIC LOG STREAM</span>
            </span>
            <span className="text-emerald-400">BUFFER_SYNC: ACTIVE</span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 min-h-[70px]">
            {logLines.map((line, idx) => (
              <div key={idx} className="truncate text-slate-300">
                <span className="text-cyan-400 font-bold mr-2">&gt;</span>
                {line}
              </div>
            ))}
          </div>

          {/* High-Resolution Multi-Gradient Progress Track */}
          <div className="w-full h-2 bg-[#070c14] border border-[#162436] p-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(0,240,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Technical Telemetry Footer */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-t border-[#162436]/90 pt-3 text-[10px] sm:text-[11px] text-slate-400 font-mono gap-2 bg-[#03060c]/60 backdrop-blur-md px-4 py-2 border-b border-x hud-bracket">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">QUANTUM CORE: 4.8 THz</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">LATENCY: 0.04ms</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">FRAME: SYNC_60FPS</span>
        </div>
        <div className="text-slate-400">
          ORGANIZED BY CSI-SIESGST // ARCHITECT COUNCIL
        </div>
      </div>
    </div>
  );
}
