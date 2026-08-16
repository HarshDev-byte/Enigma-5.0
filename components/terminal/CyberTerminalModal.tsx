'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, ArrowRight, CornerDownLeft, Sparkles, Radio, ShieldAlert } from 'lucide-react';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWarpToSection: (id: string) => void;
}

export default function CyberTerminalModal({ isOpen, onClose, onWarpToSection }: CyberTerminalModalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'cmd' | 'resp' | 'sys'; text: string }>>([
    { type: 'sys', text: 'INIT PROTOCOL // ENIGMA-5.0 GENESIS QUANTUM KERNEL' },
    { type: 'sys', text: 'NODE: 2097.MEGACITY.07 // ALL SYSTEMS NOMINAL' },
    { type: 'resp', text: 'Type a command or click a quick vector below: [tracks, prizes, timeline, rules, register, status, clear]' },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdText: string) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newHist = [...history, { type: 'cmd' as const, text: `> ${cmdText}` }];

    switch (cmd) {
      case 'help':
        newHist.push({
          type: 'resp',
          text: 'AVAILABLE DIRECTIVES:\n• tracks - Inspect the 03 Official Competition Vectors\n• prizes - Access the ₹1,50,000+ Prize Vault breakdown\n• timeline - View the 4-Stage Sprint Roadmap\n• rules - Review Security Protocols and Evaluation vectors\n• register - Launch the Unstop Registration Portal\n• status - Run live system diagnostic audit\n• clear - Flush terminal buffer',
        });
        break;

      case 'tracks':
        newHist.push({
          type: 'resp',
          text: 'OFFICIAL TRACKS:\n1. HEALTHCARE & BIO-AUGMENTATION (Magenta)\n2. FINTECH & DECENTRALIZED SYSTEMS (Cyan)\n3. SUSTAINABILITY & GAIA BIOSPHERES (Matrix Green)\n\nWarpgate opening to Sector 04...',
        });
        onWarpToSection('tracks');
        break;

      case 'prizes':
        newHist.push({
          type: 'resp',
          text: `PRIZE POOL BREAKDOWN:\n• Total Vault: ${EVENT_CONFIG.prizes.totalPool}\n• 1st Place Champion: ₹60,000+\n• 2nd Place Runner-Up: ₹40,000+\n• 3rd Place Third Rank: ₹25,000+\n• Category Bounties: ₹25,000+\n\nWarpgate opening to Sector 06...`,
        });
        onWarpToSection('prizes');
        break;

      case 'timeline':
        newHist.push({
          type: 'resp',
          text: 'MISSION SPRINT TIMELINE:\n• Round 01: Oct 01 - Oct 20 (Abstract)\n• Round 02: Oct 24 - 25 (36-Hour Continuous Build)\n• Round 03: Oct 26 (Jury Defense)\n• Finale: Oct 26 (Awards Gala)\n\nWarpgate opening to Sector 05...',
        });
        onWarpToSection('timeline');
        break;

      case 'rules':
        newHist.push({
          type: 'resp',
          text: 'PROTOCOL SPECIFICATIONS:\n• Squad Allocations: 2 - 4 Architects\n• Intellectual Property: 100% Creator Sovereign\n• Tech Freedom: All modern AI, hardware, Web3, fullstack frameworks\n\nWarpgate opening to Sector 07...',
        });
        onWarpToSection('protocols');
        break;

      case 'register':
        newHist.push({
          type: 'resp',
          text: 'GATEWAY 10 UNLOCKED // Redirecting to Unstop Portal...',
        });
        sound.playAccessGranted();
        onWarpToSection('register');
        break;

      case 'status':
        sound.playGlitch();
        newHist.push({
          type: 'resp',
          text: 'SYSTEM DIAGNOSTICS:\n[✓] 3D WebGL Matrix: OPERATIONAL\n[✓] Audio Synthesizer: ONLINE (4.8 THz)\n[✓] Security Firewall: ACTIVE\n[✓] Registration Window: CLOSING SOON\n[!] ANOMALY: GENESIS CORE HARMONIC STABLE',
        });
        break;

      case 'clear':
        setHistory([
          { type: 'sys', text: 'BUFFER FLUSHED // TERMINAL REINITIALIZED' },
        ]);
        setInputVal('');
        return;

      default:
        sound.playGlitch();
        newHist.push({
          type: 'resp',
          text: `COMMAND NOT RECOGNIZED: "${cmdText}". Type "help" for a list of operational directives.`,
        });
        break;
    }

    setHistory(newHist);
    setInputVal('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#040308]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 font-mono text-white animate-in fade-in zoom-in-95 duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#060410]/98 border-2 border-cyan-400 hud-bracket shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="bg-[#0c081e] px-4 py-3 border-b border-[#312856] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400">
              ENIGMA // CYBERNETIC COMMAND TERMINAL
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-2.5 py-1 bg-[#15102a] border border-[#312856] text-slate-400 hover:text-white text-xs font-bold active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <span>[ ESC ]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Output Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed max-h-[55vh] scanlines">
          {history.map((h, i) => (
            <div
              key={i}
              className={`${
                h.type === 'sys'
                  ? 'text-purple-400 font-bold border-l-2 border-purple-500 pl-2'
                  : h.type === 'cmd'
                  ? 'text-cyan-300 font-bold'
                  : 'text-slate-200 whitespace-pre-line pl-2'
              }`}
            >
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Action Directive Chips */}
        <div className="px-4 sm:px-6 py-2 border-t border-[#241a45] bg-[#080614] flex flex-wrap items-center gap-1.5 text-[10px]">
          <span className="text-slate-500 font-bold uppercase mr-1">QUICK:</span>
          {['tracks', 'prizes', 'timeline', 'rules', 'register', 'status', 'clear'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleCommand(chip)}
              className="px-2.5 py-1 bg-[#0e0a24] border border-[#312856] hover:border-cyan-400 text-cyan-300 hover:text-white uppercase font-bold active:scale-95 transition-all cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="p-3 sm:p-4 bg-[#040308] border-t border-[#312856] flex items-center gap-2"
        >
          <span className="text-cyan-400 font-black pl-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              sound.playKeypress();
              setInputVal(e.target.value);
            }}
            placeholder="Type command or press Enter..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600 tracking-wider"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-black text-xs uppercase tracking-wider active:scale-95 shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1 cursor-pointer"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
