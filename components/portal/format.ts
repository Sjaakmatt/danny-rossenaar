// Adapted from Ads-manager- c0739d7; UI retained, data isolated to this public demo.
import type { LeadStatus, LossReason, NoteKind } from './api';

export const statusOrder: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'meeting',
  'won',
  'lost',
];
export const statusLabels: Record<LeadStatus, string> = {
  new: 'Nieuw',
  contacted: 'Contact gehad',
  qualified: 'Gekwalificeerd',
  meeting: 'Afspraak',
  won: 'Klant',
  lost: 'Afgewezen',
};
export const statusHints: Record<LeadStatus, string> = {
  new: 'Nog niet opgepakt',
  contacted: 'Je hebt contact gehad',
  qualified: 'Past bij wat je aanbiedt',
  meeting: 'Er staat een afspraak',
  won: 'Klant geworden',
  lost: 'Geen opdracht',
};
export const lossReasonLabels: Record<LossReason, string> = {
  budget: 'Budget past niet',
  timing: 'Nu niet het juiste moment',
  no_fit: 'Geen passende vraag',
  no_response: 'Geen reactie meer',
  competitor: 'Andere aanbieder gekozen',
  other: 'Andere reden',
};
export const noteKindLabels: Record<NoteKind, string> = {
  note: 'Notitie',
  call: 'Gebeld',
  email: 'E-mail gestuurd',
  whatsapp: 'WhatsApp gestuurd',
};

const TZ = 'Europe/Amsterdam';

export function relativeTime(
  iso: string,
  now = Date.parse('2026-10-11T14:00:00Z'),
  short = false,
): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return '';
  const seconds = Math.round((then - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return 'zojuist';
  const rtf = new Intl.RelativeTimeFormat('nl', {
    numeric: 'auto',
    style: short ? 'short' : 'long',
  });
  if (abs < 3600) return rtf.format(Math.round(seconds / 60), 'minute');
  const dayOf = (t: number) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date(t));
  const dayDiff = Math.round(
    (Date.parse(dayOf(then)) - Date.parse(dayOf(now))) / 86_400_000,
  );
  if (dayDiff === 0) return rtf.format(Math.round(seconds / 3600), 'hour');
  if (dayDiff >= -6) return rtf.format(dayDiff, 'day');
  const sameYear = dayOf(then).slice(0, 4) === dayOf(now).slice(0, 4);
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
    timeZone: TZ,
  }).format(new Date(then));
}

export function fullDate(iso: string): string {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ,
  }).format(new Date(iso));
}

export function shortDay(day: string): string {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
    .format(new Date(`${day}T12:00:00Z`))
    .replace('.', '');
}

export function money(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
    maximumFractionDigits: cents % 100 ? 2 : 0,
  }).format(cents / 100);
}

export function moneyFromMicros(
  micros: number,
  currency: string,
  precise = false,
): string {
  const value = micros / 1_000_000;
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
    maximumFractionDigits: precise || value < 100 ? 2 : 0,
    minimumFractionDigits: precise || value < 100 ? 2 : 0,
  }).format(value);
}

export function count(value: number): string {
  return new Intl.NumberFormat('nl-NL').format(value);
}

/** "1.250,50" or "1250" → cents; null when empty or unreadable. */
export function readEuroCents(text: string): number | null {
  const cleaned = text.replace(/[€\s]/g, '');
  if (!cleaned) return null;
  const normalized = cleaned.includes(',')
    ? cleaned.replace(/\./g, '').replace(',', '.')
    : /^\d{1,3}(\.\d{3})+$/.test(cleaned)
      ? cleaned.replace(/\./g, '')
      : cleaned;
  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

/** Phone number as wa.me expects it: digits only with country code; Dutch 06… becomes 316…. */
export function whatsappNumber(phone: string): string | null {
  const trimmed = phone.trim();
  let digits = trimmed.replace(/\D/g, '');
  if (!digits) return null;
  if (trimmed.startsWith('+')) return digits;
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `31${digits.slice(1)}`;
  if (digits.length === 9 && digits.startsWith('6')) digits = `31${digits}`;
  return digits;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (
    (parts[0][0] ?? '') +
    (parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '')
  ).toUpperCase();
}

export function amsterdamToday(): string {
  return '2026-10-11'; // Fixed reference date for the fictional tour.
}

export function shiftDay(day: string, delta: number): string {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

export function sourceLabel(
  utmSource: string | null | undefined,
): string | null {
  if (!utmSource) return null;
  const s = utmSource.toLowerCase();
  if (s === 'facebook' || s === 'instagram' || s === 'meta')
    return 'Facebook / Instagram';
  if (s === 'google') return 'Google';
  return utmSource;
}
