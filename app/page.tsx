'use client';

import React, { useState, useEffect } from 'react';
import SceneExperience from '@/components/three/SceneExperience';
import CyberHudOverlay from '@/components/hud/CyberHudOverlay';
import CustomCursor from '@/components/layout/CustomCursor';
import BootSequence from '@/components/boot/BootSequence';
import HeroSection from '@/components/hero/HeroSection';
import EnigmaArchive from '@/components/archive/EnigmaArchive';
import RegistrationCountdown from '@/components/countdown/RegistrationCountdown';
import OfficialTracks from '@/components/tracks/OfficialTracks';
import EventTimeline from '@/components/timeline/EventTimeline';
import PrizesSection from '@/components/prizes/PrizesSection';
import ProtocolRules from '@/components/rules/ProtocolRules';
import EventRegistrationCTA from '@/components/registration/EventRegistrationCTA';
import FaqSection from '@/components/faq/FaqSection';
import InstagramSection from '@/components/community/InstagramSection';
import FinalTransmission from '@/components/footer/FinalTransmission';

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isGenesisActive, setIsGenesisActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Reset scroll to top and prevent browser auto-jumping to #register on refresh
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress(Math.min(1, Math.max(0, winScroll / height)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWarpToSection = (id: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 75;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - navOffset;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      });

      // Update URL hash smoothly
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {}
    }
  };

  return (
    <>
      {/* 1. Real 3D World Canvas running persistently */}
      <SceneExperience scrollProgress={scrollProgress} />

      {/* 2. Precision Crosshair Cursor */}
      <CustomCursor />

      {/* 3. Diagnostic Boot Sequence */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* 5. Aerospace HUD Frame & Progression Overlay */}
      {bootCompleted && (
        <CyberHudOverlay
          scrollProgress={scrollProgress}
          onWarpToSection={handleWarpToSection}
        />
      )}

      {/* 6. Streamlined Event Content Stack */}
      <div
        className={`relative z-10 min-h-screen text-white selection:bg-cyan-400 selection:text-black transition-opacity duration-700 pointer-events-auto ${
          bootCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <main id="main-content">
          {/* 01. Hero Section */}
          <HeroSection
            isGenesisActive={isGenesisActive}
            onInitializeGenesis={() => handleWarpToSection('archive')}
          />

          {/* 02. Enigma Archive // Past Successful Editions */}
          <EnigmaArchive />

          {/* 03. System Failure & Live Registration Countdown */}
          <RegistrationCountdown />

          {/* 04. The 03 Official Tracks (Healthcare, Fintech, Sustainability) */}
          <OfficialTracks />

          {/* 05. Genesis Event Timeline (Round 01, Round 02, Evaluation, Finale) */}
          <EventTimeline />

          {/* 06. Prize Vault & Bounties */}
          <PrizesSection />

          {/* 07. Security Protocols & Council Guidelines */}
          <ProtocolRules />

          {/* 08. Registration CTA (Ready to Rewrite the Future?) */}
          <EventRegistrationCTA />

          {/* 09. System FAQ (10 Complete Directives) */}
          <FaqSection />

          {/* 10. Instagram Community Section */}
          <InstagramSection />
        </main>

        {/* 12. Minimal Sci-Fi Footer */}
        <FinalTransmission />
      </div>
    </>
  );
}
