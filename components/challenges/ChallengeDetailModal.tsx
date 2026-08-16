'use client';

import React from 'react';
import { ChallengeDomain } from '@/lib/types';
import { X, ShieldAlert, Award, Cpu, Code2, CheckSquare } from 'lucide-react';
import { sound } from '@/lib/audio';

interface ChallengeDetailModalProps {
  domain: ChallengeDomain | null;
  onClose: () => void;
}

export default function ChallengeDetailModal({ domain, onClose }: ChallengeDetailModalProps) {
  if (!domain) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <div className="bg-[#070c14] border border-cyan-500/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 hud-bracket shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#162436] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 border border-cyan-500/30">
              {domain.systemCode} // {domain.domain}
            </span>
            <span className="font-mono text-xs text-slate-400">CLASSIFIED SPECIFICATION</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-cyan-400 border border-[#162436] hover:border-cyan-400 transition-colors focus:outline-none"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="mt-6">
          <h3 id="modal-title" className="text-2xl sm:text-3xl font-mono font-black text-white uppercase">
            {domain.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-cyan-300 font-semibold tracking-wider">
            {domain.tagline}
          </p>
        </div>

        {/* Overview */}
        <div className="mt-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#04080f] p-4 border border-[#162436]">
          {domain.description}
        </div>

        {/* Challenge Tracks */}
        <div className="mt-8 space-y-6">
          <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            OPERATIONAL BOUNTY TRACKS
          </div>

          <div className="grid grid-cols-1 gap-4">
            {domain.tracks.map((track, i) => (
              <div
                key={track.title}
                className="bg-[#09101c] border border-[#162436] p-5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#162436] pb-3">
                  <div className="font-mono text-sm font-bold text-white">
                    TRACK 0{i + 1}: {track.title}
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 border border-emerald-500/30">
                    BOUNTY: {track.bounty}
                  </div>
                </div>

                <p className="mt-3 font-mono text-xs text-slate-300 leading-relaxed">
                  {track.focus}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-500 mr-2">TECH VECTORS:</span>
                  {track.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-cyan-300 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-[#162436] flex justify-end gap-4">
          <a
            href="#register"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-black transition-colors"
          >
            INITIALIZE REGISTRATION FOR THIS DOMAIN →
          </a>
        </div>
      </div>
    </div>
  );
}
