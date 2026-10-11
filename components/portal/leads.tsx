// Adapted from Ads-manager- c0739d7; UI retained, data isolated to this public demo.
'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import {
  ApiError,
  portalApi,
  type Lead,
  type LeadNote,
  type LeadStatus,
  type LossReason,
  type NoteKind,
} from './api';
import {
  firstName,
  fullDate,
  initials,
  lossReasonLabels,
  money,
  noteKindLabels,
  readEuroCents,
  relativeTime,
  sourceLabel,
  statusHints,
  statusLabels,
  statusOrder,
} from './format';
import { PIcon, type PortalIconName } from './icons';
import { ErrorState, Skeleton } from './ui';

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function StatusPill({ status }: { status: LeadStatus }) {
  return (
    <span className={`p-pill p-pill-${status}`}>
      {status === 'new' && <span className="p-pill-dot" aria-hidden="true" />}
      {statusLabels[status]}
    </span>
  );
}

/* ------------------------------------------------------------------ List */

export function LeadsList({
  leads,
  error,
  onRetry,
  onOpen,
}: {
  leads: Lead[] | null;
  error: string | null;
  onRetry: () => void;
  onOpen: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(12);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');

  useEffect(() => setShown(12), [query, filter]);

  const sorted = useMemo(
    () =>
      [...(leads ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [leads],
  );
  const counts = useMemo(() => {
    const result = Object.fromEntries(
      statusOrder.map((status) => [status, 0]),
    ) as Record<LeadStatus, number>;
    for (const lead of sorted)
      result[lead.status] = (result[lead.status] ?? 0) + 1;
    return result;
  }, [sorted]);
  const visible = useMemo(() => {
    const needle = normalize(query.trim());
    return sorted.filter(
      (lead) =>
        (filter === 'all' || lead.status === filter) &&
        (!needle ||
          normalize(
            [lead.name, lead.company, lead.email, lead.phone, lead.wishes]
              .filter(Boolean)
              .join(' '),
          ).includes(needle)),
    );
  }, [sorted, filter, query]);

  const newCount = counts.new;

  return (
    <section className="p-section" aria-labelledby="p-leads-title">
      <header className="p-section-head">
        <div>
          <h2 id="p-leads-title" className="p-title">
            Aanvragen
          </h2>
          <p className="p-subtitle">
            {leads === null ? (
              'Even laden…'
            ) : leads.length === 0 ? (
              'Hier verschijnen mensen die via je advertenties contact zoeken.'
            ) : newCount > 0 ? (
              <>
                <strong>
                  {newCount}{' '}
                  {newCount === 1
                    ? 'nieuwe aanvraag wacht'
                    : 'nieuwe aanvragen wachten'}
                </strong>{' '}
                op een reactie.
              </>
            ) : (
              'Alles is opgepakt. Mooi zo.'
            )}
          </p>
        </div>
      </header>

      {leads !== null && leads.length > 0 && (
        <div className="p-toolbar">
          <label className="p-search">
            <PIcon name="search" size={18} />
            <span className="p-visually-hidden">Zoeken in aanvragen</span>
            <input
              type="search"
              placeholder="Zoek op naam, bedrijf of wens"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              enterKeyHint="search"
            />
            {query && (
              <button
                type="button"
                className="p-search-clear"
                onClick={() => setQuery('')}
                aria-label="Zoekopdracht wissen"
              >
                <PIcon name="close" size={16} />
              </button>
            )}
          </label>
          <div className="p-chips" role="group" aria-label="Filter op status">
            <button
              type="button"
              className={`p-chip ${filter === 'all' ? 'is-active' : ''}`}
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              Alle <span className="p-chip-count">{sorted.length}</span>
            </button>
            {statusOrder.map((status) => (
              <button
                key={status}
                type="button"
                className={`p-chip ${filter === status ? 'is-active' : ''}`}
                aria-pressed={filter === status}
                onClick={() => setFilter(filter === status ? 'all' : status)}
              >
                {statusLabels[status]}{' '}
                <span className="p-chip-count">{counts[status]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && leads === null ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : leads === null ? (
        <div className="p-lead-list" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="p-lead-skeleton" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="p-empty p-glass">
          <span className="p-empty-icon">
            <PIcon name="inbox" size={26} />
          </span>
          <h3>Nog geen aanvragen</h3>
          <p>
            Zodra er iemand reageert op een advertentie verschijnt die hier.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="p-empty p-glass p-empty-small">
          <h3>Niets gevonden</h3>
          <p>
            Geen aanvragen die passen bij{' '}
            {query ? <>“{query}”</> : 'dit filter'}
            {query && filter !== 'all' ? (
              <> met status {statusLabels[filter].toLowerCase()}</>
            ) : null}
            .
          </p>
          <button
            type="button"
            className="p-btn p-btn-ghost"
            onClick={() => {
              setQuery('');
              setFilter('all');
            }}
          >
            Alles tonen
          </button>
        </div>
      ) : (
        <>
          <ul className="p-lead-list" aria-label="Aanvragen">
            {visible.slice(0, shown).map((lead) => (
              <li key={lead.id}>
                <a
                  href={`#aanvragen:${lead.id}`}
                  className={`p-lead-card p-glass ${lead.status === 'new' ? 'is-new' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onOpen(lead.id);
                  }}
                >
                  <span className="p-avatar" aria-hidden="true">
                    {initials(lead.name)}
                  </span>
                  <span className="p-lead-main">
                    <span className="p-lead-top">
                      <span className="p-lead-name">{lead.name}</span>
                      <time
                        className="p-lead-date"
                        dateTime={lead.createdAt}
                        title={fullDate(lead.createdAt)}
                      >
                        {relativeTime(lead.createdAt, undefined, true)}
                      </time>
                    </span>
                    {lead.company && (
                      <span className="p-lead-company">{lead.company}</span>
                    )}
                    {lead.wishes && (
                      <span className="p-lead-wishes">{lead.wishes}</span>
                    )}
                    <span className="p-lead-meta">
                      <StatusPill status={lead.status} />
                      {lead.budgetCents !== null && (
                        <span className="p-lead-budget">
                          {money(lead.budgetCents)}
                        </span>
                      )}
                    </span>
                  </span>
                  <PIcon name="chevron" size={18} className="p-lead-chevron" />
                </a>
              </li>
            ))}
          </ul>
          {visible.length > shown && (
            <button
              type="button"
              className="p-btn p-btn-secondary p-btn-block"
              onClick={() => setShown(shown + 12)}
            >
              Meer aanvragen tonen ({Math.min(shown, visible.length)} van{' '}
              {visible.length})
            </button>
          )}
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- Detail */

type ContactKind = Exclude<NoteKind, 'note'>;
const contactPrompt: Record<ContactKind, (name: string) => string> = {
  call: (name) => `Heb je ${name} gesproken?`,
  email: (name) => `E-mail naar ${name} verstuurd?`,
  whatsapp: (name) => `WhatsApp naar ${name} verstuurd?`,
};
const noteIcons: Record<NoteKind, PortalIconName> = {
  note: 'note',
  call: 'phone',
  email: 'mail',
  whatsapp: 'whatsapp',
};

export function LeadDetail({
  id,
  initial,
  clientName,
  userName,
  agencyName,
  onBack,
  onChanged,
}: {
  id: string;
  initial: Lead | null;
  clientName: string;
  userName: string;
  agencyName: string;
  onBack: () => void;
  onChanged: (lead: Lead) => void;
}) {
  const [lead, setLead] = useState<Lead | null>(initial);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [notes, setNotes] = useState<LeadNote[] | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [pending, setPending] = useState<ContactKind | null>(null);
  const [contactText, setContactText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    tone: 'ok' | 'error';
    text: string;
  } | null>(null);
  const [outcome, setOutcome] = useState<'won' | 'lost' | null>(null);
  const [value, setValue] = useState('');
  const [reason, setReason] = useState<LossReason | null>(null);

  const update = useCallback(
    (next: Lead) => {
      setLead(next);
      onChanged(next);
    },
    [onChanged],
  );

  const loadLead = useCallback(async () => {
    setLoadError(null);
    try {
      const { lead: fresh } = await portalApi.lead(id);
      update(fresh);
      return fresh;
    } catch (reason) {
      setLoadError(
        reason instanceof ApiError && reason.status === 404
          ? 'Deze aanvraag bestaat niet (meer).'
          : reason instanceof Error
            ? reason.message
            : 'Laden mislukt.',
      );
      return null;
    }
  }, [id, update]);
  const loadNotes = useCallback(async () => {
    setNotesError(null);
    try {
      const { notes: list } = await portalApi.notes(id);
      setNotes(list);
    } catch (reason) {
      setNotesError(
        reason instanceof Error ? reason.message : 'Notities laden mislukt.',
      );
    }
  }, [id]);

  useEffect(() => {
    void loadLead();
    void loadNotes();
  }, [loadLead, loadNotes]);
  useEffect(() => {
    if (!message || message.tone !== 'ok') return;
    const timer = window.setTimeout(() => setMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [message]);

  if (!lead) {
    return (
      <section className="p-section">
        <button type="button" className="p-back" onClick={onBack}>
          <PIcon name="back" size={18} /> Alle aanvragen
        </button>
        {loadError ? (
          <ErrorState message={loadError} onRetry={() => void loadLead()} />
        ) : (
          <div className="p-detail-skeleton">
            <Skeleton className="p-sk-title" />
            <Skeleton className="p-sk-block" />
            <Skeleton className="p-sk-block" />
          </div>
        )}
      </section>
    );
  }

  const first = firstName(lead.name);
  async function logContact(kind: ContactKind) {
    const body = contactText.trim() || noteKindLabels[kind];
    setBusy('contact');
    try {
      const { note } = await portalApi.addNote(id, body, kind);
      setNotes((list) => [note, ...(list ?? [])]);
      setPending(null);
      setContactText('');
      setMessage({ tone: 'ok', text: 'Contactmoment vastgelegd.' });
      void loadLead(); // A logged contact moves "Nieuw" to "Contact gehad" on the server.
    } catch (reason) {
      setMessage({
        tone: 'error',
        text: reason instanceof Error ? reason.message : 'Vastleggen mislukt.',
      });
    } finally {
      setBusy(null);
    }
  }

  async function addNote(event: FormEvent) {
    event.preventDefault();
    const body = noteText.trim();
    if (!body) return;
    setBusy('note');
    try {
      const { note } = await portalApi.addNote(id, body, 'note');
      setNotes((list) => [note, ...(list ?? [])]);
      setNoteText('');
    } catch (reason) {
      setMessage({
        tone: 'error',
        text: reason instanceof Error ? reason.message : 'Opslaan mislukt.',
      });
    } finally {
      setBusy(null);
    }
  }

  async function changeStatus(status: LeadStatus) {
    if (!lead || busy) return;
    if (status === 'won' || status === 'lost') {
      setOutcome(outcome === status ? null : status);
      setValue(
        lead.customerValueCents !== null
          ? (lead.customerValueCents / 100)
              .toFixed(2)
              .replace('.', ',')
              .replace(/,00$/, '')
          : '',
      );
      setReason(lead.lossReason);
      return;
    }
    if (status === lead.status) return;
    setOutcome(null);
    setBusy(`status:${status}`);
    try {
      const { lead: next } = await portalApi.setStatus(lead.id, status);
      update(next);
      setMessage({ tone: 'ok', text: `Status: ${statusLabels[status]}.` });
    } catch (reason) {
      setMessage({
        tone: 'error',
        text:
          reason instanceof Error ? reason.message : 'Status wijzigen mislukt.',
      });
    } finally {
      setBusy(null);
    }
  }

  async function saveOutcome(event: FormEvent) {
    event.preventDefault();
    if (!lead || !outcome) return;
    const cents = outcome === 'won' ? readEuroCents(value) : null;
    if (outcome === 'won' && value.trim() && cents === null) {
      setMessage({
        tone: 'error',
        text: 'Vul een bedrag in, bijvoorbeeld 1.250 of 1250,50.',
      });
      return;
    }
    setBusy('outcome');
    try {
      const { lead: next } = await portalApi.setOutcome(lead, outcome, {
        customerValueCents: cents,
        lossReason: reason,
      });
      update(next);
      setOutcome(null);
      setMessage({
        tone: 'ok',
        text:
          outcome === 'won'
            ? 'Gefeliciteerd met je nieuwe klant!'
            : 'Vastgelegd als afgewezen.',
      });
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 409) {
        await loadLead();
        setMessage({
          tone: 'error',
          text: 'Deze aanvraag is intussen gewijzigd. We hebben de nieuwste versie geladen; probeer het nog eens.',
        });
      } else
        setMessage({
          tone: 'error',
          text: reason instanceof Error ? reason.message : 'Opslaan mislukt.',
        });
    } finally {
      setBusy(null);
    }
  }

  const source = sourceLabel(lead.utmSource);
  const hasUtm = !!(
    lead.utmSource ||
    lead.utmMedium ||
    lead.utmCampaign ||
    lead.utmContent
  );

  return (
    <section className="p-section p-detail" aria-labelledby="p-lead-name">
      <button type="button" className="p-back" onClick={onBack}>
        <PIcon name="back" size={18} /> Alle aanvragen
      </button>

      <header className="p-detail-head">
        <span className="p-avatar p-avatar-lg" aria-hidden="true">
          {initials(lead.name)}
        </span>
        <div className="p-detail-heading">
          <h2 id="p-lead-name" className="p-title">
            {lead.name}
          </h2>
          <p className="p-subtitle">
            {lead.company ? <>{lead.company} · </> : null}
            <time dateTime={lead.createdAt} title={fullDate(lead.createdAt)}>
              {relativeTime(lead.createdAt)}
            </time>
          </p>
        </div>
        <StatusPill status={lead.status} />
      </header>

      <p className="p-notice p-notice-quiet">
        Dit is een oefenaanvraag. Contactknoppen laten zien hoe je een
        contactmoment vastlegt; er wordt niets verstuurd.
      </p>
      <div className="p-actions">
        {(
          [
            ['call', 'phone', 'Bellen'],
            ['email', 'mail', 'E-mailen'],
            ['whatsapp', 'whatsapp', 'WhatsApp'],
          ] as const
        ).map(([kind, icon, label]) => (
          <button
            type="button"
            className="p-action"
            key={kind}
            onClick={() => {
              setPending(kind);
              setContactText('');
            }}
          >
            <span className="p-action-icon">
              <PIcon name={icon} size={22} />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      {pending && (
        <form
          className="p-log p-glass"
          onSubmit={(event) => {
            event.preventDefault();
            void logContact(pending);
          }}
          aria-label="Contactmoment vastleggen"
        >
          <div className="p-log-head">
            <span className="p-log-icon">
              <PIcon name={noteIcons[pending]} size={18} />
            </span>
            <div>
              <strong>{contactPrompt[pending](first)}</strong>
              <p>
                Leg het vast, dan weet iedereen dat deze aanvraag is opgepakt.
              </p>
            </div>
          </div>
          <textarea
            className="p-input p-textarea"
            rows={2}
            placeholder="Korte notitie, bijvoorbeeld: terugbellen dinsdag (optioneel)"
            value={contactText}
            onChange={(event) => setContactText(event.target.value)}
            maxLength={4000}
          />
          <div className="p-log-actions">
            <button
              type="button"
              className="p-btn p-btn-ghost"
              onClick={() => setPending(null)}
            >
              Niet nu
            </button>
            <button
              type="submit"
              className="p-btn p-btn-primary"
              disabled={busy === 'contact'}
            >
              <PIcon name="check" size={18} /> Vastleggen
            </button>
          </div>
        </form>
      )}

      {message && (
        <div
          className={`p-toast ${message.tone === 'error' ? 'is-error' : ''}`}
          role={message.tone === 'error' ? 'alert' : 'status'}
        >
          {message.tone === 'ok' ? (
            <PIcon name="check" size={18} />
          ) : (
            <PIcon name="alert" size={18} />
          )}
          <span>{message.text}</span>
          {message.tone === 'error' && (
            <button
              type="button"
              className="p-toast-close"
              onClick={() => setMessage(null)}
              aria-label="Sluiten"
            >
              <PIcon name="close" size={16} />
            </button>
          )}
        </div>
      )}

      <div className="p-detail-grid">
        <div className="p-detail-col">
          <article className="p-card p-glass">
            <h3 className="p-card-title">Wensen</h3>
            <p className="p-wishes">
              {lead.wishes || (
                <span className="p-muted">Geen toelichting meegestuurd.</span>
              )}
            </p>
            <dl className="p-facts">
              <div>
                <dt>Budget</dt>
                <dd>
                  {lead.budgetCents !== null ? (
                    money(lead.budgetCents)
                  ) : (
                    <span className="p-muted">Niet opgegeven</span>
                  )}
                </dd>
              </div>
              <div>
                <dt>Binnengekomen</dt>
                <dd>{fullDate(lead.createdAt)}</dd>
              </div>
            </dl>
          </article>

          <article className="p-card p-glass">
            <h3 className="p-card-title">Contactgegevens</h3>
            <dl className="p-facts p-facts-contact">
              <div>
                <dt>E-mail</dt>
                <dd>
                  <span>{lead.email}</span>
                </dd>
              </div>
              <div>
                <dt>Telefoon</dt>
                <dd>
                  {lead.phone ? (
                    <span>{lead.phone}</span>
                  ) : (
                    <span className="p-muted">Niet opgegeven</span>
                  )}
                </dd>
              </div>
              {lead.company && (
                <div>
                  <dt>Bedrijf</dt>
                  <dd>{lead.company}</dd>
                </div>
              )}
            </dl>
          </article>

          <article className="p-card p-glass">
            <h3 className="p-card-title">Hoe kwam deze aanvraag binnen?</h3>
            <dl className="p-facts">
              <div>
                <dt>Kanaal</dt>
                <dd>
                  {source ?? (
                    <span className="p-muted">Onbekend of direct</span>
                  )}
                </dd>
              </div>
              {lead.adName && (
                <div>
                  <dt>Advertentie</dt>
                  <dd>{lead.adName}</dd>
                </div>
              )}
              {lead.pageName && (
                <div>
                  <dt>Pagina</dt>
                  <dd>{lead.pageName}</dd>
                </div>
              )}
            </dl>
            {hasUtm && (
              <details className="p-details">
                <summary>Technische details</summary>
                <dl className="p-facts p-facts-mono">
                  {lead.utmSource && (
                    <div>
                      <dt>utm_source</dt>
                      <dd>{lead.utmSource}</dd>
                    </div>
                  )}
                  {lead.utmMedium && (
                    <div>
                      <dt>utm_medium</dt>
                      <dd>{lead.utmMedium}</dd>
                    </div>
                  )}
                  {lead.utmCampaign && (
                    <div>
                      <dt>utm_campaign</dt>
                      <dd>{lead.utmCampaign}</dd>
                    </div>
                  )}
                  {lead.utmContent && (
                    <div>
                      <dt>utm_content</dt>
                      <dd>{lead.utmContent}</dd>
                    </div>
                  )}
                </dl>
              </details>
            )}
          </article>
        </div>

        <div className="p-detail-col">
          <article className="p-card p-glass">
            <h3 className="p-card-title">Status</h3>
            <p className="p-card-note">
              {statusHints[lead.status]}
              {lead.status === 'won' && lead.customerValueCents !== null ? (
                <>
                  {' '}
                  · afgesproken waarde{' '}
                  <strong>{money(lead.customerValueCents)}</strong>
                </>
              ) : null}
              {lead.status === 'lost' && lead.lossReason ? (
                <> · {lossReasonLabels[lead.lossReason].toLowerCase()}</>
              ) : null}
            </p>
            <div
              className="p-status-grid"
              role="group"
              aria-label="Status wijzigen"
            >
              {statusOrder.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`p-status-option p-status-${status} ${lead.status === status ? 'is-current' : ''} ${outcome === status ? 'is-open' : ''}`}
                  aria-pressed={lead.status === status}
                  disabled={busy !== null && busy !== `status:${status}`}
                  onClick={() => void changeStatus(status)}
                >
                  <span className="p-status-dot" aria-hidden="true" />
                  {statusLabels[status]}
                  {busy === `status:${status}` && (
                    <span
                      className="p-spinner p-spinner-sm"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            {outcome === 'won' && (
              <form className="p-outcome" onSubmit={saveOutcome}>
                <label className="p-label" htmlFor="p-value">
                  Afgesproken waarde (excl. btw, optioneel)
                </label>
                <div className="p-money-input">
                  <span aria-hidden="true">€</span>
                  <input
                    id="p-value"
                    className="p-input"
                    inputMode="decimal"
                    placeholder="Bijvoorbeeld 2.500"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                  />
                </div>
                <p className="p-hint">
                  Zo zie je later wat je advertenties echt hebben opgeleverd.
                </p>
                <div className="p-log-actions">
                  <button
                    type="button"
                    className="p-btn p-btn-ghost"
                    onClick={() => setOutcome(null)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="p-btn p-btn-primary"
                    disabled={busy === 'outcome'}
                  >
                    <PIcon name="check" size={18} /> Klant geworden
                  </button>
                </div>
              </form>
            )}
            {outcome === 'lost' && (
              <form className="p-outcome" onSubmit={saveOutcome}>
                <p className="p-label" id="p-reason-label">
                  Waarom ging het niet door? (optioneel)
                </p>
                <div
                  className="p-reasons"
                  role="radiogroup"
                  aria-labelledby="p-reason-label"
                >
                  {(Object.keys(lossReasonLabels) as LossReason[]).map(
                    (key) => (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={reason === key}
                        className={`p-chip ${reason === key ? 'is-active' : ''}`}
                        onClick={() => setReason(reason === key ? null : key)}
                      >
                        {lossReasonLabels[key]}
                      </button>
                    ),
                  )}
                </div>
                <div className="p-log-actions">
                  <button
                    type="button"
                    className="p-btn p-btn-ghost"
                    onClick={() => setOutcome(null)}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="p-btn p-btn-primary"
                    disabled={busy === 'outcome'}
                  >
                    Afwijzen
                  </button>
                </div>
              </form>
            )}
          </article>

          <article className="p-card p-glass">
            <h3 className="p-card-title">Notities en contact</h3>
            <form className="p-note-form" onSubmit={addNote}>
              <label className="p-visually-hidden" htmlFor="p-note">
                Notitie toevoegen
              </label>
              <textarea
                id="p-note"
                className="p-input p-textarea"
                rows={2}
                placeholder="Notitie toevoegen…"
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                maxLength={4000}
              />
              <button
                type="submit"
                className="p-btn p-btn-secondary"
                disabled={!noteText.trim() || busy === 'note'}
              >
                Opslaan
              </button>
            </form>
            {notesError ? (
              <ErrorState
                compact
                message={notesError}
                onRetry={() => void loadNotes()}
              />
            ) : notes === null ? (
              <div className="p-timeline">
                {[0, 1].map((i) => (
                  <Skeleton key={i} className="p-note-skeleton" />
                ))}
              </div>
            ) : notes.length === 0 ? (
              <p className="p-muted p-notes-empty">
                Nog geen notities. Belt of mailt je {first}? Leg het hier vast.
              </p>
            ) : (
              <ol className="p-timeline">
                {notes.map((note) => (
                  <li key={note.id} className={`p-note p-note-${note.kind}`}>
                    <span className="p-note-icon" aria-hidden="true">
                      <PIcon name={noteIcons[note.kind]} size={16} />
                    </span>
                    <div className="p-note-body">
                      <div className="p-note-meta">
                        <strong>
                          {note.authorName ||
                            (note.authorType === 'agency'
                              ? agencyName || 'Bureau'
                              : 'Klant')}
                        </strong>
                        {note.authorType === 'agency' && (
                          <span className="p-tag">Bureau</span>
                        )}
                      </div>
                      <span className="p-note-when">
                        {note.kind === 'note'
                          ? 'Notitie'
                          : noteKindLabels[note.kind]}{' '}
                        ·{' '}
                        <time
                          dateTime={note.createdAt}
                          title={fullDate(note.createdAt)}
                        >
                          {relativeTime(note.createdAt)}
                        </time>
                      </span>
                      <p>{note.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
