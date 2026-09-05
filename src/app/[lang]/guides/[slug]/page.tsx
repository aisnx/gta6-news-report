import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug, getRelatedPosts } from '@/lib/content';
import { Markdown } from '@/components/Markdown';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedPosts } from '@/components/RelatedPosts';
import { JsonLd } from '@/components/JsonLd';
import { Giscus } from '@/components/Giscus';
import { AdUnit } from '@/components/AdUnit';
import { articleSchema, breadcrumbSchema, absoluteUrl, videoSchemasFromMarkdown } from '@/lib/schema';
import { alternateLanguages } from '@/lib/seo';
import { toLocale, getDictionary } from '@/lib/i18n';

export function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale = toLocale(lang);
  return getAllGuides(locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const post = getGuideBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/guides/${slug}`,
      languages: alternateLanguages('guides', slug),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: absoluteUrl(post.cover) }] } : {}),
    },
  };
}

export default async function GuidePostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  const post = getGuideBySlug(locale, slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: dict.breadcrumbs.home, path: `/${locale}` },
    { name: dict.breadcrumbs.guides, path: `/${locale}/guides` },
    { name: post.title, path: `/${locale}/guides/${slug}` },
  ];
  const related = getRelatedPosts('guides', locale, post);

  return (
    <>
      <JsonLd data={articleSchema('guides', post, locale, dict.siteName, post.author ?? dict.editorialTeam)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {videoSchemasFromMarkdown(post.content, {
        title: post.title,
        date: post.date,
        description: post.description,
      }).map((s, i) => (
        <JsonLd key={`video-${i}`} data={s} />
      ))}
      <Breadcrumbs items={breadcrumbs} ariaLabel={dict.breadcrumbs.ariaLabel} />
      <article>
        <div className="article-head">
          {post.category ? <span className="tag">{post.category}</span> : null}
          <h1>{post.title}</h1>
          <div className="meta">{post.author ?? dict.editorialTeam} · {post.date}</div>
          {post.cover ? (
            <figure className="cover-fig">
              <img className="cover" src={post.cover} alt={post.title} />
              {post.coverCaption ? (
                <figcaption>{post.coverCaption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
        <Markdown content={post.content} />
      </article>
      <AdUnit />
      <RelatedPosts basePath={`/${locale}/guides`} posts={related} title={dict.related} />
      <section className="comments-section">
        <h2>{dict.comments}</h2>
        <Giscus lang={locale} />
      </section>
    </>
  );
}
