'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { generateArchitectId } from '@/lib/utils';
import { Terminal, ExternalLink, Sparkles, ArrowRight, ShieldCheck, Check, Copy, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';

export default function ExternalRegistrationCTA() {
  const [testName, setTestName] = useState('');
  const [testDomain, setTestDomain] = useState<'HEALTH' | 'FINANCE' | 'EARTH'>('HEALTH');
  const [generatedPass, setGeneratedPass] = useState<{ id: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim()) return;

    sound.playAccessGranted();
    const id = generateArchitectId(testName, testDomain);
    setGeneratedPass({ id, name: testName.toUpperCase() });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#10ff88', '#ec4899'],
      });
    } catch {}
  };

  const handleCopy = () => {
    if (!generatedPass) return;
    navigator.clipboard.writeText(generatedPass.id);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="register"
      aria-label="Architect External Registration Gateways"
      className="relative py-36 px-4 sm:px-8 lg:px-12 bg-[#020306]/95 border-b border-[#162436] hud-grid overflow-hidden"
    >
      {/* Background Volumetric Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#03060c]/90 px-4 py-1.5 border border-cyan-500/40 uppercase tracking-[0.3em] hud-bracket">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>GATEWAY 07 // SYSTEM ACCESS</span>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs sm:text-sm text-slate-500 tracking-[0.35em] uppercase">
            YOU HAVE REACHED THE BEGINNING.
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-mono font-black text-white uppercase tracking-tight leading-tight">
            WHAT WILL YOU BUILD?
          </h2>
          <div className="font-mono text-base sm:text-xl text-cyan-300 tracking-[0.25em] font-light uppercase pt-2">
            ENIGMA 5.0 — GENESIS // BEYOND THE FUTURE
          </div>
        </div>

        <p className="font-mono text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Select your deployment portal below to submit your team credentials. Free entry. ₹1,50,000+ total prize vault. 36 hours of high-stakes systems engineering.
        </p>

        {/* Primary Giant CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={EVENT_CONFIG.urls.primaryRegistration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playGenesisActivation()}
            className="group relative w-full sm:w-auto px-12 py-5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-base sm:text-lg font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,240,255,0.6)] focus:outline-none focus:ring-2 focus:ring-cyan-400 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-3">
              <span>[ ENTER GENESIS ]</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* External Registration Portals (Devfolio, Unstop, Google Form) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <span className="text-slate-500 uppercase tracking-widest mr-2">DIRECT SUBMISSION NODES:</span>

          <a
            href={EVENT_CONFIG.urls.devfolio}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-cyan-400 text-slate-200 hover:text-cyan-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <span>DEVFOLIO</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <a
            href={EVENT_CONFIG.urls.unstop}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-fuchsia-400 text-slate-200 hover:text-fuchsia-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]"
          >
            <span>UNSTOP</span>
            <ExternalLink className="w-3.5 h-3.5 text-fuchsia-400" />
          </a>

          <a
            href={EVENT_CONFIG.urls.googleForm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="px-5 py-2.5 bg-[#03060c]/90 hover:bg-[#070c14] border border-[#243b55] hover:border-emerald-400 text-slate-200 hover:text-emerald-300 flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(16,255,136,0.2)]"
          >
            <span>GOOGLE FORM</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        </div>

        {/* Interactive Holographic Clearance Badge Simulator */}
        <div className="mt-14 bg-[#03060c]/90 border border-[#162436] p-6 sm:p-8 hud-bracket text-left max-w-2xl mx-auto backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#162436] font-mono text-xs text-slate-400">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              ARCHITECT CLEARANCE SIMULATOR
            </span>
            <span className="text-[10px] text-slate-500">CLIENT-SIDE 2097</span>
          </div>

          {!generatedPass ? (
            <form onSubmit={handleGeneratePreview} className="mt-4 space-y-4 font-mono text-xs">
              <p className="text-slate-400 text-[11px]">
                Preview your assigned cryptographic Architect ID before submitting your external registration:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="ENTER YOUR NAME"
                  value={testName}
                  onChange={(e) => {
                    setTestName(e.target.value);
                    sound.playKeypress();
                  }}
                  className="bg-[#020306] border border-[#162436] focus:border-cyan-400 py-2.5 px-3 text-white placeholder:text-slate-600 focus:outline-none"
                />

                <select
                  value={testDomain}
                  onChange={(e) => {
                    setTestDomain(e.target.value as any);
                    sound.playClick();
                  }}
                  className="bg-[#020306] border border-[#162436] focus:border-cyan-400 py-2.5 px-3 text-slate-300 focus:outline-none"
                >
                  <option value="HEALTH">DOMAIN: HEALTH</option>
                  <option value="FINANCE">DOMAIN: FINANCE</option>
                  <option value="EARTH">DOMAIN: SUSTAINABILITY</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#070c14] hover:bg-cyan-950/60 border border-[#243b55] hover:border-cyan-400 text-cyan-300 font-bold uppercase tracking-wider transition-all"
              >
                [ GENERATE CLEARANCE PREVIEW ]
              </button>
            </form>
          ) : (
            <div className="mt-4 space-y-4 font-mono text-xs">
              <div className="p-4 bg-[#020306] border border-cyan-400/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-cyan-400 font-bold text-sm">{generatedPass.name}</div>
                  <div className="text-slate-300 text-xs mt-0.5">{generatedPass.id}</div>
                  <div className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>GRADE 1 ARCHITECT CLEARANCE READY</span>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-[#070c14] hover:bg-cyan-950 border border-cyan-400 text-cyan-300 text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY ID'}</span>
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>Copy this ID to paste into your registration form.</span>
                <button
                  onClick={() => setGeneratedPass(null)}
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
