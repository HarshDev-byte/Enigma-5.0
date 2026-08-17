'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Trophy, Award, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function PrizesSection() {
  const { prizes } = EVENT_CONFIG;

  return (
    <section
      id="prizes"
      aria-label="Enigma 5.0 Hackathon Prize Pool and Rewards"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-slate-800 gap-3 sm:gap-4">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-red-400 tracking-widest uppercase mb-1.5 sm:mb-2 flex items-center gap-2 font-bold">
              <Trophy className="w-3.5 h-3.5 text-red-500" />
              <span>BOUNTY VAULT // ARCHITECT INCENTIVES</span>
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              PRIZE VAULT
            </h2>
          </div>
          <div className="mt-2 md:mt-0 font-mono text-left md:text-right bg-[#060410]/95 p-3 sm:p-4 border border-red-500/50 hud-bracket shadow-xl rounded-xl">
            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
              TOTAL REWARD MATRIX
            </span>
            <span className="text-2xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              {prizes.totalPool}
            </span>
          </div>
        </div>

        {/* 3 Main Prestige Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {prizes.mainPrizes.map((prize) => {
            const isFirst = prize.rank === '01';
            const isSecond = prize.rank === '02';
            const glow = isFirst ? '#fcee0a' : isSecond ? '#ff2a55' : '#94a3b8';

            return (
              <HoloCard
                key={prize.rank}
                glowColor={glow}
                className={`p-5 sm:p-8 bg-[#060410]/90 border transition-all duration-300 flex flex-col justify-between relative shadow-2xl rounded-2xl ${
                  isFirst
                    ? 'border-amber-400 shadow-[0_0_35px_rgba(252,238,10,0.3)] order-first md:order-2 md:-translate-y-4 bg-gradient-to-b from-[#151004] via-[#0b081a] to-[#060410]'
                    : isSecond
                    ? 'border-red-500/70 hover:border-red-400 order-2 md:order-1 hover:shadow-[0_0_25px_rgba(255,42,85,0.3)]'
                    : 'border-slate-700 hover:border-slate-500 order-3 hover:shadow-lg'
                }`}
              >
                {/* Top Badge for 1st Place */}
                {isFirst && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black font-mono text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 tracking-widest uppercase shadow-[0_0_15px_rgba(252,238,10,0.6)] flex items-center gap-1.5 whitespace-nowrap rounded-full">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>GRAND CHAMPION</span>
                  </div>
                )}

                <div>
                  {/* Rank Header */}
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 font-mono text-xs">
                    <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                      {prize.place}
                    </span>
                    <span
                      className={`font-mono text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 border rounded ${
                        isFirst
                          ? 'text-amber-300 bg-amber-950/40 border-amber-400'
                          : isSecond
                          ? 'text-red-300 bg-red-950/40 border-red-500'
                          : 'text-slate-300 bg-slate-800/40 border-slate-600'
                      }`}
                    >
                      RANK // {prize.rank}
                    </span>
                  </div>

                  {/* Icon & Cash Amount */}
                  <div className="mt-5 sm:mt-8 flex items-center justify-between">
                    <Trophy
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        isFirst ? 'text-amber-400' : isSecond ? 'text-red-400' : 'text-slate-300'
                      }`}
                    />
                    <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tighter">
                      {prize.amount}
                    </div>
                  </div>

                  <h3 className="mt-4 sm:mt-6 font-mono text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
                    {prize.title}
                  </h3>
                </div>

                {/* Perks Checklist */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800 space-y-2">
                  {prize.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-slate-300">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isFirst ? 'text-amber-400' : isSecond ? 'text-red-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{perk}</span>
                    </div>
                  ))}
                </div>
              </HoloCard>
            );
          })}
        </div>

        {/* Track Bounties & Special Categories */}
        <div className="pt-4 border-t border-slate-800">
          <div className="font-mono text-xs text-red-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-red-500" />
            <span>CATEGORY BOUNTIES & TRACK WINNERS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            {prizes.trackPrizes.map((tp, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 bg-[#060410]/95 border border-slate-800/90 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{tp.category}</div>
                  <div className="text-sm font-black text-white mt-0.5">{tp.title}</div>
                </div>
                <div className="text-base font-black text-red-400">{tp.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
