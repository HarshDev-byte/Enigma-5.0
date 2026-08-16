'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

interface NavigationHudProps {
  isGenesisActive?: boolean;
}

export default function NavigationHud({ isGenesisActive = false }: NavigationHudProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'GENESIS', href: '#genesis' },
    { label: 'DOMAINS', href: '#three-systems' },
    { label: 'CHALLENGE', href: '#challenges' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'PRIZES', href: '#prizes' },
    { label: 'FAQ', href: '#faq' },
    { label: 'REGISTER', href: '#register' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030508]/92 backdrop-blur-md border-b border-[#162436] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / System ID */}
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <div
              className={`w-8 h-8 border flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                isGenesisActive
                  ? 'border-emerald-400 text-emerald-400 group-hover:bg-emerald-400/10'
                  : 'border-cyan-400 text-cyan-400 group-hover:bg-cyan-400/10'
              }`}
            >
              E5
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-widest text-slate-100 uppercase">
                  {EVENT_CONFIG.eventName}
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 border ${
                    isGenesisActive
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
                      : 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30'
                  }`}
                >
                  {isGenesisActive ? 'GENESIS // ACTIVE' : 'NODE 07'}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                PROTOCOL 2097 // CLASSIFIED
              </span>
            </div>
          </a>

          {/* Desktop HUD Navigation */}
          <nav
            className="hidden md:flex items-center gap-5 lg:gap-6"
            aria-label="Main protocol navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => sound.playClick()}
                className="font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors tracking-widest relative py-1 focus:outline-none focus:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Action External CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={EVENT_CONFIG.urls.primaryRegistration}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className={`font-mono text-xs px-4 py-1.5 border font-bold tracking-wider transition-all ${
                isGenesisActive
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-950/40 hover:bg-emerald-400 hover:text-black'
                  : 'border-cyan-400 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
              }`}
            >
              REGISTER →
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 border border-[#162436] bg-[#070c14]"
            aria-label="Toggle navigation terminal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-[#162436] w-full">
          <div
            className={`h-full transition-all duration-150 ${
              isGenesisActive ? 'bg-emerald-400 shadow-[0_0_8px_#10ff88]' : 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
            }`}
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#030508]/98 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col justify-between pb-12 border-b border-cyan-500/20">
          <div className="flex flex-col space-y-3">
            <div className="font-mono text-[10px] text-cyan-400 tracking-widest mb-2 border-b border-[#162436] pb-2">
              // ARCHITECT NAVIGATION TERMINAL
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-mono text-base text-slate-200 hover:text-cyan-400 py-2 border-b border-[#162436]/50 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-500">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#162436]">
            <a
              href={EVENT_CONFIG.urls.primaryRegistration}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center font-mono text-xs py-3.5 border border-cyan-400 bg-cyan-400 text-black uppercase tracking-widest font-black shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              [ REGISTER NOW ]
            </a>
          </div>
        </div>
      )}
    </>
  );
}
