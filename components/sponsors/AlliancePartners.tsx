'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Cpu, Shield, Sparkles, Award } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function AlliancePartners() {
  const { sponsors } = EVENT_CONFIG;

  return (
    <section
      aria-label="Alliance Sponsors and Patron Nodes"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#03060c] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1 border border-cyan-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALLIANCE INFRASTRUCTURE // 2097</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
            PATRON & RESEARCH NODES
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-slate-400">
            Backed by foundational compute labs, zero-knowledge research institutions, and planetary infrastructure alliances.
          </p>
        </div>

        {/* 1. Title Sponsor Showcase */}
        <div>
          <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            TITLE PATRON
          </div>
          <div className="grid grid-cols-1">
            {sponsors.title.map((s) => (
              <div
                key={s.name}
                className="bg-gradient-to-r from-[#091524] via-[#070c14] to-[#091524] border border-cyan-400/60 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 hud-bracket shadow-[0_0_30px_rgba(0,240,255,0.15)] group"
              >
                <div>
                  <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                    {s.tier}
                  </div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 uppercase">
                    {s.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-slate-300 mt-2">
                    {s.desc}
                  </p>
                </div>

                <div className="bg-black/60 px-8 py-5 border border-cyan-500/40 text-center font-mono font-black text-xl sm:text-2xl text-cyan-300 tracking-widest">
                  {s.logoText}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Gold Patrons */}
        <div>
          <div className="font-mono text-xs text-fuchsia-400 font-bold uppercase tracking-widest mb-4">
            GOLD PATRONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsors.gold.map((s) => (
              <div
                key={s.name}
                className="bg-[#070c14] border border-[#162436] hover:border-fuchsia-500/50 p-6 flex flex-col justify-between transition-all hud-bracket"
              >
                <div>
                  <div className="font-mono text-[10px] text-fuchsia-400 tracking-widest uppercase">
                    {s.tier}
                  </div>
                  <h4 className="font-mono text-lg font-bold text-white mt-1 uppercase">
                    {s.name}
                  </h4>
                  <p className="font-mono text-xs text-slate-400 mt-2">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#162436] flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-500">{s.logoText}</span>
                  <span className="text-fuchsia-400 text-[10px]">CONNECTED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Silver Nodes */}
        <div>
          <div className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest mb-4">
            SILVER NODES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsors.silver.map((s) => (
              <div
                key={s.name}
                className="bg-[#070c14] border border-[#162436] hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all hud-bracket"
              >
                <div>
                  <div className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
                    {s.tier}
                  </div>
                  <h4 className="font-mono text-lg font-bold text-white mt-1 uppercase">
                    {s.name}
                  </h4>
                  <p className="font-mono text-xs text-slate-400 mt-2">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#162436] flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-500">{s.logoText}</span>
                  <span className="text-emerald-400 text-[10px]">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Community Partners */}
        <div>
          <div className="font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
            COMMUNITY & ECOSYSTEM PARTNERS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
            {sponsors.community.map((s) => (
              <div
                key={s.name}
                className="bg-[#050912] border border-[#162436] p-4 text-center text-slate-300 hover:border-cyan-400/40 transition-colors"
              >
                <div className="font-bold text-white">{s.name}</div>
                <div className="text-[10px] text-slate-500 mt-1">{s.logoText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
