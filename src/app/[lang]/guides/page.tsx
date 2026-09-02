import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides, groupByCategory } from '@/lib/content';
import { toLocale, getDictionary } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  return {
    title: dict.guides.title,
    description: dict.guides.description,
    alternates: { canonical: `/${locale}/guides` },
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  const posts = getAllGuides(locale);
  const groups = groupByCategory(posts, dict.fallbackCategory);

  return (
    <section className="section">
      <h2>{dict.guides.title}</h2>
      <p className="sub">{dict.guides.sub}</p>
      {posts.length === 0 ? (
        <div className="empty">{dict.guides.empty}</div>
      ) : (
        groups.map(([category, items]) => (
          <div className="group" key={category}>
            <h3 className="group-title">
              {category}
              <span className="group-count">{items.length}</span>
            </h3>
            <div className="grid">
              {items.map((p) => (
                <Link href={`/${locale}/guides/${p.slug}`} className="card" key={p.slug}>
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
