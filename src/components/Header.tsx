import Link from 'next/link';

export function Header() {
  return (
    <>
      <div className="topbar">🎮 GTA6 定档 2026-11-19 · 预购已开启 · PC 版预计 2027+</div>
      <header className="site-header">
        <div className="nav">
          <Link href="/" className="brand">
            GTA6 情报站
            <small>情报 / 求证 / 汇总 ｜ 攻略</small>
          </Link>
          <nav className="menu">
            <Link href="/">首页</Link>
            <Link href="/news">情报</Link>
            <Link href="/verify">真伪求证</Link>
            <Link href="/guides">攻略</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
