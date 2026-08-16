'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ChevronDown, HelpCircle, Terminal, Search, Filter, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'ELIGIBILITY & SQUADS', 'TRACKS & TECH', 'SUBMISSION & JUDGING', 'FORMAT & LOGISTICS'];

  const filteredFaqs = EVENT_CONFIG.faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    sound.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#020408] border-b border-[#162436] hud-grid overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-300 bg-[#03060c]/90 px-4 py-1.5 border border-cyan-500/40 uppercase tracking-widest hud-bracket">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>KNOWLEDGE ARCHIVE // DIRECTIVES & PROTOCOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Instant intelligence on participation criteria, squad allocations, technological freedoms, submission parameters, and judging standards.
          </p>
        </div>

        {/* Filter Toolbar: Categories & Search Input */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-2 border uppercase tracking-wider whitespace-nowrap transition-all hud-bracket ${
                    isSelected
                      ? 'bg-cyan-400 text-black font-black border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-[#03060c]/90 text-slate-400 hover:text-white border-[#162436] hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-[#03060c]/95 border transition-all duration-300 hud-bracket backdrop-blur-md overflow-hidden ${
                  isOpen
                    ? 'border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'border-[#162436] hover:border-slate-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-mono focus:outline-none focus:bg-[#070c14]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-cyan-400 font-mono text-xs font-bold bg-cyan-950/40 px-2 py-1 border border-cyan-500/30">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                      {faq.q}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#162436]/60 bg-[#020306]/90 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DIRECTIVE CLASSIFICATION: {faq.category}</span>
                    </div>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
