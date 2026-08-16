'use client';

import React, { useRef, useEffect } from 'react';

interface CitySkylineCanvasProps {
  isGenesisActive?: boolean;
}

export default function CitySkylineCanvas({ isGenesisActive = false }: CitySkylineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initBuildings();
    };

    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Buildings generation with Moodboard Cyber Violet & Obsidian Palette
    interface Building {
      x: number;
      width: number;
      height: number;
      layer: number;
      windows: { x: number; y: number; on: boolean; color: string }[];
      antenna?: { height: number; blinkColor: string; offset: number };
    }

    let buildings: Building[] = [];

    const initBuildings = () => {
      buildings = [];
      const layers = [
        { count: 18, minH: 0.35, maxH: 0.72, layer: 1 },
        { count: 14, minH: 0.25, maxH: 0.55, layer: 2 },
        { count: 10, minH: 0.15, maxH: 0.42, layer: 3 },
      ];

      layers.forEach(({ count, minH, maxH, layer }) => {
        const step = (width * 1.2) / count;
        for (let i = 0; i < count; i++) {
          const bWidth = step * (0.8 + Math.random() * 0.4);
          const bHeight = height * (minH + Math.random() * (maxH - minH));
          const bx = i * step - width * 0.1;

          // Generate window grid with moodboard palette
          const windows: { x: number; y: number; on: boolean; color: string }[] = [];
          const rows = Math.floor(bHeight / 18);
          const cols = Math.floor(bWidth / 14);

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (Math.random() > 0.42) {
                const rand = Math.random();
                let color = '#a855f7'; // Neon Violet default
                if (isGenesisActive) {
                  color = rand > 0.5 ? '#10ff88' : '#00f0ff';
                } else {
                  if (rand > 0.7) color = '#00f0ff'; // Electric Cyan
                  else if (rand > 0.45) color = '#ec4899'; // Neon Magenta
                  else if (rand > 0.2) color = '#c084fc'; // Bright Lavender
                  else color = '#00ff66'; // Toxic Green
                }

                windows.push({
                  x: c * 14 + 6,
                  y: r * 18 + 8,
                  on: Math.random() > 0.25,
                  color,
                });
              }
            }
          }

          const hasAntenna = Math.random() > 0.45;
          const antenna = hasAntenna
            ? {
                height: 20 + Math.random() * 50,
                blinkColor: Math.random() > 0.5 ? '#d946ef' : '#00f0ff',
                offset: Math.random() * Math.PI * 2,
              }
            : undefined;

          buildings.push({
            x: bx,
            width: bWidth,
            height: bHeight,
            layer,
            windows,
            antenna,
          });
        }
      });
    };

    initBuildings();

    // Aerial Traffic Traces with Moodboard Laser Colors
    interface DroneTrace {
      x: number;
      y: number;
      speed: number;
      length: number;
      color: string;
      direction: number;
    }

    const drones: DroneTrace[] = Array.from({ length: 11 }, () => ({
      x: Math.random() * width,
      y: height * 0.12 + Math.random() * (height * 0.48),
      speed: 1.5 + Math.random() * 3.2,
      length: 50 + Math.random() * 90,
      color: Math.random() > 0.6 ? '#a855f7' : Math.random() > 0.3 ? '#00f0ff' : '#00ff66',
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    // Ambient floating cyber dust
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6,
      color: Math.random() > 0.5 ? '#a855f7' : '#00f0ff',
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxOffset = (mouseX - width / 2) / (width / 2);

      // Deep sky gradient with violet-obsidian tone
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040308');
      skyGrad.addColorStop(0.55, '#0a0718');
      skyGrad.addColorStop(1, isGenesisActive ? '#051813' : '#110c28');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Moodboard Violet / Cyan Atmospheric Fog Glow
      const horizonGlow = ctx.createRadialGradient(
        width / 2 + parallaxOffset * 40,
        height * 0.72,
        50,
        width / 2,
        height * 0.72,
        width * 0.75
      );
      horizonGlow.addColorStop(
        0,
        isGenesisActive ? 'rgba(16, 255, 136, 0.16)' : 'rgba(168, 85, 247, 0.14)'
      );
      horizonGlow.addColorStop(
        0.4,
        isGenesisActive ? 'rgba(0, 240, 255, 0.08)' : 'rgba(217, 70, 239, 0.08)'
      );
      horizonGlow.addColorStop(
        0.7,
        'rgba(0, 240, 255, 0.04)'
      );
      horizonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      // Render buildings layer by layer with parallax
      buildings.forEach((b) => {
        const pFactor = b.layer === 1 ? 8 : b.layer === 2 ? 18 : 32;
        const drawX = b.x - parallaxOffset * pFactor;
        const drawY = height - b.height;

        // Building block obsidian tone
        ctx.fillStyle =
          b.layer === 1
            ? '#060410'
            : b.layer === 2
            ? '#0b081a'
            : '#120c2a';
        ctx.fillRect(drawX, drawY, b.width, b.height);

        // Building edge highlight
        ctx.strokeStyle =
          b.layer === 3
            ? 'rgba(168, 85, 247, 0.25)'
            : 'rgba(26, 22, 48, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(drawX, drawY, b.width, b.height);

        // Antenna
        if (b.antenna) {
          const antX = drawX + b.width * 0.5;
          ctx.beginPath();
          ctx.moveTo(antX, drawY);
          ctx.lineTo(antX, drawY - b.antenna.height);
          ctx.strokeStyle = '#312856';
          ctx.stroke();

          // Blinking tip light
          const blink = Math.sin(time * 3 + b.antenna.offset) > 0.3;
          if (blink) {
            ctx.fillStyle = b.antenna.blinkColor;
            ctx.beginPath();
            ctx.arc(antX, drawY - b.antenna.height, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Windows
        b.windows.forEach((w) => {
          if (w.on && drawX + w.x < drawX + b.width - 6) {
            ctx.fillStyle = w.color;
            ctx.globalAlpha = 0.55 + Math.sin(time * 1.5 + w.x) * 0.25;
            ctx.fillRect(drawX + w.x, drawY + w.y, 4, 3);
            ctx.globalAlpha = 1.0;
          }
        });
      });

      // Render flying drone traffic
      drones.forEach((d) => {
        d.x += d.speed * d.direction;
        if (d.direction === 1 && d.x > width + 100) d.x = -100;
        if (d.direction === -1 && d.x < -100) d.x = width + 100;

        const pY = d.y - parallaxOffset * 10;
        const grad = ctx.createLinearGradient(
          d.x,
          pY,
          d.x - d.length * d.direction,
          pY
        );
        grad.addColorStop(0, d.color);
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(d.x, pY);
        ctx.lineTo(d.x - d.length * d.direction, pY);
        ctx.stroke();
      });

      // Cyber particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = isGenesisActive ? '#10ff88' : p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // Bottom atmospheric dark fog vignette
      const fogGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      fogGrad.addColorStop(0, 'rgba(4, 3, 8, 0)');
      fogGrad.addColorStop(0.7, 'rgba(4, 3, 8, 0.88)');
      fogGrad.addColorStop(1, 'rgba(4, 3, 8, 1)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, height * 0.65, width, height * 0.35);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isGenesisActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
