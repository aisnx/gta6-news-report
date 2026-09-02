import { SITE_URL } from './data';
import type { Post, ContentType } from './content';
import type { Locale } from './i18n';

// 结构化数据（JSON-LD）生成器：文章、面包屑、站点。
// 供 article 页面注入 <script type="application/ld+json">。
// siteName 由调用方从字典传入，保证 JSON-LD 随语言本地化；locale 用于生成带语言前缀的 URL。

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function postUrl(type: ContentType, locale: Locale, slug: string): string {
  const section = type === 'news' ? 'news' : 'guides';
  return `${SITE_URL}/${locale}/${section}/${slug}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function articleSchema(
  type: ContentType,
  post: Post,
  locale: Locale,
  siteName: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': type === 'news' ? 'NewsArticle' : 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category ?? null,
    keywords: post.tags ?? [],
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(type, locale, post.slug) },
    ...(post.cover ? { image: absoluteUrl(post.cover) } : {}),
    author: { '@type': 'Organization', name: siteName, url: SITE_URL },
    publisher: { '@type': 'Organization', name: siteName, url: SITE_URL },
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

export function websiteSchema(siteName: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: SITE_URL,
  };
}
