'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Activity, Cpu, Globe2, ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
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

  const CurrentIcon = getIcon(currentTrack.id);

  return (
    <section
      id="tracks"
      aria-label="Official ENIGMA 5.0 Hackathon Tracks"
      className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 sm:pb-6 border-b border-slate-800 gap-3 sm:gap-4">
          <div>
            <div className="font-mono text-[11px] sm:text-xs text-red-400 tracking-widest uppercase mb-1.5 sm:mb-2 flex items-center gap-2 font-bold">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span>OFFICIAL COMPETITION VECTORS // 03 TRACKS</span>
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
              THE 03 OFFICIAL TRACKS
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-md">
            Select your squad's primary development vector. Inspect the live dossier for themes and technical problem statements.
          </p>
        </div>

        {/* Mobile Vector Switcher Tabs (Visible on < 1024px) */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-mono text-xs">
          {tracks.map((track) => {
            const isSelected = track.id === selectedTrackId;
            const Icon = getIcon(track.id);

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedTrackId(track.id);
                }}
                className={`flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_15px_rgba(255,42,85,0.4)]'
                    : 'bg-[#060410]/90 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Unified 12-Column Side-by-Side Track Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Column: 3 Vertical Selector Cards (4 cols on Desktop, hidden on mobile in favor of top switcher) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-3.5 justify-between">
            {tracks.map((track) => {
              const Icon = getIcon(track.id);
              const isSelected = track.id === selectedTrackId;

              return (
                <HoloCard
                  key={track.id}
                  glowColor="rgba(255, 42, 85, 0.45)"
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrackId(track.id);
                  }}
                  className={`p-5 text-left font-mono border transition-all duration-300 relative flex-1 flex flex-col justify-between group cursor-pointer rounded-2xl ${
                    isSelected
                      ? 'bg-[#0f0a14] border-red-500 text-white shadow-[0_0_20px_rgba(255,42,85,0.3)] scale-[1.01]'
                      : 'bg-[#060410]/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                      <span className="font-bold tracking-wider text-red-400">
                        TRACK // {track.number}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 border ${
                          isSelected ? 'bg-red-600 text-white border-red-500' : 'text-slate-400 border-slate-800'
                        }`}
                      >
                        {isSelected ? '● ACTIVE' : '○ SELECT'}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="p-2.5 rounded-lg border border-red-500/40 bg-red-950/40 text-red-400 transition-transform group-hover:scale-110">
                        <Icon className="w-6 h-6" />
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

                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate">{track.tagline}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </HoloCard>
              );
            })}
          </div>

          {/* Right Column: Selected Track Deep Dossier (8 cols) */}
          <div className="lg:col-span-8">
            <HoloCard
              glowColor="rgba(255, 42, 85, 0.4)"
              className="bg-[#060410]/95 border border-slate-800 p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl h-full flex flex-col justify-between rounded-2xl"
            >
              <div className="space-y-4 sm:space-y-5">
                {/* Track Hero Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-950/60 border border-red-500/50 text-red-400 rounded-xl">
                      <CurrentIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-widest">
                        COMPETITION TRACK {currentTrack.number}
                      </div>
                      <h3 className="font-mono text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                        {currentTrack.title}
                      </h3>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto font-mono text-[10px] font-bold px-3 py-1 bg-red-950/50 border border-red-500/40 text-red-300 rounded-full">
                    36H HACKATHON VECTOR
                  </span>
                </div>

                {/* Subtitle & Description */}
                <div className="font-mono space-y-2">
                  <div className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-wider">
                    MISSION: {currentTrack.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentTrack.description}
                  </p>
                </div>

                {/* Potential Themes Chip Grid */}
                <div className="space-y-2.5">
                  <div className="font-mono text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    <span>EXPLORATION THEMES & PROBLEM DOMAINS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                    {currentTrack.potentialThemes.map((theme, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-[#0b0818] border border-slate-800/90 hover:border-red-500/40 text-slate-200 transition-colors rounded-lg text-[11px]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="truncate">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="font-mono text-[10px] text-slate-500 uppercase">
                  UNLIMITED SQUADS PER TRACK // INTER-DISCIPLINARY COUNCILS
                </span>
                <a
                  href={EVENT_CONFIG.socials.unstop}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,42,85,0.4)] active:scale-95 rounded-lg cursor-pointer"
                >
                  <span>SELECT {currentTrack.title} & REGISTER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </HoloCard>
          </div>
        </div>
      </div>
    </section>
  );
}
