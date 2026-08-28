import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/content';

export const metadata: Metadata = {
  title: '攻略',
  description: 'GTA6 全攻略：主线任务、赚钱刷钱、隐藏彩蛋、收集、成就、多结局、秘籍。',
};

export default function GuidesPage() {
  const posts = getAllGuides();
  return (
    <section className="section">
      <h2>攻略</h2>
      <p className="sub">GTA6 全攻略，发售日（2026-11-19）起持续更新。</p>
      {posts.length === 0 ? (
        <div className="empty">攻略将在 2026-11-19 发售日解锁，敬请期待。</div>
      ) : (
        <div className="grid">
          {posts.map((p) => (
            <Link href={`/guides/${p.slug}`} className="card" key={p.slug}>
              {p.category ? <span className="tag">{p.category}</span> : null}
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="meta">{p.date}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
