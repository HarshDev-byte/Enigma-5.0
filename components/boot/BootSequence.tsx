'use client';

import React, { useState, useEffect } from 'react';
import { sound } from '@/lib/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isFlash, setIsFlash] = useState(false);

  useEffect(() => {
    // Reset scroll position to summit on boot
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', keyListener);

    // Sequence timing (compact, cinematic & punchy)
    const timers = [
      setTimeout(() => { setStage(1); sound.playKeypress(); }, 300),
      setTimeout(() => { setStage(2); sound.playKeypress(); }, 700),
      setTimeout(() => { setStage(3); sound.playKeypress(); }, 1200),
      setTimeout(() => { setStage(4); sound.playGlitch(); }, 1700),
      setTimeout(() => { setStage(5); sound.playGenesisActivation(); }, 2200),
      setTimeout(() => {
        setIsGlitching(true);
        setIsFlash(true);
      }, 2700),
      setTimeout(() => {
        onComplete();
      }, 2900),
    ];

    return () => {
      window.removeEventListener('keydown', keyListener);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const skipBoot = () => {
    sound.playClick();
    onComplete();
  };

  return (
    <div
      role="region"
      aria-label="System diagnostic boot sequence"
      className={`fixed inset-0 z-50 bg-[#020305] flex flex-col justify-between p-6 sm:p-12 font-mono text-xs sm:text-sm text-slate-300 select-none scanlines transition-all duration-300 ${
        isFlash ? 'bg-cyan-200 opacity-90 invert' : ''
      } ${isGlitching ? 'animate-pulse' : ''}`}
    >
      {/* Top HUD bar */}
      <div className="flex justify-between items-center border-b border-[#162436] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 tracking-widest uppercase text-xs">
            ENIGMA NETWORK // NODE 07
          </span>
        </div>
        <button
          onClick={skipBoot}
          className="text-slate-400 hover:text-cyan-300 border border-[#162436] hover:border-cyan-500 px-3.5 py-1.5 bg-[#070c14] tracking-widest text-[11px] transition-all hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] focus:outline-none focus:ring-1 focus:ring-cyan-400"
        >
          [ ESC / SKIP INITIALIZATION ]
        </button>
      </div>

      {/* Terminal log content */}
      <div className="max-w-2xl my-auto space-y-4">
        {/* Stage 0: Initial Connect */}
        <div className="text-slate-400 tracking-wider">
          <span className="text-cyan-400 font-bold">CONNECTING...</span> ESTABLISHING QUANTUM LINK
        </div>

        {/* Stage 1: Diagnostic telemetry */}
        {stage >= 1 && (
          <div className="space-y-1.5 text-slate-300 tracking-wider border-l-2 border-cyan-500/50 pl-3">
            <div className="text-slate-500 text-[11px]">SYSTEM TIMESTAMP: YEAR 2097</div>
            <div>SYSTEM INTEGRITY: &nbsp;<span className="text-cyan-400 font-bold">[████████░░░░] 63%</span></div>
          </div>
        )}

        {/* Stage 2: Detailed systems */}
        {stage >= 2 && (
          <div className="space-y-1.5 text-slate-300 tracking-wider border-l-2 border-cyan-500/50 pl-3">
            <div>HUMAN SYSTEM: &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-400 font-bold">[██████░░░░░░] 63%</span></div>
            <div>ECONOMIC ENGINE: &nbsp;<span className="text-fuchsia-400 font-bold">[████░░░░░░░░] 41%</span></div>
            <div>PLANETARY GAIA: &nbsp;&nbsp;<span className="text-emerald-400 font-bold">[██░░░░░░░░░░] 19%</span></div>
          </div>
        )}

        {/* Stage 3: Systemic Collapse Alert */}
        {stage >= 3 && (
          <div className="bg-rose-950/40 border border-rose-500/80 p-3 text-rose-400 font-bold tracking-widest animate-pulse">
            &gt;&gt; SYSTEM WARNING: COLLAPSE IMMINENT &lt;&lt;
          </div>
        )}

        {/* Stage 4: Genesis Unseal */}
        {stage >= 4 && (
          <div className="bg-cyan-950/40 border border-cyan-400 p-3 text-cyan-300 font-bold tracking-widest">
            &gt;&gt; GENESIS SYSTEM DETECTED // COMMENCING UNSEAL &lt;&lt;
          </div>
        )}

        {stage < 5 && (
          <div className="flex items-center gap-2 text-cyan-400 pt-2">
            <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse" />
            <span className="text-slate-500 text-xs">SYNCHRONIZING ARCHITECT BUFFER...</span>
          </div>
        )}
      </div>

      {/* Bottom HUD metadata */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-[#162436] pt-4">
        <span>SECURITY CLEARANCE: ARCHITECT LEVEL 0</span>
        <span>NODE LATENCY: 0.4ms</span>
      </div>
    </div>
  );
}
