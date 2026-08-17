'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ArrowUp, MapPin, Mail, Phone, UserCheck } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

export default function FinalTransmission() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Enigma System Footer"
      className="relative pt-14 pb-28 sm:py-20 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-t border-[#1a1630] font-mono text-xs text-slate-400 hud-grid overflow-hidden"
    >
      {/* Background Volumetric Ambient Radial */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-52 rounded-full bg-red-600/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-14 relative z-10">
        {/* Top Footer Banner & Return to Summit */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#312856]">
          <div className="space-y-1">
            <div className="text-white font-black text-xl sm:text-3xl tracking-tighter uppercase font-mono">
              ENIGMA 5.0 — <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-300 to-orange-400">GENESIS</span>
            </div>
            <div className="text-slate-400 text-[10px] sm:text-xs tracking-widest uppercase">
              BEYOND THE FUTURE // 2097 ARCHITECT COUNCIL
            </div>
          </div>

          <blockquote className="italic text-slate-300 text-xs sm:text-sm border-l-2 border-rose-500 pl-3 max-w-md">
            &quot;The future isn&apos;t waiting for us. <strong className="text-rose-300 not-italic font-bold">It&apos;s waiting to be fixed.</strong>&quot;
          </blockquote>

          {/* Return to Summit Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 border border-[#312856] hover:border-rose-500/50 px-4 py-2.5 bg-[#060410] tracking-widest uppercase text-[10px] sm:text-[11px] font-bold transition-all hover:shadow-[0_0_15px_rgba(255,42,85,0.25)] hud-bracket cursor-pointer active:scale-95 rounded-lg"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Sleek Footer Architecture (HoloCards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Column 1: College Location & Venue Box (4 cols) */}
          <HoloCard
            glowColor="rgba(255, 42, 85, 0.4)"
            className="lg:col-span-4 bg-[#060410]/95 border border-[#312856] p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-md shadow-xl rounded-2xl"
          >
            <div className="text-rose-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#241a45] pb-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>COLLEGE LOCATION & VENUE</span>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="text-white font-bold text-xs sm:text-sm uppercase">
                {EVENT_CONFIG.location}
              </div>
              <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                Central Campus Auditorium & Innovation Complex. Open for all verified squads with encrypted high-speed compute links.
              </p>
            </div>

            <a
              href={EVENT_CONFIG.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 text-xs font-black text-white bg-red-600 hover:bg-red-500 px-4 py-2.5 uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,42,85,0.4)] w-full justify-center cursor-pointer active:scale-95 rounded-lg"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>OPEN GOOGLE MAPS LOCATION →</span>
            </a>
          </HoloCard>

          {/* Column 2: Persons of Contact (POC) Box (5 cols) */}
          <HoloCard
            glowColor="rgba(255, 42, 85, 0.4)"
            className="lg:col-span-5 bg-[#060410]/95 border border-[#312856] p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-md shadow-xl rounded-2xl"
          >
            <div className="text-rose-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#241a45] pb-2">
              <UserCheck className="w-4 h-4 text-rose-400" />
              <span>PERSONS OF CONTACT // COUNCIL</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {EVENT_CONFIG.contacts.map((poc, idx) => (
                <div key={idx} className="p-2.5 sm:p-3 bg-[#0b081a] border border-[#241a45] space-y-1 rounded-lg">
                  <div className="text-[9px] sm:text-[10px] text-rose-400 font-bold tracking-wider uppercase">
                    {poc.role}
                  </div>
                  <div className="text-white font-bold text-xs">{poc.name}</div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
                    <a
                      href={`mailto:${poc.email}`}
                      className="hover:text-white flex items-center gap-1 text-slate-300"
                    >
                      <Mail className="w-3 h-3 text-red-400" />
                      <span>{poc.email}</span>
                    </a>
                    <a
                      href={`tel:${poc.phone.replace(/\s+/g, '')}`}
                      className="hover:text-white flex items-center gap-1 text-slate-300"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{poc.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </HoloCard>

          {/* Column 3: Quick Navigation & Legal Protocols (3 cols) */}
          <HoloCard
            glowColor="rgba(255, 42, 85, 0.4)"
            className="lg:col-span-3 bg-[#060410]/95 border border-[#312856] p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-md shadow-xl rounded-2xl"
          >
            <div className="text-rose-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#241a45] pb-2">
              <span>SYSTEM CHANNELS</span>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={EVENT_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-[#090614] border border-[#241a45] text-slate-300 hover:text-white hover:border-rose-500/50 transition-colors rounded"
              >
                INSTAGRAM: @csisiesgst
              </a>
              <a
                href={EVENT_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-[#090614] border border-[#241a45] text-slate-300 hover:text-white hover:border-rose-500/50 transition-colors rounded"
              >
                LINKEDIN: ENIGMA HACKATHON
              </a>
              <a
                href={EVENT_CONFIG.socials.unstop}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-[#090614] border border-[#241a45] text-slate-300 hover:text-white hover:border-rose-500/50 transition-colors rounded"
              >
                PORTAL: UNSTOP REGISTRATION
              </a>
            </div>

            <div className="pt-2 border-t border-[#241a45] text-[10px] text-slate-500">
              © {EVENT_CONFIG.year} CSI SIES GST // ALL RIGHTS RESERVED.
            </div>
          </HoloCard>
        </div>
      </div>
    </footer>
  );
}
