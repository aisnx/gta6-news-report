import Link from 'next/link';
import type { Locale, Dictionary } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Search } from './Search';

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <>
      <div className="topbar">{dict.header.topbar}</div>
      <header className="site-header">
        <div className="nav">
          <Link href={`/${locale}`} className="brand">
            {dict.siteName}
            <small>{dict.header.brandTagline}</small>
          </Link>
          <nav className="menu">
            <Link href={`/${locale}`}>{dict.header.navHome}</Link>
            <Link href={`/${locale}/news`}>{dict.header.navNews}</Link>
            <Link href={`/${locale}/verify`}>{dict.header.navVerify}</Link>
            <Link href={`/${locale}/guides`}>{dict.header.navGuides}</Link>
            <Link href={`/${locale}/about`}>{dict.header.navAbout}</Link>
          </nav>
          <Search locale={locale} placeholder={dict.header.searchPlaceholder} />
          <LanguageSwitcher current={locale} />
        </div>
      </header>
    </>
  );
}
