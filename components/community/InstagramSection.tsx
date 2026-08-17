'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Radio, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramSection() {
  return (
    <section
      id="community"
      aria-label="Enigma Official Instagram Community"
      className="relative pt-14 pb-24 sm:pt-20 sm:pb-36 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-red-400 bg-[#060410]/90 px-3.5 py-1.5 border border-red-500/40 uppercase tracking-[0.2em] sm:tracking-[0.25em] hud-bracket shadow-lg">
          <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
          <span>COMMUNITY SIGNAL // LIVE TRANSMISSIONS</span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="font-mono text-[11px] sm:text-sm text-slate-400 tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            JOIN THE ARCHITECT NETWORK
          </div>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
            FOLLOW THE SIGNAL
          </h2>
        </div>

        <p className="font-mono text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Follow ENIGMA for real-time announcements, track revelations, mentor spotlights, behind-the-scenes engineering logs, and everything leading up to GENESIS.
        </p>

        {/* Large Instagram Action Card & CTA */}
        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={EVENT_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs sm:text-base font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 sm:gap-3 shadow-[0_0_35px_rgba(255,42,85,0.6)] border border-red-400/60 overflow-hidden cursor-pointer active:scale-95 rounded-xl"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>@csisiesgst ON INSTAGRAM</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Live Broadcast Telemetry Strip */}
        <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center font-mono text-xs">
          <HoloCard glowColor="rgba(255, 42, 85, 0.4)" className="bg-[#060410]/90 border border-slate-800 p-3.5 sm:p-4 shadow-lg rounded-xl">
            <div className="text-red-400 font-bold uppercase mb-0.5 text-[11px] sm:text-xs">LIVE DISPATCHES</div>
            <div className="text-slate-400 text-[10px] sm:text-[11px]">Instant reveals & timeline updates</div>
          </HoloCard>

          <HoloCard glowColor="rgba(255, 42, 85, 0.4)" className="bg-[#060410]/90 border border-slate-800 p-3.5 sm:p-4 shadow-lg rounded-xl">
            <div className="text-red-400 font-bold uppercase mb-0.5 text-[11px] sm:text-xs">BEHIND THE SCENES</div>
            <div className="text-slate-400 text-[10px] sm:text-[11px]">Council logs & lab preparations</div>
          </HoloCard>

          <HoloCard glowColor="rgba(255, 42, 85, 0.4)" className="bg-[#060410]/90 border border-slate-800 p-3.5 sm:p-4 shadow-lg rounded-xl">
            <div className="text-red-400 font-bold uppercase mb-0.5 text-[11px] sm:text-xs">WINNER ANNOUNCEMENTS</div>
            <div className="text-slate-400 text-[10px] sm:text-[11px]">Podium broadcasts & trophy galas</div>
          </HoloCard>
        </div>
      </div>
    </section>
  );
}
