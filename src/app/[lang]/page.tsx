import Link from 'next/link';
import type { Metadata } from 'next';
import { Countdown } from '@/components/Countdown';
import { VideoEmbed } from '@/components/VideoEmbed';
import { JsonLd } from '@/components/JsonLd';
import { videoSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/data';
import { getAllNews, getAllGuides, type Post } from '@/lib/content';
import { toLocale, getDictionary } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = toLocale(lang);
  return {
    alternates: { canonical: `/${locale}` },
    openGraph: {
      images: [{ url: `${SITE_URL}/covers/jason-lucia.jpg`, width: 1600, height: 900 }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const dict = getDictionary(locale);
  const featured = getAllNews(locale).find((p) => p.featured);
  const latestNews = getAllNews(locale).slice(0, 3);
  const latestGuides = getAllGuides(locale).slice(0, 3);
  // 购买指南固定排序：主机选择作为主卡，价格/版本/清单作为次卡。
  const buyingGuideOrder = [
    'gta6-console-buying-guide',
    'gta6-price',
    'gta6-editions',
    'pre-launch-checklist',
  ];
  const buyingGuides = buyingGuideOrder
    .map((slug) => getAllGuides(locale).find((p) => p.slug === slug))
    .filter((p): p is Post => Boolean(p));
  const mainBuyingGuide = buyingGuides[0];
  const restBuyingGuides = buyingGuides.slice(1);

  return (
    <>
      {dict.videos.map((v) => (
        <JsonLd key={v.id} data={videoSchema(v)} />
      ))}
      <section className="hero">
        <h1>
          {dict.home.heroTitle1}
          <br />
          {dict.home.heroTitle2}
        </h1>
        <p className="lead">{dict.home.lead}</p>
        <Countdown labels={dict.countdown} />
      </section>

      {featured ? (
        <section className="section" id="featured">
          <Link href={`/${locale}/news/${featured.slug}`} className="featured-card">
            <span className="tag">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <div className="meta">{featured.date}</div>
          </Link>
        </section>
      ) : null}

      <section className="section" id="buying-guide">
        <h2>{dict.home.buyingGuideTitle}</h2>
        <p className="sub">{dict.home.buyingGuideSub}</p>
        {mainBuyingGuide ? (
          <Link
            href={`/${locale}/guides/${mainBuyingGuide.slug}`}
            className="featured-card"
          >
            <span className="tag">{mainBuyingGuide.category}</span>
            <h3>{mainBuyingGuide.title}</h3>
            <p>{mainBuyingGuide.description}</p>
            <div className="meta">{mainBuyingGuide.date}</div>
          </Link>
        ) : null}
        {restBuyingGuides.length ? (
          <div className="grid">
            {restBuyingGuides.map((p) => (
              <Link href={`/${locale}/guides/${p.slug}`} className="card" key={p.slug}>
                <span className="tag">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="meta">{p.date}</div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="section" id="trailers">
        <h2>{dict.home.trailersTitle}</h2>
        <p className="sub">{dict.home.trailersSub}</p>
        <div className="video-grid">
          {dict.videos.map((v) => (
            <VideoEmbed key={v.id} id={v.id} title={v.title} />
          ))}
        </div>
      </section>

      <section className="section" id="facts">
        <h2>{dict.home.factsTitle}</h2>
        <p className="sub">{dict.home.factsSub}</p>
        <div className="facts">
          {dict.facts.map((f) => (
            <div className="fact" key={f.key}>
              <div className="k">{f.key}</div>
              <div className="v">
                {f.value}
                {f.note ? <small> · {f.note}</small> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="news">
        <h2>{dict.home.newsTitle}</h2>
        <p className="sub">
          {dict.home.newsSub}
          <Link href={`/${locale}/news`}>{dict.home.viewAll} →</Link>
        </p>
        <div className="grid">
          {latestNews.map((p) => (
            <Link href={`/${locale}/news/${p.slug}`} className="card" key={p.slug}>
              <span className="tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="meta">{p.date}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="guides">
        <h2>{dict.home.guidesTitle}</h2>
        <p className="sub">
          {dict.home.guidesSub}
          <Link href={`/${locale}/guides`}>{dict.home.viewAll} →</Link>
        </p>
        <div className="grid">
          {latestGuides.map((p) => (
            <Link href={`/${locale}/guides/${p.slug}`} className="card" key={p.slug}>
              <span className="tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="meta">{p.date}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="disclaimer">
        <strong>{dict.home.disclaimer.lead}</strong>
        {dict.home.disclaimer.body1}
        <strong>{dict.home.disclaimer.body2}</strong>
        {dict.home.disclaimer.body3}
      </div>
    </>
  );
}
