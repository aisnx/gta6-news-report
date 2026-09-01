import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides, groupByCategory } from '@/lib/content';

export const metadata: Metadata = {
  title: '攻略',
  description: 'GTA6 攻略与资料：系统详解、角色档案、地图、配乐、支线活动与购买指南，发售日起更新任务攻略。',
};

export default function GuidesPage() {
  const posts = getAllGuides();
  const groups = groupByCategory(posts);
  return (
    <section className="section">
      <h2>攻略与资料</h2>
      <p className="sub">系统详解、角色、地图、配乐、支线与购买指南，按类别整理。</p>
      {posts.length === 0 ? (
        <div className="empty">攻略将在 2026-11-19 发售日解锁，敬请期待。</div>
      ) : (
        groups.map(([category, items]) => (
          <div className="group" key={category}>
            <h3 className="group-title">
              {category}
              <span className="group-count">{items.length}</span>
            </h3>
            <div className="grid">
              {items.map((p) => (
                <Link href={`/guides/${p.slug}`} className="card" key={p.slug}>
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
