/** Client portal: types and fetch helpers for the /api/portal/* contract (docs/platform-api.md, "Klantportaal"). */

export type LeadStatus =
  'new' | 'contacted' | 'qualified' | 'meeting' | 'won' | 'lost';
export type LossReason =
  'budget' | 'timing' | 'no_fit' | 'no_response' | 'competitor' | 'other';
export type NoteKind = 'note' | 'call' | 'email' | 'whatsapp';

export type PortalTheme = {
  accent: string;
  accentInk: string;
  ink: string;
  paper: string;
  soft: string;
  headingFont: string | null;
  bodyFont: string | null;
  logoUrl?: string | null;
};

export type PortalSession = {
  authenticated: boolean;
  agency: { name: string };
  user?: { name: string; email: string; notifyNewLeads?: boolean };
  client?: {
    name: string;
    website: string | null;
    theme: PortalTheme;
    logoUrl: string | null;
  };
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  wishes: string;
  budgetCents: number | null;
  status: LeadStatus;
  campaignId: string | null;
  meetingHeldAt: string | null;
  lossReason: LossReason | null;
  customerValueCents: number | null;
  outcomeRevision: number;
  pageId?: string | null;
  pageName?: string | null;
  pageSlug?: string | null;
  adName?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LeadNote = {
  id: string;
  authorType: 'agency' | 'client';
  authorName: string;
  kind: NoteKind;
  body: string;
  createdAt: string;
};

export type InsightFigures = {
  impressions: number;
  clicks: number;
  spendMicros: number;
  leads: number;
};
export type InsightDay = InsightFigures & { date: string; live: boolean };
export type InsightChannel = {
  provider: 'google' | 'meta';
  currency: string;
  missingDays: string[];
  liveToday: boolean;
  liveFetchedAt: string | null;
  lastImportAt: string | null;
  importRunning: boolean;
};
export type InsightsReport = {
  from: string;
  to: string;
  days: number;
  previous: {
    from: string;
    to: string;
    totals: InsightFigures;
    complete: boolean;
  };
  currency: string | null;
  totals: InsightFigures;
  otherLeads: number;
  series: InsightDay[];
  channels: InsightChannel[];
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

import { demoDays } from '@/lib/demo';

// Only in-memory, fictional fixtures. No fetch, credentials, cookies or customer data.
const demoNow = '2026-10-11T14:00:00Z';
const statusCycle: LeadStatus[] = [
  'contacted',
  'qualified',
  'meeting',
  'won',
  'lost',
  'new',
];
const fixtures: Lead[] = demoDays.flatMap((day, dayIndex) =>
  Array.from({ length: day.aanvragen }, (_, i) => {
    const serial = dayIndex * 100 + i + 1;
    const status =
      dayIndex > 87 ? 'new' : statusCycle[serial % statusCycle.length];
    return {
      id: `demo-${serial}`,
      name: `${['Sanne', 'Milan', 'Noor', 'Daan', 'Eva', 'Jesse', 'Lotte', 'Ruben', 'Fleur', 'Bram', 'Sofie', 'Mees'][serial % 12]} ${['de Vries', 'Jansen', 'van Dijk', 'Bakker', 'Visser', 'de Boer', 'Smit', 'Mulder'][Math.floor(serial / 12) % 8]}`,
      email: `aanvraag-${serial}@example.com`,
      company: `Voorbeeldbedrijf ${['Noord', 'West', 'Oost', 'Zuid'][serial % 4]}`,
      phone: '06 00000000',
      wishes: [
        'Ik wil graag kennismaken en bespreken wat er mogelijk is.',
        'We zoeken hulp om ons bedrijf beter in beeld te brengen.',
        'Kunnen jullie meedenken over onze volgende campagne?',
      ][serial % 3],
      budgetCents: [50000, 100000, 150000][serial % 3],
      status,
      campaignId: null,
      meetingHeldAt: null,
      lossReason: status === 'lost' ? 'timing' : null,
      customerValueCents: status === 'won' ? 150000 : null,
      outcomeRevision: 0,
      pageName: 'Kennismaken',
      adName: 'Jouw verhaal in beeld · voorbeeld',
      utmSource: serial % 2 ? 'instagram' : 'google',
      utmMedium: 'paid',
      utmCampaign: 'voorbeeldcampagne',
      createdAt: `${day.date}T${String(9 + i).padStart(2, '0')}:00:00Z`,
      updatedAt: `${day.date}T12:00:00Z`,
    } satisfies Lead;
  }),
);
let rows = structuredClone(fixtures);
const notes = new Map<string, LeadNote[]>();
const copy = <T>(value: T): T => structuredClone(value);
function findLead(id: string) {
  const lead = rows.find((row) => row.id === id);
  if (!lead)
    throw new ApiError(404, 'not_found', 'Voorbeeldaanvraag niet gevonden.');
  return lead;
}
function saveLead(id: string, changes: Partial<Lead>) {
  const old = findLead(id);
  const lead = {
    ...old,
    ...changes,
    outcomeRevision: old.outcomeRevision + 1,
    updatedAt: demoNow,
  };
  rows = rows.map((row) => (row.id === id ? lead : row));
  return { lead: copy(lead) };
}
const emptyFigures = (): InsightFigures => ({
  impressions: 0,
  clicks: 0,
  spendMicros: 0,
  leads: 0,
});
export const portalApi = {
  leads: async () => ({ leads: copy(rows) }),
  lead: async (id: string) => ({ lead: copy(findLead(id)) }),
  setStatus: async (id: string, status: LeadStatus) =>
    saveLead(id, { status, lossReason: null, customerValueCents: null }),
  setOutcome: async (
    lead: Lead,
    status: LeadStatus,
    extra: {
      lossReason?: LossReason | null;
      customerValueCents?: number | null;
    },
  ) => {
    if (findLead(lead.id).outcomeRevision !== lead.outcomeRevision)
      throw new ApiError(409, 'conflict', 'De oefenaanvraag is gewijzigd.');
    return saveLead(lead.id, {
      status,
      lossReason: status === 'lost' ? (extra.lossReason ?? null) : null,
      customerValueCents:
        status === 'won' ? (extra.customerValueCents ?? null) : null,
    });
  },
  notes: async (id: string) => ({
    notes: copy(
      notes.get(id) ?? [
        {
          id: `intro-${id}`,
          authorType: 'agency' as const,
          authorName: 'Danny · voorbeeld',
          kind: 'note' as const,
          body: 'Hier houden we samen de opvolging bij. Probeer gerust een notitie of een andere status.',
          createdAt: findLead(id).createdAt,
        },
      ],
    ),
  }),
  addNote: async (id: string, body: string, kind: NoteKind) => {
    const existing = await portalApi.notes(id);
    const note: LeadNote = {
      id: `note-${id}-${existing.notes.length}`,
      authorType: 'client',
      authorName: 'Jij · voorbeeld',
      kind,
      body,
      createdAt: demoNow,
    };
    notes.set(id, [note, ...existing.notes]);
    if (kind !== 'note' && findLead(id).status === 'new')
      saveLead(id, { status: 'contacted' });
    return { note: copy(note) };
  },
  reset: async () => {
    rows = copy(fixtures);
    notes.clear();
    return { leads: copy(rows) };
  },
  insights: async (
    from: string,
    to: string,
  ): Promise<{ report: InsightsReport }> => {
    const series: InsightDay[] = demoDays
      .filter((day) => day.date >= from && day.date <= to)
      .map((day) => ({
        date: day.date,
        live: true,
        impressions: day.vertoningen,
        clicks: day.klikken,
        spendMicros: Math.round(day.uitgaven * 1_000_000),
        leads: day.aanvragen,
      }));
    const totals = series.reduce(
      (sum, day) => ({
        impressions: sum.impressions + day.impressions,
        clicks: sum.clicks + day.clicks,
        spendMicros: sum.spendMicros + day.spendMicros,
        leads: sum.leads + day.leads,
      }),
      emptyFigures(),
    );
    return {
      report: {
        from,
        to,
        days: series.length,
        currency: 'EUR',
        totals,
        otherLeads: 0,
        series,
        previous: { from, to, totals: emptyFigures(), complete: false },
        channels: [
          {
            provider: 'meta',
            currency: 'EUR',
            missingDays: [],
            liveToday: false,
            liveFetchedAt: null,
            lastImportAt: null,
            importRunning: false,
          },
        ],
      },
    };
  },
};
