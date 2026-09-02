import type { Dictionary } from '@/lib/i18n';

export function Footer({ dict }: { dict: Dictionary }) {
  return <footer className="site-footer">{dict.footer}</footer>;
}
