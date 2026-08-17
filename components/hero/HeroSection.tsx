'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowDownRight,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
  ShieldAlert,
  Info,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

interface HeroSectionProps {
  isGenesisActive: boolean;
  onInitializeGenesis: () => void;
}

export default function HeroSection({ isGenesisActive, onInitializeGenesis }: HeroSectionProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [liveClock, setLiveClock] = useState('00:00:00');
  const [deckExpanded, setDeckExpanded] = useState(false);

  // Live IST Digital Clock matching reference bottom bar [ • 18 : 59 : 28 ]
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setLiveClock(`${hours} : ${minutes} : ${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 10;
    setMouseOffset({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const { clientX, clientY } = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 10;
      const y = (clientY / innerHeight - 0.5) * 8;
      setMouseOffset({ x, y });
    }
  };

  // Shockwave particle burst on title click
  const triggerShockwave = () => {
    sound.playSynthArpeggio();
    setIsGlitching(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#ffffff', '#ff2a55', '#e2e8f0', '#94a3b8', '#fbbf24'],
      });
    } catch {}

    setTimeout(() => {
      setIsGlitching(false);
    }, 900);
  };

  return (
    <section
      id="hero"
      aria-label="Enigma 5.0 Genesis Introduction"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 px-3.5 sm:px-8 lg:px-12 overflow-hidden select-none border-b border-[#1e293b]"
    >
      {/* 1. Top Floating Mini Pitchdeck Widget (Mobile Pill & Desktop Card) */}
      <div className="absolute top-16 sm:top-20 right-3 sm:right-8 lg:right-12 z-20">
        <div
          onClick={() => {
            sound.playClick();
            setDeckExpanded((prev) => !prev);
          }}
          className="group cursor-pointer font-mono text-left bg-[#060410]/95 backdrop-blur-xl border border-slate-700 hover:border-slate-400 p-2 sm:p-3 w-auto sm:w-56 shadow-2xl transition-all duration-300 hud-bracket active:scale-95"
          role="button"
          aria-label="Toggle Event Pitchdeck"
        >
          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400 pb-0 sm:pb-1.5 sm:border-b border-slate-800">
            <span className="font-bold tracking-widest uppercase text-slate-300 flex items-center gap-1.5">
              <Info className="w-3 h-3 text-red-400" />
              <span className="hidden sm:inline">PITCHDECK</span>
              <span className="sm:hidden">BRIEF</span>
            </span>
            <span className="text-red-400 font-mono text-[9px] font-bold">
              {deckExpanded ? 'CLOSE [×]' : 'EXPAND [+]'}
            </span>
          </div>

          {deckExpanded && (
            <div className="mt-2 space-y-2 animate-fade-in">
              <div className="bg-[#0b0816] p-2 border border-slate-800 flex items-center gap-2">
                <div className="w-7 h-7 bg-white text-black font-black flex items-center justify-center text-xs shrink-0 font-mono">
                  E5
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-white uppercase truncate">
                    ENIGMA 5.0 BRIEF
                  </div>
                  <div className="text-[8.5px] text-slate-400 truncate">
                    36H // ₹1.5L+ POOL
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-300 pt-1 border-t border-slate-800/80">
                <span className="text-red-400 font-bold uppercase">SIES GST // MUMBAI</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Monumental Minimalist Centerpiece (Pure Editorial High-Impact Grid) */}
      <div
        className="relative z-10 max-w-5xl w-full mx-auto my-auto py-6 sm:py-14 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      >
        {/* Subtle Bracketed Eyebrow Tag */}
        <div className="font-mono text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] text-slate-300 uppercase mb-3 sm:mb-4 flex items-center justify-center gap-1.5 sm:gap-2">
          <span>[</span>
          <span className="font-black text-white">FULL HEART NO SHORTCUTS</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-400">36 HOURS</span>
          <span>]</span>
        </div>

        {/* Monumental Headline Typography */}
        <div
          onClick={triggerShockwave}
          className="space-y-0 w-full text-center cursor-pointer group my-1 sm:my-2"
          title="Click to trigger cyber pulse"
        >
          <h1
            className={`font-mono text-4xl xs:text-5xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.88] text-white transition-transform duration-300 ${
              isGlitching ? 'scale-105 animate-pulse' : 'group-hover:scale-[1.01]'
            }`}
          >
            <span className="block drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              ALL IN OR
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">
              NOTHING.
            </span>
          </h1>
        </div>

        {/* Clean Event Metadata Lockup */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 font-mono text-[10px] sm:text-xs text-slate-300">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white text-black font-black uppercase text-[9px] sm:text-[11px] tracking-wider">
            ENIGMA 5.0
          </span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-slate-300 font-bold tracking-widest uppercase">
            GENESIS
          </span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-amber-400 font-black tracking-wider">
            {EVENT_CONFIG.prizes.totalPool}
          </span>
          <span className="text-slate-600 font-bold">•</span>
          <span className="text-slate-400 tracking-wider">
            OCTOBER 24–26, 2026
          </span>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          <a
            href="#archive"
            onClick={() => {
              triggerShockwave();
              onInitializeGenesis();
            }}
            className="group relative font-mono text-xs sm:text-sm font-black uppercase w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 tracking-widest border border-slate-400 bg-white hover:bg-slate-200 text-black transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.4)] overflow-hidden cursor-pointer text-center active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center justify-center gap-2">
              <span>[ ENTER GENESIS ]</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>

          <a
            href={EVENT_CONFIG.socials.unstop}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="group relative font-mono text-xs sm:text-sm font-black uppercase w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 tracking-widest border border-slate-700 bg-[#060410]/90 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-900/60 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-slate-300 animate-pulse" />
            <span>UNSTOP PORTAL</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 3. Ultra-Clean Editorial Bottom Telemetry Bar */}
      <div className="relative z-10 w-full mx-auto pt-3 sm:pt-4 border-t border-slate-800/80 font-mono text-[9px] sm:text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 sm:gap-6">
        {/* Left: Squad & Location Info */}
        <div className="flex items-center gap-2 sm:gap-6">
          <span className="font-bold text-slate-200 tracking-wider">60+ SQUADS</span>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-slate-300 tracking-wider truncate">SIES GST MUMBAI</span>
        </div>

        {/* Center: Live Blinking Digital Clock [ • 18 : 59 : 28 ] */}
        <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#060410]/95 border border-slate-800 text-slate-200 font-bold tracking-widest shadow-inner">
          <span>[</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block mx-0.5" />
          <span className="text-white font-black">{liveClock} IST</span>
          <span>]</span>
        </div>

        {/* Right: Quick Social & Track Channels */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href={EVENT_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-0.5 font-bold"
          >
            <span>INSTAGRAM</span>
            <span className="text-red-400 font-black">+</span>
          </a>
          <a
            href={EVENT_CONFIG.socials.unstop}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-0.5 font-bold"
          >
            <span>UNSTOP</span>
            <span className="text-red-400 font-black">+</span>
          </a>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 font-bold">NODE 07</span>
        </div>
      </div>
    </section>
  );
}
