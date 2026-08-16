'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Trophy, Award, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function PrizesSection() {
  const { prizes } = EVENT_CONFIG;

  return (
    <section
      id="prizes"
      aria-label="Enigma 5.0 Hackathon Prize Pool and Rewards"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-purple-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#312856] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>BOUNTY VAULT // ARCHITECT INCENTIVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              PRIZE VAULT
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-left md:text-right bg-[#060410]/95 p-4 border border-purple-500/40 hud-bracket shadow-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">TOTAL REWARD MATRIX</span>
            <span className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-300">
              {prizes.totalPool}
            </span>
          </div>
        </div>

        {/* 3 Main Prestige Podium Cards with 3D Holographic Glare */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {prizes.mainPrizes.map((prize) => {
            const isFirst = prize.rank === '01';
            const isSecond = prize.rank === '02';
            const isThird = prize.rank === '03';
            const glow = isFirst ? '#fcee0a' : isSecond ? '#a855f7' : '#00ff66';

            return (
              <HoloCard
                key={prize.rank}
                glowColor={glow}
                className={`p-6 sm:p-8 bg-[#060410]/95 border transition-all duration-300 flex flex-col justify-between relative backdrop-blur-md shadow-2xl ${
                  isFirst
                    ? 'border-amber-400 shadow-[0_0_35px_rgba(252,238,10,0.3)] order-first md:order-2 md:-translate-y-4 bg-gradient-to-b from-[#151004] via-[#0b081a] to-[#060410]'
                    : isSecond
                    ? 'border-purple-500/60 hover:border-purple-400 order-2 md:order-1 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]'
                    : 'border-emerald-500/60 hover:border-emerald-400 order-3 hover:shadow-[0_0_25px_rgba(0,255,102,0.3)]'
                }`}
              >
                {/* Top Badge for 1st Place */}
                {isFirst && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 text-black font-mono text-[10px] font-black px-4 py-1 tracking-widest uppercase shadow-[0_0_15px_rgba(252,238,10,0.6)] flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 fill-black" />
                    <span>GRAND CHAMPION ARCHITECT</span>
                  </div>
                )}

                <div>
                  {/* Rank Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#241a45] font-mono text-xs">
                    <span className="text-slate-300 font-bold uppercase tracking-wider">{prize.place}</span>
                    <span
                      className={`font-mono text-xs font-extrabold px-2.5 py-0.5 border ${
                        isFirst
                          ? 'text-amber-300 bg-amber-950/40 border-amber-400'
                          : isSecond
                          ? 'text-purple-300 bg-purple-950/40 border-purple-400'
                          : 'text-emerald-300 bg-emerald-950/40 border-emerald-400'
                      }`}
                    >
                      RANK // {prize.rank}
                    </span>
                  </div>

                  {/* Icon & Cash Amount */}
                  <div className="mt-8 flex items-center justify-between">
                    <Trophy
                      className={`w-10 h-10 ${
                        isFirst ? 'text-amber-400' : isSecond ? 'text-purple-400' : 'text-emerald-400'
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
                  <div className="mt-6 pt-4 border-t border-[#241a45]">
                    <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                      PERKS & INCLUSIONS:
                    </div>
                    <ul className="space-y-2.5 font-mono text-xs text-slate-200">
                      {prize.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFirst ? 'text-amber-400' : isSecond ? 'text-purple-400' : 'text-emerald-400'
                            }`}
                          />
                          <span className="leading-relaxed">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Assurance */}
                <div className="mt-8 pt-4 border-t border-[#241a45] font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>DISBURSEMENT: GUARANTEED</span>
                  <span className={isFirst ? 'text-amber-400 font-bold' : isSecond ? 'text-purple-400 font-bold' : 'text-emerald-400 font-bold'}>
                    TROPHY + VAULT ACCESS
                  </span>
                </div>
              </HoloCard>
            );
          })}
        </div>

        {/* Category Bounties & Special Awards Grid */}
        <div className="pt-8 border-t border-[#312856] space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>SPECIAL CATEGORY BOUNTIES & TRACK COMMENDATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prizes.specialPrizes.map((bounty, i) => (
              <HoloCard
                key={i}
                glowColor="#a855f7"
                className="bg-[#060410]/95 border border-[#241a45] p-5 flex flex-col justify-between hover:border-purple-500/60 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#241a45]">
                    <span className="text-cyan-400 font-bold">{bounty.title}</span>
                    <span className="text-amber-300 font-black">{bounty.amount}</span>
                  </div>
                  <p className="mt-3 font-mono text-xs text-slate-300 leading-relaxed">
                    {bounty.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#241a45] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>CATEGORY BOUNTY</span>
                  <span className="text-purple-400 font-bold">FELLOWSHIP PASS</span>
                </div>
              </HoloCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
