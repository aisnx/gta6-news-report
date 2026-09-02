'use client';

import { useEffect } from 'react';
import { defaultLocale } from '@/lib/locales';

// `/` → 默认语言（静态导出无法使用服务端 redirect，故用客户端跳转 + 链接兜底）。
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}`);
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 40, textAlign: 'center' }}>
      <a href={`/${defaultLocale}`}>进入 GTA6 情报站 →</a>
    </div>
  );
}
