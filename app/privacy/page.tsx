import { pageGraph, pageMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { contact } from '@/lib/content';
const pageTitle = 'Privacy en gegevensverwerking';
const description =
  'Lees hoe Rossenaar Marketing omgaat met het contactformulier, de portaalrondleiding en je weergavevoorkeur. Vragen? Neem contact op met Danny.';
const crumbs = [{ name: 'Privacy', path: '/privacy' }];
export const metadata = {
  ...pageMetadata('/privacy', pageTitle, description),
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <>
      <StructuredData
        nodes={pageGraph('/privacy', pageTitle, description, { crumbs })}
      />
      <Breadcrumbs items={crumbs} />
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
          De website gebruikt Resend voor de bezorging van formulierberichten.
          Je naam, e-mailadres en bericht worden daarvoor aan deze e-maildienst
          doorgegeven. Je bericht wordt niet in een database van deze website
          opgeslagen. De ontvangen e-mail staat in de mailbox van Rossenaar
          Marketing.
        </p>
        <h2>De portaalrondleiding</h2>
        <p>
          De openbare rondleiding bevat fictieve gegevens. De filters en
          selecties werken alleen in je browser. Je bekijkt geen echte
          klantgegevens en er wordt geen klantaccount aangemaakt. Het echte
          klantportaal is een aparte omgeving, alleen toegankelijk op
          uitnodiging.
        </p>
        <h2>Je weergavevoorkeur</h2>
        <p>
          Je keuze voor licht, donker of automatisch wordt lokaal in je browser
          bewaard. Die instelling geldt voor de website en de portaalrondleiding
          en wordt niet naar een server verstuurd.
        </p>
        <h2>Cookies en externe inhoud</h2>
        <p>
          Deze website plaatst geen advertentiecookies. Alleen als je daar
          toestemming voor geeft, gebruik ik Google Analytics om te meten hoe de
          website wordt gebruikt, zoals welke pagina’s worden bekeken. Google
          plaatst daarvoor analysecookies en IP-adressen worden ingekort. Geef
          je geen toestemming, dan wordt Google Analytics niet geladen. Je kunt
          je keuze altijd aanpassen via ‘Cookies’ onderaan de website.
          Lettertypen en afbeeldingen worden vanuit de website geladen. De
          hostingprovider kan technische toegangsgegevens verwerken om de
          website te laten functioneren. Als je een externe link volgt, gelden
          de instellingen van die andere website.
        </p>
        <p>
          De video’s in de galerij, inclusief de Chikado-reels, worden vanuit
          deze website afgespeeld. Er wordt daarvoor geen Instagram-speler
          geladen. De link ‘Bekijk op Instagram’ opent het oorspronkelijke
          bericht op Instagram.
        </p>
        <h2>Een vraag of verzoek?</h2>
        <p>
          Wil je weten welke contactgegevens Danny van je heeft, gegevens laten
          aanpassen of een ontvangen bericht laten verwijderen? Mail naar{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </article>
    </>
  );
}
