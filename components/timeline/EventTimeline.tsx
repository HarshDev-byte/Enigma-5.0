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
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020306] border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Ambient Radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#162436] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>MISSION ROADMAP // 4-STAGE SEQUENTIAL ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              EVENT TIMELINE
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 max-w-md">
            The 36-hour sprint journey mapped into four precision operational milestones. Click any phase to inspect deliverables and protocols.
          </div>
        </div>

        {/* Interactive Cybernetic Milestone Stepper & Progress Wire */}
        <div className="relative">
          {/* Connecting Circuit Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#162436] -translate-y-1/2 z-0" />
          <div
            className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-400 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / timeline.length) * 100}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {timeline.map((item, idx) => {
              const isSelected = activeStep === idx;

              return (
                <button
                  key={item.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-5 sm:p-6 text-left font-mono border transition-all duration-300 hud-bracket backdrop-blur-md relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#070c14] text-white shadow-2xl scale-[1.02]'
                      : 'bg-[#03060c]/85 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                  style={{
                    borderColor: isSelected ? item.color : '#162436',
                    boxShadow: isSelected ? `0 0 25px ${item.color}30` : 'none',
                  }}
                >
                  <div>
                    {/* Top Tag & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#162436] text-xs">
                      <span className="font-bold tracking-wider" style={{ color: item.color }}>
                        [{item.step}] {item.stage}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 border ${
                          item.status === 'ACTIVE'
                            ? 'text-cyan-300 bg-cyan-950/40 border-cyan-400 animate-pulse'
                            : 'text-slate-500 bg-black/40 border-[#162436]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-4 font-mono text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" style={{ color: item.color }} />
                      <span className="text-white font-medium">{item.date}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#162436] flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-semibold">{isSelected ? '● INSPECTING' : '○ CLICK TO EXPAND'}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform"
                      style={{ color: item.color, transform: isSelected ? 'translateX(4px)' : 'none' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Deep Dossier Showcase */}
        <div
          className="bg-[#03060c]/95 border p-8 sm:p-12 hud-bracket backdrop-blur-md shadow-2xl space-y-8 relative overflow-hidden"
          style={{ borderColor: current.color }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#162436]">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: current.color }}>
                <Sparkles className="w-4 h-4" />
                <span>{current.tag}</span>
              </div>
              <h3 className="font-mono text-3xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
                {current.title}
              </h3>
            </div>

            {/* Stage Badge & Timestamp */}
            <div className="flex items-center gap-3 font-mono text-xs bg-[#070c14] px-4 py-2.5 border border-[#162436]">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">WINDOW:</span>
              <span className="text-white font-bold">{current.time}</span>
            </div>
          </div>

          <p className="font-mono text-base sm:text-lg text-slate-200 leading-relaxed max-w-4xl">
            {current.description}
          </p>

          {/* Phase Objectives & Deliverables Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#070c14]/90 border border-[#162436] p-5 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4" style={{ color: current.color }} />
                <span>PRIMARY MANDATE & DELIVERABLE:</span>
              </div>
              <p className="text-white text-sm font-semibold">{current.deliverable}</p>
            </div>

            <div className="bg-[#070c14]/90 border border-[#162436] p-5 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>SECURITY & SYSTEM CHECKPOINTS:</span>
              </div>
              <p className="text-slate-300 text-xs">Continuous mentor feedback, code sanity checks, and milestone verifications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
