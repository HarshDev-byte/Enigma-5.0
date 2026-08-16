'use client';

import React from 'react';
import { Terminal, Cpu, Database, Disc, Sparkles } from 'lucide-react';

export default function GenesisDiscovery() {
  return (
    <section
      id="genesis"
      aria-label="Discovery of the Classified Genesis System"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020306] border-b border-[#162436] overflow-hidden"
    >
      {/* Volumetric ambient light pool */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0,transparent_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#03060c]/90 px-4 py-1.5 border border-cyan-500/50 hud-bracket">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>DEEP ARCHIVE DISCOVERY // SECTOR 00</span>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-xs sm:text-sm text-slate-500 tracking-[0.3em] uppercase">
            UNKNOWN SYSTEM FOUND IN SUBTERRANEAN NODE 07
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-white uppercase tracking-tight leading-tight">
            GENESIS
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
              DESIGNED TO BEGIN AGAIN.
            </span>
          </h2>
        </div>

        <p className="font-mono text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Deep within the sub-layers of Node 07, an abandoned pre-collapse recovery routine was discovered. A protocol engineered not merely to patch the broken world, but to reconsider how the future should have been architected from first principles.
        </p>

        {/* 3 Core Philosophical Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket backdrop-blur-md">
            <div className="font-mono text-[10px] text-cyan-400 font-bold pb-2 border-b border-[#162436] flex items-center justify-between">
              <span>PARADIGM 01</span>
              <span>[REPAIR]</span>
            </div>
            <h3 className="font-mono text-base font-bold text-white mt-4">NOT REBUILDING. REPAIRING.</h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Questioning blind automation. Restoring balance between autonomous scale and biological sovereignty.
            </p>
          </div>

          <div className="bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket backdrop-blur-md">
            <div className="font-mono text-[10px] text-fuchsia-400 font-bold pb-2 border-b border-[#162436] flex items-center justify-between">
              <span>PARADIGM 02</span>
              <span>[RESILIENCE]</span>
            </div>
            <h3 className="font-mono text-base font-bold text-white mt-4">ANTI-FRAGILE ARCHITECTURE</h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Designing decentralized circuit breakers that thrive under stress rather than cascading to systemic collapse.
            </p>
          </div>

          <div className="bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket backdrop-blur-md">
            <div className="font-mono text-[10px] text-emerald-400 font-bold pb-2 border-b border-[#162436] flex items-center justify-between">
              <span>PARADIGM 03</span>
              <span>[GOVERNANCE]</span>
            </div>
            <h3 className="font-mono text-base font-bold text-white mt-4">THE ARCHITECT MANDATE</h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Handing governance and system control to a new generation of fearless systems engineers and builders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
