'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Calendar, Clock, Terminal, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function EventTimeline() {
  const timeline = EVENT_CONFIG.timeline;
  const [activeStep, setActiveStep] = useState(0);
  const current = timeline[activeStep];

  return (
    <section
      id="timeline"
      aria-label="Official Event Timeline and Roadmap"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-slate-800 gap-3 sm:gap-4">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-red-400 tracking-widest uppercase mb-1.5 sm:mb-2 flex items-center gap-2 font-bold">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span>MISSION ROADMAP // 4-STAGE SEQUENTIAL ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              EVENT TIMELINE
            </h2>
          </div>
          <div className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            The 36-hour sprint journey mapped into four precision operational milestones. Click any phase to inspect deliverables and protocols.
          </div>
        </div>

        {/* Interactive Cybernetic Milestone Stepper & Progress Wire */}
        <div className="relative">
          {/* Connecting Circuit Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-red-500 -translate-y-1/2 z-0 transition-all duration-500 shadow-[0_0_10px_rgba(255,42,85,0.8)]"
            style={{ width: `${((activeStep + 1) / timeline.length) * 100}%` }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 relative z-10">
            {timeline.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <HoloCard
                  key={item.step}
                  glowColor="rgba(255, 42, 85, 0.45)"
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-3 sm:p-5 font-mono text-left border transition-all duration-300 relative flex flex-col justify-between active:scale-95 cursor-pointer rounded-xl ${
                    isSelected
                      ? 'bg-[#0f0a14] border-red-500 text-white shadow-[0_0_20px_rgba(255,42,85,0.3)] scale-[1.02]'
                      : 'bg-[#060410]/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] pb-1.5 sm:pb-2 border-b border-slate-800">
                      <span className="font-bold tracking-wider text-red-400">
                        STAGE // {item.step}
                      </span>
                      <span className="text-slate-400 font-bold">{item.date}</span>
                    </div>

                    <h3 className="font-mono text-xs sm:text-lg font-black text-white mt-2 sm:mt-3 uppercase tracking-tight truncate">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
                    <span className="truncate">{item.tag}</span>
                    <ArrowRight className="w-3 h-3 text-red-400 shrink-0 ml-1" />
                  </div>
                </HoloCard>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep Showcase Dossier */}
        <HoloCard
          glowColor="rgba(255, 42, 85, 0.4)"
          className="bg-[#060410]/90 border border-slate-800 p-4 sm:p-10 shadow-2xl space-y-4 sm:space-y-6 rounded-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800">
            <div>
              <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-400">
                CURRENTLY INSPECTING: STAGE {current.step}
              </div>
              <h3 className="font-mono text-xl sm:text-3xl font-black text-white mt-1 uppercase tracking-tight">
                {current.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>{current.date}</span>
            </div>
          </div>

          <p className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
            {current.description}
          </p>

          {/* Deliverables Checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="font-mono text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              KEY DELIVERABLES & OBJECTIVES:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 bg-[#090614] border border-slate-800 rounded-lg text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Synchronous check-in & milestone verification</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-[#090614] border border-slate-800 rounded-lg text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Mentor review & engineering telemetry feedback</span>
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </section>
  );
}
