'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Trophy, Award, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function PrizesSection() {
  const { prizes } = EVENT_CONFIG;

  return (
    <section
      id="prizes"
      aria-label="Enigma 5.0 Hackathon Prize Pool and Rewards"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020408] border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Cyan/Emerald Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#162436] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>BOUNTY VAULT // ARCHITECT INCENTIVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              PRIZE VAULT
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-left md:text-right bg-[#03060c]/90 p-4 border border-cyan-500/30 hud-bracket shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">TOTAL REWARD MATRIX</span>
            <span className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-emerald-400">
              {prizes.totalPool}
            </span>
          </div>
        </div>

        {/* 3 Main Prestige Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {prizes.mainPrizes.map((prize) => {
            const isFirst = prize.rank === '01';
            const isSecond = prize.rank === '02';
            const isThird = prize.rank === '03';

            return (
              <div
                key={prize.rank}
                className={`p-6 sm:p-8 bg-[#03060c]/95 border transition-all duration-300 hud-bracket flex flex-col justify-between relative backdrop-blur-md shadow-2xl ${
                  isFirst
                    ? 'border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.25)] order-first md:order-2 md:-translate-y-4 bg-gradient-to-b from-[#071322] to-[#03060c]'
                    : isSecond
                    ? 'border-pink-500/50 hover:border-pink-400 order-2 md:order-1'
                    : 'border-emerald-500/50 hover:border-emerald-400 order-3'
                }`}
              >
                {/* Top Badge */}
                {isFirst && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-mono text-[10px] font-black px-4 py-1 tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.5)] flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>GRAND CHAMPION ARCHITECT</span>
                  </div>
                )}

                <div>
                  {/* Rank Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#162436] font-mono text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider">{prize.place}</span>
                    <span
                      className={`font-mono text-xs font-extrabold px-2 py-0.5 border ${
                        isFirst
                          ? 'text-cyan-300 bg-cyan-950/40 border-cyan-400'
                          : isSecond
                          ? 'text-pink-300 bg-pink-950/40 border-pink-500/50'
                          : 'text-emerald-300 bg-emerald-950/40 border-emerald-500/50'
                      }`}
                    >
                      RANK // {prize.rank}
                    </span>
                  </div>

                  {/* Icon & Cash Amount */}
                  <div className="mt-8 flex items-center justify-between">
                    <Trophy
                      className={`w-10 h-10 ${
                        isFirst ? 'text-cyan-400' : isSecond ? 'text-pink-400' : 'text-emerald-400'
                      }`}
                    />
                    <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tighter">
                      {prize.amount}
                    </div>
                  </div>

                  <h3 className="mt-6 font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {prize.title}
                  </h3>

                  {/* Perks Checklist */}
                  <div className="mt-6 pt-4 border-t border-[#162436]/80">
                    <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3">
                      PERKS & INCLUSIONS:
                    </div>
                    <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                      {prize.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFirst ? 'text-cyan-400' : isSecond ? 'text-pink-400' : 'text-emerald-400'
                            }`}
                          />
                          <span className="leading-relaxed">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Assurance */}
                <div className="mt-8 pt-4 border-t border-[#162436] font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>INSTANT DISBURSEMENT</span>
                  </span>
                  <span className="text-slate-500">ZERO DELAY</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Perks & Institutional Backing Strip */}
        <div className="bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono text-xs">
          <div className="p-3 border border-[#162436]/60">
            <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">PARTICIPANT CREDENTIALS</div>
            <p className="text-slate-400 text-[11px]">Verified Cryptographic Certificate of Participation for all submitted squads.</p>
          </div>

          <div className="p-3 border border-[#162436]/60">
            <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">ACCELERATOR FAST-TRACK</div>
            <p className="text-slate-400 text-[11px]">Direct incubation interview access and seed grant considerations for top prototypes.</p>
          </div>

          <div className="p-3 border border-[#162436]/60">
            <div className="text-pink-400 font-bold uppercase tracking-wider mb-1">DEVELOPER TOOLKITS</div>
            <p className="text-slate-400 text-[11px]">Access to premium cloud compute credits, API quotas, and hardware kits.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
