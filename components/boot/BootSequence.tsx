'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Terminal, Radio, Zap, Sparkles, FastForward } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('ESTABLISHING 2097 QUANTUM UPLINK...');
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    // Reset scroll to summit
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', keyListener);

    // Smooth High-Tech Progress Interpolation
    const startTime = Date.now();
    const duration = 2800; // 2.8s punchy cinematic boot

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 20) {
        setStageText('INITIALIZING ARCHITECT NEURAL BUFFER...');
      } else if (pct < 45) {
        setStageText('CALIBRATING 2097 THREE-WORLD VECTORS (HEALTHCARE // FINTECH // GAIA)...');
      } else if (pct < 70) {
        setStageText('DECRYPTING CLASSIFIED GENESIS PROTOCOL REBUILD ARCHITECTURE...');
      } else if (pct < 90) {
        setStageText('UNSEALING 3D CYBER MEGACITY MATRIX...');
      } else {
        setStageText('QUANTUM CLEARANCE GRANTED // SYSTEM READY.');
      }

      if (pct >= 100) {
        clearInterval(interval);
        setIsWarping(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 30);

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
      aria-label="System diagnostic boot sequence"
      className={`fixed inset-0 z-50 bg-[#020306] flex flex-col justify-between p-6 sm:p-10 font-mono text-slate-200 select-none scanlines transition-all duration-500 overflow-hidden ${
        isWarping ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Ambient Background Laser Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/15 via-pink-500/10 to-emerald-500/15 blur-[120px] pointer-events-none animate-pulse" />

      {/* Top Aerospace Telemetry Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-b border-[#162436] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="text-xs tracking-widest text-cyan-400 font-extrabold flex items-center gap-2">
            <span>ENIGMA 5.0 // GENESIS SYSTEM BOOT</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline text-[11px]">NODE 07 ARCHITECTURE</span>
          </div>
        </div>

        <button
          onClick={skipBoot}
          className="group text-xs text-slate-400 hover:text-cyan-300 border border-[#162436] hover:border-cyan-400 px-4 py-2 bg-[#070c14] tracking-widest transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
        >
          <span>[ ESC / SKIP ]</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Central Holographic Gyroscope & Quantum Alignment Matrix */}
      <div className="relative z-10 max-w-4xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-8">
        {/* Rotating Futuristic HUD Radar Core */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-[spin_12s_linear_infinite]" />
          {/* Middle Ring */}
          <div className="absolute inset-3 rounded-full border-2 border-t-pink-500 border-r-transparent border-b-cyan-400 border-l-transparent animate-[spin_6s_linear_infinite_reverse]" />
          {/* Inner Ring */}
          <div className="absolute inset-7 rounded-full border border-emerald-400/30 animate-pulse" />

          {/* Central Live Digit Progress */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-6xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">
              {progress}%
            </span>
            <span className="text-[10px] sm:text-xs text-cyan-400 tracking-widest font-bold uppercase mt-1">
              SYNCING BUFFER
            </span>
          </div>
        </div>

        {/* Monumental Branding */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#070c14] px-4 py-1.5 border border-cyan-500/40 uppercase tracking-[0.3em]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>INITIALIZING GENESIS PROTOCOL // YEAR 2097</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            ENIGMA 5.0
          </h1>

          <div className="font-mono text-xs sm:text-sm text-slate-400 tracking-[0.25em] uppercase">
            REBUILD THE FUTURE // THREE VECTOR COMPETITION
          </div>
        </div>

        {/* Dynamic Telemetry Log & Progress Bar */}
        <div className="w-full max-w-2xl space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
            <span className="text-cyan-300 truncate max-w-[400px] text-left">{stageText}</span>
            <span className="text-slate-500 text-[11px] shrink-0 font-bold">RATE: 4.8 THz</span>
          </div>

          {/* Glowing Multi-Segment Progress Track */}
          <div className="w-full h-2.5 bg-[#070c14] border border-[#162436] p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(0,240,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 3 Core Vector Telemetry Indicators */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl text-[10px] sm:text-xs font-mono">
          <div className="bg-[#070c14]/90 border border-cyan-500/30 p-2.5 sm:p-3 text-left space-y-1">
            <span className="text-cyan-400 font-bold block">01 HEALTHCARE</span>
            <span className="text-slate-400 text-[10px]">DIAGNOSTIC MATRIX</span>
          </div>
          <div className="bg-[#070c14]/90 border border-pink-500/30 p-2.5 sm:p-3 text-left space-y-1">
            <span className="text-pink-400 font-bold block">02 FINTECH</span>
            <span className="text-slate-400 text-[10px]">AUTONOMOUS SYSTEM</span>
          </div>
          <div className="bg-[#070c14]/90 border border-emerald-500/30 p-2.5 sm:p-3 text-left space-y-1">
            <span className="text-emerald-400 font-bold block">03 GAIA</span>
            <span className="text-slate-400 text-[10px]">SUSTAINABILITY NET</span>
          </div>
        </div>
      </div>

      {/* Bottom Technical Telemetry Footer */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-t border-[#162436] pt-4 text-[10px] sm:text-[11px] text-slate-500 font-mono gap-2">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">CLEARANCE: ARCHITECT ACCESS LEVEL 0</span>
          <span>|</span>
          <span className="text-emerald-400 font-bold">LATENCY: 0.04ms</span>
        </div>
        <div className="text-slate-500">
          POWERED BY CSI-SIESGST // 2097.GENESIS
        </div>
      </div>
    </div>
  );
}
