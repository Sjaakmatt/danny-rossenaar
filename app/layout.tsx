import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './globals.css';
import './cinematic.css';
import '@/components/portal/tokens.css';
import '@/components/portal/portal.css';
import './theme.css';
import './showcase.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rossenaarmarketing.nl'),
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
    <html lang="nl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="site-theme"
          strategy="beforeInteractive"
        >{`try{var t=localStorage.getItem('rossenaar-theme');document.documentElement.dataset.siteThemeChoice=t==='dark'||t==='light'?t:'system';document.documentElement.dataset.siteTheme=t==='dark'||t==='light'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.siteTheme='light'}`}</Script>
      </head>
      <body>
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
