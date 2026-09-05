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
  authorName?: string,
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
    author: { '@type': 'Person', name: authorName || siteName, url: SITE_URL },
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

// 视频结构化数据（VideoObject）：让 Google 能把页面里嵌入的 YouTube 视频编入视频结果。
// 注意：uploadDate 是 Google「视频」索引报告的必填字段——缺了它视频永远进不了视频结果。
// 单页无 YouTube API 拿不到真实上传时间，故用文章发布日期兜底（好过留空被判定为不可索引）。
export function videoSchema(video: {
  id: string;
  title?: string;
  uploadDate?: string;
  description?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title || 'Video',
    description: video.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  };
}

// 从 markdown 正文里提取 YouTube 视频 ID，为文章内嵌的视频批量生成 VideoObject。
export function videoSchemasFromMarkdown(
  markdown: string,
  opts?: { title?: string; date?: string; description?: string },
): Record<string, unknown>[] {
  const ids = new Set<string>();
  const re = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) ids.add(m[1]);
  return Array.from(ids).map((id) =>
    videoSchema({
      id,
      title: opts?.title,
      uploadDate: opts?.date,
      description: opts?.description,
    }),
  );
}
