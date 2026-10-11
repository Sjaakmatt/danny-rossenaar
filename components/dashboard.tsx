'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { portalApi, type Lead } from './portal/api';
import { LeadsList, LeadDetail } from './portal/leads';
import { Results } from './portal/results';
import { PIcon, type PortalIconName } from './portal/icons';
import { Settings } from './portal/settings';
import { useSiteTheme } from './theme-toggle';

type Tab = 'aanvragen' | 'resultaten' | 'instellingen';
const tabs: { id: Tab; label: string; icon: PortalIconName }[] = [
  { id: 'aanvragen', label: 'Aanvragen', icon: 'inbox' },
  { id: 'resultaten', label: 'Resultaten', icon: 'chart' },
  { id: 'instellingen', label: 'Instellingen', icon: 'settings' },
];

export function Dashboard({ compact = false }: { compact?: boolean }) {
  const [tab, setTab] = useState<Tab>('resultaten');
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [notify, setNotify] = useState(true);
  const [opened, setOpened] = useState<string | null>(null);
  const { theme, choice, setChoice } = useSiteTheme();
  const body = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const load = useCallback(
    async () => setLeads((await portalApi.leads()).leads),
    [],
  );
  useEffect(() => {
    void load();
  }, [load]);
  const onChanged = useCallback(
    (next: Lead) =>
      setLeads(
        (list) =>
          list?.map((lead) => (lead.id === next.id ? next : lead)) ?? null,
      ),
    [],
  );
  const startPanel = () => {
    body.current?.scrollTo({ top: 0 });
    requestAnimationFrame(() => {
      if (!compact)
        heading.current?.scrollIntoView({
          block: 'start',
          behavior: 'instant',
        });
      heading.current?.focus({ preventScroll: true });
    });
  };
  const navigate = (next: Tab) => {
    setTab(next);
    setOpened(null);
    startPanel();
  };
  const showLead = (id: string | null) => {
    setOpened(id);
    startPanel();
  };
  const newCount = leads?.filter((lead) => lead.status === 'new').length ?? 0;
  const navigation = (mobile: boolean) =>
    tabs.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`${mobile ? 'p-tab' : 'p-topnav-item'} ${tab === item.id ? 'is-active' : ''}`}
        aria-pressed={tab === item.id}
        onClick={() => navigate(item.id)}
      >
        <span className={mobile ? 'p-tab-icon' : undefined}>
          <PIcon name={item.icon} size={mobile ? 22 : 18} />
          {item.id === 'aanvragen' && newCount > 0 && (
            <span
              className={`p-badge ${mobile ? 'p-badge-dot' : ''}`}
              aria-label={`${newCount} nieuw`}
            >
              {newCount}
            </span>
          )}
        </span>
        <span className={mobile ? 'p-tab-label' : undefined}>{item.label}</span>
      </button>
    ));
  return (
    <div
      className={`portal portal-preview ${compact ? 'portal-preview-compact' : ''}`}
      data-theme={theme}
      data-nosnippet
    >
      <header className="p-header">
        <div className="p-header-inner">
          <button
            type="button"
            className="p-brand"
            onClick={() => navigate('aanvragen')}
          >
            <span className="p-monogram" aria-hidden="true">
              VB
            </span>
            <span className="p-brand-text">
              <span className="p-brand-name">Voorbeeldbedrijf</span>
              <span className="p-brand-sub">Klantportaal</span>
            </span>
          </button>
          <nav className="p-topnav" aria-label="Klantportaal">
            {navigation(false)}
          </nav>
        </div>
      </header>
      <div className="p-demo-banner">
        Rondleiding · fictieve gegevens · 11 oktober 2026
      </div>
      <div className="p-preview-scroll" ref={body}>
        <div className="p-main" ref={heading} tabIndex={-1}>
          {tab === 'resultaten' && <Results leads={leads} />}
          {tab === 'aanvragen' &&
            (opened ? (
              <LeadDetail
                key={opened}
                id={opened}
                initial={leads?.find((lead) => lead.id === opened) ?? null}
                clientName="Voorbeeldbedrijf"
                userName="Jij"
                agencyName="Rossenaar Marketing"
                onBack={() => showLead(null)}
                onChanged={onChanged}
              />
            ) : (
              <LeadsList
                leads={leads}
                error={null}
                onRetry={load}
                onOpen={showLead}
              />
            ))}
          {tab === 'instellingen' && (
            <Settings
              notify={notify}
              setNotify={setNotify}
              theme={choice}
              onTheme={setChoice}
              onReset={async () => {
                setLeads((await portalApi.reset()).leads);
                setNotify(true);
                navigate('resultaten');
              }}
            />
          )}
          <p className="p-demo-foot">
            Je probeert een voorbeeld uit. Wijzigingen blijven alleen in deze
            browsersessie. Je eigen portaal ontvang je op uitnodiging.
          </p>
        </div>
      </div>
      <nav className="p-tabbar" aria-label="Klantportaal mobiel">
        {navigation(true)}
      </nav>
    </div>
  );
}
