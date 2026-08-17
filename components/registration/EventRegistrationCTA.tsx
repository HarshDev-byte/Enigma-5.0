'use client';

import React, { useState } from 'react';
import { Terminal, ExternalLink, Zap, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import HoloCard from '@/components/ui/HoloCard';

export default function EventRegistrationCTA() {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleRegisterClick = (url: string) => {
    sound.playAccessGranted();
    setIsInitializing(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#ff2a55', '#ff4757', '#ff6b81', '#ffffff', '#ff7f50'],
      });
    } catch {}

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsInitializing(false);
    }, 450);
  };

  return (
    <section
      id="register"
      aria-label="Architect Event Registration"
      className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Background glow in Neon Crimson Flame */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-red-600/15 via-rose-500/10 to-orange-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-rose-300 bg-[#060410]/95 px-4 py-1.5 border border-rose-500/40 uppercase tracking-[0.3em] hud-bracket shadow-lg">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>GATEWAY 10 // GENESIS HOLOGRAM ONLINE</span>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs sm:text-sm text-slate-400 tracking-[0.35em] uppercase">
            THE ARCHITECTURE IS IN YOUR HANDS
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-mono font-black text-white uppercase tracking-tight leading-tight">
            READY TO REWRITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-300 to-orange-400 drop-shadow-[0_0_40px_rgba(255,42,85,0.5)]">
              THE FUTURE?
            </span>
          </h2>
          <div className="font-mono text-base sm:text-xl text-rose-300 tracking-[0.25em] font-light uppercase pt-2">
            ENIGMA 5.0 — GENESIS // BEYOND THE FUTURE
          </div>
        </div>

        <p className="font-mono text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Submit your squad credentials. 100% Free Entry. ₹1,50,000+ Prize Vault. 36 hours of high-stakes systems engineering.
        </p>

        {/* Primary Register CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleRegisterClick(EVENT_CONFIG.urls.primaryRegistration)}
            disabled={isInitializing}
            className="group relative w-full sm:w-auto px-12 py-5 bg-red-600 hover:bg-red-500 text-white font-mono text-base sm:text-lg font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,42,85,0.6)] focus:outline-none focus:ring-2 focus:ring-rose-400 overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 fill-white" />
              <span>{isInitializing ? 'INITIALIZING ARCHITECT ACCESS...' : 'REGISTER NOW'}</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Platform Links */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <span className="text-slate-400 uppercase tracking-widest mr-2">OFFICIAL PLATFORMS:</span>

          <HoloCard
            glowColor="rgba(255, 42, 85, 0.4)"
            onClick={() => handleRegisterClick(EVENT_CONFIG.socials.unstop)}
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-rose-500 text-slate-100 hover:text-rose-300 flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <span>UNSTOP PORTAL</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
          </HoloCard>

          <HoloCard
            glowColor="rgba(255, 42, 85, 0.3)"
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-rose-500 text-slate-100 hover:text-rose-300 flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <a
              href={EVENT_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2"
            >
              <span>INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            </a>
          </HoloCard>

          <HoloCard
            glowColor="rgba(255, 42, 85, 0.3)"
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-rose-500 text-slate-100 hover:text-rose-300 flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <a
              href={EVENT_CONFIG.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2"
            >
              <span>LINKEDIN</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            </a>
          </HoloCard>
        </div>
      </div>
    </section>
  );
}
