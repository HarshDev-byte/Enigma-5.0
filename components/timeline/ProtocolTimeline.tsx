'use client';

import React from 'react';
import { TIMELINE_MILESTONES } from '@/lib/constants';
import { Clock, ShieldCheck, Lock, Radio } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ProtocolTimeline() {
  return (
    <section
      id="timeline"
      aria-label="Event Timeline and Mission Phases"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#04070d] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b border-[#162436] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
              // STAGE 04: PROTOCOL TIMELINE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
              MISSION CHRONOLOGY
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400">
            TOTAL TIME: 36 HOURS // LIVE SANDBOX INFILTRATION
          </div>
        </div>

        {/* Chronological Milestone List */}
        <div className="relative border-l border-[#162436] ml-4 sm:ml-8 space-y-12">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isArmed = m.status === 'ARMED';
            const isStandby = m.status === 'STANDBY';

            return (
              <div key={m.phase} className="relative pl-8 sm:pl-12 group">
                {/* Node icon / indicator on the vertical timeline */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 border transition-colors ${
                    isArmed
                      ? 'border-emerald-400 bg-emerald-950 text-emerald-400'
                      : isStandby
                      ? 'border-cyan-400 bg-cyan-950 text-cyan-400'
                      : 'border-slate-700 bg-slate-900 text-slate-600'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 mx-auto my-0.5 ${
                      isArmed ? 'bg-emerald-400 animate-ping' : isStandby ? 'bg-cyan-400' : 'bg-slate-700'
                    }`}
                  />
                </div>

                {/* Milestone Container */}
                <div className="bg-[#070c14] border border-[#162436] group-hover:border-cyan-500/50 p-6 sm:p-8 transition-all hud-bracket">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#162436]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/30">
                        {m.phase}
                      </span>
                      <span className="font-mono text-xs text-slate-400 font-semibold">
                        {m.timeCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500">{m.protocolKey}</span>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 ${
                          isArmed
                            ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40'
                            : isStandby
                            ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40'
                            : 'text-slate-500 bg-slate-900/60 border border-slate-700'
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-mono text-lg sm:text-xl font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h3>

                  <p className="mt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
