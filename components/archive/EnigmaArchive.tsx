'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Archive, Users, Trophy, Code2, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function EnigmaArchive() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const editions = EVENT_CONFIG.pastEditions;
  const current = editions[selectedIdx];

  return (
    <section
      id="archive"
      aria-label="Enigma Past Editions and Legacy"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-slate-800 gap-3 sm:gap-4">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-red-400 tracking-widest uppercase mb-1.5 sm:mb-2 flex items-center gap-2 font-bold">
              <Archive className="w-3.5 h-3.5 text-red-500" />
              <span>THE CHRONICLES // ARCHIVAL RECORDS</span>
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              ENIGMA ARCHIVE
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            Four consecutive years of pioneering engineering. A proven legacy of student innovators building breakthrough systems.
          </p>
        </div>

        {/* Edition Selector Tabs (Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {editions.map((item, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <HoloCard
                key={item.edition}
                glowColor="rgba(255, 42, 85, 0.4)"
                onClick={() => {
                  sound.playClick();
                  setSelectedIdx(idx);
                }}
                className={`p-2.5 sm:p-4 font-mono text-left transition-all border relative overflow-hidden active:scale-95 cursor-pointer rounded-xl ${
                  isSelected
                    ? 'bg-[#0f0a14] border-red-500 text-white shadow-[0_0_20px_rgba(255,42,85,0.3)]'
                    : 'bg-[#060410]/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 mb-1">
                  <span>ARCHIVE // 0{idx + 1}</span>
                  <span className="text-red-400 font-bold">{item.year}</span>
                </div>
                <div className="font-mono text-sm sm:text-lg font-black tracking-tight text-white">
                  {item.edition}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 tracking-wider mt-0.5 truncate">
                  {item.theme}
                </div>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 shadow-[0_0_8px_rgba(255,42,85,0.8)]" />
                )}
              </HoloCard>
            );
          })}
        </div>

        {/* Active Archive Showcase Dossier */}
        <HoloCard
          glowColor="rgba(255, 42, 85, 0.4)"
          className="bg-[#060410]/90 border border-slate-800 p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center shadow-2xl rounded-2xl"
        >
          {/* Left: Cinematic Visual Terminal Card */}
          <div className="lg:col-span-6 relative aspect-video w-full bg-[#08060f] border border-slate-800 flex flex-col justify-between p-4 sm:p-6 overflow-hidden group shadow-inner rounded-xl">
            <div className="absolute inset-0 hud-grid opacity-40 pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[9px] sm:text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-red-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                STATUS: COMPLETED
              </span>
              <span className="bg-black/80 px-2 py-0.5 border border-slate-700 text-[9px] sm:text-[10px] text-slate-300">
                NODE {current.year}
              </span>
            </div>

            {/* Center Monumental Typography */}
            <div className="relative z-10 my-auto text-center space-y-1 sm:space-y-2 py-2 sm:py-4">
              <div className="font-mono text-[9px] sm:text-xs tracking-[0.25em] text-slate-500 uppercase">
                COMMISSIONED ARCHIVE // {current.year}
              </div>
              <div className="text-2xl sm:text-5xl font-mono font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,42,85,0.4)]">
                {current.edition}
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-red-400 tracking-wider">
                {current.theme}
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[9px] sm:text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
              <span className="truncate">{current.teams} ATTENDEES</span>
              <span className="text-white font-bold">{current.prize} POOL</span>
            </div>
          </div>

          {/* Right: Detailed Dossier & Breakdown */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 font-mono">
            <div>
              <div className="text-[10px] sm:text-xs text-red-400 font-bold uppercase tracking-widest">
                HISTORICAL RETROSPECTIVE
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white uppercase mt-1 tracking-tight">
                {current.edition} // {current.year}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Stat Counters Matrix */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-left">
              <div className="p-3 bg-[#080512] border border-slate-800 rounded-lg">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 uppercase">
                  <Users className="w-3 h-3 text-red-400" />
                  <span>TOTAL BUILDERS</span>
                </div>
                <div className="text-base sm:text-xl font-black text-white mt-1">
                  {current.teams}
                </div>
              </div>

              <div className="p-3 bg-[#080512] border border-slate-800 rounded-lg">
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 uppercase">
                  <Trophy className="w-3 h-3 text-red-400" />
                  <span>PRIZE REWARDS</span>
                </div>
                <div className="text-base sm:text-xl font-black text-white mt-1">
                  {current.prize}
                </div>
              </div>
            </div>

            {/* Champion Squad Callout */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-red-950/40 via-[#0d091e] to-black border border-red-500/40 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-red-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-red-400" />
                <span>GRAND CHAMPION SQUAD</span>
              </div>
              <div className="text-sm sm:text-base font-black text-white">
                {current.winner}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400">
                {current.highlight}
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </section>
  );
}
