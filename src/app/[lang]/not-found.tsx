'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const messages: Record<string, { title: string; back: string }> = {
  zh: { title: '页面未找到', back: '返回首页' },
  en: { title: 'Page not found', back: 'Back to home' },
  es: { title: 'Página no encontrada', back: 'Volver al inicio' },
  ja: { title: 'ページが見つかりません', back: 'ホームへ戻る' },
};

export default function NotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = typeof params?.lang === 'string' ? params.lang : 'zh';
  const m = messages[lang] ?? messages.zh;

  return (
    <div className="empty" style={{ padding: '80px 20px' }}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1,
          background: 'var(--grad)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        404
      </div>
      <p style={{ marginTop: 16 }}>{m.title}</p>
      <p style={{ marginTop: 24 }}>
        <Link href={`/${lang}`}>{m.back} →</Link>
      </p>
    </div>
  );
}
