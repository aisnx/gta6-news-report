import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { locales, toLocale, getDictionary } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.description,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  const breadcrumbs = [
    { name: dict.breadcrumbs.home, path: `/${locale}` },
    { name: dict.about.title, path: `/${locale}/about` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} ariaLabel={dict.breadcrumbs.ariaLabel} />
      <article className="article">
        <div className="article-head">
          <h1>{dict.about.title}</h1>
          <div className="meta">{dict.about.description}</div>
        </div>
        {dict.about.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>
    </>
  );
}
