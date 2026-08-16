'use client';

import React, { useRef, useEffect } from 'react';

interface GenesisCoreCanvasProps {
  isActive: boolean;
}

export default function GenesisCoreCanvas({ isActive }: GenesisCoreCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;
    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: 30 + Math.random() * (width * 0.4),
      speed: (Math.random() - 0.5) * 0.03,
      size: 1 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseSpeed = isActive ? 0.035 : 0.008;
      angle += baseSpeed;

      const primaryColor = isActive ? '#10ff88' : '#00f0ff';
      const secondaryColor = isActive ? '#00f0ff' : '#d946ef';

      // 1. Central Core Glowing Orb
      const coreRadius = isActive ? 36 : 24;
      const coreGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        coreRadius * 4
      );
      coreGlow.addColorStop(0, isActive ? 'rgba(16, 255, 136, 1)' : 'rgba(0, 240, 255, 1)');
      coreGlow.addColorStop(0.3, isActive ? 'rgba(16, 255, 136, 0.4)' : 'rgba(0, 240, 255, 0.4)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core Solid Center
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric Holographic Rings
      const rings = [
        { radius: width * 0.16, width: 2, rot: angle * 1.5, dash: [8, 12], color: primaryColor },
        { radius: width * 0.24, width: 1.5, rot: -angle * 0.9, dash: [24, 8, 4, 8], color: secondaryColor },
        { radius: width * 0.32, width: 1, rot: angle * 0.6, dash: [40, 20], color: primaryColor },
        { radius: width * 0.40, width: 2, rot: -angle * 1.2, dash: [6, 16], color: secondaryColor },
      ];

      rings.forEach((r) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(r.rot);

        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.width;
        ctx.setLineDash(r.dash);
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Little nodes on rings
        const nodeCount = 4;
        for (let i = 0; i < nodeCount; i++) {
          const a = (i * Math.PI * 2) / nodeCount;
          const nx = Math.cos(a) * r.radius;
          const ny = Math.sin(a) * r.radius;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // 3. Orbital Particles Swarm
      particles.forEach((p) => {
        p.angle += p.speed * (isActive ? 2.5 : 1);
        p.pulse += 0.05;

        const px = centerX + Math.cos(p.angle) * p.distance;
        const py = centerY + Math.sin(p.angle) * p.distance;

        ctx.fillStyle = Math.random() > 0.5 ? primaryColor : secondaryColor;
        ctx.globalAlpha = 0.3 + Math.sin(p.pulse) * 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // 4. Crosshairs & Radial Guides
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(centerX - width * 0.45, centerY);
      ctx.lineTo(centerX + width * 0.45, centerY);
      ctx.moveTo(centerX, centerY - height * 0.45);
      ctx.lineTo(centerX, centerY + height * 0.45);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Interactive Genesis Holographic Core"
    />
  );
}
