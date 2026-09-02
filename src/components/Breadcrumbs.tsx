import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/schema';

export function Breadcrumbs({
  items,
  ariaLabel,
}: {
  items: BreadcrumbItem[];
  ariaLabel: string;
}) {
  return (
    <nav className="breadcrumbs" aria-label={ariaLabel}>
      {items.map((item, i) => (
        <span key={item.path} className="crumb">
          {i > 0 ? <span className="sep">›</span> : null}
          {i === items.length - 1 ? (
            <span className="current">{item.name}</span>
          ) : (
            <Link href={item.path}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
