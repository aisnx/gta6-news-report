import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/data';
import { getAllNews, getAllGuides } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getAllNews().map((p) => ({
    url: `${SITE_URL}/news/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const guides = getAllGuides().map((p) => ({
    url: `${SITE_URL}/guides/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/verify`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...news,
    ...guides,
  ];
}
