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
      className="relative py-32 px-4 sm:px-8 lg:px-12 bg-[#040308] border-b border-[#1a1630] hud-grid overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-300 bg-[#060410]/95 px-4 py-1.5 border border-purple-500/40 uppercase tracking-widest hud-bracket shadow-lg">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>KNOWLEDGE ARCHIVE // DIRECTIVES & PROTOCOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-tight text-white uppercase">
            SYSTEM FAQ
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Instant intelligence on participation criteria, squad allocations, technological freedoms, submission parameters, and judging standards.
          </p>
        </div>

        {/* Filter Toolbar: Categories & Search Input */}
        <div className="space-y-3 sm:space-y-4">
          {/* Category Tabs (Horizontal Touch Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs no-scrollbar">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 sm:px-4 py-2 border uppercase tracking-wider transition-all whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-black font-black border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-[#060410]/90 border-[#241a45] text-slate-400 hover:text-slate-200 hover:border-purple-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="SEARCH PROTOCOLS OR DIRECTIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#060410]/95 border border-[#312856] font-mono text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 tracking-wider shadow-inner"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`border transition-all duration-200 hud-bracket shadow-lg overflow-hidden ${
                    isOpen ? 'border-purple-400 bg-[#0b081a]' : 'border-[#241a45] bg-[#060410]/95 hover:border-purple-800'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 font-mono focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${isOpen ? 'text-purple-400' : 'text-slate-500'}`}>
                        // 0{index + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-purple-400' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#241a45]/80 animate-in fade-in duration-200">
                      <p>{faq.a}</p>
                      <div className="mt-3 pt-3 border-t border-[#241a45]/50 flex items-center gap-2 text-[10px] text-purple-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span className="uppercase">CATEGORY: {faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center font-mono text-xs text-slate-500 border border-[#241a45] bg-[#060410]">
              NO MATCHING DIRECTIVES FOUND IN ARCHIVE.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
