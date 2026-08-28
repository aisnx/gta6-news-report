import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_NAME, SITE_URL } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜发售日期、爆料汇总、预告解析、攻略`,
    template: `%s｜${SITE_NAME}`,
  },
  description:
    'GTA6 一站式情报站：发售日期、价格、平台、预购、预告片解析、爆料真伪求证，以及发售后的全攻略。',
  openGraph: {
    title: `${SITE_NAME}｜发售日期、爆料汇总、预告解析、攻略`,
    description: 'GTA6 一站式情报站：发售日期、价格、平台、预购、预告解析、爆料真伪求证与攻略。',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
