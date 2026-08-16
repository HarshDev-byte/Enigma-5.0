'use client';

import React from 'react';
import { RULE_PROTOCOLS } from '@/lib/constants';
import { ShieldCheck, Scale, Award, Cpu, FileCode } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ProtocolRules() {
  return (
    <section
      id="protocols"
      aria-label="Security Protocols and Evaluation Rules"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#02050a] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#162436]">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
              // STAGE 05: OPERATIONAL PARAMETERS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
              SECURITY PROTOCOLS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-slate-400 max-w-md">
            Strict parameters governing architect participation, intellectual property sovereignty, and council scoring vectors.
          </p>
        </div>

        {/* 4 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RULE_PROTOCOLS.map((rule) => (
            <div
              key={rule.id}
              className="bg-[#070c14] border border-[#162436] p-6 sm:p-8 hover:border-cyan-500/40 transition-all hud-bracket flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#162436] font-mono text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">{rule.code}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 border border-slate-700">
                    CLEARANCE: {rule.clearanceLevel}
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-lg font-bold text-white uppercase">
                  {rule.title}
                </h3>

                <p className="mt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#162436] flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>COMPLIANCE: MANDATORY</span>
                <span className="text-emerald-400 font-bold">VERIFIED PROTOCOL</span>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Vectors Summary */}
        <div className="mt-12 bg-[#060a12] border border-[#162436] p-6 sm:p-8">
          <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            COUNCIL EVALUATION MATRIX (25% EACH)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-[#03060c] p-4 border border-[#162436]">
              <div className="text-cyan-400 font-bold text-lg mb-1">01</div>
              <div className="text-white font-bold mb-1">SYSTEMIC DEPTH</div>
              <div className="text-slate-400 text-[11px]">
                Does the prototype solve root systemic dependencies or merely treat surface symptoms?
              </div>
            </div>

            <div className="bg-[#03060c] p-4 border border-[#162436]">
              <div className="text-fuchsia-400 font-bold text-lg mb-1">02</div>
              <div className="text-white font-bold mb-1">TECHNICAL CRAFT</div>
              <div className="text-slate-400 text-[11px]">
                Execution velocity, runtime efficiency, clean modularity, and algorithmic resilience.
              </div>
            </div>

            <div className="bg-[#03060c] p-4 border border-[#162436]">
              <div className="text-emerald-400 font-bold text-lg mb-1">03</div>
              <div className="text-white font-bold mb-1">ANTI-FRAGILITY</div>
              <div className="text-slate-400 text-[11px]">
                How gracefully does the solution handle offline network partition and stress spikes?
              </div>
            </div>

            <div className="bg-[#03060c] p-4 border border-[#162436]">
              <div className="text-amber-400 font-bold text-lg mb-1">04</div>
              <div className="text-white font-bold mb-1">UI/UX POLISH</div>
              <div className="text-slate-400 text-[11px]">
                Clarity of human-in-the-loop telemetry, intuitive controls, and seamless interaction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
