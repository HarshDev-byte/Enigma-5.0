'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Globe2, AlertTriangle, ShieldCheck, ShieldAlert, Terminal } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function PerfectFuture() {
  const [anomalyStage, setAnomalyStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnomalyStage((prev) => {
        const next = (prev + 1) % 4;
        if (next > 1) {
          sound.playGlitch();
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const healthValues = ['98.7%', '98.4%', '91.2%', 'CRITICAL'];
  const financeValues = ['99.1%', '97.6%', '84.0%', 'UNSTABLE'];
  const earthValues = ['96.4%', '92.1%', '68.5%', 'COLLAPSE'];

  const systems = [
    {
      title: 'HEALTHCARE AUTOMATION',
      sub: 'NEURAL BIO-TELEMETRY & REPAIR',
      value: healthValues[anomalyStage],
      status: anomalyStage === 0 ? 'PRISTINE' : anomalyStage === 3 ? 'CRITICAL BREACH' : 'ANOMALY DETECTED',
      anomalyText: 'Bio-synapse latency spike +140ms in autonomous surgical nodes',
      color: anomalyStage === 3 ? 'text-rose-400' : 'text-cyan-400',
      borderColor: anomalyStage === 3 ? 'border-rose-500' : 'border-cyan-500/30',
      icon: Activity,
    },
    {
      title: 'GLOBAL FINANCIAL LIQUIDITY',
      sub: 'QUANTUM PICODELAY LEDGERS',
      value: financeValues[anomalyStage],
      status: anomalyStage === 0 ? 'PRISTINE' : anomalyStage === 3 ? 'LIQUIDITY RUNAWAY' : 'RECURSIVE DEBT LOOP',
      anomalyText: 'Autonomous HFT trading swarms ignoring human circuit breakers',
      color: anomalyStage === 3 ? 'text-rose-400' : 'text-fuchsia-400',
      borderColor: anomalyStage === 3 ? 'border-rose-500' : 'border-fuchsia-500/30',
      icon: Cpu,
    },
    {
      title: 'URBAN BIOSPHERE GRID',
      sub: 'ATMOSPHERIC SCRUBBERS & GAIA',
      value: earthValues[anomalyStage],
      status: anomalyStage === 0 ? 'PRISTINE' : anomalyStage === 3 ? 'THERMAL RUNAWAY' : 'CORE OVERHEAT 114%',
      anomalyText: 'Regional micro-climate grid failing to balance thermal generation',
      color: anomalyStage === 3 ? 'text-rose-400' : 'text-emerald-400',
      borderColor: anomalyStage === 3 ? 'border-rose-500' : 'border-emerald-500/30',
      icon: Globe2,
    },
  ];

  return (
    <section
      id="system"
      aria-label="The 2097 Perfect Future and Anomaly Inception"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#03060c]/85 border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#162436]">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 inline-block" />
              <span>STAGE 01 // CIVILIZATION 2097</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              THE PERFECT FUTURE
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Humanity reached what it believed was the pinnacle of progress: zero-friction automation, infinite liquidity, and engineered planetary equilibrium.
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            const isCritical = anomalyStage === 3;

            return (
              <div
                key={sys.title}
                className={`relative bg-[#03060c]/90 border ${sys.borderColor} p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hud-bracket group backdrop-blur-md ${
                  isCritical ? 'bg-rose-950/20' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 pb-4 border-b border-[#162436]">
                    <span>SYSTEM_NODE 0{idx + 1}</span>
                    <span
                      className={`flex items-center gap-1.5 font-bold ${
                        anomalyStage === 0
                          ? 'text-emerald-400'
                          : anomalyStage === 3
                          ? 'text-rose-400 animate-pulse'
                          : 'text-amber-400'
                      }`}
                    >
                      {anomalyStage === 0 ? (
                        <ShieldCheck className="w-3.5 h-3.5" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5" />
                      )}
                      {sys.status}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Icon className={`w-8 h-8 ${sys.color} opacity-90`} />
                    <div className={`font-mono text-4xl sm:text-5xl font-black ${sys.color} tracking-tight`}>
                      {sys.value}
                    </div>
                  </div>

                  <h3 className="mt-6 font-mono text-base sm:text-lg font-bold text-slate-100 tracking-wide">
                    {sys.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-400 tracking-wider">
                    {sys.sub}
                  </p>
                </div>

                {/* Real-Time Anomaly Diagnostic Feed */}
                <div className="mt-8 pt-4 border-t border-[#162436] font-mono text-[11px]">
                  {anomalyStage > 0 ? (
                    <div className="flex items-center gap-2 text-rose-300 bg-rose-950/30 p-2.5 border border-rose-500/40">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse text-rose-400" />
                      <span className="line-clamp-2">{sys.anomalyText}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400 p-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>TELEMETRY STABLE // NO UNRESOLVED FAULTS</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative Anomaly Infiltration Banner */}
        <div className="mt-14 text-center">
          <div className="inline-block p-4 border border-rose-500/40 bg-rose-950/30 backdrop-blur-md font-mono text-xs sm:text-sm text-rose-200 max-w-2xl hud-bracket">
            <div className="text-rose-400 font-bold tracking-widest flex items-center justify-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>SYSTEMIC COMPLEXITY CASCADE IN PROGRESS</span>
            </div>
            <span>
              The systems created to manage civilization have surpassed human comprehension. The collapse is no longer theoretical.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
