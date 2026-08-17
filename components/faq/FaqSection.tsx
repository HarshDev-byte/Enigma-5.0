'use client';

import React, { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/eventConfig';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';
import { sound } from '@/lib/audio';
import HoloCard from '@/components/ui/HoloCard';

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
      className="relative py-14 sm:py-32 px-3.5 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1e293b] hud-grid overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-red-400 bg-[#060410]/90 px-3 sm:px-4 py-1.5 border border-red-500/40 uppercase tracking-widest hud-bracket shadow-lg">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>KNOWLEDGE ARCHIVE // DIRECTIVES</span>
          </div>
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
            SYSTEM FAQ
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Instant intelligence on participation criteria, squad allocations, technological freedoms, submission parameters, and judging standards.
          </p>
        </div>

        {/* Filter Toolbar: Categories & Search Input */}
        <div className="space-y-3 sm:space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 sm:px-4 py-2 border uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 cursor-pointer rounded-xl text-[10px] sm:text-xs font-bold ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(255,42,85,0.4)]'
                      : 'bg-[#060410]/90 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="SEARCH PROTOCOLS OR DIRECTIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#060410]/90 border border-slate-800 font-mono text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-red-400 tracking-wider shadow-inner rounded-xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5 sm:space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <HoloCard
                  key={index}
                  glowColor={isOpen ? 'rgba(255, 42, 85, 0.45)' : 'rgba(255, 255, 255, 0.15)'}
                  className={`border transition-all duration-200 shadow-lg overflow-hidden rounded-xl ${
                    isOpen ? 'border-red-500 bg-[#0f0a14]' : 'border-slate-800 bg-[#060410]/90 hover:border-slate-600'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-3.5 sm:p-5 flex items-center justify-between text-left gap-3 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="font-mono text-[10px] sm:text-xs font-extrabold text-red-400 shrink-0">
                        Q.{index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-tight truncate">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`p-1 rounded bg-black/40 border border-slate-800 text-red-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-red-950/60 border-red-500' : ''
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 text-xs sm:text-sm font-mono text-slate-300 border-t border-slate-800/80 leading-relaxed animate-fade-in space-y-2">
                      <p>{faq.a}</p>
                      <div className="pt-2 text-[9px] text-slate-500 font-mono flex items-center justify-between">
                        <span>CATEGORY: {faq.category}</span>
                        <span className="text-red-400 font-bold">OFFICIAL DIRECTIVE</span>
                      </div>
                    </div>
                  )}
                </HoloCard>
              );
            })
          ) : (
            <div className="p-8 text-center bg-[#060410]/90 border border-slate-800 font-mono text-xs text-slate-400 rounded-xl">
              NO DIRECTIVES FOUND MATCHING &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
