import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/content';
import { toLocale, getDictionary } from '@/lib/i18n';
import { GuidesExplorer } from '@/components/GuidesExplorer';

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
  const items = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category ?? dict.fallbackCategory,
  }));

  return (
    <section className="section">
      <h2>{dict.guides.title}</h2>
      <p className="sub">{dict.guides.sub}</p>
      {posts.length === 0 ? (
        <div className="empty">{dict.guides.empty}</div>
      ) : (
        <GuidesExplorer items={items} locale={locale} allLabel={dict.guides.filterAll} />
      )}
    </section>
  );
}
