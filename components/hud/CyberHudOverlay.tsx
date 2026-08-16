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
  const isCollapse = scrollProgress >= 0.22 && scrollProgress <= 0.35;
  const isRebuilt = scrollProgress >= 0.70;

  // Determine current active section from scrollProgress
  let currentSection = 'hero';
  let sectorName = 'WORLD 01 // CYBER MEGACITY';

  if (scrollProgress >= 0.08 && scrollProgress < 0.18) {
    currentSection = 'archive';
    sectorName = 'ENIGMA ARCHIVE // PAST EDITIONS';
  } else if (scrollProgress >= 0.18 && scrollProgress < 0.28) {
    currentSection = 'countdown';
    sectorName = 'SYSTEM ALERT // COUNTDOWN';
  } else if (scrollProgress >= 0.28 && scrollProgress < 0.40) {
    currentSection = 'tracks';
    sectorName = 'OFFICIAL TRACKS // 03 WORLDS';
  } else if (scrollProgress >= 0.40 && scrollProgress < 0.52) {
    currentSection = 'timeline';
    sectorName = 'EVENT TIMELINE // MISSION ROADMAP';
  } else if (scrollProgress >= 0.52 && scrollProgress < 0.64) {
    currentSection = 'prizes';
    sectorName = 'PRIZE VAULT // BOUNTY MATRIX';
  } else if (scrollProgress >= 0.64 && scrollProgress < 0.74) {
    currentSection = 'protocols';
    sectorName = 'SECURITY PROTOCOLS // RULES';
  } else if (scrollProgress >= 0.74 && scrollProgress < 0.84) {
    currentSection = 'faq';
    sectorName = 'SYSTEM FAQ // CLEARANCE DIRECTIVES';
  } else if (scrollProgress >= 0.84 && scrollProgress < 0.92) {
    currentSection = 'community';
    sectorName = 'OFFICIAL COMMUNITY // INSTAGRAM';
  } else if (scrollProgress >= 0.92) {
    currentSection = 'register';
    sectorName = 'GATEWAY 10 // ARCHITECT ACCESS';
  }

  const navItems = [
    { id: 'hero', label: 'HERO', num: '01' },
    { id: 'archive', label: 'ARCHIVE', num: '02' },
    { id: 'countdown', label: 'CLOCK', num: '03' },
    { id: 'tracks', label: 'TRACKS', num: '04' },
    { id: 'timeline', label: 'TIMELINE', num: '05' },
    { id: 'prizes', label: 'PRIZES', num: '06' },
    { id: 'protocols', label: 'RULES', num: '07' },
    { id: 'faq', label: 'FAQ', num: '08' },
    { id: 'community', label: 'SOCIAL', num: '09' },
    { id: 'register', label: 'REGISTER', num: '10' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none">
      {/* Top Aerospace HUD Frame */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Top Left: Node ID & Sector Status */}
        <div className="flex items-center gap-3 bg-[#060410]/95 backdrop-blur-md px-4 py-2 border border-[#312856] pointer-events-auto hud-bracket shadow-lg">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isCollapse ? 'bg-pink-500 animate-ping' : isRebuilt ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'
            }`}
          />
          <div className="font-mono text-xs text-slate-300 flex items-center gap-2">
            <span className="font-extrabold text-cyan-400 uppercase tracking-wider">{EVENT_CONFIG.eventName}</span>
            <span className="text-slate-600">|</span>
            <span className={isCollapse ? 'text-pink-400 font-bold' : 'text-slate-300 font-medium'}>
              {sectorName}
            </span>
          </div>
        </div>

        {/* Top Right: System Status & Live Signal */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-3 bg-[#060410]/95 backdrop-blur-md px-4 py-2 border border-[#312856] font-mono text-xs text-slate-300 hud-bracket shadow-lg">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE_NODE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>ALT: {Math.round((1 - scrollProgress) * 320)}M</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400 font-bold">WARP: {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Aerospace Navbar — ALL 10 SECTIONS IN NON-SCROLLABLE FIT */}
      <div className="flex flex-col gap-2 max-w-6xl w-full mx-auto pointer-events-auto pb-1">
        <nav
          aria-label="Futuristic HUD Navigation"
          className="bg-[#060410]/95 backdrop-blur-lg px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[#312856] shadow-[0_10px_35px_rgba(0,0,0,0.8)] hud-bracket flex items-center justify-between gap-1 sm:gap-1.5 font-mono w-full"
        >
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 shrink-0 mr-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="uppercase tracking-wider text-cyan-400 text-[11px] font-black">
              ENIGMA:
            </span>
          </div>

          {/* Navigation Items — All 10 sections evenly fitted */}
          <div className="flex items-center justify-between w-full gap-0.5 sm:gap-1 md:gap-1.5 text-[9px] sm:text-[11px] md:text-xs">
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
                  className={`group relative flex-1 text-center py-1 sm:py-1.5 px-0.5 sm:px-1.5 md:px-2 transition-all duration-200 uppercase font-mono tracking-wider flex items-center justify-center gap-0.5 sm:gap-1 focus:outline-none focus:ring-1 focus:ring-purple-400 whitespace-nowrap ${
                    isRegister
                      ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-black font-black hover:brightness-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                      : isActive
                      ? 'text-purple-300 font-bold bg-purple-950/70 border border-purple-500/70 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span className={`hidden xl:inline text-[9px] ${isRegister ? 'text-black/80 font-bold' : isActive ? 'text-purple-400' : 'text-slate-500'}`}>
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
