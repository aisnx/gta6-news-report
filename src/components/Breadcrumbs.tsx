import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/schema';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="面包屑">
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
