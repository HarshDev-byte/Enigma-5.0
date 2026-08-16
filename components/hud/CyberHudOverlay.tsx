'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Compass, Radio, Terminal, Volume2, VolumeX, Zap, Trophy, Globe, Calendar, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { sound } from '@/lib/audio';
import CyberTerminalModal from '@/components/terminal/CyberTerminalModal';

interface CyberHudOverlayProps {
  scrollProgress: number;
  onWarpToSection: (id: string) => void;
}

export default function CyberHudOverlay({ scrollProgress, onWarpToSection }: CyberHudOverlayProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [activeSection, setActiveSection] = useState('hero');

  const isCollapse = scrollProgress >= 0.22 && scrollProgress <= 0.35;
  const isRebuilt = scrollProgress >= 0.70;

  const allNavItems = [
    { id: 'hero', label: 'HERO', num: '01', sector: 'WORLD 01 // CYBER MEGACITY' },
    { id: 'archive', label: 'ARCHIVE', num: '02', sector: 'ENIGMA ARCHIVE // PAST EDITIONS' },
    { id: 'countdown', label: 'CLOCK', num: '03', sector: 'SYSTEM ALERT // COUNTDOWN' },
    { id: 'tracks', label: 'TRACKS', num: '04', sector: 'OFFICIAL TRACKS // 03 WORLDS' },
    { id: 'timeline', label: 'TIMELINE', num: '05', sector: 'EVENT TIMELINE // MISSION ROADMAP' },
    { id: 'prizes', label: 'PRIZES', num: '06', sector: 'PRIZE VAULT // BOUNTY MATRIX' },
    { id: 'protocols', label: 'RULES', num: '07', sector: 'SECURITY PROTOCOLS // RULES' },
    { id: 'faq', label: 'FAQ', num: '08', sector: 'SYSTEM FAQ // CLEARANCE DIRECTIVES' },
    { id: 'community', label: 'SOCIAL', num: '09', sector: 'OFFICIAL COMMUNITY // INSTAGRAM' },
    { id: 'register', label: 'REGISTER', num: '10', sector: 'GATEWAY 10 // ARCHITECT ACCESS' },
  ];

  // 5 Primary Quick Keys for Mobile Screen (< 768px)
  const mobilePrimaryKeys = [
    { id: 'hero', label: 'GENESIS', icon: Zap },
    { id: 'tracks', label: 'TRACKS', icon: Globe },
    { id: 'prizes', label: 'PRIZES', icon: Trophy },
    { id: 'timeline', label: 'ROADMAP', icon: Calendar },
    { id: 'register', label: 'UNSTOP', icon: ExternalLink, isCta: true },
  ];

  useEffect(() => {
    const handleScrollDetect = () => {
      const sectionIds = allNavItems.map((n) => n.id);
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollDetect, { passive: true });
    handleScrollDetect();
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, []);

  const currentNavItem = allNavItems.find((n) => n.id === activeSection) || allNavItems[0];
  const sectorName = currentNavItem.sector;
  const currentSection = activeSection;

  const handleNavClick = (id: string) => {
    sound.playClick();
    setActiveSection(id);
    onWarpToSection(id);
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
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-2 sm:p-5 lg:p-6 select-none">
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
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs text-slate-300">
            {/* Terminal CLI Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsTerminalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 border border-[#312856] hover:border-cyan-400 text-cyan-300 hover:text-white hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden xs:inline font-bold">TERMINAL</span>
            </button>

            {/* Audio Synth Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border transition-all text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md hud-bracket shadow-lg cursor-pointer active:scale-95 ${
                isMuted
                  ? 'bg-[#150a0a]/95 border-rose-500/50 text-rose-300 hover:border-rose-400'
                  : 'bg-[#061510]/95 border-emerald-500/50 text-emerald-300 hover:border-emerald-400 shadow-[0_0_12px_rgba(16,255,136,0.25)]'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden xs:inline">MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="hidden xs:inline">AUDIO: ON</span>
                </>
              )}
            </button>

            {/* Telemetry Indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#060410]/95 backdrop-blur-md px-3 py-1.5 sm:py-2 border border-[#312856] hud-bracket shadow-lg text-[10px] sm:text-xs">
              <span className="text-cyan-400 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" />
                <span className="font-bold">LIVE_NODE</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">ALT: {Math.round(320 - scrollProgress * 240)}M</span>
              <span className="text-slate-600">|</span>
              <span className="text-purple-400 font-bold">WARP: {Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Navigation Frame */}
        <div className="flex flex-col gap-2 max-w-6xl w-full mx-auto pointer-events-auto pb-[max(6px,env(safe-area-inset-bottom))] px-1 sm:px-0">
          {/* 1. ULTRA-SLEEK 5-KEY PRO CYBER DOCK FOR MOBILE (< 768px) */}
          <nav
            aria-label="Mobile Cyber Navigation Dock"
            className="flex md:hidden bg-[#060410]/98 backdrop-blur-2xl px-1.5 py-1.5 border border-purple-500/50 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.95)] items-center justify-between font-mono w-full"
          >
            {mobilePrimaryKeys.map((item) => {
              const isActive = currentSection === item.id;
              const isCta = item.isCta;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                    isCta
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-black font-black shadow-[0_0_15px_rgba(168,85,247,0.7)]'
                      : isActive
                      ? 'bg-purple-950/80 border border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-0.5 ${isCta ? 'text-black fill-black' : isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className={`text-[9.5px] uppercase font-mono tracking-wider ${isCta ? 'font-black' : isActive ? 'font-black text-white' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
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
              {allNavItems.map((item) => {
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

      {/* Interactive Cybernetic Command Terminal */}
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
