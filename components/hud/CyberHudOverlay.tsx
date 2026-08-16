'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Compass, Radio, Menu, X, ArrowRight, ShieldCheck, Zap, Layers, Trophy } from 'lucide-react';
import { sound } from '@/lib/audio';

interface CyberHudOverlayProps {
  scrollProgress: number;
  onWarpToSection: (id: string) => void;
}

export default function CyberHudOverlay({ scrollProgress, onWarpToSection }: CyberHudOverlayProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { id: 'hero', label: 'HERO', num: '01', desc: 'Summit & Megacity' },
    { id: 'archive', label: 'ARCHIVE', num: '02', desc: 'Past Editions 01-04' },
    { id: 'countdown', label: 'CLOCK', num: '03', desc: 'Registration Window' },
    { id: 'tracks', label: 'TRACKS', num: '04', desc: '03 Official Vectors' },
    { id: 'timeline', label: 'TIMELINE', num: '05', desc: '4-Stage Mission' },
    { id: 'prizes', label: 'PRIZES', num: '06', desc: '₹1,50,000+ Vault' },
    { id: 'protocols', label: 'RULES', num: '07', desc: 'Security Protocols' },
    { id: 'faq', label: 'FAQ', num: '08', desc: 'Clearance Directives' },
    { id: 'community', label: 'SOCIAL', num: '09', desc: 'Instagram Community' },
    { id: 'register', label: 'REGISTER', num: '10', desc: 'Unstop Portal Gateway' },
  ];

  const handleMobileNavWarp = (id: string) => {
    sound.playClick();
    setIsMobileMenuOpen(false);
    onWarpToSection(id);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none">
        {/* Top Aerospace HUD Frame */}
        <div className="flex justify-between items-center gap-3">
          {/* Top Left: Node ID & Sector Status */}
          <div className="flex items-center gap-2.5 bg-[#060410]/95 backdrop-blur-md px-3 sm:px-4 py-2 border border-[#312856] pointer-events-auto hud-bracket shadow-lg max-w-[85vw] sm:max-w-none truncate">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isCollapse ? 'bg-pink-500 animate-ping' : isRebuilt ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'
              }`}
            />
            <div className="font-mono text-xs text-slate-300 flex items-center gap-2 truncate">
              <span className="font-extrabold text-cyan-400 uppercase tracking-wider shrink-0">{EVENT_CONFIG.eventName}</span>
              <span className="text-slate-600">|</span>
              <span className={`truncate text-[11px] sm:text-xs ${isCollapse ? 'text-pink-400 font-bold' : 'text-slate-300 font-medium'}`}>
                {sectorName}
              </span>
            </div>
          </div>

          {/* Top Right: Desktop Live Signal */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="hidden md:flex items-center gap-3 bg-[#060410]/95 backdrop-blur-md px-4 py-2 border border-[#312856] font-mono text-xs text-slate-300 hud-bracket shadow-lg">
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

        {/* Bottom Floating Navigation Frame */}
        <div className="flex flex-col gap-2 max-w-6xl w-full mx-auto pointer-events-auto pb-safe">
          {/* 1. Mobile-Optimized Tactical Controller (Visible on screens < 768px) */}
          <nav
            aria-label="Mobile Tactical HUD Controller"
            className="md:hidden bg-[#060410]/95 backdrop-blur-xl px-2 py-2 border border-[#312856] shadow-[0_10px_35px_rgba(0,0,0,0.9)] hud-bracket flex items-center justify-between gap-1.5 font-mono w-full"
          >
            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0e0a22] border border-purple-500/50 text-purple-300 text-xs font-bold active:scale-95 transition-transform"
            >
              <Menu className="w-4 h-4 text-purple-400" />
              <span>SECTORS</span>
            </button>

            <button
              onClick={() => handleMobileNavWarp('tracks')}
              className="flex-1 py-2 px-2 text-center text-xs font-bold text-cyan-300 bg-[#080f1a] border border-cyan-500/40 active:scale-95 transition-transform truncate"
            >
              04 TRACKS
            </button>

            <button
              onClick={() => handleMobileNavWarp('prizes')}
              className="flex-1 py-2 px-2 text-center text-xs font-bold text-amber-300 bg-[#161204] border border-amber-500/40 active:scale-95 transition-transform truncate"
            >
              06 PRIZES
            </button>

            <button
              onClick={() => handleMobileNavWarp('register')}
              className="py-2 px-3 text-center text-xs font-black text-black bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] active:scale-95 transition-transform shrink-0"
            >
              ⚡ REGISTER
            </button>
          </nav>

          {/* 2. Desktop Aerospace Ribbon (Visible on screens >= 768px) */}
          <nav
            aria-label="Desktop Futuristic HUD Navigation"
            className="hidden md:flex bg-[#060410]/95 backdrop-blur-lg px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-[#312856] shadow-[0_10px_35px_rgba(0,0,0,0.8)] hud-bracket items-center justify-between gap-1 sm:gap-1.5 font-mono w-full"
          >
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 shrink-0 mr-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="uppercase tracking-wider text-cyan-400 text-[11px] font-black">
                ENIGMA:
              </span>
            </div>

            {/* Navigation Items */}
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

      {/* 3. Fullscreen Mobile Cyber Sector Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#040308]/98 backdrop-blur-2xl flex flex-col justify-between p-5 font-mono text-white scanlines animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-[#312856] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 uppercase">
                CYBERNETIC SECTOR MATRIX
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(false);
              }}
              className="p-2 border border-[#312856] bg-[#0c081e] text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sector List Grid */}
          <div className="my-auto space-y-2 max-h-[70vh] overflow-y-auto py-2 pr-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              const isRegister = item.id === 'register';

              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavWarp(item.id)}
                  className={`w-full p-3.5 border transition-all text-left flex items-center justify-between hud-bracket ${
                    isRegister
                      ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 border-cyan-400 text-white shadow-lg'
                      : isActive
                      ? 'bg-purple-950/60 border-purple-400 text-purple-200 shadow-md'
                      : 'bg-[#080614]/90 border-[#241a45] text-slate-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black px-2 py-0.5 border ${
                      isRegister ? 'bg-cyan-400 text-black border-cyan-400' : isActive ? 'bg-purple-400 text-black border-purple-400' : 'border-[#312856] text-purple-400'
                    }`}>
                      {item.num}
                    </span>
                    <div>
                      <div className="font-mono text-sm font-black uppercase tracking-wider">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 ${isRegister ? 'text-cyan-400' : isActive ? 'text-purple-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Drawer Bottom Status */}
          <div className="border-t border-[#312856] pt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>ALTITUDE: {Math.round((1 - scrollProgress) * 320)}M</span>
            <span className="text-cyan-400 font-bold">WARP: {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      )}
    </>
  );
}
