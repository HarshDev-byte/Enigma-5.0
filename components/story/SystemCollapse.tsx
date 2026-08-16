'use client';

import React, { useState, useEffect } from 'react';
import { AlertOctagon, Flame, ZapOff, Radio, RefreshCw } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function SystemCollapse() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      sound.playGlitch();
      setTimeout(() => setGlitchActive(false), 200);
    }, 4500);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section
      aria-label="System Failure and Catastrophic Collapse Narrative"
      className={`relative py-28 px-4 sm:px-8 lg:px-12 bg-[#060306] border-b border-rose-950/80 transition-colors duration-200 overflow-hidden ${
        glitchActive ? 'bg-[#150409] glitch-hover' : ''
      }`}
    >
      {/* Glitch Scanlines & Warning Watermark */}
      <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[14vw] font-black text-rose-500/[0.04] select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        COLLAPSE 2097
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Warning Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-rose-400 bg-rose-950/40 px-3 py-1 border border-rose-500/50 mb-4 animate-pulse">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>CRITICAL ALERT // PROTOCOL BREACH</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400 uppercase">
            SYSTEM FAILURE
          </h2>

          <p className="mt-4 font-mono text-sm sm:text-base text-rose-200/80 leading-relaxed">
            The feedback loops collapsed. When autonomous systems cannot be reasoned with, a microscopic failure propagates into an inescapable global domino.
          </p>
        </div>

        {/* 3 Collapsing Status Monitors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Health Collapse */}
          <div className="bg-[#0f0407] border border-rose-500/40 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
              STATUS: CRITICAL
            </div>
            <div>
              <div className="font-mono text-xs text-rose-400/80">SYSTEM 01 // HUMAN</div>
              <h3 className="text-2xl font-mono font-bold text-white mt-1">HEALTH METRICS</h3>
              <p className="mt-2 text-xs font-mono text-slate-300 leading-relaxed">
                Centralized bio-swarms desynchronized from regional edge nodes. Hospital life support systems experiencing cascading buffer overruns.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-950 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-500">DEPENDENCY</span>
              <span className="text-rose-400 font-bold">87.4% [FATAL]</span>
            </div>
          </div>

          {/* Finance Collapse */}
          <div className="bg-[#0f0407] border border-rose-500/40 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
              STATUS: UNSTABLE
            </div>
            <div>
              <div className="font-mono text-xs text-rose-400/80">SYSTEM 02 // ECONOMY</div>
              <h3 className="text-2xl font-mono font-bold text-white mt-1">FINANCE ENGINES</h3>
              <p className="mt-2 text-xs font-mono text-slate-300 leading-relaxed">
                Autonomous high-frequency liquidity algorithms engaged in recursive liquidation spirals. Human economists locked out of central ledgers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-950 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-500">MARKET STABILITY</span>
              <span className="text-rose-400 font-bold">41.2% [COLLAPSE]</span>
            </div>
          </div>

          {/* Earth Collapse */}
          <div className="bg-[#0f0407] border border-rose-500/40 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
              STATUS: COLLAPSING
            </div>
            <div>
              <div className="font-mono text-xs text-rose-400/80">SYSTEM 03 // EARTH</div>
              <h3 className="text-2xl font-mono font-bold text-white mt-1">GAIA BIOSPHERE</h3>
              <p className="mt-2 text-xs font-mono text-slate-300 leading-relaxed">
                Atmospheric scrubber thermal cores tripped continental safety switches. Infinite compute demand depleted baseline planetary energy reserves.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-950 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-500">ECOLOGICAL STABILITY</span>
              <span className="text-rose-400 font-bold">19.4% [CRITICAL]</span>
            </div>
          </div>
        </div>

        {/* Center Callout: Collapse Imminent */}
        <div className="border-2 border-rose-500/60 bg-gradient-to-r from-rose-950/40 via-red-950/60 to-rose-950/40 p-8 sm:p-12 text-center relative">
          <div className="font-mono text-xs text-rose-400 tracking-[0.3em] uppercase mb-2">
            GLOBAL SIMULATION TIMEOUT
          </div>
          <div className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
            COLLAPSE IMMINENT
          </div>
          <p className="mt-4 max-w-xl mx-auto font-mono text-xs sm:text-sm text-rose-200">
            The systems humanity created cannot be fixed with patches. They must be re-evaluated from the first principle.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#genesis"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-3 px-6 py-3 bg-rose-500 hover:bg-rose-400 text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <RefreshCw className="w-4 h-4" />
              LOCATE GENESIS ARCHIVE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
