'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './ui';
import { ThemeToggle } from './theme-toggle';

const links = [
  ['/werk', 'Werk'],
  ['/diensten', 'Wat ik doe'],
  ['/over', 'Over Danny'],
  ['/inzicht', 'Jouw inzicht'],
];
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link
          href="/"
          aria-label="Rossenaar Marketing, naar home"
          className="brand"
          scroll={pathname !== '/'}
          onClick={() => {
            setOpen(false);
            if (pathname === '/')
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'instant'
                  : 'smooth',
              });
          }}
        >
          <BrandMark />
          <span>
            Rossenaar<span className="brand-sub">MARKETING</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              prefetch={href === '/inzicht' ? false : undefined}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link className="nav-cta" href="/contact">
            Even koffie?
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        aria-label="Mobiele navigatie"
        inert={!open}
      >
        {links.map(([href, label], i) => (
          <Link
            key={href}
            href={href}
            prefetch={open && href !== '/inzicht' ? undefined : false}
            onClick={() => setOpen(false)}
            aria-current={pathname.startsWith(href) ? 'page' : undefined}
          >
            <span>0{i + 1}</span>
            {label}
            <ArrowUpRight />
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>
          <span>05</span>Even koffie?
          <ArrowUpRight />
        </Link>
      </nav>
    </header>
  );
}
