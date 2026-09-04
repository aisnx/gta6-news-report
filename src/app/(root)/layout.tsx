import type { ReactNode } from 'react';

// 根路由 `/` 的独立 root layout：仅用于跳转到默认语言。
// 语言路由的 root layout 见 src/app/[lang]/layout.tsx（各自负责 <html lang>）。
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3499353264010840"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
