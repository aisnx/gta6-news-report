import { notFound } from 'next/navigation';
import { zh } from './translations/zh';
import { en } from './translations/en';
import { es } from './translations/es';
import { ja } from './translations/ja';
import { locales } from './locales';
import type { Dictionary, Locale } from './locales';

// 国际化核心（服务端）：语言校验 + 字典加载。
// 纯常量与类型见 ./locales.ts，供客户端组件安全导入。

export { locales, defaultLocale, htmlLang } from './locales';
export type { Locale, VerifyStatus, Fact, TimelineItem, VerifyRow, Dictionary } from './locales';

const dictionaries: Record<Locale, Dictionary> = { zh, en, es, ja };

export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export function toLocale(lang: string): Locale {
  if (!hasLocale(lang)) notFound();
  return lang;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
