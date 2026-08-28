import type { Metadata } from 'next';
import { VerifyTable } from '@/components/VerifyTable';

export const metadata: Metadata = {
  title: '真伪求证',
  description: 'GTA6 传言求证：一键分清官方确认、谣言与未确认信息。',
};

export default function VerifyPage() {
  return (
    <section className="section">
      <h2>真伪求证</h2>
      <p className="sub">网上传言满天飞，这里帮你一键分清「已确认 / 未确认 / 谣言」。</p>
      <VerifyTable />
    </section>
  );
}
