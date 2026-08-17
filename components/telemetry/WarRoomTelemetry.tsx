'use client';

import React, { useState, useEffect } from 'react';
import { Users, Cpu, Radio } from 'lucide-react';
import HoloCard from '@/components/ui/HoloCard';

const LIVE_DISPATCHES = [
  { squad: 'QUANTUM_CYPHER', track: 'FINTECH', role: 'ZK SECURITY', time: 'JUST NOW' },
  { squad: 'NEURAL_FORGE', track: 'HEALTHCARE', role: 'BIO-AI MODEL', time: '1m AGO' },
  { squad: 'GAIA_MICROKERNEL', track: 'SUSTAINABILITY', role: 'EDGE TELEMETRY', time: '3m AGO' },
  { squad: 'VORTEX_ARCHITECTS', track: 'FINTECH', role: 'CIRCUIT BREAKERS', time: '5m AGO' },
  { squad: 'SYNTH_DIAGNOSTICS', track: 'HEALTHCARE', role: 'CLINICAL AUTONOMY', time: '7m AGO' },
  { squad: 'CHRONOS_LABS', track: 'SUSTAINABILITY', role: 'BIOSPHERE MESH', time: '9m AGO' },
];

export default function WarRoomTelemetry() {
  const [dispatchIdx, setDispatchIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDispatchIdx((prev) => (prev + 1) % LIVE_DISPATCHES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeDispatch = LIVE_DISPATCHES[dispatchIdx];

  return (
    <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-8 lg:px-12 py-3 sm:py-4 font-mono select-none">
      <HoloCard
        glowColor="rgba(255, 42, 85, 0.35)"
        className="bg-[#060410]/95 backdrop-blur-xl border border-slate-800 p-3.5 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4"
      >
        {/* Left: Live Registration Dispatch Stream */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <div className="p-2 sm:p-2.5 bg-red-950/60 border border-red-500/50 text-red-400 shrink-0 rounded-lg">
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-red-500" />
          </div>
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-red-400 font-bold uppercase tracking-wider">
              <span>WAR ROOM DISPATCH</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 font-normal">{activeDispatch.time}</span>
            </div>
            <div className="text-[11px] sm:text-sm font-black text-white truncate flex items-center gap-1.5 sm:gap-2">
              <span className="truncate">SQUAD: {activeDispatch.squad}</span>
              <span className="text-slate-600 shrink-0">→</span>
              <span className="text-red-400 shrink-0">{activeDispatch.track}</span>
            </div>
          </div>
        </div>

        {/* Center: Live Compute & Squad Capacity */}
        <div className="flex items-center gap-3 sm:gap-8 text-xs w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800/80 pt-2.5 md:pt-0">
          <div className="space-y-0.5 text-left md:text-right">
            <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400" />
              <span>SQUADS</span>
            </div>
            <div className="text-[11px] sm:text-sm font-black text-white">
              52/64 <span className="text-red-400 font-bold">[81%]</span>
            </div>
          </div>

          <div className="space-y-0.5 text-right">
            <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1">
              <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400" />
              <span>COMPUTE</span>
            </div>
            <div className="text-[11px] sm:text-sm font-black text-emerald-400">
              98.4 TFLOPS
            </div>
          </div>
        </div>
      </HoloCard>
    </div>
  );
}
