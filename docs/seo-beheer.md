# SEO beheren en zoekmachines koppelen

## Bestanden

- `lib/seo.ts`: canoniek domein, metadata, organisatie/persoon en case-zoekinformatie.
- `lib/service-pages.ts`: inhoud van de vier dienstpagina’s; vragen en antwoorden worden direct zichtbaar gerenderd.
- `components/structured-data.tsx`: veilige JSON-LD-serialisatie.
- `app/sitemap.ts`: routes, afbeeldingen en video’s. Nieuwe diensten en cases worden automatisch meegenomen.
- `app/robots.ts`: publieke productie toegankelijk; previews uitgesloten.
- `scripts/check_seo.py`: controle van de werkelijk gerenderde productiepagina’s, niet alleen de broncode.

De bron voor Danny’s verhaal, start in juni 2024, regio en klantcases is de aangeleverde gebruikersinformatie. Telefoon, e-mail en LinkedIn komen uit het bestaande project. Voeg adres, openingstijden, prijzen, videopublicatiedatums en resultaatcijfers alleen toe na bevestiging.

## Google Search Console

Er is nog geen gekoppelde Search Console-property. Een Bedrijfsprofiel vervangt deze verificatie niet. Je hebt toegang nodig tot het Google-account dat eigenaar wordt en tot de domeininstellingen of het Vercel-project.

**Aanbevolen: domeinproperty**

1. Open [Google Search Console](https://search.google.com/search-console) en voeg de domeinproperty `rossenaarmarketing.nl` toe.
2. Kopieer de door Google getoonde TXT-record en voeg die toe bij de DNS-provider. De daadwerkelijke waarde moet uit jouw account komen.
3. Verifieer in Search Console en dien `https://www.rossenaarmarketing.nl/sitemap.xml` in onder Sitemaps.
4. Inspecteer de homepage, de vier diensten en een klantcase. Controleer de door Google gekozen canonical en vraag waar nodig indexering aan.

**Alternatief: URL-prefix en HTML-tag**

1. Voeg exact `https://www.rossenaarmarketing.nl/` toe als URL-prefix-property.
2. Kies HTML-tag. Neem alleen de waarde uit `content="..."` over.
3. Zet die als `GOOGLE_SITE_VERIFICATION` in de Vercel-productieomgeving en bouw opnieuw. Deel geen accountwachtwoord.
4. Controleer of de tag `google-site-verification` in de homepage staat; klik daarna op Verifiëren en dien de sitemap in.

Een domeinproperty via DNS dekt ook http/https en www/apex. De HTML-tag is een alternatief voor de specifieke URL-prefix. [Officiële verificatie-uitleg van Google](https://support.google.com/webmasters/answer/9008080).

## Bestaand Google Bedrijfsprofiel

Controleer in het bestaande profiel de bedrijfsnaam, telefoon `06 46 78 16 57`, website `https://www.rossenaarmarketing.nl/`, passende categorie en het werkelijke servicegebied. Gebruik Enkhuizen/West-Friesland waar dit overeenkomt met de praktijk; claim geen bezoekadres als klanten daar niet worden ontvangen. Voeg eigen werk en actuele diensten toe. Er is vanuit deze taak niets aan het externe profiel gewijzigd.

## Bing

Voeg de website toe in [Bing Webmaster Tools](https://www.bing.com/webmasters/). Gebruik import uit Search Console indien beschikbaar, of neem de HTML-verificatiewaarde over als `BING_SITE_VERIFICATION` in Vercel. Na een nieuwe build verschijnt `msvalidate.01`. Dien dezelfde sitemap in. Er is geen fictieve verificatiesleutel of account aangemaakt.

## Productie en previews

`VERCEL_ENV=production` laat indexering toe. Een expliciete andere Vercel-omgeving krijgt noindex, een blokkerende robots.txt en een lege sitemap. De openbare website behoudt altijd canonicals naar www. Controleer bij een aangepaste hostingopzet dat `VERCEL_ENV` niet per ongeluk op `preview` staat. Vercel-beveiliging en firewallregels moeten zoekcrawlers op productie toegang geven.

`/privacy` blijft bereikbaar met noindex/follow; ontbreekt daarom in de sitemap. Contact-URLs met een interesseparameter canonicaliseren naar `/contact`. Onbekende case- en dienstslugs geven een 404. Het portaal is een openbare demo met `data-nosnippet`, geen toegang tot echte klantgegevens.

## Controleren na wijzigingen

```bash
npm run build
npm start -- --port 3103
# In een tweede terminal, met Python 3:
python3 scripts/check_seo.py http://127.0.0.1:3103
```

De check controleert statuscodes, unieke titels/omschrijvingen, H1, canonicals, deelmetadata, JSON-LD-verwijzingen, interne documentlinks en ankers, alt-attributen, 404s en de contactparameter. Een niet-lege `errors`-lijst geeft exitcode 1. Controleer nieuwe schema’s ook via [Schema Markup Validator](https://validator.schema.org/) en relevante Google-markup via [Rich Results Test](https://search.google.com/test/rich-results) na publicatie. Schema kan geldig zijn zonder dat Google daarvoor een rich result toont.

Controleer maandelijks zoekverkeer en relevante contactaanvragen. Breid landelijke onderwerpen uit op basis van daadwerkelijke zoekvragen. Pas FAQ-antwoorden aan wanneer aanbod of werkwijze verandert. Plaats echte uitkomsten bij cases pas nadat Danny en de klant ze bevestigd hebben.
