// Deterministic, fictional data. Never read from or written to a customer account.
export type Period = 7 | 30 | 90;
export type Metric = 'aanvragen' | 'klikken' | 'uitgaven';
export const demoDays = Array.from({ length: 90 }, (_, i) => ({
  date: new Date(Date.UTC(2026, 6, 14 + i)).toISOString().slice(0, 10),
  aanvragen:
    [1, 2, 0, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 0, 3][i % 15] + (i > 65 ? 1 : 0),
  klikken: 18 + ((i * 17) % 65) + Math.floor(i / 3),
  uitgaven: Number((12 + ((i * 13) % 29) + (i > 60 ? 4 : 0)).toFixed(2)),
  vertoningen: 530 + ((i * 127) % 1200),
}));
export const demoLeads = [
  {
    id: 'D-001',
    name: 'Voorbeeldbedrijf Noord',
    person: 'Demo-aanvraag 01',
    date: '2026-10-11',
    channel: 'Instagram',
    status: 'Nieuw',
  },
  {
    id: 'D-002',
    name: 'Voorbeeldbedrijf West',
    person: 'Demo-aanvraag 02',
    date: '2026-10-09',
    channel: 'Facebook',
    status: 'In gesprek',
  },
  {
    id: 'D-003',
    name: 'Voorbeeldbedrijf Oost',
    person: 'Demo-aanvraag 03',
    date: '2026-10-06',
    channel: 'Instagram',
    status: 'Klant',
  },
  {
    id: 'D-004',
    name: 'Voorbeeldbedrijf Zuid',
    person: 'Demo-aanvraag 04',
    date: '2026-09-28',
    channel: 'Website',
    status: 'In gesprek',
  },
  {
    id: 'D-005',
    name: 'Voorbeeldbedrijf Centrum',
    person: 'Demo-aanvraag 05',
    date: '2026-08-30',
    channel: 'Facebook',
    status: 'Klant',
  },
];
export const number = (value: number) =>
  new Intl.NumberFormat('nl-NL').format(value);
export const euro = (value: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value);
export const shortDate = (date: string) =>
  new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(date));
