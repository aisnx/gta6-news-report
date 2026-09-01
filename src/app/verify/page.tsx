import type { Metadata } from 'next';
import { VerifyTable } from '@/components/VerifyTable';
import { timeline } from '@/lib/data';

export const metadata: Metadata = {
  title: '真伪求证',
  description: 'GTA6 传言求证与情报时间线：一键分清官方确认、谣言与未确认信息。',
};

export default function VerifyPage() {
  return (
    <>
      <section className="section">
        <h2>真伪求证</h2>
        <p className="sub">网上传言满天飞，这里帮你一键分清「已确认 / 未确认 / 谣言」。</p>
        <VerifyTable />
      </section>

      <section className="section" id="timeline">
        <h2>情报时间线</h2>
        <p className="sub">从首次泄露到临近发售的关键节点。</p>
        <div className="timeline">
          {timeline.map((t) => (
            <div className="tl-item" key={t.title}>
              <div className="tl-date">{t.date}</div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
