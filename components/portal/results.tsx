// Adapted from Ads-manager- c0739d7; UI retained, data isolated to this public demo.
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { portalApi, type InsightsReport, type Lead } from './api';
import {
  amsterdamToday,
  count,
  money,
  moneyFromMicros,
  relativeTime,
  shiftDay,
  shortDay,
} from './format';
import { PIcon } from './icons';
import { ErrorState, Skeleton } from './ui';

const periods = [7, 30, 90] as const;
type Period = (typeof periods)[number];
type Metric = 'leads' | 'clicks' | 'spend';
const metricLabels: Record<Metric, string> = {
  leads: 'Aanvragen',
  clicks: 'Klikken',
  spend: 'Uitgaven',
};
const metricColors: Record<Metric, string> = {
  leads: 'var(--p-accent)',
  clicks: 'var(--chart-2)',
  spend: 'var(--chart-4)',
};

const DASH = '—';

export function Results({ leads }: { leads: Lead[] | null }) {
  const [period, setPeriod] = useState<Period>(30);
  const [metric, setMetric] = useState<Metric>('leads');
  const [report, setReport] = useState<InsightsReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const to = amsterdamToday();
  const from = shiftDay(to, -(period - 1));

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { report: next } = await portalApi.insights(from, to);
      setReport(next);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : 'Resultaten laden mislukt.',
      );
    } finally {
      setLoading(false);
    }
  }, [from, to]);
  useEffect(() => {
    void load();
  }, [load]);

  const hasAds = !!report && report.channels.length > 0;
  const currency = report?.currency ?? null;
  const missing = useMemo(
    () =>
      new Set(report?.channels.flatMap((channel) => channel.missingDays) ?? []),
    [report],
  );
  const allMissing =
    !!report &&
    hasAds &&
    report.series.every(
      (day) => missing.has(day.date) || (day.date === to && !day.live),
    );

  const kpis = useMemo(() => {
    if (!report) return null;
    const known = hasAds && !allMissing;
    const spend = known && currency ? report.totals.spendMicros : null;
    const adLeads = report.totals.leads;
    return {
      spend:
        spend !== null && currency ? moneyFromMicros(spend, currency) : DASH,
      impressions: known ? count(report.totals.impressions) : DASH,
      clicks: known ? count(report.totals.clicks) : DASH,
      leads: count(adLeads + report.otherLeads),
      leadsHint:
        report.otherLeads > 0
          ? `${count(adLeads)} via advertenties`
          : hasAds
            ? 'via advertenties'
            : 'in deze periode',
      cpl:
        spend !== null && currency && adLeads > 0
          ? moneyFromMicros(spend / adLeads, currency, true)
          : DASH,
      ctr:
        known && report.totals.impressions > 0
          ? `${((report.totals.clicks / report.totals.impressions) * 100).toLocaleString('nl-NL', { maximumFractionDigits: 1 })}% klikt door`
          : null,
    };
  }, [report, hasAds, allMissing, currency]);

  const series = useMemo(
    () =>
      (report?.series ?? []).map((day) => {
        const gap = !hasAds || missing.has(day.date);
        return {
          date: day.date,
          leads: day.leads,
          clicks: gap ? null : day.clicks,
          spend: gap || !currency ? null : day.spendMicros / 1_000_000,
        };
      }),
    [report, hasAds, missing, currency],
  );

  const lastImport =
    report?.channels
      .map((channel) => channel.liveFetchedAt ?? channel.lastImportAt)
      .filter((value): value is string => !!value)
      .sort()
      .at(-1) ?? null;
  const missingCount = report
    ? report.series.filter((day) => missing.has(day.date)).length
    : 0;
  const chartEmpty =
    metric !== 'leads' &&
    (!hasAds || series.every((row) => row[metric] === null));

  return (
    <section className="p-section" aria-labelledby="p-results-title">
      <header className="p-section-head p-section-head-row">
        <div>
          <h2 id="p-results-title" className="p-title">
            Resultaten
          </h2>
          <p className="p-subtitle">
            Wat je advertenties opleveren, de afgelopen {period} dagen.
          </p>
        </div>
        <div className="p-segment" role="group" aria-label="Periode">
          {periods.map((days) => (
            <button
              key={days}
              type="button"
              className={period === days ? 'is-active' : ''}
              aria-pressed={period === days}
              onClick={() => setPeriod(days)}
            >
              {days} dagen
            </button>
          ))}
        </div>
      </header>

      {error && !report ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : (
        <>
          <div
            className={`p-kpis ${loading ? 'is-loading' : ''}`}
            aria-busy={loading}
          >
            {!kpis ? (
              [0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="p-kpi-skeleton" />
              ))
            ) : (
              <>
                <Kpi
                  label="Aanvragen"
                  value={kpis.leads}
                  hint={kpis.leadsHint}
                  accent
                />
                <Kpi
                  label="Kosten per aanvraag"
                  value={kpis.cpl}
                  hint={
                    kpis.cpl === DASH ? 'nog niet te berekenen' : 'gemiddeld'
                  }
                />
                <Kpi
                  label="Uitgaven"
                  value={kpis.spend}
                  hint={
                    kpis.spend === DASH
                      ? 'nog geen cijfers'
                      : 'aan advertenties'
                  }
                />
                <Kpi
                  label="Klikken"
                  value={kpis.clicks}
                  hint={
                    kpis.ctr ??
                    (kpis.clicks === DASH
                      ? 'nog geen cijfers'
                      : 'naar je website')
                  }
                />
                <Kpi
                  label="Vertoningen"
                  value={kpis.impressions}
                  hint={
                    kpis.impressions === DASH
                      ? 'nog geen cijfers'
                      : 'keer in beeld'
                  }
                />
              </>
            )}
          </div>

          {report && (!hasAds || missingCount > 0) && (
            <p className="p-notice p-notice-quiet">
              <PIcon name="alert" size={18} />
              <span>
                {!hasAds
                  ? 'Er zijn nog geen advertentiecijfers gekoppeld. Aanvragen tellen we wel al mee.'
                  : `Van ${missingCount} ${missingCount === 1 ? 'dag zijn' : 'dagen zijn'} de advertentiecijfers nog niet binnen; die tellen we nog niet mee.`}
              </span>
            </p>
          )}

          <article className="p-card p-glass p-chart-card">
            <div className="p-chart-head">
              <h3 className="p-card-title">Per dag</h3>
              <div
                className="p-segment p-segment-sm"
                role="group"
                aria-label="Wat wil je zien?"
              >
                {(Object.keys(metricLabels) as Metric[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={metric === key ? 'is-active' : ''}
                    aria-pressed={metric === key}
                    onClick={() => setMetric(key)}
                  >
                    {metricLabels[key]}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="p-chart"
              role="img"
              aria-label={`${metricLabels[metric]} per dag, ${period} dagen`}
            >
              {!report ? (
                <Skeleton className="p-chart-skeleton" />
              ) : chartEmpty ? (
                <div className="p-chart-empty">
                  <PIcon name="chart" size={22} />
                  <p>
                    Nog geen {metricLabels[metric].toLowerCase()} om te tonen
                    voor deze periode.
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={series}
                    margin={{ top: 8, right: 6, bottom: 0, left: 0 }}
                    barCategoryGap={period > 30 ? '12%' : '22%'}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="var(--chart-grid)"
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={shortDay}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={24}
                      tick={{ fill: 'var(--muted)', fontSize: 12 }}
                      dy={6}
                    />
                    <YAxis
                      width={metric === 'spend' ? 52 : 34}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'var(--muted)', fontSize: 12 }}
                      tickFormatter={(value: number) =>
                        metric === 'spend' && currency
                          ? new Intl.NumberFormat('nl-NL', {
                              style: 'currency',
                              currency,
                              maximumFractionDigits: 0,
                              notation: value >= 10000 ? 'compact' : 'standard',
                            }).format(value)
                          : count(value)
                      }
                    />
                    <Tooltip
                      cursor={{ fill: 'var(--surface-hover)' }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const row = payload[0].payload as {
                          date: string;
                          leads: number;
                          clicks: number | null;
                          spend: number | null;
                        };
                        const raw = row[metric];
                        const shown =
                          raw === null
                            ? 'nog niet binnen'
                            : metric === 'spend' && currency
                              ? moneyFromMicros(raw * 1_000_000, currency, true)
                              : count(raw);
                        return (
                          <div className="p-tooltip">
                            <span>{shortDay(row.date)}</span>
                            <strong>{shown}</strong>
                            <em>{metricLabels[metric].toLowerCase()}</em>
                          </div>
                        );
                      }}
                    />
                    <Bar
                      dataKey={metric}
                      fill={metricColors[metric]}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={28}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {lastImport && (
              <p className="p-chart-foot">
                Advertentiecijfers bijgewerkt {relativeTime(lastImport)}.
              </p>
            )}
          </article>

          <Funnel leads={leads} from={from} to={to} />
        </>
      )}
    </section>
  );
}

function Kpi({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div className={`p-kpi p-glass ${accent ? 'is-accent' : ''}`}>
      <span className="p-kpi-label">{label}</span>
      <strong className={`p-kpi-value ${value === DASH ? 'is-missing' : ''}`}>
        {value}
      </strong>
      <span className="p-kpi-hint">{hint}</span>
    </div>
  );
}

const amsterdamDay = (iso: string) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(
    new Date(iso),
  );

function Funnel({
  leads,
  from,
  to,
}: {
  leads: Lead[] | null;
  from: string;
  to: string;
}) {
  const data = useMemo(() => {
    if (!leads) return null;
    const inPeriod = leads.filter((lead) => {
      const day = amsterdamDay(lead.createdAt);
      return day >= from && day <= to;
    });
    const reached = (statuses: Lead['status'][]) =>
      inPeriod.filter((lead) => statuses.includes(lead.status)).length;
    const wonValue = inPeriod.reduce(
      (sum, lead) =>
        sum +
        (lead.status === 'won' && lead.customerValueCents
          ? lead.customerValueCents
          : 0),
      0,
    );
    return {
      total: inPeriod.length,
      lost: reached(['lost']),
      wonValue,
      steps: [
        { label: 'Aanvragen', value: inPeriod.length },
        {
          label: 'Contact gehad',
          value: reached(['contacted', 'qualified', 'meeting', 'won']),
        },
        { label: 'Afspraak', value: reached(['meeting', 'won']) },
        { label: 'Klant', value: reached(['won']) },
      ],
    };
  }, [leads, from, to]);

  return (
    <article className="p-card p-glass">
      <h3 className="p-card-title">Van aanvraag naar klant</h3>
      <p className="p-card-note">
        Aanvragen uit deze periode en hoe ver ze nu zijn.
      </p>
      {!data ? (
        <div className="p-funnel">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="p-funnel-skeleton" />
          ))}
        </div>
      ) : data.total === 0 ? (
        <p className="p-muted p-funnel-empty">
          Nog geen aanvragen in deze periode.
        </p>
      ) : (
        <>
          <ol className="p-funnel">
            {data.steps.map((step, index) => {
              const share = data.total ? step.value / data.total : 0;
              return (
                <li key={step.label} className="p-funnel-step">
                  <div className="p-funnel-label">
                    <span>{step.label}</span>
                    <strong>{count(step.value)}</strong>
                    {index > 0 && <em>{Math.round(share * 100)}%</em>}
                  </div>
                  <div className="p-funnel-track">
                    <div
                      className="p-funnel-bar"
                      style={{
                        width: `${Math.max(share * 100, step.value > 0 ? 3 : 0)}%`,
                        opacity: 1 - index * 0.16,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="p-funnel-foot">
            {data.wonValue > 0 && (
              <>
                <strong>{money(data.wonValue)}</strong> aan afgesproken
                klantwaarde.{' '}
              </>
            )}
            {data.lost > 0 && (
              <>
                {count(data.lost)} {data.lost === 1 ? 'aanvraag' : 'aanvragen'}{' '}
                afgewezen.
              </>
            )}
          </p>
        </>
      )}
    </article>
  );
}
