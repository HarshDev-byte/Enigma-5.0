'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, Radio, Sparkles, Music, FastForward } from 'lucide-react';
import { sound } from '@/lib/audio';

interface Track {
  name: string;
  bpm: number;
  scale: number[];
  baseFreq: number;
}

const TRACKS: Track[] = [
  {
    name: 'GENESIS OVERDRIVE',
    bpm: 120,
    scale: [220, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25], // A minor pentatonic + octave
    baseFreq: 55, // A1 sub-bass
  },
  {
    name: 'NEURAL DRIFT',
    bpm: 96,
    scale: [196.00, 233.08, 261.63, 293.66, 349.23, 392.00, 466.16, 523.25], // G minor
    baseFreq: 49, // G1 sub-bass
  },
  {
    name: 'RED ALERT 2097',
    bpm: 138,
    scale: [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 783.99], // C minor
    baseFreq: 65.41, // C2 sub-bass
  },
];

interface CyberSoundtrackPlayerProps {
  scrollProgress: number;
}

export default function CyberSoundtrackPlayer({ scrollProgress }: CyberSoundtrackPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [analyserData, setAnalyserData] = useState<number[]>([12, 28, 45, 18, 60, 32, 50, 20]);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stepIndexRef = useRef<number>(0);

  const isRedPhase = scrollProgress >= 0.15;
  const primaryColor = isRedPhase ? '#ff2a55' : '#ffffff';
  const currentTrack = TRACKS[currentTrackIdx];

  // Initialize Web Audio Synthesizer
  const initAudio = () => {
    if (!ctxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.18;
        masterGain.connect(ctx.destination);
        ctxRef.current = ctx;
        masterGainRef.current = masterGain;
      }
    }

    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
  };

  // Play a single synthesized step
  const playStep = (track: Track, step: number) => {
    if (!ctxRef.current || !masterGainRef.current) return;
    const ctx = ctxRef.current;
    const now = ctx.currentTime;

    // 1. Synth Arpeggio Note
    const noteIdx = step % track.scale.length;
    const freq = track.scale[noteIdx];

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = step % 4 === 0 ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const stepDuration = 60 / track.bpm / 2; // 16th note
    noteGain.gain.setValueAtTime(0.14, now);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);

    osc.connect(noteGain);
    noteGain.connect(masterGainRef.current);

    osc.start(now);
    osc.stop(now + stepDuration * 0.9);

    // 2. Sub-Bass Kick Drone on downbeats
    if (step % 4 === 0) {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(track.baseFreq * 2, now);
      bassOsc.frequency.exponentialRampToValueAtTime(track.baseFreq, now + 0.15);

      bassGain.gain.setValueAtTime(0.25, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      bassOsc.connect(bassGain);
      bassGain.connect(masterGainRef.current);

      bassOsc.start(now);
      bassOsc.stop(now + 0.35);
    }

    // 3. Update Visualizer bars
    setAnalyserData((prev) =>
      prev.map((_, i) => Math.floor(15 + Math.random() * 55 * (1 + (i % 2) * 0.4)))
    );
  };

  // Start / Stop Loop
  useEffect(() => {
    if (isPlaying) {
      initAudio();
      const stepDurationMs = (60 / currentTrack.bpm / 2) * 1000;

      stepTimerRef.current = setInterval(() => {
        playStep(currentTrack, stepIndexRef.current);
        stepIndexRef.current = (stepIndexRef.current + 1) % 32;
      }, stepDurationMs);
    } else {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
      setAnalyserData([12, 16, 20, 14, 18, 12, 16, 10]);
    }

    return () => {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
      }
    };
  }, [isPlaying, currentTrackIdx]);

  const togglePlayback = () => {
    sound.playClick();
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    sound.playClick();
    setCurrentTrackIdx((prev) => (prev + 1) % TRACKS.length);
    stepIndexRef.current = 0;
  };

  return (
    <div className="fixed bottom-20 right-3 sm:right-6 z-40 font-mono select-none pointer-events-auto">
      {/* 1. Collapsed Mini Floating Pill */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-[#060410]/95 border border-slate-800 hover:border-red-500/80 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-all cursor-pointer group active:scale-95"
          style={{ borderColor: isPlaying ? primaryColor : undefined }}
        >
          <div className={`p-1.5 rounded-full ${isPlaying ? 'bg-red-500 animate-spin text-black' : 'bg-slate-800 text-slate-300'}`}>
            <Music className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5 pr-1">
            {analyserData.slice(0, 5).map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full transition-all duration-100"
                style={{
                  height: `${isPlaying ? Math.max(6, h * 0.35) : 6}px`,
                  backgroundColor: isPlaying ? primaryColor : '#64748b',
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-300 group-hover:text-white uppercase hidden xs:inline">
            {isPlaying ? 'PLAYING BGM' : 'CYBER AUDIO'}
          </span>
        </button>
      ) : (
        /* 2. Expanded Futuristic Sound Deck */
        <div
          className="w-72 bg-[#060410]/98 border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] hud-bracket rounded-lg space-y-3 animate-fade-in"
          style={{ borderColor: isPlaying ? primaryColor : '#334155' }}
        >
          {/* Deck Header */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-200">
                2097 SYNTH SOUNDBOARD
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsMinimized(true);
              }}
              className="text-slate-400 hover:text-white text-xs cursor-pointer p-0.5"
            >
              ✕
            </button>
          </div>

          {/* Track Info & Visualizer */}
          <div className="bg-[#08060f] p-3 border border-slate-800 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white uppercase truncate">
                {currentTrack.name}
              </span>
              <span className="text-[9px] font-bold text-red-400">
                {currentTrack.bpm} BPM
              </span>
            </div>

            {/* Visualizer bars */}
            <div className="flex items-end justify-between gap-1 h-8 pt-1">
              {analyserData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all duration-75"
                  style={{
                    height: `${isPlaying ? Math.max(8, h * 0.5) : 6}px`,
                    backgroundColor: isPlaying ? primaryColor : '#334155',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,42,85,0.4)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'PAUSE BGM' : 'START BGM'}</span>
            </button>

            <button
              type="button"
              onClick={nextTrack}
              title="Next Cyber Track"
              className="p-2 bg-[#08060f] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
