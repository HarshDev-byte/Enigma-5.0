'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Sparkles,
  QrCode,
  ShieldCheck,
  Zap,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Cpu,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import HoloCard from '@/components/ui/HoloCard';

interface ArchitectPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectPassModal({ isOpen, onClose }: ArchitectPassModalProps) {
  const [squadName, setSquadName] = useState('CYBER_NEXUS');
  const [architectHandle, setArchitectHandle] = useState('ARCHITECT_01');
  const [selectedTrack, setSelectedTrack] = useState<'healthcare' | 'fintech' | 'sustainability'>('healthcare');
  const [roleSpecialization, setRoleSpecialization] = useState('SYSTEMS_CORE');
  const [copied, setCopied] = useState(false);

  const passRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const trackInfo = {
    healthcare: { name: 'HEALTHCARE & BIO-AUGMENTATION', color: '#ff2a55', badge: 'VECTOR 01' },
    fintech: { name: 'FINTECH & DECENTRALIZED SYSTEMS', color: '#e2e8f0', badge: 'VECTOR 02' },
    sustainability: { name: 'SUSTAINABILITY & BIOSPHERES', color: '#fbbf24', badge: 'VECTOR 03' },
  }[selectedTrack];

  const passSerial = `ENIGMA-5.0-${selectedTrack.toUpperCase().slice(0, 3)}-${Math.floor(
    1000 + (squadName.length * 137) % 9000
  )}`;

  const handleCopyPass = () => {
    sound.playAccessGranted();
    setCopied(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#ff2a55', '#ffffff', '#fbbf24', '#ff6b8b'],
      });
    } catch {}

    const textToCopy = `🎫 [ENIGMA 5.0 OFFICIAL ARCHITECT PASS]\nSquad: ${squadName.toUpperCase()}\nLead: @${architectHandle}\nTrack: ${trackInfo.name}\nRole: ${roleSpecialization}\nSerial: ${passSerial}\nRegister on Unstop: ${EVENT_CONFIG.socials.unstop}`;
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in font-mono select-none">
      <div className="relative w-full max-w-4xl bg-[#060410] border border-[#312856] shadow-[0_0_60px_rgba(0,0,0,0.95)] hud-bracket overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#241a45] bg-[#0b081a]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-white uppercase tracking-widest">
              2097 ARCHITECT PASS // SQUAD GENERATOR
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white border border-transparent hover:border-[#312856] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: 2 Columns (Form on Left, 3D Holographic Pass on Right) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Form Controls (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                1. SQUAD CALLSIGN / TEAM NAME
              </label>
              <input
                type="text"
                maxLength={24}
                value={squadName}
                onChange={(e) => setSquadName(e.target.value.toUpperCase())}
                placeholder="E.G. QUANTUM_ARCHITECTS"
                className="w-full px-3.5 py-2.5 bg-[#0b081a] border border-[#312856] text-white text-xs font-mono font-bold focus:border-emerald-400 focus:outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                2. ARCHITECT HANDLE / SQUAD LEAD
              </label>
              <input
                type="text"
                maxLength={20}
                value={architectHandle}
                onChange={(e) => setArchitectHandle(e.target.value)}
                placeholder="E.G. HARSH_DEV"
                className="w-full px-3.5 py-2.5 bg-[#0b081a] border border-[#312856] text-white text-xs font-mono font-bold focus:border-emerald-400 focus:outline-none tracking-wider"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                3. PRIMARY COMPETITION VECTOR
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'healthcare', label: 'HEALTHCARE', color: '#d946ef' },
                  { id: 'fintech', label: 'FINTECH', color: '#00f0ff' },
                  { id: 'sustainability', label: 'SUSTAIN', color: '#10ff88' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedTrack(t.id as any);
                    }}
                    className={`py-2 px-1 text-[10px] font-bold border uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTrack === t.id
                        ? 'bg-black text-white border-white shadow-md scale-[1.02]'
                        : 'bg-[#0b081a] text-slate-400 border-[#241a45] hover:text-white'
                    }`}
                    style={{ borderColor: selectedTrack === t.id ? t.color : undefined }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                4. ROLE SPECIALIZATION
              </label>
              <select
                value={roleSpecialization}
                onChange={(e) => setRoleSpecialization(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b081a] border border-[#312856] text-white text-xs font-mono font-bold focus:border-emerald-400 focus:outline-none tracking-wider"
              >
                <option value="SYSTEMS_CORE">SYSTEMS CORE / BACKEND ARCHITECT</option>
                <option value="AI_NEURAL_SPECIALIST">AI & NEURAL MODEL ENGINEER</option>
                <option value="ZK_SECURITY_RESEARCHER">ZK CRYPTOGRAPHY & SECURITY</option>
                <option value="UI_CYBERNETICIST">UI/UX HOLOGRAPHIC DESIGNER</option>
                <option value="HARDWARE_EDGE_HACKER">HARDWARE & SENSOR PROTOTYPER</option>
              </select>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleCopyPass}
                className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,255,136,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'PASS COPIED TO CLIPBOARD!' : 'COPY / SHARE PASS'}</span>
              </button>

              <a
                href={EVENT_CONFIG.socials.unstop}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="py-3 px-4 bg-[#0b081a] hover:bg-black border border-emerald-500/50 text-emerald-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>CLAIM ON UNSTOP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Holographic Digital ID Pass (6 cols) */}
          <div className="md:col-span-6 flex justify-center">
            <HoloCard
              glowColor={trackInfo.color}
              className="w-full max-w-[340px] aspect-[1/1.4] bg-gradient-to-b from-[#110c26] via-[#080515] to-[#040308] border-2 p-5 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)] relative rounded-lg"
            >
              {/* Pass Header */}
              <div className="flex justify-between items-start border-b border-[#312856] pb-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">OFFICIAL CREDENTIAL</div>
                  <div className="text-sm font-black text-white tracking-wider">ENIGMA 5.0 // 2097</div>
                </div>
                <div
                  className="px-2 py-0.5 text-[9px] font-black uppercase border rounded"
                  style={{ borderColor: trackInfo.color, color: trackInfo.color }}
                >
                  {trackInfo.badge}
                </div>
              </div>

              {/* Center Holographic Badge & Name */}
              <div className="my-auto text-center space-y-2 py-3">
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-dashed flex items-center justify-center bg-black/60 shadow-inner" style={{ borderColor: trackInfo.color }}>
                  <Cpu className="w-7 h-7 animate-pulse" style={{ color: trackInfo.color }} />
                </div>

                <div className="text-lg font-black text-white uppercase tracking-tight truncate px-2">
                  {squadName || 'SQUAD_NAME'}
                </div>

                <div className="text-[11px] font-mono text-slate-300 font-bold">
                  LEAD: @{architectHandle || 'HANDLE'}
                </div>

                <div className="inline-block px-2.5 py-1 bg-black/80 border border-[#312856] text-[9px] text-slate-300 uppercase tracking-widest">
                  {roleSpecialization.replace(/_/g, ' ')}
                </div>
              </div>

              {/* Bottom Telemetry & Barcode Matrix */}
              <div className="border-t border-[#312856] pt-3 space-y-2">
                <div className="flex justify-between items-center text-[9px] text-slate-400">
                  <span>SERIAL: {passSerial}</span>
                  <span className="text-emerald-400 font-bold">CLEARANCE: GRANTED</span>
                </div>

                {/* Cyber Barcode Simulation */}
                <div className="h-6 w-full flex items-center justify-between opacity-70 gap-0.5">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white h-full"
                      style={{
                        width: `${(i % 3) + 1}px`,
                        opacity: (i % 4 === 0 ? 0.3 : 0.85),
                      }}
                    />
                  ))}
                </div>
              </div>
            </HoloCard>
          </div>
        </div>
      </div>
    </div>
  );
}
