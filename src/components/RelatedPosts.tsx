import Link from 'next/link';
import type { Post } from '@/lib/content';

export function RelatedPosts({
  basePath,
  posts,
  title,
}: {
  basePath: string;
  posts: Post[];
  title: string;
}) {
  if (posts.length === 0) return null;
  return (
    <section className="related">
      <h2>{title}</h2>
      <div className="grid">
        {posts.map((p) => (
          <Link href={`${basePath}/${p.slug}`} className="card" key={p.slug}>
            {p.category ? <span className="tag">{p.category}</span> : null}
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="meta">{p.date}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
