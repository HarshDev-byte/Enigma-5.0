'use client';

import React, { useState, useEffect } from 'react';
import ScrollFrameBackground from '@/components/layout/ScrollFrameBackground';
import CyberHudOverlay from '@/components/hud/CyberHudOverlay';
import CustomCursor from '@/components/layout/CustomCursor';
import BootSequence from '@/components/boot/BootSequence';
import HeroSection from '@/components/hero/HeroSection';
import WarRoomTelemetry from '@/components/telemetry/WarRoomTelemetry';
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
import CyberLensOverlay from '@/components/lens/CyberLensOverlay';
import ArchitectPassModal from '@/components/squad/ArchitectPassModal';
import MatrixOverloadCanvas from '@/components/matrix/MatrixOverloadCanvas';

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isGenesisActive, setIsGenesisActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLensActive, setIsLensActive] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  useEffect(() => {
    // Reset scroll to top on refresh
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

    // Hotkey [M] for Matrix mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        const target = e.target as HTMLElement | null;
        if (target?.tagName !== 'INPUT' && target?.tagName !== 'TEXTAREA') {
          setIsMatrixOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
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

      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {}
    }
  };

  return (
    <>
      {/* 1. Global 240-Frame Scroll-Trigger Hardware-Accelerated Canvas Background */}
      <ScrollFrameBackground scrollProgress={scrollProgress} />

      {/* 2. Precision Quantum Energy Crosshair Cursor */}
      <CustomCursor scrollProgress={scrollProgress} />

      {/* 3. Diagnostic Boot Sequence */}
      {!bootCompleted && (
        <BootSequence onComplete={() => setBootCompleted(true)} />
      )}

      {/* 4. HOLO-VISION™ Interactive Quantum Reticle Layer */}
      <CyberLensOverlay
        isActive={isLensActive}
        onToggle={() => setIsLensActive((prev) => !prev)}
        scrollProgress={scrollProgress}
      />

      {/* 5. Aerospace HUD Frame & Progression Overlay */}
      {bootCompleted && (
        <CyberHudOverlay
          scrollProgress={scrollProgress}
          onWarpToSection={handleWarpToSection}
          isLensActive={isLensActive}
          onToggleLens={() => setIsLensActive((prev) => !prev)}
          onOpenPassModal={() => setIsPassModalOpen(true)}
          onOpenMatrixModal={() => setIsMatrixOpen(true)}
        />
      )}

      {/* 6. Streamlined Event Content Stack */}
      <div
        className={`relative z-10 min-h-screen text-white selection:bg-red-500 selection:text-white transition-opacity duration-700 pointer-events-auto ${
          bootCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <main id="main-content">
          {/* 01. Hero Section (Awakening / Standby) */}
          <HeroSection
            isGenesisActive={isGenesisActive}
            onInitializeGenesis={() => handleWarpToSection('archive')}
          />

          {/* Real-Time War Room Telemetry & Capacity Stream */}
          <WarRoomTelemetry />

          {/* 02. Enigma Archive // Past Successful Editions */}
          <EnigmaArchive />

          {/* 03. Live Countdown // System Window Alert (High Alarm Overdrive) */}
          <RegistrationCountdown />

          {/* 04. Official Tracks // 03 Worlds (HUD Grid Matrix Scan) */}
          <OfficialTracks />

          {/* 05. Event Timeline // 4-Stage Operational Roadmap (City Rebuild) */}
          <EventTimeline />

          {/* 06. Prize Vault & Bounties (Holographic Projection) */}
          <PrizesSection />

          {/* 07. Security Protocols & Council Guidelines */}
          <ProtocolRules />

          {/* 08. Registration Gateway CTA // Ready to Rewrite the Future */}
          <EventRegistrationCTA />

          {/* 09. System FAQ // Directives & Clearance */}
          <FaqSection />

          {/* 10. Instagram Community Section */}
          <InstagramSection />
        </main>

        {/* 11. Minimal Sci-Fi Footer */}
        <FinalTransmission />
      </div>

      {/* 7. 2097 Architect Pass & Squad Simulator Modal */}
      <ArchitectPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />

      {/* 8. Fullscreen Matrix Code Overload Mode */}
      <MatrixOverloadCanvas
        isActive={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
      />
    </>
  );
}
