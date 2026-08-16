'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Database, Calendar, Users, Trophy, Code2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function EnigmaArchive() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const editions = EVENT_CONFIG.pastEditions;
  const current = editions[selectedIdx];

  return (
    <section
      id="archive"
      aria-label="Enigma Past Editions Archive"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#020306]/95 border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#162436] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              <span>ENIGMA // ARCHIVE // PREVIOUS SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              PAST EDITIONS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Four consecutive years of pioneering engineering. A proven legacy of student innovators building breakthrough systems.
          </p>
        </div>

        {/* Edition Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {editions.map((item, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={item.edition}
                onClick={() => {
                  sound.playClick();
                  setSelectedIdx(idx);
                }}
                className={`p-4 font-mono text-left transition-all border hud-bracket backdrop-blur-md relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#070c14] border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                    : 'bg-[#03060c]/80 border-[#162436] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>ARCHIVE // 0{idx + 1}</span>
                  <span className="text-cyan-400 font-bold">{item.year}</span>
                </div>
                <div className="font-mono text-lg font-black tracking-tight text-white">
                  {item.edition}
                </div>
                <div className="text-xs text-slate-400 tracking-wider mt-0.5 truncate">
                  {item.theme}
                </div>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Archive Showcase Dossier */}
        <div className="bg-[#03060c]/90 border border-[#162436] p-6 sm:p-10 hud-bracket backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          {/* Left: Cinematic Visual Terminal Card */}
          <div className="lg:col-span-6 relative aspect-video w-full bg-[#070c14] border border-[#162436] flex flex-col justify-between p-6 overflow-hidden group shadow-inner">
            {/* Tech Pattern Grid */}
            <div className="absolute inset-0 hud-grid opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#030509] via-transparent to-cyan-500/10 pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-center font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                SYSTEM STATUS: COMPLETED
              </span>
              <span className="bg-black/60 px-2.5 py-1 border border-[#162436] text-[10px]">
                NODE {current.year}
              </span>
            </div>

            {/* Center Monumental Typography / Visual Motif */}
            <div className="relative z-10 my-auto text-center space-y-2 py-4">
              <div className="font-mono text-xs tracking-[0.3em] text-slate-500 uppercase">
                ARCHIVAL RECORDS // {current.year}
              </div>
              <div className="font-mono text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 tracking-tighter">
                {current.edition}
              </div>
              <div className="font-mono text-sm sm:text-base text-cyan-300 tracking-[0.2em] font-semibold uppercase">
                {current.theme}
              </div>
            </div>

            {/* Bottom Status Feed */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[11px] text-slate-400 border-t border-[#162436]/80 pt-3">
              <span>{current.participants}</span>
              <span className="text-emerald-400 font-bold">{current.prizeVault} VAULT</span>
            </div>
          </div>

          {/* Right: Detailed Archival Telemetry & Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#070c14] px-3.5 py-1.5 border border-[#243b55]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>ESTABLISHED PROVING GROUND</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-mono font-black text-white uppercase tracking-tight">
              {current.edition}: {current.theme}
            </h3>

            <p className="font-mono text-sm sm:text-base text-slate-300 leading-relaxed">
              {current.description}
            </p>

            {/* 3 Impact Stat Gauges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#162436]">
              <div className="bg-[#070c14]/80 p-3.5 border border-[#162436]">
                <div className="font-mono text-[10px] text-slate-500 uppercase flex items-center gap-1">
                  <Users className="w-3 h-3 text-cyan-400" />
                  <span>BUILDERS</span>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-white mt-1">
                  {current.participants}
                </div>
              </div>

              <div className="bg-[#070c14]/80 p-3.5 border border-[#162436]">
                <div className="font-mono text-[10px] text-slate-500 uppercase flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-emerald-400" />
                  <span>PROJECTS</span>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-white mt-1">
                  {current.projects}
                </div>
              </div>

              <div className="bg-[#070c14]/80 p-3.5 border border-[#162436]">
                <div className="font-mono text-[10px] text-slate-500 uppercase flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span>PRIZES</span>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-amber-300 mt-1">
                  {current.prizeVault}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
