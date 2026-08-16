'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Calendar, Clock, CheckCircle2, Terminal, ArrowRight, Sparkles, FileCode, Award, Zap } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function EventTimeline() {
  const timeline = EVENT_CONFIG.timeline;
  const [activeStep, setActiveStep] = useState(0);
  const current = timeline[activeStep];

  return (
    <section
      id="timeline"
      aria-label="Official Event Timeline and Roadmap"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Ambient Radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#312856] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>MISSION ROADMAP // 4-STAGE SEQUENTIAL ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              EVENT TIMELINE
            </h2>
          </div>
          <div className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            The 36-hour sprint journey mapped into four precision operational milestones. Click any phase to inspect deliverables and protocols.
          </div>
        </div>

        {/* Interactive Cybernetic Milestone Stepper & Progress Wire */}
        <div className="relative">
          {/* Connecting Circuit Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#312856] -translate-y-1/2 z-0" />
          <div
            className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / timeline.length) * 100}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
            {timeline.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <button
                  key={item.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-4 sm:p-5 font-mono text-left border transition-all duration-300 hud-bracket backdrop-blur-md relative flex flex-col justify-between active:scale-95 ${
                    isSelected
                      ? 'bg-[#0b081a] text-white shadow-2xl scale-[1.02]'
                      : 'bg-[#060410]/90 text-slate-400 hover:text-slate-200 hover:border-purple-800'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : '#241a45',
                    boxShadow: isSelected ? `0 0 25px ${item.color}40` : 'none',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] pb-2 border-b border-[#241a45]">
                      <span className="font-bold tracking-wider" style={{ color: item.color }}>
                        STAGE // {item.step}
                      </span>
                      <span className="text-slate-400 font-bold">{item.date}</span>
                    </div>

                    <h3 className="font-mono text-base sm:text-lg font-black text-white mt-3 uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#241a45] flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">{item.tag}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" style={{ color: item.color }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep Showcase Dossier */}
        <div
          className="bg-[#060410]/95 border p-6 sm:p-10 hud-bracket backdrop-blur-md shadow-2xl space-y-6"
          style={{
            borderColor: current.color,
            boxShadow: `0 0 40px ${current.color}30`,
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#312856]">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: current.color }}>
                STAGE // {current.step} OPERATIONAL SPECIFICATION
              </div>
              <h3 className="font-mono text-2xl sm:text-4xl font-black text-white mt-1 uppercase">
                {current.title}
              </h3>
            </div>
            <div className="font-mono text-xs text-slate-300 bg-[#0b081a] px-3.5 py-1.5 border border-[#312856] flex items-center gap-2 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>TIMEFRAME: {current.date}</span>
            </div>
          </div>

          <p className="font-mono text-xs sm:text-base text-slate-200 leading-relaxed max-w-4xl">
            {current.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#312856]">
            <div className="bg-[#0b081a]/90 p-4 border border-[#241a45] space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>PRIMARY OBJECTIVE & DELIVERABLE</span>
              </div>
              <p className="font-mono text-xs text-slate-100 font-semibold">{current.deliverable}</p>
            </div>

            <div className="bg-[#0b081a]/90 p-4 border border-[#241a45] space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>COUNCIL PROTOCOL & SPRINT IMPACT</span>
              </div>
              <p className="font-mono text-xs text-slate-100 font-semibold">{current.tag}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
