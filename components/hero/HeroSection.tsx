'use client';

import React, { useState, useEffect, useRef } from 'react';
import CitySkylineCanvas from './CitySkylineCanvas';
import { ShieldAlert, ArrowDownRight, Terminal, ExternalLink, Cpu, Compass, Activity } from 'lucide-react';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

interface HeroSectionProps {
  isGenesisActive: boolean;
  onInitializeGenesis: () => void;
}

export default function HeroSection({ isGenesisActive, onInitializeGenesis }: HeroSectionProps) {
  const [timeStr, setTimeStr] = useState('2097.10.24 // 00:00:00 UTC');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      const s = d.getSeconds().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      const h = d.getHours().toString().padStart(2, '0');
      setTimeStr(`2097.10.24 // ${h}:${m}:${s} UTC`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 12;
    setMouseOffset({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Enigma 5.0 Genesis Introduction"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#162436]"
    >
      {/* Background 2097 Skyline Canvas */}
      <CitySkylineCanvas isGenesisActive={isGenesisActive} />

      {/* Top Telemetry Overlay (Inspired by Reference Image #1) */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono text-slate-400 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      >
        <div className="flex items-center gap-3 bg-[#03060c]/90 px-3.5 py-2 border border-[#162436] hud-bracket">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold uppercase tracking-widest">
            // ENIGMA 5.0 // GENESIS
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">NODE 07</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400">ARCHITECT ACCESS: PENDING</span>
        </div>

        <div className="flex items-center gap-4 bg-[#03060c]/90 px-3.5 py-2 border border-[#162436] hud-bracket">
          <span className="text-slate-300">{timeStr}</span>
          <span className="text-slate-600">|</span>
          <span className="text-rose-400 font-bold flex items-center gap-1.5 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            SYS_STATUS: CRITICAL
          </span>
        </div>
      </div>

      {/* Main Foreground Typography & Cinematic Composition */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto my-auto py-10 flex flex-col items-start justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
        }}
      >
        {/* System Identifier Tag */}
        <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.35em] uppercase text-cyan-300 bg-[#03060c]/90 px-3.5 py-1.5 border-l-2 border-cyan-400 border-y border-r border-[#162436] mb-4">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold">SYSTEM CLASSIFICATION: 2097.GENESIS</span>
        </div>

        {/* Monumental Hero Title — ENIGMA 5.0 as the Dominant Highlight */}
        <div className="space-y-1 w-full">
          <div className="font-mono text-xs sm:text-sm text-cyan-400 font-bold tracking-[0.4em] uppercase pb-1 flex items-center gap-3">
            <span>// FLAGSHIP ARCHITECTURAL HACKATHON</span>
            <span className="w-16 h-px bg-cyan-500/50 inline-block" />
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter uppercase font-mono leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_60px_rgba(0,240,255,0.6)] block">
              ENIGMA 5.0
            </span>
          </h1>

          <div className="font-mono text-xl sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 tracking-[0.25em] font-extrabold uppercase pt-2 flex items-center gap-4">
            <span>GENESIS</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-light text-base sm:text-2xl md:text-3xl">BEYOND THE FUTURE</span>
          </div>
        </div>

        {/* Cinematic Manifesto Quote & System Brief */}
        <div className="mt-8 max-w-3xl bg-[#03060c]/85 backdrop-blur-md p-6 border-l-2 border-cyan-400 border-y border-r border-[#162436] hud-bracket">
          <blockquote className="font-mono text-base sm:text-lg text-slate-200 leading-relaxed italic">
            "The future isn't waiting for us.
            <br />
            <strong className="text-cyan-300 font-bold not-italic">It's waiting to be fixed.</strong>"
          </blockquote>
          <p className="font-mono text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Humanity built hyper-intelligent systems in 2097. But the systems we created have begun to fail.
            What will you build when you get the chance to create it again?
          </p>
        </div>

        {/* System Control CTA: ENTER GENESIS */}
        <div className="mt-8 flex items-center">
          <a
            href="#archive"
            onClick={() => {
              sound.playGenesisActivation();
              onInitializeGenesis();
            }}
            className={`group relative font-mono text-xs sm:text-sm font-black uppercase px-10 py-4 tracking-widest border transition-all duration-300 focus:outline-none focus:ring-2 overflow-hidden ${
              isGenesisActive
                ? 'bg-emerald-400 text-black border-emerald-300 hover:bg-emerald-300 shadow-[0_0_30px_rgba(16,255,136,0.6)] focus:ring-emerald-400'
                : 'bg-cyan-400 text-black border-cyan-300 hover:bg-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.6)] focus:ring-cyan-400'
            }`}
          >
            {/* Scanning Laser Highlight */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <span>[ ENTER GENESIS ]</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Technical Telemetry Grid */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-[#162436]/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-400 font-mono text-[11px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
        }}
      >
        <div className="bg-[#03060c]/85 p-3 border border-[#162436] hud-bracket">
          <div className="text-slate-500 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>EVENT TIMEFRAME</span>
          </div>
          <div className="text-slate-200 font-semibold mt-1">{EVENT_CONFIG.dates}</div>
        </div>

        <div className="bg-[#03060c]/85 p-3 border border-[#162436] hud-bracket">
          <div className="text-slate-500 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>TOTAL PRIZE VAULT</span>
          </div>
          <div className="text-cyan-400 font-bold mt-1">{EVENT_CONFIG.prizes.totalPool} REWARDS</div>
        </div>

        <div className="bg-[#03060c]/85 p-3 border border-[#162436] hud-bracket">
          <div className="text-slate-500 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>OPERATIONAL DURATION</span>
          </div>
          <div className="text-slate-200 font-semibold mt-1">{EVENT_CONFIG.duration}</div>
        </div>

        <div className="bg-[#03060c]/85 p-3 border border-[#162436] hud-bracket">
          <div className="text-slate-500 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            <span>COLLAPSE DOMAINS</span>
          </div>
          <div className="text-rose-400 font-bold mt-1">HEALTH // FINANCE // EARTH</div>
        </div>
      </div>
    </section>
  );
}
