'use client';

import React, { useState } from 'react';
import { CHALLENGE_DOMAINS } from '@/lib/constants';
import { ChallengeDomain } from '@/lib/types';
import { Activity, Cpu, Globe2, ChevronRight, BarChart3, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ThreeSystems() {
  const [selectedSystem, setSelectedSystem] = useState<string>('health');

  const currentDomain: ChallengeDomain =
    CHALLENGE_DOMAINS.find((d) => d.id === selectedSystem) || CHALLENGE_DOMAINS[0];

  const handleSelect = (id: string) => {
    sound.playClick();
    setSelectedSystem(id);
  };

  return (
    <section
      id="three-systems"
      aria-label="The Three Collapsing Systems Detailed Diagnostics"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#04070d] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
            // STAGE 02: TRI-SYSTEM COLLAPSE ANALYSIS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
            THE THREE SYSTEMS
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-slate-400 max-w-2xl">
            Humanity's fate hinges on three intertwined technological pillars. Select a domain below to inspect live diagnostic degradation telemetry.
          </p>
        </div>

        {/* System Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CHALLENGE_DOMAINS.map((domain) => {
            const isSelected = selectedSystem === domain.id;
            const Icon =
              domain.id === 'health'
                ? Activity
                : domain.id === 'finance'
                ? Cpu
                : Globe2;

            return (
              <button
                key={domain.id}
                onClick={() => handleSelect(domain.id)}
                className={`text-left p-5 border transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? domain.id === 'health'
                      ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : domain.id === 'finance'
                      ? 'border-fuchsia-400 bg-fuchsia-950/30 text-white shadow-[0_0_15px_rgba(217,70,239,0.15)]'
                      : 'border-emerald-400 bg-emerald-950/30 text-white shadow-[0_0_15px_rgba(16,255,136,0.15)]'
                    : 'border-[#162436] bg-[#070c14] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] pb-2 border-b border-[#162436]">
                  <span>{domain.systemCode}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-bold ${
                      domain.status === 'CRITICAL'
                        ? 'text-rose-400 bg-rose-950/50'
                        : domain.status === 'UNSTABLE'
                        ? 'text-amber-400 bg-amber-950/50'
                        : 'text-emerald-400 bg-emerald-950/50'
                    }`}
                  >
                    STATUS: {domain.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Icon
                    className={`w-6 h-6 ${
                      domain.id === 'health'
                        ? 'text-cyan-400'
                        : domain.id === 'finance'
                        ? 'text-fuchsia-400'
                        : 'text-emerald-400'
                    }`}
                  />
                  <div>
                    <div className="font-mono text-base font-bold text-white tracking-wide">
                      {domain.domain}
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 truncate">
                      {domain.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Expanded Chamber View */}
        <div
          className={`p-6 sm:p-10 border bg-[#070c14] relative hud-bracket ${
            currentDomain.id === 'health'
              ? 'border-cyan-500/40'
              : currentDomain.id === 'finance'
              ? 'border-fuchsia-500/40'
              : 'border-emerald-500/40'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: System Dossier */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/30">
                  {currentDomain.systemCode} // {currentDomain.domain}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  DIAGNOSTIC TELEMETRY REPORT
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-mono font-black text-white uppercase tracking-tight">
                {currentDomain.title}
              </h3>

              <blockquote className="font-mono text-xs sm:text-sm text-slate-300 italic border-l-2 border-slate-600 pl-4 py-1">
                "{currentDomain.quote}"
              </blockquote>

              <p className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentDomain.description}
              </p>

              {/* Key Architect Questions */}
              <div className="pt-4 border-t border-[#162436]">
                <div className="font-mono text-xs text-slate-400 font-bold uppercase mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  ARCHITECT PARADIGM QUESTIONS:
                </div>
                <ul className="space-y-2 font-mono text-xs text-slate-300">
                  {currentDomain.keyQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">[{i + 1}]</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Live Telemetry Gauges */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#04080f] p-6 border border-[#162436]">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-3 border-b border-[#162436]">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    SIMULATION SENSORS
                  </span>
                  <span className="text-emerald-400 animate-pulse">● LIVE 2097</span>
                </div>

                <div className="mt-6 space-y-6">
                  {currentDomain.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center font-mono text-xs mb-1.5">
                        <span className="text-slate-400">{metric.label}</span>
                        <span className="text-white font-bold">{metric.value}</span>
                      </div>
                      <div className="w-full bg-[#0d1724] h-2 border border-[#162436]">
                        <div
                          className={`h-full transition-all duration-700 ${
                            metric.dangerLevel > 80
                              ? 'bg-rose-500 shadow-[0_0_8px_#ff2a55]'
                              : metric.dangerLevel > 60
                              ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                              : 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                          }`}
                          style={{ width: `${metric.dangerLevel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jump to Track */}
              <div className="mt-8 pt-4 border-t border-[#162436]">
                <a
                  href="#challenges"
                  onClick={() => sound.playClick()}
                  className="w-full py-2.5 px-4 bg-[#0e1724] hover:bg-cyan-950 border border-[#243b55] hover:border-cyan-400 font-mono text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                >
                  <span>VIEW {currentDomain.domain} CHALLENGE DOSSIER</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
