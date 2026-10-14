'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_ID = 'G-4K1LK2BWRC';
const STORAGE_KEY = 'rossenaar-cookies';
const OPEN_EVENT = 'rossenaar:cookie-settings';

type Consent = 'granted' | 'denied';

// Google Analytics laadt pas nadat de bezoeker toestemming heeft gegeven.
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored === 'granted' || stored === 'denied') setConsent(stored);
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function choose(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    // Na intrekken stopt GA met meten; bestaande cookies worden opgeruimd.
    if (value === 'denied' && consent === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (name.startsWith('_ga')) {
          const domain = location.hostname.replace(/^www\./, '');
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      }
    }
    if (value === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    setConsent(value);
    setOpen(false);
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {open && (
        <section
          className="cookie-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookievoorkeuren"
        >
          <p>
            Mag ik met Google Analytics anoniem meten hoe de website wordt
            gebruikt? Zo weet ik wat werkt. Meer in de{' '}
            <Link href="/privacy">privacyverklaring</Link>.
          </p>
          <div>
            <button type="button" onClick={() => choose('denied')}>
              Weigeren
            </button>
            <button
              type="button"
              className="cookie-accept"
              onClick={() => choose('granted')}
            >
              Accepteren
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-settings"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookies
    </button>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
