import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNews, getNewsBySlug, getRelatedPosts } from '@/lib/content';
import { Markdown } from '@/components/Markdown';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedPosts } from '@/components/RelatedPosts';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, absoluteUrl } from '@/lib/schema';
import { alternateLanguages } from '@/lib/seo';
import { toLocale, getDictionary } from '@/lib/i18n';

export function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const locale = toLocale(lang);
  return getAllNews(locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const post = getNewsBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: alternateLanguages('news', slug),
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

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  const post = getNewsBySlug(locale, slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: dict.breadcrumbs.home, path: `/${locale}` },
    { name: dict.breadcrumbs.news, path: `/${locale}/news` },
    { name: post.title, path: `/${locale}/news/${slug}` },
  ];
  const related = getRelatedPosts('news', locale, post);

  return (
    <>
      <JsonLd data={articleSchema('news', post, locale, dict.siteName)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} ariaLabel={dict.breadcrumbs.ariaLabel} />
      <article>
        <div className="article-head">
          {post.category ? <span className="tag">{post.category}</span> : null}
          <h1>{post.title}</h1>
          <div className="meta">{post.date}</div>
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
      <RelatedPosts basePath={`/${locale}/news`} posts={related} title={dict.related} />
    </>
  );
}
