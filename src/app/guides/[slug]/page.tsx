import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/content';
import { Markdown } from '@/components/Markdown';

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
  return { title: post.title, description: post.description };
}

export default async function GuidePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGuideBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <div className="article-head">
        {post.category ? <span className="tag">{post.category}</span> : null}
        <h1>{post.title}</h1>
        <div className="meta">{post.date}</div>
      </div>
      <Markdown content={post.content} />
    </article>
  );
}
