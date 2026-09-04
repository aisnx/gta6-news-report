'use client';

import { useEffect, useRef } from 'react';

// Giscus（GitHub Discussions 评论）配置。
// repoId / categoryId 需在 https://giscus.app 上按仓库生成后填入，否则评论区不渲染。
const GISCUS = {
  repo: 'aisnx/gta6-news-report',
  repoId: '', // TODO 填入 repo id（形如 R_kgDO…）
  category: 'General',
  categoryId: '', // TODO 填入 category id（形如 DIC_kwDO…）
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  theme: 'dark',
} as const;

const GISCUS_LANG: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
  ja: 'ja',
};

export function Giscus({ lang }: { lang: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !GISCUS.repoId || !GISCUS.categoryId) return;

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-repo', GISCUS.repo);
    s.setAttribute('data-repo-id', GISCUS.repoId);
    s.setAttribute('data-category', GISCUS.category);
    s.setAttribute('data-category-id', GISCUS.categoryId);
    s.setAttribute('data-mapping', GISCUS.mapping);
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', GISCUS.reactionsEnabled);
    s.setAttribute('data-emit-metadata', GISCUS.emitMetadata);
    s.setAttribute('data-input-position', GISCUS.inputPosition);
    s.setAttribute('data-theme', GISCUS.theme);
    s.setAttribute('data-lang', GISCUS_LANG[lang] || 'en');
    container.appendChild(s);

    return () => {
      s.remove();
    };
  }, [lang]);

  return <div className="comments" ref={ref} />;
}
