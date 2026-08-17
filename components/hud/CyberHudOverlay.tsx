'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import {
  Compass,
  Radio,
  Terminal,
  Volume2,
  VolumeX,
  Zap,
  Trophy,
  Globe,
  Calendar,
  ExternalLink,
  Eye,
  CreditCard,
  Code2,
  X,
  Shield,
  HelpCircle,
  Share2,
  Layers,
  ChevronRight,
  Activity,
  Clock,
  Sliders,
  ArrowUpRight,
} from 'lucide-react';
import { sound } from '@/lib/audio';
import CyberTerminalModal from '@/components/terminal/CyberTerminalModal';

interface CyberHudOverlayProps {
  scrollProgress: number;
  onWarpToSection: (id: string) => void;
  isLensActive: boolean;
  onToggleLens: () => void;
  onOpenPassModal: () => void;
  onOpenMatrixModal: () => void;
}

export default function CyberHudOverlay({
  scrollProgress,
  onWarpToSection,
  isLensActive,
  onToggleLens,
  onOpenPassModal,
  onOpenMatrixModal,
}: CyberHudOverlayProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [activeSection, setActiveSection] = useState('hero');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [liveClock, setLiveClock] = useState('00:00:00');

  // Mini live countdown for Tactical HUD Drawer
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Dynamic Theme: Monochromatic Grey (< 15% scroll) -> Neon Crimson Red (>= 15% scroll)
  const isRedPhase = scrollProgress >= 0.15;
  const activeColor = isRedPhase ? '#ff2a55' : '#e2e8f0';
  const activeBorder = isRedPhase ? 'rgba(255, 42, 85, 0.5)' : 'rgba(226, 232, 240, 0.4)';

  const allNavItems = [
    { id: 'hero', label: 'GENESIS', num: '01', sector: 'AWAKENING // DORMANT GREY', icon: Zap, tag: 'CORE' },
    { id: 'archive', label: 'ARCHIVE', num: '02', sector: 'ARCHIVE // NEURAL IGNITION', icon: Layers, tag: 'HIST' },
    { id: 'countdown', label: 'CLOCK', num: '03', sector: 'SYSTEM ALERT // RED OVERDRIVE', icon: Clock, tag: 'SYNC' },
    { id: 'tracks', label: 'TRACKS', num: '04', sector: 'OFFICIAL TRACKS // 03 WORLDS', icon: Globe, tag: '03 PATHS' },
    { id: 'timeline', label: 'TIMELINE', num: '05', sector: 'EVENT TIMELINE // ROADMAP', icon: Calendar, tag: '36 HRS' },
    { id: 'prizes', label: 'PRIZES', num: '06', sector: 'PRIZE VAULT // BOUNTIES', icon: Trophy, tag: '₹1.0L+' },
    { id: 'protocols', label: 'RULES', num: '07', sector: 'SECURITY PROTOCOLS // RULES', icon: Shield, tag: 'DECREE' },
    { id: 'faq', label: 'FAQ', num: '08', sector: 'SYSTEM FAQ // DIRECTIVES', icon: HelpCircle, tag: 'INTEL' },
    { id: 'community', label: 'SOCIAL', num: '09', sector: 'OFFICIAL COMMUNITY // INSTAGRAM', icon: Share2, tag: 'COMMS' },
    { id: 'register', label: 'REGISTER', num: '10', sector: 'GATEWAY 10 // ARCHITECT ACCESS', icon: ExternalLink, tag: 'ACCESS', isCta: true },
  ];

  // 4 Primary Thumb-Friendly Quick Items for Mobile Bottom Cyber-Dock
  const mobileDockItems = [
    { id: 'hero', label: 'GENESIS', icon: Zap },
    { id: 'tracks', label: 'TRACKS', icon: Globe },
    { id: 'timeline', label: 'ROADMAP', icon: Calendar },
    { id: 'prizes', label: 'PRIZES', icon: Trophy },
  ];

  // Real-time IST Digital Clock & Countdown Timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setLiveClock(`${hours}:${minutes}:${seconds}`);

      // Countdown to Registration Deadline
      const target = new Date(EVENT_CONFIG.registrationDeadline).getTime();
      const diff = Math.max(0, target - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section Observer & Scroll Tracking
  useEffect(() => {
    const handleScrollDetect = () => {
      const sectionIds = allNavItems.map((n) => n.id);
      const scrollPosition = window.scrollY + 200;

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

  // Lock body scroll when Command Menu is open
  useEffect(() => {
    if (isCommandMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCommandMenuOpen]);

  const currentNavItem = allNavItems.find((n) => n.id === activeSection) || allNavItems[0];
  const scrollPercent = Math.round(scrollProgress * 100);

  const handleNavClick = (id: string) => {
    sound.playClick();
    setActiveSection(id);
    if (isCommandMenuOpen) {
      setIsCommandMenuOpen(false);
    }
    onWarpToSection(id);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playAccessGranted();
    }
  };

  const toggleCommandMenu = () => {
    sound.playClick();
    setIsCommandMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MASTER FIXED HUD OVERLAY CONTAINER */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-2 sm:p-4 lg:p-6 select-none">
        
        {/* ========================================================================= */}
        {/* TOP BAR: DYNAMIC AEROSPACE ISLAND (MOBILE & DESKTOP) */}
        {/* ========================================================================= */}
        <header className="flex justify-between items-center gap-2 pointer-events-auto w-full max-w-7xl mx-auto pt-[max(4px,env(safe-area-inset-top))]">
          
          {/* Top Left: Interactive Dynamic Island Status Capsule */}
          <div
            onClick={() => {
              sound.playHover();
              toggleCommandMenu();
            }}
            className="group flex items-center gap-2 bg-[#060410]/95 backdrop-blur-xl px-2.5 sm:px-4 py-1.5 sm:py-2 border hud-bracket shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer active:scale-95 transition-all duration-300 max-w-[62vw] sm:max-w-none"
            style={{
              borderColor: activeBorder,
              boxShadow: isRedPhase ? '0 0 15px rgba(255, 42, 85, 0.2)' : '0 0 10px rgba(148, 163, 184, 0.15)',
            }}
            role="button"
            aria-label="Open Command Hub"
          >
            {/* Pulsing Radar Beacon */}
            <div className="relative flex items-center justify-center shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5">
              <span
                className="absolute w-full h-full rounded-full opacity-75 animate-ping"
                style={{ backgroundColor: activeColor }}
              />
              <span
                className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-500 shadow-sm"
                style={{ backgroundColor: activeColor }}
              />
            </div>

            {/* Event Name & Active Sector Dynamic Label */}
            <div className="font-mono text-[10px] sm:text-xs text-slate-300 flex items-center gap-1.5 truncate">
              <span
                className="font-black uppercase tracking-wider shrink-0 transition-colors duration-500"
                style={{ color: activeColor }}
              >
                {EVENT_CONFIG.eventName}
              </span>
              <span className="text-slate-600 font-light">/</span>
              <span className="truncate font-semibold text-slate-200 group-hover:text-white flex items-center gap-1">
                <span className="text-slate-400 font-mono text-[9px] sm:text-[10px]">
                  {currentNavItem.num}
                </span>
                <span className="truncate">{currentNavItem.label}</span>
              </span>
            </div>

            {/* Scroll Telemetry Progress Ring (Mobile HUD Metric) */}
            <div className="hidden xs:flex items-center gap-1 pl-1 border-l border-slate-800 text-[9px] font-mono text-slate-400 shrink-0">
              <Activity className="w-3 h-3 text-slate-500" />
              <span>{scrollPercent}%</span>
            </div>
          </div>

          {/* Top Right: Tactical Quick-Action Control Array */}
          <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs text-slate-300">
            
            {/* 1. HOLO-VISION Interactive Reticle Mode */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onToggleLens();
              }}
              aria-label={isLensActive ? 'Disable Holo-Lens' : 'Enable Holo-Lens'}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 border text-[10px] sm:text-xs font-mono font-bold hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer ${
                isLensActive
                  ? isRedPhase
                    ? 'bg-red-950/90 text-red-300 border-red-500 shadow-[0_0_15px_rgba(255,42,85,0.4)]'
                    : 'bg-slate-800 text-white border-slate-400'
                  : 'bg-[#060410]/95 backdrop-blur-xl border-slate-800 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <Eye className={`w-3.5 h-3.5 ${isLensActive ? 'animate-spin text-red-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">
                {isLensActive ? 'LENS: ON' : 'HOLO-LENS'}
              </span>
            </button>

            {/* 2. SQUAD ACCESS PASS Generator (Desktop & Tablet Quick Action) */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenPassModal();
              }}
              aria-label="Open Squad Access Pass Generator"
              className="hidden sm:flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-800 hover:border-slate-500 text-slate-200 hover:text-white hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-slate-300 animate-pulse" />
              <span className="font-bold">SQUAD PASS</span>
            </button>

            {/* 3. MATRIX RAIN MODE (Desktop Quick Action) */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenMatrixModal();
              }}
              aria-label="Toggle Matrix Rain Overload"
              className="hidden lg:flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-xl px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-800 hover:border-red-500 text-slate-200 hover:text-white hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              <Code2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span className="font-bold">MATRIX</span>
            </button>

            {/* 4. Terminal CLI Launcher */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsTerminalOpen(true);
              }}
              aria-label="Open Cyber Terminal CLI"
              className="hidden xs:flex items-center gap-1.5 bg-[#060410]/95 backdrop-blur-xl px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-600 hud-bracket shadow-lg active:scale-95 transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              <Terminal
                className="w-3.5 h-3.5 animate-pulse transition-colors duration-500"
                style={{ color: activeColor }}
              />
              <span className="hidden xl:inline font-bold">TERMINAL</span>
            </button>

            {/* 5. Cybernetic Audio Equalizer Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio Synthesizer'}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 border transition-all text-[10px] sm:text-xs font-mono font-bold hud-bracket shadow-lg cursor-pointer active:scale-95 ${
                isMuted
                  ? 'bg-[#0f0a1a]/95 backdrop-blur-xl border-slate-800 text-slate-500'
                  : 'bg-[#0b0818]/95 backdrop-blur-xl text-slate-200 shadow-md'
              }`}
              style={{
                borderColor: !isMuted ? (isRedPhase ? 'rgba(255, 42, 85, 0.5)' : 'rgba(255, 255, 255, 0.4)') : undefined,
              }}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden xl:inline">MUTED</span>
                </>
              ) : (
                <>
                  {/* Dynamic Equalizer Visualizer Waves */}
                  <div className="flex items-end gap-0.5 h-3 w-3 shrink-0">
                    <span className="w-0.5 bg-red-400 animate-[bounce_0.6s_ease-in-out_infinite] h-full" />
                    <span className="w-0.5 bg-red-500 animate-[bounce_0.8s_ease-in-out_infinite_0.1s] h-2/3" />
                    <span className="w-0.5 bg-red-400 animate-[bounce_0.5s_ease-in-out_infinite_0.2s] h-4/5" />
                  </div>
                  <span className="hidden xl:inline">AUDIO</span>
                </>
              )}
            </button>

            {/* 6. MOBILE COMMAND CENTER MENU TRIGGER (Visible on < 768px) */}
            <button
              type="button"
              onClick={toggleCommandMenu}
              aria-label={isCommandMenuOpen ? 'Close Tactical Command Menu' : 'Open Tactical Command Menu'}
              className={`md:hidden flex items-center justify-center p-1.5 sm:p-2 border transition-all hud-bracket cursor-pointer active:scale-90 shadow-lg ${
                isCommandMenuOpen
                  ? 'bg-red-950/90 text-red-300 border-red-500 shadow-[0_0_15px_rgba(255,42,85,0.5)]'
                  : 'bg-[#060410]/95 backdrop-blur-xl text-white border-slate-700 hover:border-slate-400'
              }`}
            >
              {isCommandMenuOpen ? (
                <X className="w-4 h-4 text-red-400" />
              ) : (
                <div className="flex flex-col gap-1 items-center justify-center w-4 h-4">
                  <span className="w-4 h-0.5 bg-white rounded-full transition-all" />
                  <span
                    className="w-3 h-0.5 rounded-full transition-all self-end"
                    style={{ backgroundColor: activeColor }}
                  />
                  <span className="w-4 h-0.5 bg-white rounded-full transition-all" />
                </div>
              )}
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* BOTTOM NAVIGATION: GOD-TIER MOBILE CYBER-DOCK & DESKTOP RIBBON */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-2 max-w-6xl w-full mx-auto pointer-events-auto pb-[max(8px,env(safe-area-inset-bottom))] px-1 sm:px-0 transition-all duration-300 opacity-100 translate-y-0">
          
          {/* ======================================================================= */}
          {/* 1. MOBILE GOD-TIER FLOATING CYBER-DOCK (< 768px) */}
          {/* ======================================================================= */}
          <nav
            aria-label="Mobile Tactical Cyber Dock"
            className="flex md:hidden relative bg-[#060410]/95 backdrop-blur-2xl px-1.5 py-1.5 border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] items-center justify-between font-mono w-full transition-all duration-500 hud-bracket"
            style={{
              borderColor: activeBorder,
              boxShadow: isRedPhase
                ? '0 15px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255, 42, 85, 0.25)'
                : '0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(148, 163, 184, 0.15)',
            }}
          >
            {/* Quick 4 Sections */}
            {mobileDockItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex-1 flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer min-h-[50px] ${
                    isActive
                      ? isRedPhase
                        ? 'bg-red-950/80 text-red-300 border border-red-500/60 shadow-[0_0_12px_rgba(255,42,85,0.35)]'
                        : 'bg-slate-800/90 text-white border border-slate-600 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {/* Active Laser Indicator Beam */}
                  {isActive && (
                    <span
                      className="absolute -top-1 w-5 h-0.5 rounded-full animate-pulse shadow-sm"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}
                  <Icon className={`w-4 h-4 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className={`text-[9px] uppercase font-mono tracking-wider truncate ${isActive ? 'font-black' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Quick Trigger 5: FULL COMMAND HUB (Opens Tactical Drawer) */}
            <button
              type="button"
              onClick={toggleCommandMenu}
              aria-label="Open Full 10-Sector Command Hub"
              className={`relative flex-1 flex flex-col items-center justify-center py-2 px-0.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer min-h-[50px] ${
                isCommandMenuOpen
                  ? 'bg-red-950 text-red-300 border border-red-500 shadow-[0_0_15px_rgba(255,42,85,0.5)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {/* Sector Count Badge */}
              <span className="absolute -top-1.5 right-2 px-1 py-0.2 bg-red-600 text-white text-[7px] font-black rounded-full shadow-[0_0_8px_rgba(255,42,85,0.8)] animate-pulse">
                10
              </span>
              <Sliders className="w-4 h-4 mb-0.5 text-slate-300" />
              <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-slate-200">
                HUB
              </span>
            </button>

            {/* Quick Trigger 6: GLOWING REGISTRATION CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('register')}
              aria-label="Register for Enigma 5.0"
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer min-h-[50px] font-black relative overflow-hidden ${
                isRedPhase
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(255,42,85,0.7)] border border-red-400'
                  : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.7)] border border-slate-200'
              }`}
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 active:opacity-100 transition-opacity" />
              <Zap className="w-4 h-4 mb-0.5 animate-bounce text-inherit" />
              <span className="text-[9px] uppercase font-mono tracking-wider font-black">
                JOIN
              </span>
            </button>
          </nav>

          {/* ======================================================================= */}
          {/* 2. DESKTOP AEROSPACE RIBBON (>= 768px) */}
          {/* ======================================================================= */}
          <nav
            aria-label="Desktop Futuristic HUD Navigation"
            className="hidden md:flex bg-[#060410]/95 backdrop-blur-xl px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 border border-slate-800 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hud-bracket items-center justify-between gap-1 sm:gap-1.5 font-mono w-full transition-colors duration-500"
            style={{ borderColor: activeBorder }}
          >
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 shrink-0 mr-1.5">
              <Compass className="w-3.5 h-3.5 transition-colors duration-500" style={{ color: activeColor }} />
              <span className="uppercase tracking-wider text-[11px] font-black transition-colors duration-500" style={{ color: activeColor }}>
                ENIGMA:
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center justify-between w-full gap-0.5 sm:gap-1 md:gap-1.5 text-[9px] sm:text-[11px] md:text-xs">
              {allNavItems.map((item) => {
                const isActive = activeSection === item.id;
                const isRegister = item.id === 'register';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => handleNavClick(item.id)}
                    className={`group relative flex-1 text-center py-1 sm:py-1.5 px-0.5 sm:px-1.5 md:px-2 transition-all duration-200 uppercase font-mono tracking-wider flex items-center justify-center gap-0.5 sm:gap-1 focus:outline-none whitespace-nowrap cursor-pointer ${
                      isRegister
                        ? isRedPhase
                          ? 'bg-red-600 hover:bg-red-500 text-white font-black shadow-[0_0_15px_rgba(255,42,85,0.6)]'
                          : 'bg-white hover:bg-slate-200 text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                        : isActive
                        ? isRedPhase
                          ? 'text-red-300 font-bold bg-red-950/70 border border-red-500/60 shadow-[0_0_10px_rgba(255,42,85,0.3)]'
                          : 'text-white font-bold bg-slate-800 border border-slate-600'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="hidden xl:inline text-[9px] text-slate-500">
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

      {/* ========================================================================= */}
      {/* 2. FULL MOBILE TACTICAL COMMAND CENTER / DRAWER (MODAL SHEET) */}
      {/* ========================================================================= */}
      {isCommandMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end md:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Tactical Command Center"
        >
          {/* Backdrop with Blur & Scanline HUD */}
          <div
            onClick={toggleCommandMenu}
            className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity hud-grid cursor-pointer"
          />

          {/* Slide-Up Command Terminal Sheet */}
          <div className="relative w-full max-h-[88vh] bg-[#070512] border-t-2 border-x border-slate-700 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-slide-up pb-[max(16px,env(safe-area-inset-bottom))]">
            
            {/* Top Drag Handle & Tactical Header */}
            <div className="p-4 border-b border-slate-800/80 bg-[#090717]/90 flex flex-col gap-2 shrink-0">
              <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-1" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="font-mono text-xs font-black text-white tracking-widest uppercase">
                    TACTICAL COMMAND HUB // SECTORS
                  </span>
                </div>
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={toggleCommandMenu}
                  className="p-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-lg active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Telemetry Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/50 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <div className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3 h-3 text-red-400" />
                  <span>IST: {liveClock}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>NODE 07: ONLINE</span>
                </div>
                <div className="text-red-400 font-bold">
                  {scrollPercent}% DEPTH
                </div>
              </div>
            </div>

            {/* Scrollable Command Center Body */}
            <div className="overflow-y-auto px-4 py-3 space-y-4 max-h-[calc(88vh-140px)]">
              
              {/* Section 1: ALL 10 SECTORS HYPER-WARP MATRIX */}
              <div>
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>WARP MATRIX // 10 SECTORS</span>
                  <span className="text-slate-500">TAP TO TELEPORT</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {allNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;
                    const isCta = item.isCta;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all active:scale-95 cursor-pointer font-mono ${
                          isCta
                            ? 'col-span-2 bg-gradient-to-r from-red-600 to-rose-600 border-red-400 text-white shadow-[0_0_15px_rgba(255,42,85,0.4)]'
                            : isActive
                            ? 'bg-red-950/70 border-red-500 text-white shadow-[0_0_10px_rgba(255,42,85,0.3)]'
                            : 'bg-[#0d091e]/80 border-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              isCta
                                ? 'bg-black/30 text-white'
                                : isActive
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-slate-800/60 text-slate-400'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="text-[11px] font-black uppercase tracking-wider truncate flex items-center gap-1">
                              <span className="text-[9px] opacity-60">{item.num}</span>
                              <span className="truncate">{item.label}</span>
                            </div>
                            <div className="text-[9px] text-slate-400 truncate opacity-80">
                              {item.tag}
                            </div>
                          </div>
                        </div>

                        {isActive ? (
                          <div className="w-2 h-2 rounded-full bg-red-400 animate-ping shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: MOBILE TACTICAL TOOLKIT */}
              <div>
                <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>TACTICAL TOOLKIT</span>
                  <span className="text-slate-500">LIVE CONTROLS</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Tool 1: Squad Access Pass */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommandMenuOpen(false);
                      setTimeout(() => onOpenPassModal(), 100);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 bg-[#0f0b24] border border-slate-800 rounded-xl text-slate-200 active:scale-95 cursor-pointer hover:border-slate-600"
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-slate-300" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-center">
                      SQUAD PASS
                    </span>
                  </button>

                  {/* Tool 2: Matrix Rain Overload */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommandMenuOpen(false);
                      setTimeout(() => onOpenMatrixModal(), 100);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 bg-[#0f0b24] border border-slate-800 rounded-xl text-slate-200 active:scale-95 cursor-pointer hover:border-red-500"
                  >
                    <Code2 className="w-4 h-4 mb-1 text-red-400 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-center">
                      MATRIX
                    </span>
                  </button>

                  {/* Tool 3: Terminal CLI */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCommandMenuOpen(false);
                      setTimeout(() => setIsTerminalOpen(true), 100);
                    }}
                    className="flex flex-col items-center justify-center p-2.5 bg-[#0f0b24] border border-slate-800 rounded-xl text-slate-200 active:scale-95 cursor-pointer hover:border-slate-600"
                  >
                    <Terminal className="w-4 h-4 mb-1 text-slate-300" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-center">
                      TERMINAL
                    </span>
                  </button>
                </div>
              </div>

              {/* Section 3: MINI EVENT COUNTDOWN HUD CHIP */}
              <div className="bg-black/60 border border-slate-800 p-3 rounded-xl">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                  <span className="font-bold flex items-center gap-1 text-slate-200">
                    <Clock className="w-3 h-3 text-red-400" />
                    GENESIS COUNTDOWN
                  </span>
                  <span className="text-red-400 font-mono text-[9px]">OCTOBER 24, 2026</span>
                </div>
                
                <div className="grid grid-cols-4 gap-1 text-center font-mono">
                  <div className="bg-[#0b0818] py-1 px-1 rounded border border-slate-800">
                    <div className="text-xs font-black text-white">{countdown.days}</div>
                    <div className="text-[8px] text-slate-500">DAYS</div>
                  </div>
                  <div className="bg-[#0b0818] py-1 px-1 rounded border border-slate-800">
                    <div className="text-xs font-black text-white">{countdown.hours}</div>
                    <div className="text-[8px] text-slate-500">HRS</div>
                  </div>
                  <div className="bg-[#0b0818] py-1 px-1 rounded border border-slate-800">
                    <div className="text-xs font-black text-white">{countdown.minutes}</div>
                    <div className="text-[8px] text-slate-500">MINS</div>
                  </div>
                  <div className="bg-[#0b0818] py-1 px-1 rounded border border-slate-800">
                    <div className="text-xs font-black text-red-400">{countdown.seconds}</div>
                    <div className="text-[8px] text-slate-500">SECS</div>
                  </div>
                </div>
              </div>

              {/* Section 4: SOCIAL MEDIA & COMMUNITY CHANNELS */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={EVENT_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0d091e] border border-slate-800 rounded-xl text-slate-300 hover:text-white text-[10px] font-mono font-bold active:scale-95"
                >
                  <Share2 className="w-3 h-3 text-pink-400" />
                  <span>INSTAGRAM</span>
                </a>
                <a
                  href={EVENT_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0d091e] border border-slate-800 rounded-xl text-slate-300 hover:text-white text-[10px] font-mono font-bold active:scale-95"
                >
                  <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={EVENT_CONFIG.urls.unstop}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-red-950/60 border border-red-500/80 rounded-xl text-red-200 hover:text-white text-[10px] font-mono font-bold active:scale-95"
                >
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  <span>UNSTOP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE CYBERNETIC COMMAND TERMINAL MODAL */}
      {/* ========================================================================= */}
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
