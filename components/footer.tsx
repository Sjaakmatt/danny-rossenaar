import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contact } from '@/lib/content';
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
        <div className="footer-bottom">
          <Link href="/" className="brand">
            <BrandMark />
            <span>
              rossenaar<span className="brand-sub">MARKETING</span>
            </span>
          </Link>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <Link href="/privacy">Privacy</Link>
          <span>© {new Date().getFullYear()} Rossenaar Marketing</span>
        </div>
      </div>
    </footer>
  );
}
