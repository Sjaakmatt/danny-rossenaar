import { contact } from '@/lib/content';
export const metadata = {
  title: 'Privacy-informatie',
  alternates: { canonical: '/privacy' },
};
export default function Privacy() {
  return (
    <article className="wrap prose">
      <h1>
        Jouw <em>gegevens.</em>
      </h1>
      <p>
        Deze informatie gaat over het gebruik van de website van Rossenaar
        Marketing en het contactformulier.
      </p>
      <h2>Als je contact opneemt</h2>
      <p>
        Het formulier vraagt je naam, e-mailadres en bericht. Je kunt ook je
        bedrijfsnaam en het onderwerp van je vraag invullen. Deze gegevens
        worden per e-mail naar Danny Rossenaar gestuurd om je vraag te
        beantwoorden en contact over je aanvraag te hebben.
      </p>
      <h2>Hoe het bericht wordt verstuurd</h2>
      <p>
        De website gebruikt Resend voor de bezorging van formulierberichten. Je
        naam, e-mailadres en bericht worden daarvoor aan deze e-maildienst
        doorgegeven. Je bericht wordt niet in een database van deze website
        opgeslagen. De ontvangen e-mail staat in de mailbox van Rossenaar
        Marketing.
      </p>
      <h2>De portaalrondleiding</h2>
      <p>
        De openbare rondleiding bevat fictieve gegevens. De filters en selecties
        werken alleen in je browser. Je bekijkt geen echte klantgegevens en er
        wordt geen klantaccount aangemaakt. Het echte klantportaal is een aparte
        omgeving, alleen toegankelijk op uitnodiging.
      </p>
      <h2>Je weergavevoorkeur</h2>
      <p>
        Je keuze voor licht, donker of automatisch wordt lokaal in je browser
        bewaard. Die instelling geldt voor de website en de portaalrondleiding
        en wordt niet naar een server verstuurd.
      </p>
      <h2>Cookies en externe inhoud</h2>
      <p>
        Deze website plaatst zelf geen advertentie- of analysecookies.
        Lettertypen en afbeeldingen worden vanuit de website geladen. De
        hostingprovider kan technische toegangsgegevens verwerken om de website
        te laten functioneren. Als je een externe link volgt, gelden de
        instellingen van die andere website.
      </p>
      <p>
        De Chikado-video’s via Instagram worden pas geladen wanneer je een van
        die spelers opent. Dan maakt je browser verbinding met Instagram en kan
        Instagram gegevens en cookies verwerken volgens zijn eigen instellingen.
        Bij het sluiten wordt de speler verwijderd.
      </p>
      <h2>Een vraag of verzoek?</h2>
      <p>
        Wil je weten welke contactgegevens Danny van je heeft, gegevens laten
        aanpassen of een ontvangen bericht laten verwijderen? Mail naar{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </article>
  );
}
