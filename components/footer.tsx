import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contact } from '@/lib/content';
import { servicePages } from '@/lib/service-pages';
import { CookieSettingsButton } from './analytics';
import { BrandMark, Eyebrow } from './ui';
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <Eyebrow light>Grote plannen beginnen klein</Eyebrow>
          <p>
            Eerst een goed gesprek.
            <br />
            De rest ontdekken we samen.
          </p>
        </div>
        <Link className="footer-invite" href="/contact">
          Even <em>koffie?</em>
          <span>
            <ArrowUpRight />
          </span>
        </Link>
        <div className="footer-services">
          <p>
            Persoonlijke marketing uit Enkhuizen.
            <br />
            Voor West-Friesland en ondernemers in heel Nederland.
          </p>
          <nav aria-label="Diensten in de footer">
            {servicePages.map((service) => (
              <Link key={service.slug} href={`/diensten/${service.slug}`}>
                {service.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="brand">
            <BrandMark />
            <span>
              Rossenaar<span className="brand-sub">MARKETING</span>
            </span>
          </Link>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <Link href="/privacy">Privacy</Link>
          <CookieSettingsButton />
          <span>© {new Date().getFullYear()} Rossenaar Marketing</span>
        </div>
      </div>
    </footer>
  );
}
