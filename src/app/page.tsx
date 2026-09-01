import Link from 'next/link';
import type { Metadata } from 'next';
import { Countdown } from '@/components/Countdown';
import { facts, SITE_URL } from '@/lib/data';
import { getAllNews, getAllGuides } from '@/lib/content';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: `${SITE_URL}/covers/jason-lucia.jpg`, width: 1600, height: 900 }],
  },
};

export default function HomePage() {
  const latestNews = getAllNews().slice(0, 3);
  const latestGuides = getAllGuides().slice(0, 3);
  return (
    <>
      <section className="hero">
        <h1>
          侠盗猎车手 VI
          <br />
          情报与攻略一站通
        </h1>
        <p className="lead">
          发售前每日追踪爆料与官方动态、帮你分清真假；发售后第一时间更新任务攻略、彩蛋与收集。
        </p>
        <Countdown />
      </section>

      <section className="section" id="facts">
        <h2>已知信息（官方确认）</h2>
        <p className="sub">以下均为 Rockstar / Take-Two 官方或可信来源确认的信息。</p>
        <div className="facts">
          {facts.map((f) => (
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
        <h2>最新情报</h2>
        <p className="sub">
          GTA6 最新动态与爆料追踪。<Link href="/news">查看全部 →</Link>
        </p>
        <div className="grid">
          {latestNews.map((p) => (
            <Link href={`/news/${p.slug}`} className="card" key={p.slug}>
              <span className="tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="meta">{p.date}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="guides">
        <h2>攻略与资料</h2>
        <p className="sub">
          角色、地图、系统、配乐与购买指南。<Link href="/guides">查看全部 →</Link>
        </p>
        <div className="grid">
          {latestGuides.map((p) => (
            <Link href={`/guides/${p.slug}`} className="card" key={p.slug}>
              <span className="tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="meta">{p.date}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="disclaimer">
        <strong>免责与边界声明：</strong>本站为玩家自建的情报汇总与攻略站，仅报道公开新闻事实、官方确认信息与文字性分析，
        <strong>不转载、不搬运任何泄露的游戏画面、截图、源码或受版权保护的素材</strong>。所有未确认信息均会明确标注，请以
        Rockstar Games 官方公告为准。
      </div>
    </>
  );
}
