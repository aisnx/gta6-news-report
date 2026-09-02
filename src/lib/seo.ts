import { SITE_URL } from './data';
import { locales, defaultLocale } from './i18n';
import { getNewsBySlug, getGuideBySlug, type ContentType } from './content';

// 生成 hreflang 语言交替映射：仅包含该文章实际存在译文的语言，x-default 指向默认语言。
export function alternateLanguages(type: ContentType, slug: string): Record<string, string> {
  const get = type === 'news' ? getNewsBySlug : getGuideBySlug;
  const langs: Record<string, string> = {};
  for (const locale of locales) {
    if (get(locale, slug)) {
      langs[locale] = `${SITE_URL}/${locale}/${type}/${slug}`;
    }
  }
  langs['x-default'] = `${SITE_URL}/${defaultLocale}/${type}/${slug}`;
  return langs;
}
