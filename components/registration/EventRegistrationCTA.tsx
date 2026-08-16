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
        colors: ['#00f0ff', '#10ff88', '#ec4899'],
      });
    } catch {}

    // Fast cinematic visual pulse and smooth external redirect
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsInitializing(false);
    }, 450);
  };

  return (
    <section
      id="register"
      aria-label="Architect Event Registration"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020305]/95 border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Center Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#03060c]/90 px-4 py-1.5 border border-cyan-500/40 uppercase tracking-[0.3em] hud-bracket">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>GATEWAY 07 // REGISTRATION ACCESS</span>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs sm:text-sm text-slate-500 tracking-[0.35em] uppercase">
            THE SYSTEM IS READY FOR RECONSTRUCTION
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-mono font-black text-white uppercase tracking-tight leading-tight">
            READY TO REWRITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
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

        {/* Primary Giant Rebuild CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleRegisterClick(EVENT_CONFIG.urls.primaryRegistration)}
            disabled={isInitializing}
            className="group relative w-full sm:w-auto px-12 py-5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-base sm:text-lg font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,240,255,0.6)] focus:outline-none focus:ring-2 focus:ring-cyan-400 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <Zap className="w-5 h-5 fill-black" />
              <span>{isInitializing ? 'INITIALIZING ARCHITECT ACCESS...' : 'REGISTER NOW'}</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Direct Submission & Social Endpoints */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <span className="text-slate-500 uppercase tracking-widest mr-2">OFFICIAL PLATFORMS:</span>

          <button
            onClick={() => handleRegisterClick(EVENT_CONFIG.socials.unstop)}
            className="px-6 py-3 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-cyan-400 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <span>UNSTOP PORTAL</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          <a
            href={EVENT_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-pink-400 text-slate-200 hover:text-pink-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]"
          >
            <span>INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
          </a>

          <a
            href={EVENT_CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-blue-400 text-slate-200 hover:text-blue-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(96,165,250,0.2)]"
          >
            <span>LINKEDIN</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
