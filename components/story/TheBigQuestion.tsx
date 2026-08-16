'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

export default function TheBigQuestion() {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      sound.playGlitch();
      setTimeout(() => {
        setIsTransformed((prev) => !prev);
        setIsGlitching(false);
      }, 350);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleManualToggle = () => {
    setIsGlitching(true);
    sound.playGlitch();
    setTimeout(() => {
      setIsTransformed((prev) => !prev);
      setIsGlitching(false);
    }, 250);
  };

  return (
    <section
      aria-label="The Big Question Manifesto"
      onClick={handleManualToggle}
      className="relative min-h-[90vh] flex flex-col justify-center items-center py-28 px-4 sm:px-8 lg:px-12 bg-[#020305]/95 border-b border-[#162436] overflow-hidden select-none cursor-pointer group"
    >
      {/* Background Volumetric Center Radial Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12)_0,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs text-cyan-300 bg-[#03060c]/90 px-4 py-1.5 border border-cyan-500/40 uppercase tracking-[0.3em] hud-bracket">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>PARADIGM CONVERGENCE // 2097</span>
        </div>

        {/* Massive Full-Viewport Typography */}
        <div
          className={`font-mono font-black uppercase tracking-tighter leading-[1.05] transition-all duration-500 ${
            isGlitching ? 'glitch-hover opacity-60 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {!isTransformed ? (
            <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-slate-300 font-extralight tracking-tight">
              WHAT WILL THE FUTURE <br />
              <span className="text-white font-black drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                LOOK LIKE?
              </span>
            </h2>
          ) : (
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-fuchsia-300 drop-shadow-[0_0_50px_rgba(0,240,255,0.45)]">
              WHAT WILL YOU BUILD <br />
              <span className="text-white font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl block my-2">
                WHEN YOU GET THE CHANCE
              </span>
              <span className="text-cyan-300">TO CREATE IT AGAIN?</span>
            </h2>
          )}
        </div>

        <div className="font-mono text-xs text-slate-500 tracking-widest uppercase">
          [ CLICK VIEWPORT TO SHIFT PARADIGM ]
        </div>

        <p className="font-mono text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Genesis is not asking you to forecast what is coming. It is granting you the architectural authority to redesign civilization.
        </p>

        <div className="pt-4 flex justify-center">
          <a
            href={EVENT_CONFIG.urls.primaryRegistration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playGenesisActivation();
            }}
            className="group relative px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs sm:text-sm font-black uppercase tracking-[0.25em] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.5)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-2.5">
              <span>INITIALIZE ARCHITECT REGISTRATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
