'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Terminal, ExternalLink, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';

export default function EventRegistrationCTA() {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleRegisterClick = (url: string) => {
    setIsInitializing(true);
    sound.playGenesisActivation();

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#a855f7', '#d946ef', '#10ff88'],
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
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Center Beam with Moodboard Violet/Cyan Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-cyan-500/15 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-300 bg-[#060410]/95 px-4 py-1.5 border border-purple-500/40 uppercase tracking-[0.3em] hud-bracket shadow-lg">
          <Terminal className="w-3.5 h-3.5 text-purple-400" />
          <span>GATEWAY 10 // REGISTRATION ACCESS</span>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs sm:text-sm text-slate-400 tracking-[0.35em] uppercase">
            THE SYSTEM IS READY FOR RECONSTRUCTION
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-mono font-black text-white uppercase tracking-tight leading-tight">
            READY TO REWRITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              THE FUTURE?
            </span>
          </h2>
          <div className="font-mono text-base sm:text-xl text-cyan-300 tracking-[0.25em] font-light uppercase pt-2">
            ENIGMA 5.0 — GENESIS // BEYOND THE FUTURE
          </div>
        </div>

        <p className="font-mono text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Submit your squad credentials. 100% Free Entry. ₹1,50,000+ Prize Vault. 36 hours of high-stakes systems engineering.
        </p>

        {/* Primary Giant Rebuild CTA with Moodboard Gradient */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleRegisterClick(EVENT_CONFIG.urls.primaryRegistration)}
            disabled={isInitializing}
            className="group relative w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:brightness-110 text-black font-mono text-base sm:text-lg font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(168,85,247,0.6)] focus:outline-none focus:ring-2 focus:ring-purple-400 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 fill-black" />
              <span>{isInitializing ? 'INITIALIZING ARCHITECT ACCESS...' : 'REGISTER NOW'}</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Direct Submission & Social Endpoints */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <span className="text-slate-400 uppercase tracking-widest mr-2">OFFICIAL PLATFORMS:</span>

          <button
            onClick={() => handleRegisterClick(EVENT_CONFIG.socials.unstop)}
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-cyan-400 text-slate-100 hover:text-cyan-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] shadow-md"
          >
            <span>UNSTOP PORTAL</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          <a
            href={EVENT_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-pink-400 text-slate-100 hover:text-pink-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] shadow-md"
          >
            <span>INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
          </a>

          <a
            href={EVENT_CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#060410]/95 hover:bg-[#0b081a] border border-[#312856] hover:border-blue-400 text-slate-100 hover:text-blue-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] shadow-md"
          >
            <span>LINKEDIN</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
