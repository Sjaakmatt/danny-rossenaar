import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { servicePages } from '@/lib/service-pages';
import { Eyebrow } from './ui';

export function ServiceLinks({ exclude }: { exclude?: string }) {
  return (
    <section className="service-links wrap">
      <div>
        <Eyebrow>Van plan naar praktijk</Eyebrow>
        <h2>
          {exclude ? 'Ook goed om' : 'Waar wil jij'}
          <br />
          <em>{exclude ? 'te weten.' : 'mee beginnen?'}</em>
        </h2>
      </div>
      <nav aria-label="Meer over de diensten">
        {servicePages
          .filter((service) => service.slug !== exclude)
          .map((service) => (
            <Link key={service.slug} href={`/diensten/${service.slug}`}>
              <span>{service.name}</span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
      </nav>
    </section>
  );
}
