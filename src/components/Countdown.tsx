'use client';

import { useEffect, useState } from 'react';
import { RELEASE_DATE } from '@/lib/data';

export function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(RELEASE_DATE).getTime();
    const tick = () => setDiff(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const launched = diff !== null && diff <= 0;
  const days = diff === null ? '--' : Math.floor(diff / 86400000);
  const hrs = diff === null ? '--' : Math.floor(diff / 3600000) % 24;
  const min = diff === null ? '--' : Math.floor(diff / 60000) % 60;
  const sec = diff === null ? '--' : Math.floor(diff / 1000) % 60;

  if (launched) {
    return (
      <div className="countdown">
        <div className="cd-cell" style={{ gridColumn: '1 / -1' }}>
          🎮 GTA6 已发售！攻略更新中 →
        </div>
      </div>
    );
  }

  return (
    <div className="countdown">
      <div className="cd-cell"><div className="cd-num days">{days}</div><div className="cd-label">天</div></div>
      <div className="cd-cell"><div className="cd-num">{hrs}</div><div className="cd-label">小时</div></div>
      <div className="cd-cell"><div className="cd-num">{min}</div><div className="cd-label">分</div></div>
      <div className="cd-cell"><div className="cd-num">{sec}</div><div className="cd-label">秒</div></div>
    </div>
  );
}
