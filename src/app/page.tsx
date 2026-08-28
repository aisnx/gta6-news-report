import { Countdown } from '@/components/Countdown';
import { VerifyTable } from '@/components/VerifyTable';
import { facts, timeline } from '@/lib/data';

export default function HomePage() {
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

      <section className="section" id="verify">
        <h2>真伪求证</h2>
        <p className="sub">网上传言满天飞，一键分清「已确认 / 未确认 / 谣言」。</p>
        <VerifyTable />
      </section>

      <div className="disclaimer">
        <strong>免责与边界声明：</strong>本站为玩家自建的情报汇总与攻略站，仅报道公开新闻事实、官方确认信息与文字性分析，
        <strong>不转载、不搬运任何泄露的游戏画面、截图、源码或受版权保护的素材</strong>。所有未确认信息均会明确标注，请以
        Rockstar Games 官方公告为准。
      </div>
    </>
  );
}
