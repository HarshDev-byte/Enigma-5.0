'use client';

import React from 'react';
import { Terminal, Shield, Users, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function ArchitectsManifesto() {
  return (
    <section
      aria-label="The Architects Manifesto"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020306] border-b border-[#162436] overflow-hidden"
    >
      {/* Cinematic subtle light accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-950/30 px-3 py-1 border border-cyan-500/30 mb-8 uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5" />
          <span>DECLARATION // TO THE ARCHITECTS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-white uppercase tracking-tight leading-tight">
          THE OLD SYSTEM WAS BUILT BY ONE GENERATION.
          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            THE NEXT ONE MUST DECIDE WHAT DESERVES TO REMAIN.
          </span>
        </h2>

        <div className="mt-12 max-w-2xl mx-auto">
          <p className="font-mono text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
            You are not here to predict the future.
            <br />
            <strong className="text-white font-bold">You are here to build it again.</strong>
          </p>
        </div>

        {/* 3 Pillars of an Architect */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#060a12] border border-[#162436] p-6 hud-bracket">
            <div className="font-mono text-2xl font-black text-cyan-400 mb-2">01</div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              FIRST-PRINCIPLES CLARITY
            </h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Stripping away unnecessary cognitive bloat. Crafting systems where every line of execution is justified and resilient.
            </p>
          </div>

          <div className="bg-[#060a12] border border-[#162436] p-6 hud-bracket">
            <div className="font-mono text-2xl font-black text-fuchsia-400 mb-2">02</div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              AUTONOMOUS SOVEREIGNTY
            </h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Empowering humans to inspect, audit, and command automated swarms without black-box dependency.
            </p>
          </div>

          <div className="bg-[#060a12] border border-[#162436] p-6 hud-bracket">
            <div className="font-mono text-2xl font-black text-emerald-400 mb-2">03</div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              ECOLOGICAL HARMONY
            </h3>
            <p className="mt-2 font-mono text-xs text-slate-400 leading-relaxed">
              Building computational abundance that breathes with planetary physics rather than consuming it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
