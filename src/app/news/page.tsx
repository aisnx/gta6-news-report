import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllNews, groupByCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: '情报',
  description: 'GTA6 最新情报、爆料追踪、预告解析与官方动态，每日更新。',
};

export default function NewsPage() {
  const posts = getAllNews();
  const groups = groupByCategory(posts);
  return (
    <section className="section">
      <h2>情报</h2>
      <p className="sub">GTA6 最新动态与爆料追踪，按类别整理。</p>
      {posts.length === 0 ? (
        <div className="empty">暂无内容，敬请期待。</div>
      ) : (
        groups.map(([category, items]) => (
          <div className="group" key={category}>
            <h3 className="group-title">
              {category}
              <span className="group-count">{items.length}</span>
            </h3>
            <div className="grid">
              {items.map((p) => (
                <Link href={`/news/${p.slug}`} className="card" key={p.slug}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="meta">{p.date}</div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
