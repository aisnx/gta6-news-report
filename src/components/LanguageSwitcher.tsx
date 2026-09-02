'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/locales';

const labels: Record<Locale, string> = {
  zh: '中文',
  en: 'EN',
  es: 'ES',
  ja: 'JA',
};

// 语言切换器：保持当前路径不变，仅替换首个 /{lang} 段。
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  // 剥离开头的 /{lang}，得到语言无关的路径（如 /news/foo 或 ''）
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {locales.map((l) => {
        const href = `/${l}${rest}`;
        const active = l === current;
        return (
          <Link
            key={l}
            href={href}
            className={active ? 'active' : ''}
            aria-current={active ? 'page' : undefined}
          >
            {labels[l]}
          </Link>
        );
      })}
    </div>
  );
}
