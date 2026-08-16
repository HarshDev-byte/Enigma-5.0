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
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#312856] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">
              // STAGE 07: OPERATIONAL PARAMETERS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-black tracking-tight text-white uppercase">
              SECURITY PROTOCOLS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            Strict parameters governing architect participation, intellectual property sovereignty, and council scoring vectors.
          </p>
        </div>

        {/* 4 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {RULE_PROTOCOLS.map((rule) => (
            <div
              key={rule.id}
              className="bg-[#060410]/95 border border-[#312856] p-5 sm:p-8 hover:border-purple-500/60 transition-all hud-bracket flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#241a45] font-mono text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">{rule.code}</span>
                  <span className="text-[10px] text-purple-300 bg-black/60 px-2 py-0.5 border border-[#312856]">
                    CLEARANCE: {rule.clearanceLevel}
                  </span>
                </div>

                <h3 className="mt-4 font-mono text-lg font-black text-white uppercase">
                  {rule.title}
                </h3>

                <p className="mt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#241a45] flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>COMPLIANCE: MANDATORY</span>
                <span className="text-emerald-400 font-bold">VERIFIED PROTOCOL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
