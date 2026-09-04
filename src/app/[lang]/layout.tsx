import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { websiteSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/data';
import { locales, toLocale, getDictionary, htmlLang } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.template,
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.defaultTitle,
      description: dict.meta.ogDescription,
      type: 'website',
      locale: dict.ogLocale,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3499353264010840"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd data={websiteSchema(dict.siteName)} />
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
