import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './cinematic.css';
import '@/components/portal/tokens.css';
import '@/components/portal/portal.css';
import './theme.css';
import './showcase.css';
import './search-content.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { StructuredData } from '@/components/structured-data';
import { isPreview, organizationGraph, site } from '@/lib/seo';

const sans = localFont({
  src: '../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',
  variable: '--font-dm-sans',
  weight: '100 1000',
  display: 'swap',
});
const serif = localFont({
  src: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
  variable: '--font-instrument-serif',
  weight: '400',
  style: 'italic',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Rossenaar Marketing | Groot in beeld. Dichtbij jou.',
    template: '%s | Rossenaar Marketing',
  },
  description:
    'Persoonlijke marketing voor ondernemers. Van een sterk merkverhaal tot content en campagnes. Je schakelt direct met Danny Rossenaar.',
  openGraph: {
    siteName: 'Rossenaar Marketing',
    locale: 'nl_NL',
    type: 'website',
    images: [{ url: '/assets/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    ...(isPreview ? { index: false } : {}),
    googleBot: {
      ...(isPreview ? { index: false } : {}),
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: '/assets/favicon-32.png',
    apple: '/assets/apple-touch-icon.png',
  },
};
export const viewport: Viewport = { themeColor: '#f5f3ed' };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${sans.variable} ${serif.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="site-theme"
          strategy="beforeInteractive"
        >{`try{var t=localStorage.getItem('rossenaar-theme');document.documentElement.dataset.siteThemeChoice=t==='dark'||t==='light'?t:'system';document.documentElement.dataset.siteTheme=t==='dark'||t==='light'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.siteTheme='light'}`}</Script>
      </head>
      <body>
        <StructuredData nodes={organizationGraph} />
        <a className="skip-link" href="#main">
          Direct naar inhoud
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
