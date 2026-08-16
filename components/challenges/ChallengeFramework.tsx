'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Terminal, ShieldAlert, Lightbulb, Hammer, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ChallengeFramework() {
  const icons = [ShieldAlert, Lightbulb, Hammer, Sparkles];

  return (
    <section
      id="challenge-framework"
      aria-label="The Challenge Architecture: Problem, Idea, Build, Impact"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#04070e] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#162436]">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
              // METHODOLOGY MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
              THE HACKATHON ARCHITECTURE
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-slate-400 max-w-md">
            Four rigorous phases transforming systemic critique into working cybernetic prototypes over 36 continuous hours.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENT_CONFIG.challengeSteps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={step.code}
                className="bg-[#070c14] border border-[#162436] hover:border-cyan-400/60 p-6 flex flex-col justify-between transition-all duration-300 hud-bracket group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#162436]">
                    <span className="text-cyan-400 font-bold">{step.step}</span>
                    <span className="text-[10px] text-slate-500">{step.code}</span>
                  </div>

                  <div className="mt-6 mb-4">
                    <Icon className="w-7 h-7 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
                  </div>

                  <h3 className="font-mono text-base font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-mono text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#162436] font-mono text-[10px] text-slate-500">
                  EXECUTION // PHASE 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
