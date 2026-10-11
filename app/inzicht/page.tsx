import { ChartNoAxesCombined, Inbox, LockKeyhole } from 'lucide-react';
import { Dashboard } from '@/components/dashboard';
import { PageIntro, Button } from '@/components/ui';
export const metadata = {
  title: 'Jouw inzicht | Klantportaal rondleiding',
  description:
    'Bekijk hoe je inzicht krijgt in advertentieresultaten en aanvragen. Interactieve rondleiding met voorbeeldgegevens. Je eigen portaal is op uitnodiging.',
  alternates: { canonical: '/inzicht' },
};
export default function Inzicht() {
  return (
    <>
      <PageIntro
        label="Jouw eigen klantportaal"
        title="Je hoeft niet te gissen."
        italic="Je kijkt gewoon mee."
        description="Van advertentie tot aanvraag. Eén overzicht waarin je ziet wat er gebeurt, wat het kost en waar je volgende gesprek begint."
      />
      <section className="wrap portal-page">
        <div className="portal-demo-intro">
          <span>
            <span className="status-dot" />
            PROBEER HET ZELF
          </span>
          <p>
            Wissel van periode, bekijk een aanvraag of download de
            voorbeeldcijfers.
          </p>
        </div>
        <Dashboard />
        <div className="portal-benefits">
          {[
            [
              ChartNoAxesCombined,
              'Wat levert het op?',
              'Aanvragen, kosten, klikken en vertoningen in begrijpelijke cijfers.',
            ],
            [
              Inbox,
              'Wie wil kennismaken?',
              'Je aanvragen bij elkaar, met de voortgang van eerste contact tot klant.',
            ],
            [
              LockKeyhole,
              'Alleen voor jouw ogen.',
              'Je ontvangt een persoonlijke uitnodiging voor je eigen omgeving.',
            ],
          ].map(([Icon, title, desc]) => {
            const Component = Icon as typeof Inbox;
            return (
              <article key={title as string}>
                <Component size={25} strokeWidth={1.4} />
                <h3>{title as string}</h3>
                <p>{desc as string}</p>
              </article>
            );
          })}
        </div>
        <div className="invite-note">
          <LockKeyhole size={24} />
          <div>
            <h3>Al klant?</h3>
            <p>
              Gebruik de persoonlijke uitnodiging die je hebt ontvangen. Je
              eigen portaal staat los van deze openbare rondleiding. Uitnodiging
              kwijt? Stuur Danny even een bericht.
            </p>
          </div>
          <Button href="/contact" variant="outline">
            Neem contact op
          </Button>
        </div>
      </section>
    </>
  );
}
