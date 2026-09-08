'use client';

import { useEffect, useRef } from 'react';

// 全屏霓虹光点粒子背景：轻量 canvas，随窗口自适应，切换标签页自动暂停，尊重 reduced-motion。
export function NeonParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COLORS = ['255, 45, 120', '139, 92, 246', '34, 211, 238'];
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
      const count = Math.min(70, Math.max(26, Math.floor((width * height) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.08 - Math.random() * 0.22,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        tw: Math.random() * Math.PI * 2,
        tws: 0.008 + Math.random() * 0.025,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.tws;
        if (p.y < -12) { p.y = height + 12; p.x = Math.random() * width; }
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;
        const a = 0.25 + Math.sin(p.tw) * 0.22;
        // 外层柔光
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${(a * 0.12).toFixed(3)})`;
        ctx.fill();
        // 核心亮点
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${a.toFixed(3)})`;
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
