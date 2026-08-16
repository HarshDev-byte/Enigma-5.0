'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Activity, Cpu, Globe2, ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function OfficialTracks() {
  const [selectedTrackId, setSelectedTrackId] = useState('healthcare');
  const tracks = EVENT_CONFIG.tracks;
  const currentTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  const getIcon = (id: string) => {
    if (id === 'healthcare') return Activity;
    if (id === 'fintech') return Cpu;
    return Globe2;
  };

  return (
    <section
      id="tracks"
      aria-label="Official ENIGMA 5.0 Hackathon Tracks"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#020408] border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Dynamic Background Glow matching active track */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentTrack.themeColor }}
      />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#162436] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>OFFICIAL COMPETITION VECTORS // 03 TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              THE 03 OFFICIAL TRACKS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md">
            Select your squad's primary development vector. Inspect the live dossier for themes and technical problem statements.
          </p>
        </div>

        {/* Unified 12-Column Side-by-Side Track Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 3 Vertical Selector Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 justify-between">
            {tracks.map((track) => {
              const Icon = getIcon(track.id);
              const isSelected = track.id === selectedTrackId;

              return (
                <button
                  key={track.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrackId(track.id);
                  }}
                  className={`p-5 text-left font-mono border transition-all duration-300 hud-bracket backdrop-blur-md relative flex-1 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#070c14] text-white shadow-2xl scale-[1.01]'
                      : 'bg-[#03060c]/85 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                  style={{
                    borderColor: isSelected ? track.themeColor : '#162436',
                    boxShadow: isSelected ? `0 0 25px ${track.accentGlow}` : 'none',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#162436] text-[11px]">
                      <span className="font-bold tracking-wider" style={{ color: track.themeColor }}>
                        TRACK // {track.number}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 border ${
                        isSelected ? 'bg-black/80 text-white' : 'text-slate-500 border-[#162436]'
                      }`}>
                        {isSelected ? '● ACTIVE' : '○ SELECT'}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: track.themeColor }} />
                      <div>
                        <h3 className="font-mono text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                          {track.title}
                        </h3>
                        <div className="text-[11px] text-slate-400 font-semibold truncate max-w-[200px]">
                          {track.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#162436] flex items-center justify-between text-[10px] text-slate-500">
                    <span>{track.tagline}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: track.themeColor }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Dossier Terminal for Selected Track (8 cols) */}
          <div
            className="lg:col-span-8 bg-[#03060c]/95 border p-6 sm:p-8 hud-bracket backdrop-blur-md shadow-2xl flex flex-col justify-between relative space-y-6"
            style={{ borderColor: currentTrack.themeColor }}
          >
            <div>
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#162436]">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: currentTrack.themeColor }}>
                    TRACK // {currentTrack.number} ACTIVE DOSSIER
                  </div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 uppercase">
                    {currentTrack.title} — <span className="text-slate-300 font-medium text-lg sm:text-xl">{currentTrack.subtitle}</span>
                  </h3>
                </div>

                <a
                  href="#timeline"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#070c14] border border-[#243b55] hover:border-cyan-400 font-mono text-xs text-slate-200 hover:text-cyan-300 uppercase tracking-wider transition-colors shrink-0"
                >
                  <span>ROADMAP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Description */}
              <p className="mt-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentTrack.description}
              </p>

              {/* Suggested Problem Vectors Grid */}
              <div className="mt-6 space-y-3">
                <div className="font-mono text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: currentTrack.themeColor }} />
                  <span>SUGGESTED PROBLEM VECTORS & INSPIRATION:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTrack.potentialThemes.map((theme, i) => (
                    <div
                      key={i}
                      className="bg-[#070c14]/90 border border-[#162436] p-2.5 font-mono text-xs text-slate-300 flex items-center gap-2.5 hover:border-slate-600 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: currentTrack.themeColor }} />
                      <span className="truncate">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="pt-4 border-t border-[#162436] flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SQUAD REGISTRATION OPEN FOR {currentTrack.title}</span>
              </span>
              <span className="text-slate-500">36-HOUR BUILD TRACK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
