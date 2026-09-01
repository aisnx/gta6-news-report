import { SITE_NAME, SITE_URL } from './data';
import type { Post, ContentType } from './content';

// 结构化数据（JSON-LD）生成器：文章、面包屑、站点。
// 供 article 页面注入 <script type="application/ld+json">。

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function postUrl(type: ContentType, slug: string): string {
  const section = type === 'news' ? 'news' : 'guides';
  return `${SITE_URL}/${section}/${slug}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function articleSchema(type: ContentType, post: Post): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': type === 'news' ? 'NewsArticle' : 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category ?? null,
    keywords: post.tags ?? [],
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(type, post.slug) },
    ...(post.cover ? { image: absoluteUrl(post.cover) } : {}),
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}
