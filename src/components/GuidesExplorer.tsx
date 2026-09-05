'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export interface GuideItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

// 攻略「库」浏览：按分类筛选。active 用 null 表示「全部」，避免切换语言时标签字符串不一致。
export function GuidesExplorer({
  items,
  locale,
  allLabel,
}: {
  items: GuideItem[];
  locale: string;
  allLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const i of items) {
      if (!seen.includes(i.category)) seen.push(i.category);
    }
    return seen;
  }, [items]);

  const countFor = (cat: string | null) =>
    cat === null ? items.length : items.filter((i) => i.category === cat).length;

  const filtered = active === null ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="filter-bar">
        <button
          className={`filter-chip${active === null ? ' active' : ''}`}
          onClick={() => setActive(null)}
        >
          {allLabel} <span className="filter-count">{items.length}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip${active === c ? ' active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c} <span className="filter-count">{countFor(c)}</span>
          </button>
        ))}
      </div>
      <div className="grid">
        {filtered.map((p) => (
          <Link href={`/${locale}/guides/${p.slug}`} className="card" key={p.slug}>
            <span className="tag">{p.category}</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="meta">{p.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
