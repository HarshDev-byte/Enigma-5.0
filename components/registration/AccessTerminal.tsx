'use client';

import React, { useState } from 'react';
import { generateArchitectId, generateCryptoHash } from '@/lib/utils';
import { Terminal, ShieldCheck, CheckCircle2, Copy, Check, QrCode, Sparkles, User, Mail, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/audio';

export default function AccessTerminal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [domain, setDomain] = useState<'HEALTH' | 'FINANCE' | 'EARTH'>('HEALTH');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredBadge, setRegisteredBadge] = useState<{
    id: string;
    hash: string;
    name: string;
    team: string;
    domain: string;
    timestamp: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      const architectId = generateArchitectId(name, domain);
      const cryptoHash = generateCryptoHash();
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

      setRegisteredBadge({
        id: architectId,
        hash: cryptoHash,
        name: name.toUpperCase(),
        team: (team || 'SOLO ARCHITECT').toUpperCase(),
        domain: domain,
        timestamp: now,
      });

      setIsSubmitting(false);
      sound.playAccessGranted();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#10ff88', '#d946ef', '#ffffff'],
        });
      } catch {}
    }, 1000);
  };

  const handleCopyId = () => {
    if (!registeredBadge) return;
    navigator.clipboard.writeText(registeredBadge.id);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="register"
      aria-label="Architect Access Terminal and Registration"
      className="relative py-28 px-4 sm:px-8 lg:px-12 bg-[#030509] border-b border-[#162436] hud-grid"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1 border border-cyan-500/40 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>GENESIS ACCESS TERMINAL // CLEARANCE ENTRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white uppercase">
            ARCHITECT REGISTRATION
          </h2>
          <p className="mt-3 font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Encode your identity into the Genesis protocol registry. Claim your system domain and obtain cryptographic architect clearance.
          </p>
        </div>

        {!registeredBadge ? (
          /* Form Terminal */
          <form
            onSubmit={handleSubmit}
            className="bg-[#070c14] border border-[#162436] p-6 sm:p-10 hud-bracket shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#162436] font-mono text-xs text-slate-400">
              <span>PROTOCOL FORM // AUTH_INPUT</span>
              <span className="text-cyan-400">STATUS: OPEN FOR SUBMISSION</span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-slate-300 font-bold uppercase mb-2">
                  ARCHITECT FULL NAME *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. MARCUS VANCE"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      sound.playKeypress();
                    }}
                    className="w-full bg-[#03060b] border border-[#162436] focus:border-cyan-400 py-3 pl-10 pr-4 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 font-bold uppercase mb-2">
                  COMMUNICATION FREQUENCY (EMAIL) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="architect@domain.2097"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      sound.playKeypress();
                    }}
                    className="w-full bg-[#03060b] border border-[#162436] focus:border-cyan-400 py-3 pl-10 pr-4 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-slate-300 font-bold uppercase mb-2">
                  SQUAD / TEAM DESIGNATION
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. NEURAL FORGE 09"
                    value={team}
                    onChange={(e) => {
                      setTeam(e.target.value);
                      sound.playKeypress();
                    }}
                    className="w-full bg-[#03060b] border border-[#162436] focus:border-cyan-400 py-3 pl-10 pr-4 font-mono text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 font-bold uppercase mb-2">
                  PRIMARY COLLAPSE DOMAIN *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['HEALTH', 'FINANCE', 'EARTH'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setDomain(d);
                      }}
                      className={`py-3 px-2 font-mono text-[11px] font-bold uppercase border transition-all ${
                        domain === d
                          ? d === 'HEALTH'
                            ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300'
                            : d === 'FINANCE'
                            ? 'border-fuchsia-400 bg-fuchsia-950/50 text-fuchsia-300'
                            : 'border-emerald-400 bg-emerald-950/50 text-emerald-300'
                          : 'border-[#162436] bg-[#03060b] text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#162436]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span>{isSubmitting ? 'ENCODING ARCHITECT CREDENTIALS...' : '[ INITIALIZE REGISTRATION ]'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Issued Holographic Badge Terminal */
          <div className="bg-[#070c14] border border-emerald-400/60 p-6 sm:p-10 hud-bracket shadow-[0_0_30px_rgba(16,255,136,0.15)] space-y-6">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#162436] gap-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>IDENTITY VERIFIED // ARCHITECT PROFILE CREATED</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                AUTH_KEY: {registeredBadge.hash}
              </span>
            </div>

            {/* Holographic Architect Badge Card */}
            <div className="bg-gradient-to-br from-[#091522] via-[#070d16] to-[#040810] border border-cyan-400/40 p-6 sm:p-8 rounded-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-[#162436]">
                <div>
                  <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                    GENESIS PROTOCOL CLEARANCE BADGE
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-white uppercase mt-1">
                    {registeredBadge.name}
                  </div>
                  <div className="font-mono text-xs text-slate-400 mt-0.5">
                    SQUAD: {registeredBadge.team}
                  </div>
                </div>

                <div className="bg-black/60 p-3 border border-[#162436] text-center font-mono text-[10px] text-cyan-300">
                  <QrCode className="w-10 h-10 mx-auto text-cyan-400 mb-1" />
                  <span>2097.AUTH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 font-mono text-xs">
                <div>
                  <div className="text-slate-500 text-[10px]">ARCHITECT ID</div>
                  <div className="text-white font-bold mt-0.5">{registeredBadge.id}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">DOMAIN</div>
                  <div className="text-emerald-400 font-bold mt-0.5">{registeredBadge.domain}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">CLEARANCE</div>
                  <div className="text-cyan-400 font-bold mt-0.5">GRADE 1 AUTHORIZED</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">TIMESTAMP</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{registeredBadge.timestamp}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#162436]">
              <button
                onClick={handleCopyId}
                className="px-4 py-2.5 bg-[#0e1724] hover:bg-cyan-950 border border-[#243b55] hover:border-cyan-400 font-mono text-xs text-cyan-300 flex items-center gap-2 transition-colors focus:outline-none"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'ARCHITECT ID COPIED' : 'COPY CLEARANCE ID'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setRegisteredBadge(null);
                }}
                className="font-mono text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                [ REGISTER ANOTHER ARCHITECT ]
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
