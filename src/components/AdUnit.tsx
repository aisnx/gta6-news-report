'use client';

import { useEffect } from 'react';

// Google AdSense 广告单元（ad-slot 1022185001）。
// loader 脚本已在 layout 的 <head> 注入，这里只负责渲染 <ins> 并触发 push。
type Adsbygoogle = object[];

export function AdUnit() {
  useEffect(() => {
    try {
      const w = window as unknown as { adsbygoogle?: Adsbygoogle };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle 尚未就绪时忽略，loader 加载完成后会自动补齐渲染
    }
  }, []);

  return (
    <div className="ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3499353264010840"
        data-ad-slot="1022185001"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
