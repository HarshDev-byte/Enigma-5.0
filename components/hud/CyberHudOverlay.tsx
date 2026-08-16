'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Compass, Radio, Menu, X, ArrowRight, ShieldCheck, Zap, Layers, Trophy, Sparkles, ExternalLink, Volume2, VolumeX, Terminal } from 'lucide-react';
import { sound } from '@/lib/audio';
import CyberTerminalModal from '@/components/terminal/CyberTerminalModal';

interface CyberHudOverlayProps {
  scrollProgress: number;
  onWarpToSection: (id: string) => void;
}

export default function CyberHudOverlay({ scrollProgress, onWarpToSection }: CyberHudOverlayProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
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
    { id: 'archive', label: 'ARCHIVE', num: '02', desc: 'Past Editions' },
    { id: 'countdown', label: 'CLOCK', num: '03', desc: 'Urgency Clock' },
    { id: 'tracks', label: 'TRACKS', num: '04', desc: '03 Worlds' },
    { id: 'timeline', label: 'TIMELINE', num: '05', desc: '4-Stage Plan' },
    { id: 'prizes', label: 'PRIZES', num: '06', desc: '₹1.5L+ Vault' },
    { id: 'protocols', label: 'RULES', num: '07', desc: 'Protocols' },
    { id: 'faq', label: 'FAQ', num: '08', desc: 'Directives' },
    { id: 'community', label: 'SOCIAL', num: '09', desc: 'Instagram' },
    { id: 'register', label: 'REGISTER', num: '10', desc: 'Unstop Portal' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      onWarpToSection(id);
    }, 50);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playAccessGranted();
    }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-2.5 sm:p-5 lg:p-6 select-none">
        {/* Top Aerospace HUD Frame */}
        <div className="flex justify-between items-center gap-2 pointer-events-auto">
          {/* Top Left: Node ID & Sector Status */}
          <div className="flex items-center gap-2 bg-[#060410]/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border border-[#312856] hud-bracket shadow-lg max-w-[70vw] sm:max-w-none truncate">
            <span
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 ${
                isCollapse ? 'bg-pink-500 animate-ping' : isRebuilt ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400 animate-ping'
              }`}
            />
            <div className="font-mono text-[11px] sm:text-xs text-slate-300 flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="font-extrabold text-cyan-400 uppercase tracking-wider shrink-0">{EVENT_CONFIG.eventName}</span>
              <span className="text-slate-600">|</span>
              <span className={`truncate ${isCollapse ? 'text-pink-400 font-bold' : 'text-slate-300 font-medium'}`}>
                {sectorName}
              </span>
            </div>
          </div>

          {/* Top Right: Live Telemetry, Audio Toggle & Terminal */}
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            {/* Terminal CLI Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsTerminalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-md px-3 py-1.5 sm:py-2 border border-[#312856] hover:border-cyan-400 text-cyan-300 hover:text-white hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden xs:inline font-bold">TERMINAL</span>
            </button>

            {/* Audio Synth Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-md px-3 py-1.5 sm:py-2 border border-[#312856] hover:border-purple-400 text-slate-300 hover:text-white hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden xs:inline text-rose-300">SYNTH: OFF</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="hidden xs:inline text-cyan-300">SYNTH: ON</span>
                </>
              )}
            </button>

            {/* Desktop Telemetry Data */}
            <div className="hidden md:flex items-center gap-3 bg-[#060410]/95 backdrop-blur-md px-4 py-2 border border-[#312856] hud-bracket shadow-lg">
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
          {/* 1. KILLER MOBILE TACTICAL COMMAND DECK (< 768px) */}
          <nav
            aria-label="Mobile Tactical HUD Controller"
            className="md:hidden bg-[#060410]/98 backdrop-blur-2xl px-2 py-2 border-t-2 border-t-cyan-400 border-x border-b border-[#312856] shadow-[0_15px_45px_rgba(0,0,0,0.95)] hud-bracket flex items-center justify-between gap-1.5 font-mono w-full relative overflow-hidden"
          >
            {/* Live Top Laser Progress Wire */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300 pointer-events-none"
              style={{ width: `${Math.max(5, Math.round(scrollProgress * 100))}%` }}
            />

            {/* SECTORS MATRIX TRIGGER */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(true);
              }}
              className="flex items-center justify-center gap-1 px-2.5 py-2 bg-[#0e0a24] border border-purple-500/60 text-purple-300 text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>SECTORS</span>
            </button>

            {/* 04 TRACKS BUTTON */}
            <button
              type="button"
              onClick={() => handleNavClick('tracks')}
              className={`flex-1 py-2 px-2 text-center text-[11px] font-bold uppercase tracking-wider border active:scale-95 transition-all truncate cursor-pointer ${
                currentSection === 'tracks'
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  : 'bg-[#080f1a] text-slate-300 border-cyan-500/30 hover:border-cyan-400'
              }`}
            >
              04 TRACKS
            </button>

            {/* 06 PRIZES BUTTON */}
            <button
              type="button"
              onClick={() => handleNavClick('prizes')}
              className={`flex-1 py-2 px-2 text-center text-[11px] font-bold uppercase tracking-wider border active:scale-95 transition-all truncate cursor-pointer ${
                currentSection === 'prizes'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-400 shadow-[0_0_10px_rgba(252,238,10,0.4)]'
                  : 'bg-[#151104] text-slate-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              06 PRIZES
            </button>

            {/* HIGH-VOLTAGE REGISTER CTA BUTTON */}
            <button
              type="button"
              onClick={() => handleNavClick('register')}
              className="py-2 px-3 text-center text-[11px] font-black text-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 shadow-[0_0_18px_rgba(168,85,247,0.6)] active:scale-95 transition-all shrink-0 uppercase tracking-wider cursor-pointer"
            >
              🚀 UNSTOP
            </button>
          </nav>

          {/* 2. DESKTOP AEROSPACE RIBBON (>= 768px) */}
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
                    type="button"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => handleNavClick(item.id)}
                    className={`group relative flex-1 text-center py-1 sm:py-1.5 px-0.5 sm:px-1.5 md:px-2 transition-all duration-200 uppercase font-mono tracking-wider flex items-center justify-center gap-0.5 sm:gap-1 focus:outline-none focus:ring-1 focus:ring-purple-400 whitespace-nowrap cursor-pointer ${
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

      {/* 3. KILLER FULLSCREEN CYBER SECTOR MATRIX DRAWER FOR PHONES */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#040308]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 font-mono text-white scanlines animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
        >
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-[#312856] pb-3">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 uppercase block">
                  CYBERNETIC SECTOR MATRIX
                </span>
                <span className="text-[10px] text-slate-400 font-mono">10 SECTOR ARCHITECTURE</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 border border-purple-500/50 bg-[#0e0a24] text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>[ ESC ]</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 10 Tactical Sector Tiles (2-Column Dense Grid on Phones) */}
          <div className="my-auto grid grid-cols-2 gap-2 max-h-[68vh] overflow-y-auto py-2 pr-0.5">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              const isRegister = item.id === 'register';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 border transition-all text-left flex flex-col justify-between hud-bracket active:scale-95 min-h-[76px] cursor-pointer ${
                    isRegister
                      ? 'bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-cyan-900/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)] col-span-2'
                      : isActive
                      ? 'bg-purple-950/70 border-purple-400 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                      : 'bg-[#080614]/95 border-[#241a45] text-slate-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-black px-1.5 py-0.2 border ${
                      isRegister
                        ? 'bg-cyan-400 text-black border-cyan-400'
                        : isActive
                        ? 'bg-purple-400 text-black border-purple-400'
                        : 'border-[#312856] text-purple-400'
                    }`}>
                      {item.num}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRegister ? 'text-cyan-400' : isActive ? 'text-purple-400' : 'text-slate-600'}`} />
                  </div>

                  <div className="mt-1">
                    <div className="font-mono text-xs font-black uppercase tracking-wider">{item.label}</div>
                    <div className="text-[9px] text-slate-400 truncate">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Drawer Bottom Quick Action Bar */}
          <div className="border-t border-[#312856] pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-slate-500">SECTOR: {sectorName}</span>
              <span className="text-cyan-400 font-bold">WARP: {Math.round(scrollProgress * 100)}%</span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <a
                href={EVENT_CONFIG.socials.unstop}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-2 px-3 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 cursor-pointer"
              >
                <span>REGISTER UNSTOP</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={EVENT_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-2 px-3 bg-[#0c081e] border border-pink-500/50 text-pink-300 font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>INSTAGRAM</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive Cybernetic Command Terminal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onWarpToSection={(id) => {
          setIsTerminalOpen(false);
          setTimeout(() => onWarpToSection(id), 50);
        }}
      />
    </>
  );
}
