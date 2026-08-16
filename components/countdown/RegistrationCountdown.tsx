'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ShieldAlert, Timer, ArrowRight, Zap, Radio, Lock, Clock, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/audio';

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
    { label: 'HOURS', value: timeLeft.hours, max: 24, color: '#00f0ff', accent: 'cyan' },
    { label: 'MINUTES', value: timeLeft.minutes, max: 60, color: '#ec4899', accent: 'pink' },
    { label: 'SECONDS', value: timeLeft.seconds, max: 60, color: '#ec4899', accent: 'pink' },
  ];

  return (
    <section
      id="countdown"
      aria-label="Registration Window Urgency and Live Countdown"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020306] border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Dynamic Ambient Plasma Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-rose-500/15 via-cyan-500/10 to-purple-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Top Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#162436] gap-4">
          <div>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs text-rose-400 bg-rose-950/40 px-3.5 py-1.5 border border-rose-500/50 uppercase tracking-[0.25em] hud-bracket animate-pulse mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>SYSTEM ALERT // REGISTRATION CLOSING CLOCK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black text-white uppercase tracking-tight">
              REGISTRATION WINDOW <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-cyan-400">
                CLOSES IN:
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs space-y-2 bg-[#03060c]/90 p-4 border border-[#162436] hud-bracket text-left md:text-right">
            <div className="flex items-center md:justify-end gap-2 text-emerald-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>TERMINAL STATUS: ONLINE</span>
            </div>
            <div className="text-slate-400 text-[11px]">DEADLINE: OCTOBER 24, 2026 // 23:59 IST</div>
          </div>
        </div>

        {/* Monumental Holographic Countdown Matrix */}
        {!timeLeft.isExpired ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {timeUnits.map((unit) => {
              const formattedVal = String(unit.value).padStart(2, '0');
              const progressPct = Math.min(100, Math.max(5, (unit.value / unit.max) * 100));

              return (
                <div
                  key={unit.label}
                  className="bg-[#03060c]/95 border border-[#162436] p-6 sm:p-8 hud-bracket backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/80 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                >
                  {/* Subtle Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />

                  {/* Unit Header */}
                  <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-[#162436]">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">{unit.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-[#162436] text-slate-400 bg-black/40">
                      MOD 2097
                    </span>
                  </div>

                  {/* Giant Glowing Digit */}
                  <div className="py-6 text-center">
                    <div
                      className={`text-6xl sm:text-7xl md:text-8xl font-mono font-black tracking-tighter transition-all ${
                        unit.accent === 'cyan'
                          ? 'text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]'
                          : 'text-rose-200 drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                      }`}
                    >
                      {formattedVal}
                    </div>
                  </div>

                  {/* Dynamic Progress Wire Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-[#162436]">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>SYNC BUFFER</span>
                      <span style={{ color: unit.color }}>{Math.round(progressPct)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#070c14] border border-[#162436] overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          backgroundColor: unit.color,
                          boxShadow: `0 0 8px ${unit.color}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 border border-rose-500 bg-rose-950/40 text-center font-mono text-rose-300 text-xl font-bold tracking-widest hud-bracket">
            REGISTRATION WINDOW CLOSED // ACCESS BUFFER SEALED
          </div>
        )}

        {/* Live Capacity Telemetry Strip */}
        <div className="bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/40 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs">
              <div className="text-white font-bold uppercase">100% FREE ENTRY</div>
              <div className="text-slate-400 text-[11px]">Zero registration fee for all selected squads.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
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
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.45)] flex items-center justify-center gap-2"
            >
              <span>SECURE CLEARANCE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
