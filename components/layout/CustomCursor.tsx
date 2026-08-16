'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant pinpoint tracking perfectly centered on hotspot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth physical lerp animation for the outer reticle ring perfectly centered
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.tagName === 'INPUT' ||
        target?.getAttribute('role') === 'button' ||
        target?.closest('button, a, [role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* 1. Instant Precision Central Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${
            isHovered
              ? 'bg-purple-400 scale-150 shadow-[0_0_12px_rgba(168,85,247,0.9)]'
              : 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)]'
          }`}
        />
      </div>

      {/* 2. Silky Trailing Holographic Target Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isClicking
              ? 'scale-75'
              : isHovered
              ? 'scale-150'
              : 'scale-100'
          }`}
        >
          {/* Outer Rotating Geometric Reticle */}
          <div
            className={`w-8 h-8 rounded-full border transition-all duration-300 ${
              isHovered
                ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.4)] border-dashed animate-[spin_10s_linear_infinite]'
                : 'border-cyan-400/40'
            }`}
          />

          {/* 4 Precision Crosshair Notches */}
          <div
            className={`absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 transition-colors ${
              isHovered ? 'bg-purple-400' : 'bg-cyan-400/60'
            }`}
          />
          <div
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1 transition-colors ${
              isHovered ? 'bg-purple-400' : 'bg-cyan-400/60'
            }`}
          />
          <div
            className={`absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-0.5 transition-colors ${
              isHovered ? 'bg-purple-400' : 'bg-cyan-400/60'
            }`}
          />
          <div
            className={`absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-0.5 transition-colors ${
              isHovered ? 'bg-purple-400' : 'bg-cyan-400/60'
            }`}
          />
        </div>
      </div>
    </>
  );
}
