'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FastForward, ShieldAlert, Cpu, Terminal, Radio, Lock, Zap, Sparkles } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [decryptedTitle, setDecryptedTitle] = useState('01010101 0.0');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [isWarping, setIsWarping] = useState(false);
  const [statusSubtitle, setStatusSubtitle] = useState('ESTABLISHING 2097 QUANTUM UPLINK...');

  // Reset scroll to top on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

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
          if (frame > index * 3 + 4) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      setDecryptedTitle(current);
      if (frame > targetTitle.length * 3 + 14) {
        clearInterval(interval);
        setDecryptedTitle(targetTitle);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // System Boot Logs Feed & Stages (Calibrated for 3.8s total duration)
  useEffect(() => {
    const logs = [
      { time: 300, text: '>> INITIALIZING ARCHITECT QUANTUM INTERFACE [0x2097]...', sub: 'UPLINK ESTABLISHED // SYNCING SATELLITE ARRAY...' },
      { time: 900, text: '>> CALIBRATING VECTOR 01: HEALTHCARE DIAGNOSTIC MATRIX [63% PARITY]...', sub: 'CALIBRATING HEALTHCARE & BIO-SYNTHETIC SYSTEMS...' },
      { time: 1600, text: '>> CALIBRATING VECTOR 02: AUTONOMOUS FINTECH PROTOCOLS [41% PARITY]...', sub: 'SCANNING INTERCONNECTED ECONOMIC PARADIGMS...' },
      { time: 2300, text: '>> CALIBRATING VECTOR 03: GAIA SUSTAINABILITY ENGINE [19% CRITICAL]...', sub: 'SYSTEMIC COLLAPSE DETECTED // GENESIS OVERRIDE REQUIRED...' },
      { time: 3000, text: '>> DECRYPTING GENESIS PROTOCOL // ARCHITECT LEVEL 0 CLEARANCE GRANTED...', sub: 'UNSEALING 3D CYBER MEGACITY NEURAL ENGINE...' },
      { time: 3600, text: '>> ALL SYSTEMS GO. LAUNCHING 2097 GENESIS EXPERIENCE.', sub: 'WARPING INTO 2097 ARCHITECT SPACE...' },
    ];

    const timers = logs.map((item) =>
      setTimeout(() => {
        setLogLines((prev) => [...prev.slice(-3), item.text]);
        setStatusSubtitle(item.sub);
      }, item.time)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Interactive Particle Warp Canvas Background
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
    const numStars = 140;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      color: Math.random() > 0.4 ? '#00f0ff' : Math.random() > 0.5 ? '#ec4899' : '#10ff88',
    }));

    let warpSpeed = 3.5;

    const render = () => {
      ctx.fillStyle = 'rgba(2, 4, 8, 0.3)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= warpSpeed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
        }

        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.6, (1 - star.z / width) * 3.5);
          const alpha = Math.min(1, Math.max(0.1, (1 - star.z / width) * 1.2));
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Perspective HUD horizon grids
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 70;
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

  // Progress Counter (3.8 seconds realistic easing)
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', keyListener);

    const startTime = Date.now();
    const duration = 3800; // 3.8s rich duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setIsWarping(true);
        setTimeout(() => {
          onComplete();
        }, 450);
      }
    }, 28);

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
      aria-label="System diagnostic quantum boot experience"
      className={`fixed inset-0 z-50 bg-[#020408] flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono text-slate-200 select-none scanlines transition-all duration-500 overflow-hidden ${
        isWarping ? 'opacity-0 scale-110 blur-sm pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Real-time Warp Space Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cyber Corner Reticles */}
      <div className="absolute top-4 left-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none hidden sm:block">
        ┌─ [SYS_2097.QUANTUM_BOOT] ──────────────────────────
      </div>
      <div className="absolute top-4 right-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none text-right hidden sm:block">
        ────────────────────────── [NODE_07.TELEMETRY] ─┐
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none hidden sm:block">
        └─ [CLEARANCE: LEVEL_0] ─────────────────────────────
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] text-cyan-500/60 font-mono pointer-events-none text-right hidden sm:block">
        ───────────────────────────── [PORTAL_ONLINE] ─┘
      </div>

      {/* Dynamic Ambient Glow Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-cyan-500/20 via-pink-500/15 to-emerald-500/20 blur-[130px] pointer-events-none animate-pulse" />

      {/* Top Aerospace Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-b border-[#162436]/90 pb-3 sm:pb-4 gap-4 bg-[#03060c]/70 backdrop-blur-md px-4 py-2 border-t border-x hud-bracket shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="text-xs tracking-widest text-cyan-300 font-black flex items-center gap-2">
            <span>ENIGMA 5.0 // GENESIS SYSTEM INITIALIZATION</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-emerald-400 text-[11px] font-bold hidden md:inline flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              NEURAL UPLINK ONLINE
            </span>
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
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/35 animate-[spin_18s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-pink-500 border-l-transparent animate-[spin_8s_linear_infinite_reverse] shadow-[0_0_20px_rgba(0,240,255,0.35)]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-emerald-400/40 animate-[spin_24s_linear_infinite]" />
          <div className="absolute inset-10 rounded-full border border-pink-500/30 animate-pulse" />

          {/* Crosshair Center Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-cyan-500/25" />
            <div className="h-full w-px bg-cyan-500/25 absolute" />
          </div>

          {/* Central Live Digit Progress & Pulse */}
          <div className="relative flex flex-col items-center justify-center z-10 bg-[#03060c]/85 backdrop-blur-md rounded-full w-32 h-32 border border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.8)]">
              {progress}%
            </span>
            <span className="text-[9px] sm:text-[10px] text-cyan-400 tracking-widest font-black uppercase mt-1 animate-pulse">
              SYNCING
            </span>
          </div>
        </div>

        {/* Monumental Decrypting Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#070c14]/90 px-4 py-1.5 border border-cyan-500/50 uppercase tracking-[0.3em] shadow-lg hud-bracket">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>GENESIS PROTOCOL // 2097.RECONSTRUCTION</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-mono font-black tracking-tight text-white uppercase drop-shadow-[0_0_45px_rgba(0,240,255,0.6)]">
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
        <div className="w-full max-w-2xl bg-[#03060c]/90 border border-[#162436] p-4 font-mono text-left space-y-2.5 shadow-2xl backdrop-blur-md hud-bracket">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-[#162436] pb-2">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC LOG STREAM</span>
            </span>
            <span className="text-cyan-300 font-bold truncate max-w-[280px]">{statusSubtitle}</span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300 min-h-[75px]">
            {logLines.map((line, idx) => (
              <div key={idx} className="truncate text-slate-300 flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          {/* High-Resolution Multi-Gradient Progress Track */}
          <div className="space-y-1 pt-1 border-t border-[#162436]/80">
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>QUANTUM BUFFER CAPACITY</span>
              <span className="text-cyan-400 font-bold">4.8 THz // {progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#070c14] border border-[#162436] p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Telemetry Footer */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-t border-[#162436]/90 pt-3 text-[10px] sm:text-[11px] text-slate-400 font-mono gap-2 bg-[#03060c]/70 backdrop-blur-md px-4 py-2 border-b border-x hud-bracket">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">QUANTUM CORE: 4.8 THz</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">LATENCY: 0.04ms</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">FRAME: SYNC_60FPS</span>
        </div>
        <div className="text-slate-400 font-bold">
          CSI-SIESGST // 2097.GENESIS ARCHITECT COUNCIL
        </div>
      </div>
    </div>
  );
}
