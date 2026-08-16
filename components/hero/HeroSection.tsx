'use client';

import React, { useState, useEffect, useRef } from 'react';
import CitySkylineCanvas from './CitySkylineCanvas';
import { ShieldAlert, ArrowDownRight, Terminal, Cpu, Compass, Activity, Radio, Sparkles, QrCode } from 'lucide-react';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

import HoloCard from '@/components/ui/HoloCard';

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
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#1a1630]"
    >
      {/* Background 2097 Skyline Canvas */}
      <CitySkylineCanvas isGenesisActive={isGenesisActive} />

      {/* Top Telemetry Overlay (Moodboard Reference #2 & #3 Tactical HUD) */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono text-slate-300 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      >
        <div className="flex items-center gap-3 bg-[#060410]/90 px-3.5 py-2 border border-[#312856] hud-bracket shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold uppercase tracking-widest">
            // ENIGMA 5.0 // GENESIS
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300">NODE 07</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 font-bold">ARCHITECT CLEARANCE: PENDING</span>
        </div>

        <div className="flex items-center gap-4 bg-[#060410]/90 px-3.5 py-2 border border-[#312856] hud-bracket shadow-lg">
          <span className="text-slate-300">{timeStr}</span>
          <span className="text-slate-600">|</span>
          <span className="text-rose-400 font-bold flex items-center gap-1.5 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            SYS_STATUS: CRITICAL
          </span>
        </div>
      </div>

      {/* Main Foreground Typography & Cinematic Composition — Centered Layout */}
      <div
        className="relative z-10 max-w-5xl w-full mx-auto my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
        }}
      >
        {/* Moodboard Barcode & System Identifier Tag */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.35em] uppercase text-cyan-300 bg-[#060410]/90 px-3.5 py-1.5 border border-cyan-400/80 hud-bracket shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">SYSTEM CLASSIFICATION: 2097.GENESIS</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-slate-400 bg-[#060410]/80 px-2.5 py-1.5 border border-[#312856]">
            <span className="text-purple-400 font-bold">||||| ||| |||||||</span>
            <span>SPEC: 05-EDITION</span>
          </div>
        </div>

        {/* Monumental Hero Title — Moodboard Color Infusion */}
        <div className="space-y-1 w-full text-center">
          <div className="font-mono text-xs sm:text-sm text-cyan-400 font-bold tracking-[0.4em] uppercase pb-1 flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-px bg-cyan-500/50 inline-block" />
            <span>// FLAGSHIP ARCHITECTURAL HACKATHON</span>
            <span className="w-8 sm:w-16 h-px bg-cyan-500/50 inline-block" />
          </div>

          <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter uppercase font-mono leading-none break-words text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 via-purple-300 to-pink-400 drop-shadow-[0_0_60px_rgba(168,85,247,0.6)] block">
              ENIGMA 5.0
            </span>
          </h1>

          <div className="font-mono text-lg xs:text-xl sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 via-cyan-300 to-purple-400 tracking-[0.15em] sm:tracking-[0.25em] font-extrabold uppercase pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span>GENESIS</span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="text-slate-200 font-light text-xs xs:text-base sm:text-2xl md:text-3xl">BEYOND THE FUTURE</span>
          </div>
        </div>

        {/* Audio Waveform Spectrum Strip (Interactive & Reactive) */}
        <button
          type="button"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playGenesisActivation()}
          className="mt-4 flex items-center justify-center gap-1.5 opacity-90 hover:opacity-100 p-2 bg-[#060410]/70 border border-[#312856] hover:border-cyan-400 rounded-full transition-all cursor-pointer shadow-lg active:scale-95 group"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1" />
          {[8, 16, 26, 12, 20, 32, 18, 28, 36, 22, 14, 30, 40, 22, 16, 28, 34, 18, 10, 24, 30, 16, 12, 26, 32].map((h, i) => (
            <span
              key={i}
              className="w-1 bg-gradient-to-t from-purple-500 via-pink-400 to-cyan-400 rounded-full inline-block group-hover:scale-y-125 transition-transform duration-200"
              style={{
                height: `${h}px`,
                opacity: 0.5 + (i % 3) * 0.25,
              }}
            />
          ))}
          <span className="mx-3 font-mono text-[9px] text-cyan-300 font-bold uppercase tracking-widest group-hover:text-white">
            AUDIO SYNTH SPECTRUM // 4.8 THz [ TAP ]
          </span>
        </button>

        {/* Cinematic Manifesto Quote & System Brief (Holographic Card) */}
        <HoloCard
          glowColor="rgba(0, 240, 255, 0.4)"
          className="mt-6 max-w-2xl w-full bg-[#060410]/90 backdrop-blur-md p-6 border border-[#312856] border-t-2 border-t-cyan-400 shadow-2xl text-center"
        >
          <blockquote className="font-mono text-base sm:text-lg text-slate-100 leading-relaxed italic">
            "The future isn't waiting for us.
            <br />
            <strong className="text-cyan-300 font-bold not-italic">It's waiting to be fixed.</strong>"
          </blockquote>
          <p className="font-mono text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-xl mx-auto">
            Humanity built hyper-intelligent systems in 2097. But the systems we created have begun to fail.
            What will you build when you get the chance to create it again?
          </p>
        </HoloCard>

        {/* System Control CTA: ENTER GENESIS (Centered) */}
        <div className="mt-8 flex items-center justify-center">
          <a
            href="#archive"
            onClick={() => {
              sound.playGenesisActivation();
              onInitializeGenesis();
            }}
            className={`group relative font-mono text-xs sm:text-sm font-black uppercase px-10 py-4 tracking-widest border transition-all duration-300 focus:outline-none focus:ring-2 overflow-hidden cursor-pointer ${
              isGenesisActive
                ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-black border-emerald-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_30px_rgba(16,255,136,0.6)] focus:ring-emerald-400'
                : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black border-cyan-300 hover:brightness-110 shadow-[0_0_35px_rgba(168,85,247,0.6)] focus:ring-cyan-400'
            }`}
          >
            {/* Scanning Laser Highlight */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <span>[ ENTER GENESIS ]</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom Technical Telemetry Grid with Holographic Prismatic Foil */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-[#312856]/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300 font-mono text-[11px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`,
        }}
      >
        <HoloCard glowColor="rgba(0, 240, 255, 0.4)" className="bg-[#060410]/90 p-3 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>EVENT TIMEFRAME</span>
          </div>
          <div className="text-slate-100 font-semibold mt-1">{EVENT_CONFIG.dates}</div>
        </HoloCard>

        <HoloCard glowColor="rgba(168, 85, 247, 0.4)" className="bg-[#060410]/90 p-3 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-purple-400" />
            <span>TOTAL PRIZE VAULT</span>
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 font-bold mt-1">
            {EVENT_CONFIG.prizes.totalPool} REWARDS
          </div>
        </HoloCard>

        <HoloCard glowColor="rgba(16, 255, 136, 0.4)" className="bg-[#060410]/90 p-3 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>OPERATIONAL DURATION</span>
          </div>
          <div className="text-slate-100 font-semibold mt-1">{EVENT_CONFIG.duration}</div>
        </HoloCard>

        <HoloCard glowColor="rgba(244, 63, 94, 0.4)" className="bg-[#060410]/90 p-3 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            <span>COLLAPSE DOMAINS</span>
          </div>
          <div className="text-rose-400 font-bold mt-1">HEALTH // FINANCE // EARTH</div>
        </HoloCard>
      </div>
    </section>
  );
}
