import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/data';
import { getAllNews, getAllGuides } from '@/lib/content';
import { locales } from '@/lib/i18n';
import { alternateLanguages } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push(
      { url: `${SITE_URL}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
      { url: `${SITE_URL}/${locale}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${SITE_URL}/${locale}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
      { url: `${SITE_URL}/${locale}/verify`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    );

    for (const p of getAllNews(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/news/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
        alternates: { languages: alternateLanguages('news', p.slug) },
      });
    }

    for (const p of getAllGuides(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${p.slug}`,
        lastModified: p.date ? new Date(p.date) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: alternateLanguages('guides', p.slug) },
      });
    }
  }

  return entries;
}
