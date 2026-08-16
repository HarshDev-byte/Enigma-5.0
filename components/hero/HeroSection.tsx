'use client';

import React, { useState, useEffect, useRef } from 'react';
import CitySkylineCanvas from './CitySkylineCanvas';
import { ShieldAlert, ArrowDownRight, Terminal, Cpu, Compass, Activity, Radio, Sparkles, Trophy, ExternalLink, Zap, Clock, MapPin, CheckCircle2, ChevronRight, Layers, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
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
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 14;
    setMouseOffset({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const { clientX, clientY } = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 14;
      const y = (clientY / innerHeight - 0.5) * 10;
      setMouseOffset({ x, y });
    }
  };

  const triggerShockwave = (e?: React.MouseEvent) => {
    sound.playGenesisActivation();
    setIsSynthPlaying(true);
    setIsGlitching(true);

    try {
      // Cosmic Neon Particle Shockwave
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#00f0ff', '#a855f7', '#d946ef', '#10ff88', '#fcee0a', '#ffffff'],
      });
    } catch {}

    setTimeout(() => {
      setIsSynthPlaying(false);
      setIsGlitching(false);
    }, 900);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Enigma 5.0 Genesis Introduction"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#1a1630]"
    >
      {/* Background 2097 Skyline Canvas with Dynamic Parallax */}
      <CitySkylineCanvas isGenesisActive={isGenesisActive} />

      {/* Cybernetic Volumetric Atmospheric Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-pink-500/20 blur-[150px] pointer-events-none" />

      {/* Top Aerospace Telemetry Overlay */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap justify-between items-center gap-3 text-[10px] sm:text-xs font-mono text-slate-300 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`,
        }}
      >
        <div className="flex items-center gap-2.5 bg-[#060410]/95 px-3.5 py-1.5 border border-[#312856] hud-bracket shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-black uppercase tracking-widest">
            // ENIGMA 5.0 // GENESIS
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-300 font-bold">NODE 07</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-amber-300 font-bold hidden sm:inline">ARCHITECT CLEARANCE: VERIFIED</span>
        </div>

        <div className="flex items-center gap-3 bg-[#060410]/95 px-3.5 py-1.5 border border-[#312856] hud-bracket shadow-lg">
          <span className="text-slate-300">{timeStr}</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>PORTAL: ONLINE</span>
          </span>
        </div>
      </div>

      {/* Main Foreground Typography & Cinematic Composition — Banger Centered Composition */}
      <div
        className="relative z-10 max-w-5xl w-full mx-auto my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)`,
        }}
      >
        {/* Floating High-Voltage Telemetry Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-cyan-300 bg-[#060410]/95 px-3.5 py-1.5 border border-cyan-400/80 hud-bracket shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-black">SPEC: 2097.GENESIS</span>
          </div>

          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs tracking-wider uppercase text-amber-300 bg-[#060410]/95 px-3.5 py-1.5 border border-amber-500/70 shadow-[0_0_15px_rgba(252,238,10,0.35)]">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-black">{EVENT_CONFIG.prizes.totalPool} VAULT</span>
          </div>

          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs tracking-wider uppercase text-emerald-300 bg-[#060410]/95 px-3.5 py-1.5 border border-emerald-500/70 shadow-[0_0_15px_rgba(16,255,136,0.25)]">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">100% FREE ENTRY</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs tracking-wider uppercase text-purple-300 bg-[#060410]/95 px-3.5 py-1.5 border border-purple-500/70 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold">SIES GST // MUMBAI</span>
          </div>
        </div>

        {/* Monumental Hero Title with Chromatic Laser Sheen & Tap Shockwave */}
        <div
          onClick={() => triggerShockwave()}
          className="space-y-1 w-full text-center cursor-pointer group"
          title="Click to trigger cosmic plasma shockwave"
        >
          <div className="font-mono text-[11px] sm:text-xs text-cyan-400 font-black tracking-[0.4em] uppercase pb-1 flex items-center justify-center gap-2 sm:gap-4">
            <span className="w-8 sm:w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400 inline-block" />
            <span>// FLAGSHIP ARCHITECTURAL HACKATHON</span>
            <span className="w-8 sm:w-20 h-px bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400 inline-block" />
          </div>

          <h1 className={`text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter uppercase font-mono leading-none break-words text-center transition-transform duration-300 ${
            isGlitching ? 'scale-105 animate-pulse' : 'group-hover:scale-[1.01]'
          }`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 via-purple-300 to-pink-400 drop-shadow-[0_0_75px_rgba(168,85,247,0.8)] block">
              ENIGMA 5.0
            </span>
          </h1>

          <div className="font-mono text-base xs:text-lg sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 via-cyan-300 to-purple-400 tracking-[0.15em] sm:tracking-[0.25em] font-black uppercase pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span>GENESIS</span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="text-slate-200 font-light text-xs xs:text-base sm:text-2xl md:text-3xl">BEYOND THE FUTURE</span>
          </div>
        </div>

        {/* Interactive Audio Waveform Synthesizer Spectrum */}
        <button
          type="button"
          onMouseEnter={() => sound.playHover()}
          onClick={() => triggerShockwave()}
          className={`mt-4 flex items-center justify-center gap-1 sm:gap-1.5 opacity-90 hover:opacity-100 p-2 sm:p-2.5 bg-[#060410]/90 border transition-all cursor-pointer shadow-lg active:scale-95 group hud-bracket ${
            isSynthPlaying ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.7)]' : 'border-[#312856] hover:border-cyan-400'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1" />
          {[8, 16, 26, 12, 20, 36, 18, 30, 42, 24, 14, 32, 46, 26, 16, 30, 40, 20, 10, 26, 36, 18, 12, 28, 38, 22, 14, 30, 40, 20].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full inline-block transition-transform duration-200 ${
                isSynthPlaying
                  ? 'bg-gradient-to-t from-cyan-400 via-purple-400 to-pink-400 scale-y-150'
                  : 'bg-gradient-to-t from-purple-500 via-pink-400 to-cyan-400 group-hover:scale-y-125'
              }`}
              style={{
                height: `${h}px`,
                opacity: 0.5 + (i % 4) * 0.15,
              }}
            />
          ))}
          <span className="mx-2 sm:mx-3 font-mono text-[9px] sm:text-[10px] text-cyan-300 font-black uppercase tracking-widest group-hover:text-white">
            AUDIO SYNTH SPECTRUM // 4.8 THz [ TAP ]
          </span>
        </button>

        {/* 3D Holographic Foil Manifesto Card with Prismatic Foil Glare */}
        <HoloCard
          glowColor="rgba(0, 240, 255, 0.45)"
          className="mt-6 max-w-2xl w-full bg-[#060410]/95 backdrop-blur-md p-5 sm:p-7 border border-[#312856] border-t-2 border-t-cyan-400 shadow-2xl text-center"
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

        {/* High-Voltage Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          {/* 01. Enter Genesis Button */}
          <a
            href="#archive"
            onClick={() => {
              triggerShockwave();
              onInitializeGenesis();
            }}
            className={`group relative font-mono text-xs sm:text-sm font-black uppercase px-8 sm:px-10 py-4 tracking-widest border transition-all duration-300 focus:outline-none focus:ring-2 overflow-hidden cursor-pointer ${
              isGenesisActive
                ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-black border-emerald-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_35px_rgba(16,255,136,0.7)] focus:ring-emerald-400'
                : 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-black border-cyan-300 hover:brightness-110 shadow-[0_0_40px_rgba(168,85,247,0.7)] focus:ring-cyan-400'
            }`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-2.5">
              <span>[ ENTER GENESIS ]</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* 02. Direct Unstop Portal Button */}
          <a
            href={EVENT_CONFIG.socials.unstop}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="group relative font-mono text-xs sm:text-sm font-black uppercase px-8 sm:px-10 py-4 tracking-widest border border-cyan-400/80 bg-[#061524] text-cyan-200 hover:text-white hover:border-cyan-300 hover:bg-[#0a2038] transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center gap-2.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>UNSTOP PORTAL</span>
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Technical Telemetry Grid with Holographic Prismatic Foil */}
      <div
        className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-[#312856]/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-slate-300 font-mono text-[11px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px, 0)`,
        }}
      >
        <HoloCard glowColor="rgba(0, 240, 255, 0.45)" className="bg-[#060410]/95 p-3.5 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>EVENT TIMEFRAME</span>
          </div>
          <div className="text-slate-100 font-semibold mt-1">{EVENT_CONFIG.dates}</div>
        </HoloCard>

        <HoloCard glowColor="rgba(168, 85, 247, 0.45)" className="bg-[#060410]/95 p-3.5 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-purple-400" />
            <span>TOTAL PRIZE VAULT</span>
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 font-bold mt-1">
            {EVENT_CONFIG.prizes.totalPool} REWARDS
          </div>
        </HoloCard>

        <HoloCard glowColor="rgba(16, 255, 136, 0.45)" className="bg-[#060410]/95 p-3.5 border border-[#312856]">
          <div className="text-slate-400 text-[9px] uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>OPERATIONAL DURATION</span>
          </div>
          <div className="text-slate-100 font-semibold mt-1">{EVENT_CONFIG.duration}</div>
        </HoloCard>

        <HoloCard glowColor="rgba(244, 63, 94, 0.45)" className="bg-[#060410]/95 p-3.5 border border-[#312856]">
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
