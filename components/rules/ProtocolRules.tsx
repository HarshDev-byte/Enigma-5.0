'use client';

import React from 'react';
import { RULE_PROTOCOLS } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';
import HoloCard from '@/components/ui/HoloCard';

export default function ProtocolRules() {
  return (
    <section
      id="protocols"
      aria-label="Security Protocols and Evaluation Rules"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-slate-800 gap-3 sm:gap-4">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-red-400 tracking-widest uppercase mb-1.5 sm:mb-2 font-bold">
              // STAGE 07: OPERATIONAL PARAMETERS
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-black tracking-tight text-white uppercase">
              SECURITY PROTOCOLS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            Strict parameters governing architect participation, intellectual property sovereignty, and council scoring vectors.
          </p>
        </div>

        {/* 4 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {RULE_PROTOCOLS.map((rule) => {
            return (
              <HoloCard
                key={rule.id}
                glowColor="rgba(255, 42, 85, 0.4)"
                className="bg-[#060410]/90 border border-slate-800 p-4 sm:p-8 hover:border-red-500/60 transition-all flex flex-col justify-between shadow-xl rounded-2xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800 font-mono text-xs text-slate-400">
                    <span className="text-red-400 font-bold">{rule.code}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 border border-slate-700 rounded">
                      CLEARANCE: {rule.clearanceLevel}
                    </span>
                  </div>

                  <h3 className="mt-3 sm:mt-4 font-mono text-base sm:text-lg font-black text-white uppercase">
                    {rule.title}
                  </h3>

                  <p className="mt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-400">
                  <span>COMPLIANCE: MANDATORY</span>
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-red-500" />
                    VERIFIED PROTOCOL
                  </span>
                </div>
              </HoloCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
