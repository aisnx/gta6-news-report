import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug, getRelatedPosts } from '@/lib/content';
import { Markdown } from '@/components/Markdown';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedPosts } from '@/components/RelatedPosts';
import { JsonLd } from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema, absoluteUrl } from '@/lib/schema';

export function generateStaticParams() {
  return getAllGuides().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuideBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/guides/${slug}` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGuideBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: '首页', path: '/' },
    { name: '攻略', path: '/guides' },
    { name: post.title, path: `/guides/${slug}` },
  ];
  const related = getRelatedPosts('guides', post);

  return (
    <>
      <JsonLd data={articleSchema('guides', post)} />
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
      <RelatedPosts basePath="/guides" posts={related} />
    </>
  );
}
