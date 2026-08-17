'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/scroll-frames/frame_${String(n).padStart(3, '0')}.jpg`;

interface ScrollFrameBackgroundProps {
  scrollProgress: number;
}

export default function ScrollFrameBackground({ scrollProgress }: ScrollFrameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const [isInitialReady, setIsInitialReady] = useState(false);

  // Progressive frame loader: loads initial priority frames first, then remainder smoothly
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const imgs: HTMLImageElement[] = [];

    // Pre-allocate array
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      imgs.push(img);
    }
    framesRef.current = imgs;

    // Load initial 30 frames with highest priority
    let initialCount = 0;
    const priorityCount = 30;

    for (let i = 0; i < priorityCount; i++) {
      imgs[i].src = FRAME_PATH(i + 1);
      imgs[i].onload = () => {
        initialCount++;
        if (initialCount >= 5) {
          setIsInitialReady(true);
        }
      };
    }

    // Progressively load remaining frames in idle time
    const loadRemainder = () => {
      for (let i = priorityCount; i < TOTAL_FRAMES; i++) {
        imgs[i].src = FRAME_PATH(i + 1);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadRemainder);
    } else {
      setTimeout(loadRemainder, 250);
    }
  }, []);

  // Update target frame from global scrollProgress (0..1) -> (0..239)
  useEffect(() => {
    const frame = Math.max(
      0,
      Math.min(TOTAL_FRAMES - 1, Math.floor(scrollProgress * (TOTAL_FRAMES - 1)))
    );
    targetFrameRef.current = frame;
  }, [scrollProgress]);

  // High-performance canvas drawing: 100% Crisp, ZERO blur, Dynamic Grey -> Red saturation ignition
  const drawCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const roundedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIdx)));
    let img = framesRef.current[roundedIdx];

    // Fallback to nearest loaded frame if current frame is still streaming in
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 20; offset++) {
        const prev = framesRef.current[roundedIdx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = framesRef.current[roundedIdx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    const imgAR = img.naturalWidth / img.naturalHeight;
    const canvasAR = cw / ch;

    let sw: number, sh: number, sx: number, sy: number;
    if (imgAR > canvasAR) {
      sh = img.naturalHeight;
      sw = sh * canvasAR;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasAR;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);

    // Apply Dynamic Grey ➔ Red Filter onto Canvas
    // 0% - 15% scroll: Monochromatic Titanium Grey (desaturated)
    // > 15% scroll: Dynamic Red Ignited Saturation
    const progressPct = roundedIdx / (TOTAL_FRAMES - 1);

    if (progressPct < 0.15) {
      // Dormant Monochromatic Steel Grey Phase (0% blur, crystal clear desaturation)
      const greyFactor = 1 - (progressPct / 0.15);
      ctx.filter = `grayscale(${Math.round(greyFactor * 85)}%) contrast(108%) brightness(102%)`;
    } else {
      // Red Overdrive Ignition Phase (Full vibrant saturation, crystal sharp)
      ctx.filter = 'grayscale(0%) contrast(106%) brightness(105%)';
    }

    // Draw the 100% crisp unblurred frame image
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);

    // Reset filter
    ctx.filter = 'none';
  }, []);

  // Smooth 60 FPS lerp interpolation loop
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.18;
        drawCanvas(currentFrameRef.current);
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      isRunning = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawCanvas]);

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawCanvas(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCanvas]);

  // Initial draw
  useEffect(() => {
    if (isInitialReady) {
      drawCanvas(currentFrameRef.current);
    }
  }, [isInitialReady, drawCanvas]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#040308]">
      {/* 1. Hardware-Accelerated 240-Frame Canvas (100% Sharp & Unblurred) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isInitialReady ? 1 : 0.4 }}
        aria-hidden="true"
      />
    </div>
  );
}
