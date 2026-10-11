'use client';
import { useId, useMemo, useState } from 'react';
import {
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronRight,
  Inbox,
  Info,
  LockKeyhole,
  Search,
  Settings2,
  X,
} from 'lucide-react';
import {
  demoDays,
  demoLeads,
  euro,
  number,
  shortDate,
  type Metric,
  type Period,
} from '@/lib/demo';
import { BrandMark } from './ui';

export function Dashboard({ compact = false }: { compact?: boolean }) {
  const [period, setPeriod] = useState<Period>(30);
  const [tab, setTab] = useState('Resultaten');
  const [metric, setMetric] = useState<Metric>('aanvragen');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Alle statussen');
  const [selected, setSelected] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [exported, setExported] = useState(false);
  const chartId = useId().replace(/:/g, '');
  const days = useMemo(() => demoDays.slice(-period), [period]);
  const totals = days.reduce(
    (acc, day) => ({
      aanvragen: acc.aanvragen + day.aanvragen,
      klikken: acc.klikken + day.klikken,
      uitgaven: acc.uitgaven + day.uitgaven,
      vertoningen: acc.vertoningen + day.vertoningen,
    }),
    { aanvragen: 0, klikken: 0, uitgaven: 0, vertoningen: 0 },
  );
  const max = Math.max(...days.map((d) => d[metric]), 1);
  const points = days.map((day, index) => ({
    x: 18 + (index / (days.length - 1)) * 764,
    y: 172 - (day[metric] / max) * 135,
  }));
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ');
  const leads = demoLeads.filter(
    (lead) =>
      lead.date >= days[0].date &&
      (filter === 'Alle statussen' || lead.status === filter) &&
      `${lead.name} ${lead.channel}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const selectedLead = demoLeads.find((lead) => lead.id === selected);
  const statCards = [
    ['Aanvragen', number(totals.aanvragen), 'Geïnteresseerde mensen'],
    [
      'Kosten per aanvraag',
      euro(totals.uitgaven / totals.aanvragen),
      'Gemiddeld in deze periode',
    ],
    ['Uitgaven', euro(totals.uitgaven), 'Advertentiebudget'],
    ['Klikken', number(totals.klikken), 'Naar jouw verhaal'],
    ['Vertoningen', number(totals.vertoningen), 'Keer in beeld'],
  ];
  function exportCsv() {
    const csv =
      '\uFEFFVoorbeeldgegevens — geen echte klantresultaten\nDatum;Aanvragen;Klikken;Uitgaven;Vertoningen\n' +
      days
        .map(
          (d) =>
            `${d.date};${d.aanvragen};${d.klikken};${d.uitgaven.toFixed(2).replace('.', ',')};${d.vertoningen}`,
        )
        .join('\n');
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `rossenaar-voorbeeld-${period}-dagen.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true);
  }
  return (
    <div className={`dashboard ${compact ? 'dashboard-compact' : ''}`}>
      <div className="dashboard-header">
        <div className="dashboard-brand">
          <span>
            <BrandMark />
          </span>
          <div>
            Jouw marketing<small>IN ÉÉN OOGOPSLAG</small>
          </div>
        </div>
        <div
          className="dashboard-nav"
          role="group"
          aria-label="Portaalonderdelen"
        >
          {[
            ['Resultaten', BarChart3],
            ['Aanvragen', Inbox],
            ...(!compact ? [['Instellingen', Settings2] as const] : []),
          ].map(([label, Icon]) => (
            <button
              key={label as string}
              aria-pressed={tab === label}
              onClick={() => {
                setTab(label as string);
                setSelected(null);
              }}
              className={tab === label ? 'active' : ''}
            >
              <Icon size={16} />
              <span>{label as string}</span>
            </button>
          ))}
        </div>
        <span className="demo-badge">DEMO</span>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-title">
          <div>
            <span className="dashboard-overline">DIT IS JOUW OVERZICHT</span>
            <h3>
              {tab === 'Resultaten'
                ? 'Kijk, dit gebeurt er.'
                : tab === 'Aanvragen'
                  ? 'Van interesse naar contact.'
                  : 'Alles op jouw manier.'}
            </h3>
            <p>
              {tab === 'Instellingen'
                ? 'In je eigen omgeving beheer je jouw gegevens.'
                : `${shortDate(days[0].date)} – ${shortDate(days[days.length - 1].date)} 2026 · Voorbeeldgegevens`}
            </p>
          </div>
          {tab !== 'Instellingen' && (
            <div className="period-toggle" role="group" aria-label="Periode">
              {([7, 30, 90] as const).map((p) => (
                <button
                  key={p}
                  aria-pressed={p === period}
                  className={p === period ? 'active' : ''}
                  onClick={() => {
                    setPeriod(p);
                    setSelected(null);
                    setActivePoint(null);
                    setExported(false);
                  }}
                >
                  {p} dagen
                </button>
              ))}
            </div>
          )}
        </div>
        {tab === 'Resultaten' && (
          <>
            <div className="stats-grid" aria-live="polite">
              {statCards.map(([label, value, note], i) => (
                <div
                  className={`stat ${i === 0 ? 'stat-primary' : ''}`}
                  key={label}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>
            <div className="chart-card">
              <div className="chart-top">
                <h4>Een beetje meer inzicht.</h4>
                <div
                  role="group"
                  aria-label="Grafiekmeting"
                  className="metric-toggle"
                >
                  {(['aanvragen', 'klikken', 'uitgaven'] as const).map((m) => (
                    <button
                      key={m}
                      aria-pressed={m === metric}
                      className={m === metric ? 'active' : ''}
                      onClick={() => {
                        setMetric(m);
                        setActivePoint(null);
                      }}
                    >
                      {m[0].toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-visual">
                <div className="chart-scale">
                  <span>{metric === 'uitgaven' ? euro(max) : max}</span>
                  <span>
                    {metric === 'uitgaven'
                      ? euro(max / 2)
                      : Math.round(max / 2)}
                  </span>
                  <span>0</span>
                </div>
                <svg
                  viewBox="0 0 800 195"
                  role="img"
                  aria-label={`${metric} per dag. Totaal: ${metric === 'uitgaven' ? euro(totals[metric]) : number(totals[metric])}. Fictieve gegevens.`}
                >
                  <defs>
                    <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b8d78b" stopOpacity=".45" />
                      <stop offset="100%" stopColor="#b8d78b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[37, 104, 172].map((y) => (
                    <line
                      key={y}
                      x1="18"
                      x2="782"
                      y1={y}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity=".09"
                      strokeDasharray="4 5"
                    />
                  ))}
                  <path
                    d={`${path} L782,172 L18,172Z`}
                    fill={`url(#${chartId})`}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="#b5d785"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={activePoint === i ? 5 : 3}
                      fill="#b5d785"
                      opacity={
                        activePoint === null || activePoint === i ? 1 : 0.2
                      }
                      onMouseEnter={() => setActivePoint(i)}
                      onMouseLeave={() => setActivePoint(null)}
                    />
                  ))}
                </svg>
              </div>
              <div className="chart-dates">
                <span>{shortDate(days[0].date)}</span>
                <span>{shortDate(days[Math.floor(days.length / 2)].date)}</span>
                <span>{shortDate(days[days.length - 1].date)}</span>
              </div>
              <p className="chart-readout" aria-live="polite">
                {activePoint !== null
                  ? `${shortDate(days[activePoint].date)}: ${metric === 'uitgaven' ? euro(days[activePoint][metric]) : days[activePoint][metric]} ${metric}`
                  : `Totaal ${metric}: ${metric === 'uitgaven' ? euro(totals[metric]) : number(totals[metric])}`}
              </p>
              {!compact && (
                <details className="chart-data">
                  <summary>Bekijk de cijfers per dag</summary>
                  <div className="table-scroll">
                    <table>
                      <caption>
                        Fictieve dagcijfers voor de geselecteerde periode
                      </caption>
                      <thead>
                        <tr>
                          <th>Datum</th>
                          <th>Aanvragen</th>
                          <th>Klikken</th>
                          <th>Uitgaven</th>
                        </tr>
                      </thead>
                      <tbody>
                        {days.map((d) => (
                          <tr key={d.date}>
                            <td>{shortDate(d.date)}</td>
                            <td>{d.aanvragen}</td>
                            <td>{number(d.klikken)}</td>
                            <td>{euro(d.uitgaven)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              )}
            </div>
            {!compact && (
              <div className="funnel">
                <h4>Van aanvraag naar klant</h4>
                <p>
                  Een voorbeeld van hoe je de voortgang van gesprekken
                  terugziet.
                </p>
                <div>
                  {[
                    ['Nieuw', 'Een eerste bericht'],
                    ['In gesprek', 'Samen de vraag verkennen'],
                    ['Klant', 'Aan de slag'],
                  ].map(([stage, hint]) => (
                    <div key={stage}>
                      <span>
                        {
                          demoLeads.filter(
                            (l) => l.date >= days[0].date && l.status === stage,
                          ).length
                        }
                      </span>
                      <strong>{stage}</strong>
                      <small>{hint}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {tab === 'Aanvragen' && (
          <>
            <div className="leads-toolbar">
              <label>
                <Search size={16} />
                <input
                  aria-label="Zoek in voorbeeldaanvragen"
                  placeholder="Zoek een bedrijf of kanaal"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null);
                  }}
                />
              </label>
              <select
                aria-label="Filter op status"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setSelected(null);
                }}
              >
                {['Alle statussen', 'Nieuw', 'In gesprek', 'Klant'].map(
                  (status) => (
                    <option key={status}>{status}</option>
                  ),
                )}
              </select>
            </div>
            <div className="leads-list">
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  className="lead-row"
                  onClick={() =>
                    setSelected(selected === lead.id ? null : lead.id)
                  }
                  aria-expanded={selected === lead.id}
                >
                  <span className="lead-avatar">
                    {lead.name.replace('Voorbeeldbedrijf ', '')[0]}
                  </span>
                  <span>
                    <strong>{lead.name}</strong>
                    <small>
                      {lead.channel} · {shortDate(lead.date)}
                    </small>
                  </span>
                  <span
                    className={`lead-status status-${lead.status.replace(' ', '-').toLowerCase()}`}
                  >
                    {lead.status}
                  </span>
                  <ChevronRight size={16} />
                </button>
              ))}
              {leads.length === 0 && (
                <p className="empty-state">
                  Geen voorbeeldaanvragen gevonden. Probeer een andere periode
                  of zoekterm.
                </p>
              )}
            </div>
            {selectedLead && (
              <div className="lead-detail">
                <button
                  aria-label="Aanvraag sluiten"
                  onClick={() => setSelected(null)}
                >
                  <X size={18} />
                </button>
                <span className="demo-badge">FICTIEVE AANVRAAG</span>
                <h4>{selectedLead.name}</h4>
                <p>
                  “Ik wil graag kennismaken en bespreken hoe ik beter zichtbaar
                  kan worden.”
                </p>
                <p>
                  In je eigen portaal zie je hier de contactgegevens en de
                  voortgang van de aanvraag.
                </p>
              </div>
            )}
          </>
        )}
        {tab === 'Instellingen' && (
          <div className="portal-settings">
            <LockKeyhole size={28} />
            <h4>Jouw gegevens blijven van jou.</h4>
            <p>
              Het echte klantportaal is alleen toegankelijk op uitnodiging. Deze
              openbare rondleiding bevat uitsluitend fictieve gegevens.
            </p>
            <dl>
              <div>
                <dt>Organisatie</dt>
                <dd>Voorbeeldbedrijf</dd>
              </div>
              <div>
                <dt>Advertentiekoppelingen</dt>
                <dd>Demonstratie</dd>
              </div>
              <div>
                <dt>Toegang</dt>
                <dd>Persoonlijke uitnodiging</dd>
              </div>
            </dl>
          </div>
        )}
        <div className="dashboard-footnote">
          <span>
            <Info size={14} /> Voorbeeldgegevens, geen echte klantresultaten.
          </span>
          {!compact && (
            <button className="export-button" onClick={exportCsv}>
              {exported ? <Check size={14} /> : <ArrowDownToLine size={14} />}{' '}
              {exported ? 'Voorbeeld gedownload' : 'Download voorbeeldcijfers'}
            </button>
          )}
          {compact && (
            <a href="/inzicht">
              Bekijk de rondleiding <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
