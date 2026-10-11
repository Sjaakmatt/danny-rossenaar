# Rossenaar Marketing

Een Next.js-website voor persoonlijke marketing, met een scrollgestuurde campagnegalerij, eigen pagina’s en een interactieve klantportaalrondleiding.

## Starten

Gebruik Node.js 22 of nieuwer.

```bash
npm ci
npm run dev -- --port 3100
```

Open http://127.0.0.1:3100. Voor de productieversie:

```bash
npm run build
npm start -- --port 3100
```

## Pagina’s

- `/`: verhaal, bewegende campagnegalerij, diensten, Danny, portaalpreview, werkwijze en reviews.
- `/werk`: filterbare samenwerkingen; drie detailpagina’s onder `/werk/[slug]`.
- `/diensten`: vier diensten met stapelende kaarten en veelgestelde vragen.
- `/over`: Danny’s eigen verhaal en foto’s.
- `/inzicht`: openbare demo van resultaten, aanvragen en instellingen.
- `/contact`: kennismakingsformulier en directe contactgegevens.
- `/privacy`: uitleg van de gegevensverwerking van deze implementatie.

## Aanpassen

- Teksten, contactgegevens, samenwerkingen en originele reviews: `lib/content.ts`.
- Kleuren, typografie en responsive layouts: `app/globals.css`.
- Campagnebeelden: `public/assets/chocolate-concept.webp` en `public/assets/cafe-concept.webp`.
- Galerij en scrollbeweging: `components/scroll-gallery.tsx`.
- Portaalbediening: `components/dashboard.tsx`; fictieve dataset: `lib/demo.ts`.

De oorspronkelijke HTML-website is compleet bewaard in `legacy/`, inclusief de oorspronkelijke API en assets. De bestaande Git-geschiedenis blijft behouden.

## E-mail

Het formulier gebruikt dezelfde Resend-afzender en ontvanger als de oorspronkelijke website:

- Naar: `danny@rossenaarmarketing.nl`
- Van: `Rossenaar Marketing <contact@rossenaarmarketing.nl>`
- Reply-To: het ingevulde e-mailadres

Maak lokaal een `.env.local` op basis van `.env.example`, of zet in de hostingomgeving `RESEND_API_KEY`. Het verzenddomein moet bij Resend geverifieerd zijn. Plaats de sleutel nooit in Git of in een `NEXT_PUBLIC_`-variabele.

Zonder sleutel geeft de server HTTP 503 terug en toont de website Danny’s directe contactgegevens. Er wordt dan geen verzonden-status getoond. Het formulier bewaart de invoer bij een fout. De route valideert types, verplichte velden, e-mail, lengte, oorsprong, maximaal 32 KiB requestbody en een honeypot. Voor een publiek formulier kan de hostingprovider aanvullende rate limiting instellen. Werkelijke e-mailbezorging is niet getest: tijdens de controle was geen Resend-sleutel ingesteld en is geen e-mail verstuurd.

## Klantportaal

De gebruiker heeft bevestigd dat het echte portaal **alleen op uitnodiging** toegankelijk is. Daarom bevat de site geen generieke inloglink of nagemaakte authenticatie.

De openbare demo gebruikt uitsluitend expliciet gemarkeerde fictieve gegevens. Periodekeuzes, grafieken, zoeken, statusfilter, aanvraagdetails en CSV-export werken lokaal. Er zijn geen advertentie-API’s, echte klanten of portaalaccounts verbonden. De vaste demonstratieperiode eindigt op 11 oktober 2026, zodat dit nooit als actuele klantdata wordt gepresenteerd.

## Beeld en inhoud

Danny’s foto’s, contactgegevens en vier reviews komen uit de oorspronkelijke repository (`fc59c60`). De twee nieuwe campagnefoto’s zijn AI-gegenereerde conceptvisuals. Ze zijn als zodanig gemarkeerd; ze vertegenwoordigen geen werk dat voor een klant is gepubliceerd. Ook de grafische campagnevoorstellen zijn concepten. Vervang ze door goedgekeurde campagnebestanden zodra die beschikbaar zijn.

De originele generaties en volledige prompts staan in `docs/original-concepts/` en `docs/visuals.md`. Referentieverwerking: `docs/design.md`. Testresultaten en beperkingen: `docs/verification.md`.

Lettertypen worden lokaal geleverd. Geen externe fontrequests, trackers, cookies, canvasbibliotheek of videodownload nodig. Animaties respecteren `prefers-reduced-motion`; de site gebruikt normale browserscrolling. Op mobiel vallen de stapelende diensten terug op leesbare losse secties.

## Controles

```bash
npm test
npm run typecheck
npm run build
npm run format:check
```

De smokecheck in `work/` was een lokale controle zonder e-mailconfiguratie en wordt niet meegecommit. Browsercontroles zijn uitgevoerd op 390 en 1440 pixels breed. Zie het verificatieverslag voor de exacte dekking.

## Publiceren

Importeer de repository bij een host met Next.js-ondersteuning, zoals Vercel. Gebruik `npm run build` en de standaard Next.js-instellingen. De contactroute vereist een serverruntime; gebruik geen uitsluitend statische export. Configureer de Resend-sleutel en test bezorging met toestemming voor een echt bericht voordat je live gaat.

De canonieke URL, sitemap en metadata gebruiken `https://www.rossenaarmarketing.nl`. `/index.html` verwijst permanent naar `/`; eerdere sectieankers voor diensten, over, werkwijze en reviews blijven op de homepage bestaan. De privacy-informatie beschrijft de huidige implementatie en moet bij toevoeging van analytics, andere verwerking of een portaalintegratie mee veranderen.
