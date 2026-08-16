'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Radio, ArrowRight, ExternalLink, Sparkles, Bell } from 'lucide-react';
import { sound } from '@/lib/audio';

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
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#03060c]/90 border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Magenta / Cyan Atmospheric Pool */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-pink-400 bg-pink-950/40 px-4 py-1.5 border border-pink-500/40 uppercase tracking-[0.25em] hud-bracket">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>COMMUNITY SIGNAL // LIVE TRANSMISSIONS</span>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-xs sm:text-sm text-slate-400 tracking-[0.3em] uppercase">
            JOIN THE ARCHITECT NETWORK
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
            FOLLOW THE SIGNAL
          </h2>
        </div>

        <p className="font-mono text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Follow ENIGMA for real-time announcements, track revelations, mentor spotlights, behind-the-scenes engineering logs, and everything leading up to GENESIS.
        </p>

        {/* Large Instagram Action Card & CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={EVENT_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-mono text-sm sm:text-base font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(236,72,153,0.4)] focus:outline-none focus:ring-2 focus:ring-pink-400 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <InstagramIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>[ FOLLOW ENIGMA ON INSTAGRAM → ]</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Community Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 text-left font-mono text-xs">
          <div className="bg-[#070c14]/90 border border-[#162436] p-4 hud-bracket">
            <div className="text-pink-400 font-bold flex items-center gap-1.5 mb-1">
              <Bell className="w-3.5 h-3.5" />
              <span>LIVE ALERTS</span>
            </div>
            <p className="text-slate-400 text-[11px]">Instant notifications on registration rounds and problem releases.</p>
          </div>

          <div className="bg-[#070c14]/90 border border-[#162436] p-4 hud-bracket">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BEHIND THE SCENES</span>
            </div>
            <p className="text-slate-400 text-[11px]">Exclusive glimpses into the organizing council and venue arena.</p>
          </div>

          <div className="bg-[#070c14]/90 border border-[#162436] p-4 hud-bracket">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>MENTOR AMAs</span>
            </div>
            <p className="text-slate-400 text-[11px]">Pre-hackathon technical workshops, AMAs, and livestreamed panels.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
