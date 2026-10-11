import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 17C21 29 35 30 36 52C13 49 4 37 3 17Z"
        fill="var(--brand-teal, #08616a)"
      />
      <path
        d="M97 17C79 29 65 30 64 52C87 49 96 37 97 17Z"
        fill="var(--brand-leaf, #7a9e3f)"
      />
      <path
        d="M30 67C10 67 2 82 2 104V115L14 105V100C14 87 18 82 31 83Z"
        fill="var(--brand-blue, #0b3e64)"
      />
      <path
        d="M43 59C27 64 27 78 31 89C34 79 38 73 44 70Z"
        fill="var(--brand-leaf, #7a9e3f)"
      />
      <path
        d="M42 4H60V63C51 64 46 67 42 73Z"
        fill="var(--brand-teal, #08616a)"
      />
      <path
        d="M2 115C28 99 33 106 44 85C54 66 66 65 74 67C93 71 98 85 98 115L86 108V94C86 79 73 77 66 84C56 93 50 113 31 116C20 118 10 117 2 115Z"
        fill="var(--brand-blue, #0b3e64)"
      />
      <path
        d="M66 97C72 105 89 107 98 115C80 119 64 117 55 108Z"
        fill="var(--brand-leaf, #7a9e3f)"
      />
    </svg>
  );
}
// Eigen SVG in plaats van het teken ✳: iOS toont dat teken als groene emoji.
export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="6.5"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path d="M50 8V92M8 50H92M20.3 20.3L79.7 79.7M79.7 20.3L20.3 79.7" />
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
