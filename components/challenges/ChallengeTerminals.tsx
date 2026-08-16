'use client';

import React, { useState } from 'react';
import { CHALLENGE_DOMAINS } from '@/lib/constants';
import { ChallengeDomain } from '@/lib/types';
import ChallengeDetailModal from './ChallengeDetailModal';
import { Terminal, ArrowRight, Activity, Cpu, Globe2, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ChallengeTerminals() {
  const [activeModalDomain, setActiveModalDomain] = useState<ChallengeDomain | null>(null);

  const handleOpenModal = (domain: ChallengeDomain) => {
    sound.playClick();
    setActiveModalDomain(domain);
  };

  return (
    <section
      id="challenges"
      aria-label="Genesis Challenge Domains and Tracks"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#03060c]/90 border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#162436]">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 inline-block" />
              <span>STAGE 03 // ARCHITECTURAL WORLDS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              CHALLENGE DOMAINS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Three classified system terminals. Each presents a critical vector of the 2097 collapse waiting for architectural intervention.
          </p>
        </div>

        {/* 3 Cyberpunk Terminal Worlds */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CHALLENGE_DOMAINS.map((domain, idx) => {
            const Icon =
              domain.id === 'health'
                ? Activity
                : domain.id === 'finance'
                ? Cpu
                : Globe2;

            const isHealth = domain.id === 'health';
            const isFinance = domain.id === 'finance';
            const isEarth = domain.id === 'sustainability';

            return (
              <div
                key={domain.id}
                className={`bg-[#03060c]/90 border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hud-bracket group relative backdrop-blur-md ${
                  isHealth
                    ? 'border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]'
                    : isFinance
                    ? 'border-violet-500/30 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]'
                    : 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,255,136,0.2)]'
                }`}
              >
                {/* Terminal Header */}
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 pb-3 border-b border-[#162436]">
                    <span className="font-bold tracking-wider">{domain.systemCode}</span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold ${
                        isHealth
                          ? 'text-pink-400 bg-pink-950/40 border border-pink-500/30'
                          : isFinance
                          ? 'text-violet-400 bg-violet-950/40 border border-violet-500/30'
                          : 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                      }`}
                    >
                      CLEARANCE: OPEN
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Icon
                      className={`w-8 h-8 ${
                        isHealth
                          ? 'text-pink-400'
                          : isFinance
                          ? 'text-violet-400'
                          : 'text-emerald-400'
                      }`}
                    />
                    <span className="font-mono text-xs text-slate-400 font-bold">
                      WORLD 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-mono text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                    {domain.domain}
                  </h3>

                  <div className="font-mono text-xs text-slate-400 mt-1 font-semibold">
                    {domain.subtitle}
                  </div>

                  <p className="mt-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {domain.tagline}
                  </p>
                </div>

                {/* Tracks preview & CTA */}
                <div className="mt-8 pt-4 border-t border-[#162436]">
                  <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                    AVAILABLE TRACKS ({domain.tracks.length}):
                  </div>

                  <ul className="space-y-1.5 font-mono text-xs text-slate-300 mb-6">
                    {domain.tracks.map((t, i) => (
                      <li key={i} className="truncate text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 shrink-0" />
                        <span className="truncate">{t.title}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleOpenModal(domain)}
                    className={`w-full py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 focus:outline-none ${
                      isHealth
                        ? 'border-pink-500/60 bg-pink-950/30 text-pink-300 hover:bg-pink-400 hover:text-black'
                        : isFinance
                        ? 'border-violet-500/60 bg-violet-950/30 text-violet-300 hover:bg-violet-400 hover:text-black'
                        : 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-400 hover:text-black'
                    }`}
                  >
                    <span>[ ACCESS SPECIFICATION DOSSIER ]</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dossier */}
      <ChallengeDetailModal
        domain={activeModalDomain}
        onClose={() => setActiveModalDomain(null)}
      />
    </section>
  );
}
