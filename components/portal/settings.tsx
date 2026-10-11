'use client';
import { PIcon, type PortalIconName } from './icons';
export type PortalThemeChoice = 'system' | 'light' | 'dark';
const choices: {
  value: PortalThemeChoice;
  label: string;
  icon: PortalIconName;
}[] = [
  { value: 'light', label: 'Licht', icon: 'sun' },
  { value: 'dark', label: 'Donker', icon: 'moon' },
  { value: 'system', label: 'Automatisch', icon: 'monitor' },
];
export function Settings({
  theme,
  onTheme,
  onReset,
  notify,
  setNotify,
}: {
  theme: PortalThemeChoice;
  onTheme: (theme: PortalThemeChoice) => void;
  onReset: () => void;
  notify: boolean;
  setNotify: (value: boolean) => void;
}) {
  return (
    <section className="p-section" aria-labelledby="p-settings-title">
      <header className="p-section-head">
        <h2 className="p-title" id="p-settings-title">
          Instellingen
        </h2>
        <p className="p-subtitle">Jouw portaal, zoals jij het prettig vindt.</p>
      </header>
      <div className="p-settings">
        <article className="p-card p-glass">
          <div className="p-setting-row">
            <span className="p-setting-icon">
              <PIcon name="bell" />
            </span>
            <div className="p-setting-text">
              <h3 id="p-notify-label">E-mail bij een nieuwe aanvraag</h3>
              <p>
                {notify
                  ? 'Je krijgt direct een e-mail zodra iemand reageert.'
                  : 'Nieuwe aanvragen bekijk je in het portaal.'}
              </p>
              <p className="p-hint">
                Alleen een voorbeeldinstelling; er worden geen e-mails
                verstuurd.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              aria-labelledby="p-notify-label"
              className={`p-switch ${notify ? 'is-on' : ''}`}
              onClick={() => setNotify(!notify)}
            >
              <span className="p-switch-thumb" />
              <span className="p-visually-hidden">
                {notify ? 'Aan' : 'Uit'}
              </span>
            </button>
          </div>
        </article>
        <article className="p-card p-glass">
          <div className="p-setting-row p-setting-stack">
            <span className="p-setting-icon">
              <PIcon name="monitor" />
            </span>
            <div className="p-setting-text">
              <h3 id="p-theme-label">Weergave</h3>
              <p>Geldt voor de website én het klantportaal.</p>
            </div>
          </div>
          <div
            className="p-segment p-segment-full"
            role="group"
            aria-labelledby="p-theme-label"
          >
            {choices.map((choice) => (
              <button
                type="button"
                key={choice.value}
                aria-pressed={theme === choice.value}
                className={theme === choice.value ? 'is-active' : ''}
                onClick={() => onTheme(choice.value)}
              >
                <PIcon name={choice.icon} size={17} />
                {choice.label}
              </button>
            ))}
          </div>
        </article>
        <article className="p-card p-glass">
          <dl className="p-facts">
            <div>
              <dt>Bedrijf</dt>
              <dd>Voorbeeldbedrijf</dd>
            </div>
            <div>
              <dt>Beheerd door</dt>
              <dd>Rossenaar Marketing</dd>
            </div>
            <div>
              <dt>Toegang tot je eigen portaal</dt>
              <dd>Via je persoonlijke uitnodiging</dd>
            </div>
          </dl>
        </article>
        <button
          type="button"
          className="p-btn p-btn-secondary p-btn-block"
          onClick={onReset}
        >
          <PIcon name="refresh" size={18} />
          Voorbeeld opnieuw beginnen
        </button>
      </div>
    </section>
  );
}
