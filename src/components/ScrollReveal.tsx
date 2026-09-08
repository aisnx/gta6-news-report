'use client';

import { useEffect } from 'react';

// 滚动渐显：给 [data-reveal] 元素进入视口时加 is-visible（触发 CSS 上浮动画）。
// 不隐藏内容，任何异常下内容都可见；用 MutationObserver 兜底客户端导航新增的元素。
export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | null = null;

    if (!reduced) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      );
    }

    const setup = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (reduced || !io) {
          el.classList.add('is-visible');
          return;
        }
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          io.observe(el);
        }
      });
    };

    setup();

    // 客户端导航时 layout 不重挂载，新页面会新增 [data-reveal]；监听并重新 setup。
    const mo = new MutationObserver(setup);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return null;
}
