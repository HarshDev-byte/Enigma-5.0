'use client';

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ShieldAlert, ArrowRight, Zap, Radio, Clock, Calendar } from 'lucide-react';
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
    { label: 'DAYS', value: timeLeft.days, max: 30, color: '#ff2a55' },
    { label: 'HOURS', value: timeLeft.hours, max: 24, color: '#ff4757' },
    { label: 'MINS', value: timeLeft.minutes, max: 60, color: '#ff6b81' },
    { label: 'SECS', value: timeLeft.seconds, max: 60, color: '#ff7f50' },
  ];

  return (
    <section
      id="countdown"
      aria-label="Registration Window Urgency and Live Countdown"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Dynamic Ambient Plasma Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 rounded-full bg-gradient-to-r from-red-600/10 via-rose-500/10 to-orange-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 relative z-10">
        {/* Top Telemetry Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-[#312856] gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-rose-300 bg-rose-950/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 border border-rose-500/50 uppercase tracking-[0.15em] sm:tracking-[0.2em] hud-bracket animate-pulse">
              <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
              <span>SYSTEM ALERT // CLOSING CLOCK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-mono font-black text-white uppercase tracking-tight leading-tight">
              REGISTRATION WINDOW <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-300 to-orange-400">
                CLOSES IN:
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs space-y-1 sm:space-y-1.5 bg-[#060410]/95 p-3 sm:p-4 border border-[#312856] hud-bracket text-left md:text-right shadow-xl rounded-xl">
            <div className="flex items-center md:justify-end gap-1.5 text-rose-400 font-bold text-[10px] sm:text-xs">
              <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
              <span>ALARM STATUS: CRITICAL</span>
            </div>
            <div className="text-slate-300 text-[9px] sm:text-[11px]">DEADLINE: OCTOBER 24, 2026 // 23:59 IST</div>
          </div>
        </div>

        {/* Monumental Holographic Countdown Matrix */}
        {!timeLeft.isExpired ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
            {timeUnits.map((unit) => {
              const formattedVal = String(unit.value).padStart(2, '0');
              const progressPct = Math.min(100, Math.max(5, (unit.value / unit.max) * 100));

              return (
                <HoloCard
                  key={unit.label}
                  glowColor="rgba(255, 42, 85, 0.45)"
                  className="bg-[#060410]/95 border border-[#312856] p-3.5 sm:p-7 relative overflow-hidden flex flex-col justify-between items-center text-center shadow-xl group hover:border-rose-500/60 transition-all rounded-2xl"
                >
                  <div className="w-full flex items-center justify-between font-mono text-[9px] sm:text-xs text-slate-400 border-b border-[#241a45] pb-1.5 sm:pb-3 mb-1.5 sm:mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400" />
                      <span>{unit.label}</span>
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-slate-500 font-mono">
                      {Math.round(progressPct)}%
                    </span>
                  </div>

                  {/* Mega Digit */}
                  <div className="font-mono text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white my-1 sm:my-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(255,42,85,0.4)]">
                    {formattedVal}
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1 bg-[#150f28] rounded-full overflow-hidden mt-1 sm:mt-3">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </HoloCard>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-red-950/40 border border-red-500 font-mono text-white text-lg font-black uppercase">
            REGISTRATION DEADLINE HAS ELAPSED // CONTACT ARCHITECT COMMAND
          </div>
        )}

        {/* Bottom CTA Row (Mobile-Optimized) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={EVENT_CONFIG.socials.unstop}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs sm:text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,42,85,0.6)] border border-red-400 active:scale-95 rounded-xl"
          >
            <Zap className="w-4 h-4 animate-bounce" />
            <span>INITIALIZE REGISTRATION (UNSTOP)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
