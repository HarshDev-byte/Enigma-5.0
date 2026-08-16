'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable custom cursor on touch devices for mobile accessibility
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

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
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Precision reticle crosshair */}
      <div
        className={`relative -top-3 -left-3 flex items-center justify-center transition-all duration-200 ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}
      >
        <div className="w-6 h-6 border border-cyan-400/50 rounded-none relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-cyan-400" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-cyan-400" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-[1px] bg-cyan-400" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-[1px] bg-cyan-400" />
        </div>

        {/* Real-time coordinates readout */}
        <div className="absolute left-7 top-1 whitespace-nowrap font-mono text-[9px] text-cyan-400/80 tracking-widest bg-black/80 px-1 py-0.5 border border-cyan-500/30">
          X:{String(Math.round(position.x)).padStart(4, '0')} Y:{String(Math.round(position.y)).padStart(4, '0')}
        </div>
      </div>
    </div>
  );
}
