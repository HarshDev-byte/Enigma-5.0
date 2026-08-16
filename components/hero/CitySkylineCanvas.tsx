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

    // Buildings generation
    interface Building {
      x: number;
      width: number;
      height: number;
      layer: number; // 1 (far), 2 (mid), 3 (near)
      windows: { x: number; y: number; on: boolean; color: string }[];
      antenna?: { height: number; blinkColor: string; offset: number };
    }

    let buildings: Building[] = [];

    const initBuildings = () => {
      buildings = [];
      const layers = [
        { count: 18, minH: 0.35, maxH: 0.7, layer: 1, colorBase: '#050911' },
        { count: 14, minH: 0.25, maxH: 0.55, layer: 2, colorBase: '#08101e' },
        { count: 10, minH: 0.15, maxH: 0.4, layer: 3, colorBase: '#0b162a' },
      ];

      layers.forEach(({ count, minH, maxH, layer }) => {
        const step = (width * 1.2) / count;
        for (let i = 0; i < count; i++) {
          const bWidth = step * (0.8 + Math.random() * 0.4);
          const bHeight = height * (minH + Math.random() * (maxH - minH));
          const bx = i * step - width * 0.1;

          // Generate window grid
          const windows: { x: number; y: number; on: boolean; color: string }[] = [];
          const rows = Math.floor(bHeight / 18);
          const cols = Math.floor(bWidth / 14);

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (Math.random() > 0.45) {
                const isCyan = Math.random() > 0.3;
                const isAmber = Math.random() > 0.85;
                const color = isGenesisActive
                  ? Math.random() > 0.4 ? '#10ff88' : '#00f0ff'
                  : isAmber
                  ? '#ffaa00'
                  : isCyan
                  ? '#00f0ff'
                  : '#ffffff';

                windows.push({
                  x: c * 14 + 6,
                  y: r * 18 + 8,
                  on: Math.random() > 0.3,
                  color,
                });
              }
            }
          }

          const hasAntenna = Math.random() > 0.5;
          const antenna = hasAntenna
            ? {
                height: 20 + Math.random() * 45,
                blinkColor: Math.random() > 0.5 ? '#ff2a55' : '#00f0ff',
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

    // Aerial Traffic Traces
    interface DroneTrace {
      x: number;
      y: number;
      speed: number;
      length: number;
      color: string;
      direction: number; // 1 or -1
    }

    const drones: DroneTrace[] = Array.from({ length: 9 }, () => ({
      x: Math.random() * width,
      y: height * 0.15 + Math.random() * (height * 0.45),
      speed: 1.2 + Math.random() * 2.8,
      length: 40 + Math.random() * 80,
      color: Math.random() > 0.5 ? '#00f0ff' : '#ff2a55',
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
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      alpha: 0.2 + Math.random() * 0.6,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxOffset = (mouseX - width / 2) / (width / 2);

      // Deep sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#030508');
      skyGrad.addColorStop(0.6, '#060a12');
      skyGrad.addColorStop(1, isGenesisActive ? '#051813' : '#07101e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant atmospheric horizon neon glow
      const horizonGlow = ctx.createRadialGradient(
        width / 2 + parallaxOffset * 40,
        height * 0.75,
        50,
        width / 2,
        height * 0.75,
        width * 0.7
      );
      horizonGlow.addColorStop(
        0,
        isGenesisActive ? 'rgba(16, 255, 136, 0.12)' : 'rgba(0, 240, 255, 0.08)'
      );
      horizonGlow.addColorStop(
        0.5,
        isGenesisActive ? 'rgba(0, 240, 255, 0.05)' : 'rgba(217, 70, 239, 0.04)'
      );
      horizonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      // Render buildings layer by layer with parallax
      buildings.forEach((b) => {
        const pFactor = b.layer === 1 ? 8 : b.layer === 2 ? 18 : 32;
        const drawX = b.x - parallaxOffset * pFactor;
        const drawY = height - b.height;

        // Building block
        ctx.fillStyle =
          b.layer === 1
            ? '#050912'
            : b.layer === 2
            ? '#080e1b'
            : '#0b1426';
        ctx.fillRect(drawX, drawY, b.width, b.height);

        // Building edge subtle highlight
        ctx.strokeStyle =
          b.layer === 3
            ? 'rgba(0, 240, 255, 0.15)'
            : 'rgba(22, 36, 54, 0.6)';
        ctx.lineWidth = 1;
        ctx.strokeRect(drawX, drawY, b.width, b.height);

        // Antenna
        if (b.antenna) {
          const antX = drawX + b.width * 0.5;
          ctx.beginPath();
          ctx.moveTo(antX, drawY);
          ctx.lineTo(antX, drawY - b.antenna.height);
          ctx.strokeStyle = '#1e293b';
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
            ctx.globalAlpha = 0.5 + Math.sin(time + w.x) * 0.2;
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

      // Cyber particles / Atmospheric rain & dust
      ctx.fillStyle = isGenesisActive ? '#10ff88' : '#00f0ff';
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // Bottom atmospheric dark fog vignette
      const fogGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      fogGrad.addColorStop(0, 'rgba(3, 5, 8, 0)');
      fogGrad.addColorStop(0.7, 'rgba(3, 5, 8, 0.85)');
      fogGrad.addColorStop(1, 'rgba(3, 5, 8, 1)');
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
