'use client';

import React from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { Terminal, ExternalLink, ArrowUp, MapPin, Mail, Phone, UserCheck, ShieldCheck } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function FinalTransmission() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Enigma System Footer"
      className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#020305] border-t border-[#162436] font-mono text-xs text-slate-400 hud-grid overflow-hidden"
    >
      {/* Background Volumetric Ambient Radial */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Top Footer Banner & Return to Summit */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#162436]">
          <div className="space-y-1.5">
            <div className="text-white font-black text-2xl sm:text-3xl tracking-tighter uppercase font-mono">
              ENIGMA 5.0 — <span className="text-cyan-400">GENESIS</span>
            </div>
            <div className="text-slate-400 text-xs tracking-widest uppercase">
              BEYOND THE FUTURE // 2097 ARCHITECT COUNCIL
            </div>
          </div>

          <blockquote className="italic text-slate-300 text-xs sm:text-sm border-l-2 border-cyan-400 pl-3 max-w-md">
            "The future isn't waiting for us. <strong className="text-cyan-300 not-italic font-bold">It's waiting to be fixed.</strong>"
          </blockquote>

          {/* Return to Summit Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border border-[#162436] hover:border-cyan-500/50 px-4 py-2.5 bg-[#070c14] tracking-widest uppercase text-[11px] font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] hud-bracket"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-Column Sleek Footer Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: College Location & Venue Box (4 cols) */}
          <div className="lg:col-span-4 bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket space-y-4 backdrop-blur-md">
            <div className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#162436] pb-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>COLLEGE LOCATION & VENUE</span>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-sm uppercase">
                {EVENT_CONFIG.location}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Central Campus Auditorium & Innovation Complex. Open for all verified squads with encrypted high-speed compute links.
              </p>
            </div>

            <a
              href={EVENT_CONFIG.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black text-black bg-cyan-400 hover:bg-cyan-300 px-4 py-2.5 uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.45)] w-full justify-center"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>OPEN GOOGLE MAPS LOCATION →</span>
            </a>
          </div>

          {/* Column 2: Persons of Contact (POC) Box (5 cols) */}
          <div className="lg:col-span-5 bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket space-y-4 backdrop-blur-md">
            <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#162436] pb-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>PERSONS OF CONTACT // ORGANIZING COUNCIL</span>
            </div>

            <div className="space-y-3">
              {EVENT_CONFIG.contacts.map((poc, idx) => (
                <div key={idx} className="bg-[#070c14]/90 border border-[#162436] p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                    <span className="text-cyan-300 uppercase">{poc.role}</span>
                    <span>{poc.node}</span>
                  </div>
                  <div className="text-white font-bold text-xs">{poc.name}</div>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <a href={`mailto:${poc.email}`} className="hover:text-cyan-300 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{poc.email}</span>
                    </a>
                    <a href={`tel:${poc.phone}`} className="hover:text-emerald-300 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{poc.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Registration Portals & Social Endpoints (3 cols) */}
          <div className="lg:col-span-3 bg-[#03060c]/90 border border-[#162436] p-6 hud-bracket space-y-4 backdrop-blur-md">
            <div className="text-pink-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 border-b border-[#162436] pb-2">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              <span>PORTALS & CHANNELS</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href={EVENT_CONFIG.socials.unstop}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#070c14] border border-[#162436] hover:border-cyan-400 text-slate-300 hover:text-white transition-colors"
              >
                <span>UNSTOP PORTAL</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <a
                href={EVENT_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#070c14] border border-[#162436] hover:border-pink-400 text-slate-300 hover:text-white transition-colors"
              >
                <span>INSTAGRAM COMMUNITY</span>
                <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
              </a>

              <a
                href={EVENT_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#070c14] border border-[#162436] hover:border-blue-400 text-slate-300 hover:text-white transition-colors"
              >
                <span>LINKEDIN DISPATCHES</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Institutional Credit */}
        <div className="pt-8 border-t border-[#162436] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>{EVENT_CONFIG.footer.copyright}</div>
          <div className="text-slate-400 font-semibold">{EVENT_CONFIG.footer.collegeInfo}</div>
        </div>
      </div>
    </footer>
  );
}
