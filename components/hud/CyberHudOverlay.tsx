'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Compass, Radio } from 'lucide-react';
import { sound } from '@/lib/audio';

interface CyberHudOverlayProps {
  scrollProgress: number;
  onWarpToSection: (id: string) => void;
}

export default function CyberHudOverlay({ scrollProgress, onWarpToSection }: CyberHudOverlayProps) {
  const isCollapse = scrollProgress >= 0.28 && scrollProgress <= 0.45;
  const isRebuilt = scrollProgress >= 0.75;

  // Determine current active section from scrollProgress
  let currentSection = 'hero';
  let sectorName = 'WORLD 01 // CYBER MEGACITY';
  if (scrollProgress >= 0.12 && scrollProgress < 0.28) {
    currentSection = 'archive';
    sectorName = 'ENIGMA ARCHIVE // PAST EDITIONS';
  } else if (scrollProgress >= 0.28 && scrollProgress < 0.44) {
    currentSection = 'countdown';
    sectorName = 'SYSTEM ALERT // COUNTDOWN';
  } else if (scrollProgress >= 0.44 && scrollProgress < 0.60) {
    currentSection = 'tracks';
    sectorName = 'OFFICIAL TRACKS // 03 WORLDS';
  } else if (scrollProgress >= 0.60 && scrollProgress < 0.75) {
    currentSection = 'timeline';
    sectorName = 'EVENT TIMELINE // MISSION ROADMAP';
  } else if (scrollProgress >= 0.75 && scrollProgress < 0.88) {
    currentSection = 'faq';
    sectorName = 'SYSTEM FAQ // CLEARANCE DIRECTIVES';
  } else if (scrollProgress >= 0.88) {
    currentSection = 'register';
    sectorName = 'GATEWAY 07 // ARCHITECT ACCESS';
  }

  const navItems = [
    { id: 'hero', label: 'HERO', num: '01' },
    { id: 'archive', label: 'ARCHIVE', num: '02' },
    { id: 'countdown', label: 'COUNTDOWN', num: '03' },
    { id: 'tracks', label: 'TRACKS', num: '04' },
    { id: 'timeline', label: 'TIMELINE', num: '05' },
    { id: 'faq', label: 'FAQ', num: '06' },
    { id: 'register', label: 'REGISTER', num: '07' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none">
      {/* Top Aerospace HUD Frame */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Top Left: Node ID & Sector Status */}
        <div className="flex items-center gap-3 bg-[#03060c]/90 backdrop-blur-md px-4 py-2 border border-[#162436] pointer-events-auto hud-bracket shadow-lg">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isCollapse ? 'bg-rose-500 animate-ping' : isRebuilt ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'
            }`}
          />
          <div className="font-mono text-xs text-slate-300 flex items-center gap-2">
            <span className="font-extrabold text-cyan-400 uppercase tracking-wider">{EVENT_CONFIG.eventName}</span>
            <span className="text-slate-600">|</span>
            <span className={isCollapse ? 'text-rose-400 font-bold' : 'text-slate-300 font-medium'}>
              {sectorName}
            </span>
          </div>
        </div>

        {/* Top Right: System Status & Live Signal */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-3 bg-[#03060c]/90 backdrop-blur-md px-4 py-2 border border-[#162436] font-mono text-xs text-slate-300 hud-bracket">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE_NODE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>ALT: {Math.round((1 - scrollProgress) * 320)}M</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold">WARP: {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Aerospace Navbar — 100% NON-SCROLLABLE & PERFECTLY FITTED */}
      <div className="flex flex-col gap-2 max-w-5xl w-full mx-auto pointer-events-auto pb-1">
        <nav
          aria-label="Futuristic HUD Navigation"
          className="bg-[#03060c]/95 backdrop-blur-lg px-2 sm:px-4 md:px-6 py-2.5 sm:py-3 border border-[#162436] shadow-[0_10px_35px_rgba(0,0,0,0.8)] hud-bracket flex items-center justify-between gap-1 sm:gap-2 font-mono w-full"
        >
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 shrink-0 mr-2">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="uppercase tracking-wider text-cyan-400 text-xs font-black">
              ENIGMA:
            </span>
          </div>

          {/* Navigation Items — Non-scrollable flex layout */}
          <div className="flex items-center justify-between w-full gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              const isRegister = item.id === 'register';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onWarpToSection(item.id);
                  }}
                  className={`group relative flex-1 text-center py-1.5 px-1 sm:px-2 md:px-3 transition-all duration-200 uppercase font-mono tracking-wider flex items-center justify-center gap-1 focus:outline-none focus:ring-1 focus:ring-cyan-400 whitespace-nowrap ${
                    isRegister
                      ? 'bg-cyan-400 text-black font-black hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : isActive
                      ? 'text-cyan-300 font-bold bg-cyan-950/50 border border-cyan-500/60 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`hidden sm:inline text-[9px] md:text-[10px] ${isRegister ? 'text-black/70 font-bold' : isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
