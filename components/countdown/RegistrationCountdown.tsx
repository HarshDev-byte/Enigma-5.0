'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ShieldAlert, Timer, ArrowRight, Zap, Radio, Lock, Clock, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function RegistrationCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(EVENT_CONFIG.registrationDeadline).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, max: 30, color: '#00f0ff', accent: 'cyan' },
    { label: 'HOURS', value: timeLeft.hours, max: 24, color: '#3b82f6', accent: 'blue' },
    { label: 'MINUTES', value: timeLeft.minutes, max: 60, color: '#a855f7', accent: 'purple' },
    { label: 'SECONDS', value: timeLeft.seconds, max: 60, color: '#d946ef', accent: 'magenta' },
  ];

  return (
    <section
      id="countdown"
      aria-label="Registration Window Urgency and Live Countdown"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Dynamic Ambient Plasma Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-purple-500/15 via-cyan-500/10 to-pink-500/15 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Top Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#312856] gap-4">
          <div>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs text-pink-400 bg-pink-950/40 px-3.5 py-1.5 border border-pink-500/50 uppercase tracking-[0.25em] hud-bracket animate-pulse mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>SYSTEM ALERT // REGISTRATION CLOSING CLOCK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
              REGISTRATION WINDOW <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">
                CLOSES IN:
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs space-y-2 bg-[#060410]/95 p-4 border border-[#312856] hud-bracket text-left md:text-right shadow-xl">
            <div className="flex items-center md:justify-end gap-2 text-emerald-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>TERMINAL STATUS: ONLINE</span>
            </div>
            <div className="text-slate-300 text-[11px]">DEADLINE: OCTOBER 24, 2026 // 23:59 IST</div>
          </div>
        </div>

        {/* Monumental Holographic Countdown Matrix (HoloCards) */}
        {!timeLeft.isExpired ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {timeUnits.map((unit) => {
              const formattedVal = String(unit.value).padStart(2, '0');
              const progressPct = Math.min(100, Math.max(5, (unit.value / unit.max) * 100));

              return (
                <HoloCard
                  key={unit.label}
                  glowColor={unit.color}
                  className="bg-[#060410]/95 border border-[#312856] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-purple-400 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                >
                  {/* Unit Header */}
                  <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-[#241a45]">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">{unit.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-[#312856] text-purple-300 bg-black/60">
                      MOD 2097
                    </span>
                  </div>

                  {/* Giant Glowing Digit with Moodboard Colors */}
                  <div className="py-6 text-center">
                    <div
                      className="text-6xl sm:text-7xl md:text-8xl font-mono font-black tracking-tighter transition-all text-white"
                      style={{
                        textShadow: `0 0 25px ${unit.color}80`,
                      }}
                    >
                      {formattedVal}
                    </div>
                  </div>

                  {/* Dynamic Progress Wire Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-[#241a45]">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>SYNC BUFFER</span>
                      <span style={{ color: unit.color }} className="font-bold">{Math.round(progressPct)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0b081a] border border-[#241a45] overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          backgroundColor: unit.color,
                          boxShadow: `0 0 10px ${unit.color}`,
                        }}
                      />
                    </div>
                  </div>
                </HoloCard>
              );
            })}
          </div>
        ) : (
          <div className="p-12 border border-pink-500 bg-pink-950/40 text-center font-mono text-pink-300 text-xl font-bold tracking-widest hud-bracket">
            REGISTRATION WINDOW CLOSED // ACCESS BUFFER SEALED
          </div>
        )}

        {/* Live Capacity Telemetry Strip (HoloCard) */}
        <HoloCard
          glowColor="rgba(168, 85, 247, 0.4)"
          className="bg-[#060410]/95 border border-[#312856] p-6 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-950/50 border border-purple-500/40 text-purple-300">
              <Zap className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs">
              <div className="text-white font-bold uppercase">100% FREE ENTRY</div>
              <div className="text-slate-400 text-[11px]">Zero registration fee for all selected squads.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs">
              <div className="text-white font-bold uppercase">LIMITED SQUAD SLOTS</div>
              <div className="text-slate-400 text-[11px]">Hardware lab seats allocated on rolling evaluation.</div>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <a
              href="#register"
              onClick={() => sound.playClick()}
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 hover:brightness-110 text-black font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SECURE CLEARANCE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </HoloCard>
      </div>
    </section>
  );
}
