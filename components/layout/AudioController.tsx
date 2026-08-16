'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Activity } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Start ambient on first interaction
    const handleFirstInteraction = () => {
      if (!isStarted) {
        sound.startAmbient();
        setIsStarted(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isStarted]);

  const handleToggle = () => {
    sound.startAmbient();
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        className="group flex items-center gap-3 px-3 py-2 bg-[#070c14]/90 hover:bg-[#0e1724] border border-[#162436] hover:border-cyan-400/60 transition-all text-xs font-mono tracking-widest text-slate-300 hover:text-cyan-400 shadow-lg backdrop-blur-md"
        title={isMuted ? 'Unmute Audio Experience' : 'Mute Audio Experience'}
        aria-label={isMuted ? 'Unmute Audio Experience' : 'Mute Audio Experience'}
      >
        <div className="flex items-center gap-1">
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          )}
          
          {/* Animated sound bars */}
          <div className="flex items-end gap-[2px] h-3 px-1">
            <span
              className={`w-[2px] bg-cyan-400 transition-all ${
                isMuted ? 'h-1 bg-slate-600' : 'h-3 animate-pulse'
              }`}
            />
            <span
              className={`w-[2px] bg-cyan-400 transition-all ${
                isMuted ? 'h-1 bg-slate-600' : 'h-2 animate-bounce'
              }`}
            />
            <span
              className={`w-[2px] bg-cyan-400 transition-all ${
                isMuted ? 'h-1 bg-slate-600' : 'h-3.5 animate-pulse'
              }`}
            />
          </div>
        </div>

        <span className="hidden sm:inline-block text-[10px] text-slate-400 group-hover:text-cyan-300 uppercase">
          {isMuted ? 'AUDIO // MUTED' : 'SYNTH // ACTIVE'}
        </span>
      </button>
    </div>
  );
}
