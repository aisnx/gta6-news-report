import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/data';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/ads.txt', '/app-ads.txt', '/llms.txt', '/llms-full.txt'],
      // 挡掉 Next.js 静态导出生成的 RSC 内部文件（__next.*.txt、__next._tree.txt 等），
      // 以及各路由的 *.txt 载荷，避免被搜索引擎白白抓取、浪费抓取预算。
      // ads.txt / app-ads.txt / llms.txt / llms-full.txt 通过上面 allow 显式放行。
      disallow: ['/*__next*', '/*.txt'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
