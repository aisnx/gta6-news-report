import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllNews } from '@/lib/content';

export const metadata: Metadata = {
  title: '情报',
  description: 'GTA6 最新情报、爆料追踪、预告解析与官方动态，每日更新。',
};

export default function NewsPage() {
  const posts = getAllNews();
  return (
    <section className="section">
      <h2>情报</h2>
      <p className="sub">GTA6 最新动态与爆料追踪。</p>
      {posts.length === 0 ? (
        <div className="empty">暂无内容，敬请期待。</div>
      ) : (
        <div className="grid">
          {posts.map((p) => (
            <Link href={`/news/${p.slug}`} className="card" key={p.slug}>
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
