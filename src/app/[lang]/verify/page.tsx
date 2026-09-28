import type { Metadata } from 'next';
import Link from 'next/link';
import { VerifyTable } from '@/components/VerifyTable';
import { toLocale, getDictionary } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  return {
    title: dict.verify.title,
    description: dict.verify.description,
    alternates: { canonical: `/${locale}/verify` },
  };
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);

  return (
    <>
      <section className="section">
        <h2>{dict.verify.title}</h2>
        <p className="sub">{dict.verify.sub}</p>
        <VerifyTable dict={dict} />
      </section>

      <section className="section" id="timeline">
        <h2>{dict.verify.timelineTitle}</h2>
        <p className="sub">{dict.verify.timelineSub}</p>
        <div className="timeline">
          {dict.timeline.map((t) => (
            <div className="tl-item" key={t.title}>
              <div className="tl-date">{t.date}</div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{dict.buyingCta.title}</h2>
        <p className="sub">{dict.buyingCta.text}</p>
        <Link href={`/${locale}/guides/gta6-console-buying-guide`}>{dict.buyingCta.linkLabel} →</Link>
      </section>
    </>
  );
}
