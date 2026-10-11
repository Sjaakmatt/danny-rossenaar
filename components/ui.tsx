import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 21C7 21 4 13 4 4c9 0 17 3 17 15V4h5v11c0 9-3 14-8 19l-4-4c3-3 5-6 5-9Z"
        fill="currentColor"
      />
      <path d="M26 25c0-11 6-15 13-15 0 10-3 16-13 15Z" fill="currentColor" />
    </svg>
  );
}
export function Button({
  href,
  children,
  variant = 'dark',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'dark' | 'light' | 'lime' | 'outline';
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      <span className="button-arrow">
        <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span />
      {children}
    </p>
  );
}
export function PageIntro({
  label,
  title,
  italic,
  description,
}: {
  label: string;
  title: string;
  italic: string;
  description: string;
}) {
  return (
    <section className="page-intro wrap">
      <Eyebrow>{label}</Eyebrow>
      <h1>
        {title}
        <br />
        <em>{italic}</em>
      </h1>
      <p className="intro-description">{description}</p>
    </section>
  );
}
