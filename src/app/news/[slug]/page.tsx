import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNews, getNewsBySlug, getRelatedPosts } from '@/lib/content';
import { Markdown } from '@/components/Markdown';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedPosts } from '@/components/RelatedPosts';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, absoluteUrl } from '@/lib/schema';

export function generateStaticParams() {
  return getAllNews().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/news/${slug}` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: '首页', path: '/' },
    { name: '情报', path: '/news' },
    { name: post.title, path: `/news/${slug}` },
  ];
  const related = getRelatedPosts('news', post);

  return (
    <>
      <JsonLd data={articleSchema('news', post)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
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
      <RelatedPosts basePath="/news" posts={related} />
    </>
  );
}
