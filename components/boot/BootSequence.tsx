'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FastForward, Terminal, Zap, Volume2, VolumeX, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isOverclocking, setIsOverclocking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [decryptedTitle, setDecryptedTitle] = useState('ENIGMA 5.0');
  const [activeStage, setActiveStage] = useState('INITIALIZING QUANTUM KERNEL...');
  const [logLines, setLogLines] = useState<string[]>([
    '>> BOOT PROTOCOL V5.0.97 INITIALIZED',
    '>> ESTABLISHING SECURE NEURAL QUANTUM HANDSHAKE...',
  ]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const progressRef = useRef(0);
  progressRef.current = progress;
  const isOverclockingRef = useRef(isOverclocking);
  isOverclockingRef.current = isOverclocking;
  const hasCompletedRef = useRef(false);

  // Initialize Web Audio API for synthetic cyber sounds
  const playCyberBeep = useCallback((freq = 600, type: OscillatorType = 'sine', duration = 0.04) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might fail without user gesture, catch gracefully
    }
  }, [soundEnabled]);

  const playSuccessChime = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
      });
    } catch {}
  }, [soundEnabled]);

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
          if (frame > index * 2 + 3) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      setDecryptedTitle(current);
      if (frame > targetTitle.length * 2 + 10) {
        clearInterval(interval);
        setDecryptedTitle(targetTitle);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Finish sequence trigger
  const triggerFinish = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    playSuccessChime();
    setIsWarping(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  }, [onComplete, playSuccessChime]);

  // Main progress simulation loop
  useEffect(() => {
    const stages = [
      { at: 15, text: 'MOUNTING NEURAL ARCHITECTURE...', log: '>> MOUNTING 2097 CYBER CORES [ONLINE]' },
      { at: 35, text: 'CALIBRATING VECTOR 01: HEALTHCARE MATRIX...', log: '>> HEALTHCARE SYNAPSE: PARITY ESTABLISHED' },
      { at: 60, text: 'SYNCING VECTOR 02: AUTONOMOUS FINTECH PROTOCOLS...', log: '>> FINTECH LEDGER: DECENTRALIZED SYNC 100%' },
      { at: 85, text: 'ENGAGING VECTOR 03: GAIA CLIMATE RECONSTRUCTION...', log: '>> GAIA CLIMATE MATRIX: UNLOCKED' },
      { at: 98, text: 'SECURITY VERIFICATION GRANTED // ENTERING MEGACITY...', log: '>> ALL SYSTEMS GO. LAUNCHING 2097 GENESIS EXPERIENCE.' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          triggerFinish();
          return 100;
        }

        // Overclock speeds up loading 4x
        const increment = isOverclockingRef.current 
          ? Math.random() * 2.8 + 1.8 
          : Math.random() * 0.9 + 0.4;
        
        const next = Math.min(100, prev + increment);

        // Check if we hit any stage milestones
        stages.forEach((st) => {
          if (prev < st.at && next >= st.at) {
            setActiveStage(st.text);
            setLogLines((l) => [...l.slice(-3), st.log]);
            playCyberBeep(880, 'sine', 0.05);
          }
        });

        if (Math.floor(next) % 15 === 0 && Math.floor(prev) % 15 !== 0) {
          playCyberBeep(440, 'sine', 0.02);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => triggerFinish(), 150);
          return 100;
        }

        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [triggerFinish, playCyberBeep]);

  // Keyboard controls: [ESC] to skip, [SPACE] hold to Overclock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerFinish();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsOverclocking(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsOverclocking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerFinish]);

  // Canvas particle starfield & magnetic warp grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Particles
    const numParticles = 120;
    const particles = Array.from({ length: numParticles }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * width,
      color: Math.random() > 0.6 ? '#ff2a55' : Math.random() > 0.3 ? '#00f0ff' : '#ffffff',
    }));

    const render = () => {
      // Trail fade effect
      ctx.fillStyle = isOverclockingRef.current ? 'rgba(4, 3, 8, 0.25)' : 'rgba(4, 3, 8, 0.45)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2 + (mouseX - width / 2) * 0.05;
      const cy = height / 2 + (mouseY - height / 2) * 0.05;
      const speed = isOverclockingRef.current ? 12 : 2.5;

      // Draw perspective horizon grid
      ctx.strokeStyle = isOverclockingRef.current ? 'rgba(255, 42, 85, 0.08)' : 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw and update 3D warp particles
      particles.forEach((p) => {
        p.z -= speed;
        if (p.z <= 0) {
          p.z = width;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = 300 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.7, (1 - p.z / width) * (isOverclockingRef.current ? 4.5 : 3));
          const alpha = Math.min(1, Math.max(0.1, (1 - p.z / width) * 1.3));

          ctx.beginPath();
          if (isOverclockingRef.current) {
            // Motion blur streak
            ctx.moveTo(px, py);
            ctx.lineTo(px + (px - cx) * 0.08, py + (py - cy) * 0.08);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = size;
            ctx.globalAlpha = alpha;
            ctx.stroke();
          } else {
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Compute segmented ASCII preview blocks
  const totalBlocks = 24;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(Math.max(0, totalBlocks - filledBlocks));

  return (
    <aside
      aria-label="System diagnostic and loading terminal screen"
      aria-live="polite"
      className={`fixed inset-0 z-50 bg-[#040308] flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono text-white select-none transition-all duration-500 overflow-hidden ${
        isWarping ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic 3D Warp Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cyber Reticle Corners */}
      <div className="absolute top-4 left-4 text-[10px] text-red-500/50 font-mono pointer-events-none hidden sm:block">
        ┌─ [SYS_2097.QUANTUM_BOOT] ──────────────────────────
      </div>
      <div className="absolute top-4 right-4 text-[10px] text-red-500/50 font-mono pointer-events-none text-right hidden sm:block">
        ────────────────────────── [NODE_07.TELEMETRY] ─┐
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] text-red-500/50 font-mono pointer-events-none hidden sm:block">
        └─ [CLEARANCE: LEVEL_0] ─────────────────────────────
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] text-red-500/50 font-mono pointer-events-none text-right hidden sm:block">
        ───────────────────────────── [PORTAL_ONLINE] ─┘
      </div>

      {/* Dynamic Ambient Neon Glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none transition-all duration-300 ${
          isOverclocking 
            ? 'w-[750px] h-[750px] bg-red-600/30' 
            : 'w-[600px] h-[600px] bg-gradient-to-tr from-red-500/20 via-cyan-500/15 to-pink-500/15'
        }`} 
      />

      {/* TOP BAR: Telemetry & Controls */}
      <header className="relative z-10 flex flex-wrap justify-between items-center border border-white/10 bg-[#08080f]/80 backdrop-blur-md px-4 py-2.5 shadow-2xl hud-bracket">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className={`w-3 h-3 rounded-full absolute ${isOverclocking ? 'bg-red-400 animate-ping' : 'bg-cyan-400 animate-ping'}`} />
            <span className={`w-2 h-2 rounded-full ${isOverclocking ? 'bg-red-400' : 'bg-cyan-400'}`} />
          </div>
          <div className="text-xs tracking-widest text-slate-300 font-bold flex items-center gap-2">
            <span className="text-white font-black">{decryptedTitle}</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-red-400 text-[11px] font-mono hidden sm:inline flex items-center gap-1">
              <Cpu className="w-3 h-3 text-red-400" />
              GENESIS ARCHITECT PROTOCOL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playCyberBeep(600, 'sine', 0.08);
            }}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 bg-[#0e0e18] tracking-wider transition-all flex items-center gap-1.5"
            title="Toggle cyber sound synthesis"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-red-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden md:inline">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Skip button */}
          <button
            onClick={triggerFinish}
            className="group text-xs text-slate-300 hover:text-white border border-white/15 hover:border-red-500/80 px-4 py-1.5 bg-[#0e0e18] tracking-widest transition-all hover:shadow-[0_0_15px_rgba(255,42,85,0.4)] flex items-center gap-2"
          >
            <span>[ ESC / SKIP ]</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-red-400" />
          </button>
        </div>
      </header>

      {/* CENTER: Iconic Retro-Futuristic Loading Frame & Progress Bar */}
      <div className="relative z-10 max-w-3xl w-full mx-auto my-auto flex flex-col items-center justify-center text-center space-y-8 px-4">
        
        {/* Retro Header: "Loading... Please Wait" */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500/40 bg-red-950/30 text-red-400 text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_15px_rgba(255,42,85,0.2)]">
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>ESTABLISHING 2097 UPLINK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-white tracking-widest uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            Loading<span className="text-red-400 animate-pulse">...</span> Please Wait
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 tracking-[0.2em] font-mono uppercase h-5">
            {activeStage} <span className="animate-ping inline-block text-red-400">_</span>
          </p>
        </div>

        {/* PRIMARY PROGRESS BAR (Exact homage to user's retro loader + cyber-grade polish) */}
        <div className="w-full max-w-xl space-y-3">
          
          {/* Main Solid White / Red Bordered Progress Box */}
          <div className="relative w-full h-8 sm:h-10 bg-black border-2 border-white p-1 shadow-[0_0_25px_rgba(255,255,255,0.2)] overflow-hidden">
            {/* The Solid Fill Bar matching user's image */}
            <div
              className={`h-full transition-all duration-100 ease-out relative ${
                isOverclocking
                  ? 'bg-gradient-to-r from-red-600 via-orange-400 to-white shadow-[0_0_20px_rgba(255,42,85,0.9)]'
                  : 'bg-white'
              }`}
              style={{ width: `${Math.max(1, progress)}%` }}
            >
              {/* Laser Spark at leading edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-500 shadow-[0_0_12px_#ff2a55] animate-pulse" />
            </div>
          </div>

          {/* Telemetry Row under Bar */}
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono tracking-wider px-1">
            <span className="text-slate-500">
              BUFFER: <span className="text-slate-300">{Math.floor(progress * 48)} MB / 4800 MB</span>
            </span>

            {/* Live Percentage readout */}
            <span className="text-sm font-black text-white font-mono tracking-wider">
              {Math.floor(progress)}%
            </span>

            <span className="text-slate-500 hidden sm:inline">
              THROUGHPUT: <span className="text-red-400 font-bold">{isOverclocking ? '18.4 GB/s' : '4.8 GB/s'}</span>
            </span>
          </div>

          {/* Retro Segmented ASCII Bar */}
          <div className="text-[11px] text-slate-400 font-mono tracking-widest border-t border-white/10 pt-2 flex items-center justify-center gap-2">
            <span className="text-slate-600">[</span>
            <span className="text-red-400 font-bold">{asciiBar}</span>
            <span className="text-slate-600">]</span>
          </div>
        </div>

        {/* INTERACTIVE TURBO OVERCLOCK CONTROLLER */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            onMouseDown={() => setIsOverclocking(true)}
            onMouseUp={() => setIsOverclocking(false)}
            onTouchStart={() => setIsOverclocking(true)}
            onTouchEnd={() => setIsOverclocking(false)}
            className={`group px-6 py-3 border font-mono text-xs sm:text-sm tracking-[0.2em] font-bold uppercase transition-all duration-200 select-none cursor-pointer flex items-center gap-2.5 ${
              isOverclocking
                ? 'bg-red-600 text-white border-red-400 shadow-[0_0_35px_rgba(255,42,85,0.9)] scale-105'
                : 'bg-[#0b0c14] text-slate-300 border-white/20 hover:border-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,42,85,0.4)]'
            }`}
          >
            <Zap className={`w-4 h-4 transition-transform ${isOverclocking ? 'text-white animate-bounce' : 'text-red-400 group-hover:scale-125'}`} />
            <span>{isOverclocking ? '⚡ HYPERDRIVE ENGAGED (4X SPEED)' : 'HOLD SPACE / CLICK TO OVERCLOCK'}</span>
          </button>

          <span className="text-[10px] text-slate-500 tracking-widest uppercase">
            TIP: HOLD SPACEBAR OR BUTTON TO CHARGE QUANTUM CORE AT LIGHTSPEED
          </span>
        </div>

        {/* Live Diagnostics Console Log Snippet */}
        <div className="w-full max-w-xl bg-[#06060c]/90 border border-white/10 p-3 font-mono text-left space-y-1.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1.5">
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <Terminal className="w-3 h-3" />
              <span>SUBSYSTEM DECRYPTION LOG</span>
            </span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              LEVEL 0 CLEARANCE
            </span>
          </div>

          <div className="space-y-0.5 text-[11px] text-slate-300 min-h-[48px]">
            {logLines.map((line, idx) => (
              <div key={idx} className="truncate flex items-center gap-2">
                <span className="text-red-400 font-bold">&gt;</span>
                <span className="text-slate-300 font-mono">{line}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM FOOTER: Technical Readouts */}
      <footer className="relative z-10 flex flex-wrap justify-between items-center border border-white/10 bg-[#08080f]/80 backdrop-blur-md px-4 py-2 text-[10px] sm:text-[11px] text-slate-400 font-mono gap-2 hud-bracket shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">ENIGMA 5.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">CORE: 4.8 THz</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">LATENCY: 0.02ms</span>
        </div>
        <div className="text-slate-400">
          CSI-SIESGST // YEAR 2097 GENESIS INITIATIVE
        </div>
      </footer>
    </aside>
  );
}
