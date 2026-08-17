'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  scrollProgress?: number;
}

export default function CustomCursor({ scrollProgress = 0 }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  // Dynamic theme matching the website's Grey ➔ Red evolution
  const isRedPhase = scrollProgress >= 0.15;
  const primaryColor = isRedPhase ? '#ff2a55' : '#ffffff';
  const primaryGlow = isRedPhase ? 'rgba(255, 42, 85, 0.8)' : 'rgba(255, 255, 255, 0.6)';

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    // Particle Trail Buffer
    const trail: Array<{ x: number; y: number; alpha: number; size: number }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant pinpoint tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Add energy trail particle
      if (trail.length < 16) {
        trail.push({ x: mouseX, y: mouseY, alpha: 0.6, size: 3 });
      }
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Smooth physical lerp animation for the outer reticle ring + trail rendering
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Render quantum trail on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          p.alpha *= 0.86;
          p.size *= 0.94;

          if (p.alpha < 0.05) {
            trail.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = isRedPhase
            ? `rgba(255, 42, 85, ${p.alpha})`
            : `rgba(255, 255, 255, ${p.alpha * 0.7})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = isRedPhase ? '#ff2a55' : '#ffffff';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('button, a, input, select, [role="button"], .cursor-pointer') as HTMLElement | null;

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor') || (interactiveEl.tagName === 'A' ? 'WARP' : 'SELECT');
        setHoverLabel(customText);
      } else {
        setHoverLabel(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, isRedPhase]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Canvas for Quantum Energy Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        aria-hidden="true"
      />

      {/* 2. Central Pinpoint Laser Pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        aria-hidden="true"
      >
        <div
          className="w-2 h-2 rounded-full transition-transform duration-100 ease-out"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryGlow}`,
            transform: isClicking ? 'scale(0.5)' : hoverLabel ? 'scale(1.4)' : 'scale(1)',
          }}
        />
      </div>

      {/* 3. Outer Trailing Cyber Reticle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isClicking
              ? 'scale-75'
              : hoverLabel
              ? 'scale-175'
              : 'scale-100'
          }`}
        >
          {/* Outer Rotating Geometric Ring with Cyber Ticks */}
          <div
            className={`w-9 h-9 rounded-full border border-dashed transition-all duration-300 ${
              hoverLabel
                ? 'animate-[spin_4s_linear_infinite]'
                : 'animate-[spin_12s_linear_infinite]'
            }`}
            style={{
              borderColor: hoverLabel ? primaryColor : `${primaryColor}60`,
              backgroundColor: hoverLabel ? (isRedPhase ? 'rgba(255,42,85,0.12)' : 'rgba(16,255,136,0.12)') : 'transparent',
              boxShadow: hoverLabel ? `0 0 25px ${primaryGlow}` : 'none',
            }}
          />

          {/* 4 Precision Crosshair Notches */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 transition-colors duration-300"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 transition-colors duration-300"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-0.5 transition-colors duration-300"
            style={{ backgroundColor: primaryColor }}
          />
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-0.5 transition-colors duration-300"
            style={{ backgroundColor: primaryColor }}
          />

          {/* Micro HUD Tag When Hovering Interactive Elements */}
          {hoverLabel && (
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#060410]/95 border text-[8px] font-mono font-black uppercase tracking-widest whitespace-nowrap shadow-lg animate-fade-in"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              [ {hoverLabel} ]
            </div>
          )}
        </div>
      </div>
    </>
  );
}
