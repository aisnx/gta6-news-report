'use client';

import { useEffect, useRef } from 'react';

// 全屏霓虹光点 + 星座连线背景：轻量 canvas，随窗口自适应，切后台自动暂停，尊重 reduced-motion。
export function NeonParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COLORS = ['255, 45, 120', '139, 92, 246', '34, 211, 238'];
    const LINK_DIST = 140;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; c: string; tw: number; tws: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.max(48, Math.floor((width * height) / 18000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.06 - Math.random() * 0.24,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        tw: Math.random() * Math.PI * 2,
        tws: 0.008 + Math.random() * 0.025,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      // 星座连线
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      // 光点
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.tws;
        if (p.y < -14) { p.y = height + 14; p.x = Math.random() * width; }
        if (p.x < -14) p.x = width + 14;
        else if (p.x > width + 14) p.x = -14;
        const a = 0.42 + Math.sin(p.tw) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${(a * 0.16).toFixed(3)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${Math.min(0.85, a).toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="neon-particles" aria-hidden="true" />;
}
