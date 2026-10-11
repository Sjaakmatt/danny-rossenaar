'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { services } from '@/lib/content';
export function ContactForm({ interest = '' }: { interest?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError('');
    const body = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(16_000),
      });
      const result = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(
          result.error ||
            'Je bericht is niet verstuurd. Probeer het later nog eens.',
        );
      setState('success');
    } catch (err) {
      setError(
        err instanceof Error &&
          err.name !== 'TimeoutError' &&
          err.name !== 'TypeError'
          ? err.message
          : 'De verbinding lukt even niet. Je bericht is nog niet verstuurd. Bel of mail Danny rechtstreeks.',
      );
      setState('error');
    }
  }
  if (state === 'success')
    return (
      <div className="contact-form form-success" role="status">
        <CheckCircle2 size={40} />
        <h2>Een goed begin.</h2>
        <p>
          Je bericht is verstuurd. Ik neem binnen één werkdag contact met je op.
          Tot snel!
        </p>
        <button
          className="button button-outline"
          onClick={() => setState('idle')}
        >
          Nog een bericht schrijven
          <ArrowUpRight size={18} />
        </button>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Kennismakingsformulier"
    >
      <h2>Vertel eens.</h2>
      <div className="form-grid">
        <label className="form-field">
          <span>Hoe heet je? *</span>
          <input
            name="naam"
            autoComplete="name"
            placeholder="Je naam"
            required
            maxLength={100}
          />
        </label>
        <label className="form-field">
          <span>Je bedrijf</span>
          <input
            name="bedrijf"
            autoComplete="organization"
            placeholder="Bedrijfsnaam"
            maxLength={150}
          />
        </label>
      </div>
      <label className="form-field">
        <span>Waar kan ik je mailen? *</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="jij@jouwbedrijf.nl"
          required
          maxLength={200}
        />
      </label>
      <label className="form-field">
        <span>Waar denk je aan?</span>
        <select
          name="interesse"
          defaultValue={
            services.some((s) => s.label === interest) ? interest : ''
          }
        >
          <option value="">Laten we dat samen ontdekken</option>
          {services.map((s) => (
            <option key={s.slug} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Wat houdt je bezig? *</span>
        <textarea
          name="bericht"
          placeholder="Vertel me iets over je plannen, je vraag of je bedrijf…"
          required
          maxLength={5000}
          rows={4}
        />
      </label>
      <div className="form-trap" aria-hidden="true">
        <label>
          Laat dit veld leeg
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state === 'error' && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-dark form-submit"
        type="submit"
        disabled={state === 'sending'}
      >
        {state === 'sending'
          ? 'Je bericht wordt verstuurd…'
          : 'Stuur Danny een bericht'}
        <span className="button-arrow">
          {state === 'sending' ? (
            <LoaderCircle size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </span>
      </button>
      <p className="form-privacy">
        Je bericht komt rechtstreeks bij mij. Lees hoe ik met je gegevens omga
        in de <Link href="/privacy">privacy-informatie</Link>. * Verplicht veld.
      </p>
    </form>
  );
}
