'use client';

import React, { useState } from 'react';
import GenesisCoreCanvas from './GenesisCoreCanvas';
import { Cpu, Power, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/audio';

interface GenesisActivationProps {
  isActive: boolean;
  onActivate: () => void;
}

export default function GenesisActivation({ isActive, onActivate }: GenesisActivationProps) {
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateClick = () => {
    if (isActive) return;
    setIsActivating(true);
    sound.playGenesisActivation();

    setTimeout(() => {
      onActivate();
      setIsActivating(false);
      sound.playAccessGranted();
    }, 1200);
  };

  return (
    <section
      aria-label="Genesis Reinitialization Chamber"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#03060a] border-b border-[#162436] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Interactive Holographic Core Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full aspect-square max-w-[480px] bg-[#070c14] border border-[#162436] p-4 relative hud-bracket overflow-hidden shadow-2xl">
            {/* Corner status watermark */}
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-slate-400 bg-black/60 px-2 py-1 border border-[#162436]">
              CORE_RADIAL // 2097-QX
            </div>

            <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-cyan-400 bg-black/60 px-2 py-1 border border-[#162436]">
              RPM: {isActive ? '14,800' : '2,400'}
            </div>

            <GenesisCoreCanvas isActive={isActive} />
          </div>

          <div className="mt-4 font-mono text-xs text-slate-500 tracking-widest text-center">
            FIGURE 1.0 // GENESIS QUANTUM HARMONIC CORE
          </div>
        </div>

        {/* Right: Reinitialization Terminal & Trigger */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1 border border-emerald-500/40">
            <Cpu className="w-3.5 h-3.5" />
            <span>REINITIALIZATION SEQUENCE READY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-white uppercase tracking-tight">
            ACTIVATE THE REBUILD
          </h2>

          <div className="bg-[#070c14] border border-[#162436] p-6 space-y-4 font-mono text-xs text-slate-300">
            <div className="text-amber-400 font-bold border-b border-[#162436] pb-2">
              ⚠️ WARNING: ARCHITECT COMMITMENT
            </div>
            <p className="leading-relaxed text-slate-300">
              Initializing Genesis will dismantle legacy dependencies across Health, Finance, and Sustainability systems. 
            </p>
            <div className="text-slate-400">
              CURRENT STATUS:{' '}
              <span className={`font-bold ${isActive ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {isActive ? '● SYSTEM ACTIVE // ARCHITECT ACCESS GRANTED' : '○ STANDBY // AWAITING ARCHITECT OVERRIDE'}
              </span>
            </div>
          </div>

          {/* Activation Button */}
          <div>
            {!isActive ? (
              <button
                onClick={handleActivateClick}
                disabled={isActivating}
                className={`w-full py-5 px-8 font-mono text-sm sm:text-base font-bold uppercase tracking-[0.2em] border transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-xl ${
                  isActivating
                    ? 'bg-amber-400 text-black border-amber-300 animate-pulse'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-black border-emerald-300 shadow-[0_0_25px_rgba(16,255,136,0.4)]'
                }`}
              >
                <Power className={`w-5 h-5 ${isActivating ? 'animate-spin' : ''}`} />
                <span>{isActivating ? 'INITIALIZING REBUILD MATRIX...' : 'INITIALIZE GENESIS'}</span>
              </button>
            ) : (
              <div className="p-6 border border-emerald-400 bg-emerald-950/40 text-emerald-300 font-mono text-sm space-y-4 shadow-[0_0_20px_rgba(16,255,136,0.2)]">
                <div className="flex items-center gap-2 font-bold text-base text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  GENESIS ONLINE
                </div>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Systemic authority transferred. Proceed to challenge domain terminals to claim your architectural track.
                </p>
                <a
                  href="#challenges"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 px-4 py-2 uppercase tracking-wider transition-colors"
                >
                  <span>SELECT ARCHITECTURAL CHALLENGE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
