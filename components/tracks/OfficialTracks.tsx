'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Activity, Cpu, Globe2, ArrowRight, Sparkles, Terminal, CheckCircle2, QrCode } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

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
      className="relative pt-20 pb-36 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      {/* Dynamic Background Glow matching active track */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[140px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentTrack.themeColor }}
      />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#312856] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>OFFICIAL COMPETITION VECTORS // 03 TRACKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              THE 03 OFFICIAL TRACKS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
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
                <HoloCard
                  key={track.id}
                  glowColor={track.themeColor}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrackId(track.id);
                  }}
                  className={`p-5 text-left font-mono border transition-all duration-300 backdrop-blur-md relative flex-1 flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-[#0b081a] text-white shadow-2xl scale-[1.01]'
                      : 'bg-[#060410]/90 text-slate-400 hover:text-slate-200 hover:border-purple-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#241a45] text-[11px]">
                      <span className="font-bold tracking-wider" style={{ color: track.themeColor }}>
                        TRACK // {track.number}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 border ${
                        isSelected ? 'bg-black/90 text-white' : 'text-slate-400 border-[#312856]'
                      }`}>
                        {isSelected ? '● ACTIVE' : '○ SELECT'}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div
                        className="p-2.5 rounded border transition-transform group-hover:scale-110"
                        style={{
                          borderColor: `${track.themeColor}50`,
                          backgroundColor: `${track.themeColor}15`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: track.themeColor }} />
                      </div>
                      <div>
                        <h3 className="font-mono text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                          {track.title}
                        </h3>
                        <div className="text-[11px] text-slate-300 font-semibold truncate max-w-[200px]">
                          {track.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#241a45] flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">{track.tagline}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 transition-transform group-hover:translate-x-1" style={{ color: track.themeColor }} />
                  </div>
                </HoloCard>
              );
            })}
          </div>

          {/* Right Column: Deep Dossier Terminal for Selected Track (8 cols) */}
          <HoloCard
            glowColor={currentTrack.themeColor}
            className="lg:col-span-8 bg-[#060410]/95 border p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between relative space-y-6"
          >
            <div>
              {/* Dossier Header with Moodboard Barcode & QR Stamp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#312856]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: currentTrack.themeColor }}>
                      TRACK // {currentTrack.number} ACTIVE DOSSIER
                    </div>
                    <span className="text-[10px] text-slate-400 bg-black/60 px-2 py-0.5 border border-[#312856] font-mono">
                      ||||| ||| ||||||| 2097.VECTOR
                    </span>
                  </div>
                  <h3 className="font-mono text-2xl sm:text-3xl font-black text-white mt-1 uppercase">
                    {currentTrack.title} — <span className="text-slate-200 font-medium text-lg sm:text-xl">{currentTrack.subtitle}</span>
                  </h3>
                </div>

                <a
                  href="#timeline"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b081a] border border-[#312856] hover:border-cyan-400 font-mono text-xs text-slate-100 hover:text-cyan-300 uppercase tracking-wider transition-colors shrink-0 shadow-lg cursor-pointer"
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
                <div className="font-mono text-[11px] text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: currentTrack.themeColor }} />
                  <span>SUGGESTED PROBLEM VECTORS & INSPIRATION:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTrack.potentialThemes.map((theme, i) => (
                    <div
                      key={i}
                      className="bg-[#0b081a]/95 border border-[#241a45] p-2.5 font-mono text-xs text-slate-200 flex items-center gap-2.5 hover:border-purple-500 transition-colors shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: currentTrack.themeColor }} />
                      <span className="truncate">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="pt-4 border-t border-[#312856] flex items-center justify-between font-mono text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 font-bold" style={{ color: currentTrack.themeColor }}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SQUAD REGISTRATION OPEN FOR {currentTrack.title}</span>
              </span>
              <span className="text-slate-400">36-HOUR BUILD TRACK // MOD 2097</span>
            </div>
          </HoloCard>
        </div>
      </div>
    </section>
  );
}
