import Link from 'next/link';
import type { Crumb } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs wrap" aria-label="Broodkruimelpad">
      <ol>
        {[{ name: 'Home', path: '/' }, ...items].map((item, i) => (
          <li key={item.path}>
            {i === items.length ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
