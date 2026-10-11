# Rossenaar Marketing

Een Next.js-website voor persoonlijke marketing, met filmische scrollscènes, eigen pagina’s en een interactieve klantportaalrondleiding.

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

## Preview en review

De goedgekeurde nieuwe versie staat in [PR #16](https://github.com/Sjaakmatt/danny-rossenaar/pull/16). De bestaande GitHub/Vercel-integratie heeft een [online preview](https://danny-rossenaar-git-codex-nextj-f2396c-sjaak-ter-velds-projects.vercel.app) gebouwd. Deze preview is beschermd en vereist een Vercel-login; lokaal kun je de site direct bekijken via de bovenstaande startinstructies. De gebruiker heeft op 11 oktober 2026 de visuele richting goedgekeurd en merge naar `main` aangevraagd. De actuele mergestatus staat in de PR.

## Pagina’s

- `/`: bewegende beeldstapel, beeldvullende klantfoto, bladerbare contentgalerij, stapelende diensten, klantfoto, samenkomend portaal, werkwijze en reviews.
- `/werk`: contentgalerij en vijf filterbare klantcases onder `/werk/[slug]`, waaronder Chikado (oorbellen schieten) en Emiel Buis Visspecialist (personeelswerving).
- `/diensten`: vier diensten met stapelende kaarten en veelgestelde vragen.
- `/diensten/social-media-beheer`, `/diensten/content-creatie`, `/diensten/meta-advertenties` en `/diensten/personeelswerving`: uitleg, aanpak, vragen en passende klantcases per dienst.
- `/over`: Danny’s eigen verhaal en foto’s.
- `/inzicht`: openbare demo van resultaten, aanvragen en instellingen.
- `/contact`: kennismakingsformulier en directe contactgegevens.
- `/privacy`: uitleg van de gegevensverwerking van deze implementatie.

## Aanpassen

- Teksten, contactgegevens, samenwerkingen en originele reviews: `lib/content.ts`.
- Basisstijl: `app/globals.css`; scrollscènes: `app/cinematic.css`; licht/donker: `app/theme.css`.
- Klantvideo’s, posters en advertenties: `public/media/`; galerijvolgorde en labels: `lib/showcase.ts`.
- Galerijbediening: `components/content-showcase.tsx`; opmaak: `app/showcase.css`.
- Hero: `components/hero.tsx` en `components/hero.module.css`; overige filmische scrollscènes: `components/cinematic-home.tsx`.
- Portaalbediening: `components/dashboard.tsx` en `components/portal/`; fictieve daggegevens: `lib/demo.ts`.
- Gedeelde weergavevoorkeur: `components/theme-toggle.tsx`.

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

De openbare demo gebruikt uitsluitend expliciet gemarkeerde fictieve gegevens. De interface is gebaseerd op de eigen repository `Ads-manager-` (commit `c0739d7`): Aanvragen, Resultaten en Instellingen. De oorspronkelijke Recharts-staafgrafiek gebruikt 7/30/90 dagen, met assen, dagtooltips en de meetwaarden aanvragen/klikken/uitgaven. De 157 fictieve aanvragen sluiten exact aan op de dagcijfers. Zoeken, statusfilters, aanvraagdetails, contactlogs, notities, klantwaarde en afwijsredenen werken in browsergeheugen. De funnel reageert op gewijzigde statussen. Contactknoppen simuleren de opvolging zonder te bellen of berichten te sturen. Instellingen bevat een reset voor de oefengegevens. Er zijn geen advertentie-API’s, echte klanten of portaalaccounts verbonden. De vaste demonstratieperiode eindigt op 11 oktober 2026, zodat dit nooit als actuele klantdata wordt gepresenteerd.

## Beeld en inhoud

Danny’s foto’s, contactgegevens en vier reviews komen uit de oorspronkelijke repository (`fc59c60`). Alle fotografie in de nieuwe website komt uit aangeleverde bestanden. De eerder gemaakte AI-foto’s en hun bronbestanden zijn op verzoek verwijderd. Café Retro en FactumAI hebben grafisch vormgegeven projectomslagen; die worden niet als gepubliceerde campagnes gepresenteerd.

De galerij bevat zeven aangeleverde video’s, drie social advertenties en de foto op locatie (elf items). De video’s zijn geëxporteerd als 720px H.264 met faststart. Alleen de actieve, zichtbare video speelt automatisch, zonder geluid. De gebruiker kan pauzeren en bij clips met een audiotrack geluid aanzetten. Advertenties en video’s behouden hun volledige beeldverhouding, inclusief teksten en ondertitels. De carousel loopt in beide richtingen door: na het laatste beeld volgt het eerste. Bladeren werkt met native horizontale scroll, slepen, pijlen, toetsenbord en positieknoppen.

De twee aangeleverde Chikado-reels zijn vanaf de openbare videobron opgehaald en staan als gewone lokale videokaarten tussen het andere werk. Ze gebruiken dezelfde pauze-, geluid- en swipebediening. Er worden geen externe Instagram-spelers geladen. Onder de betreffende video staat een link naar het oorspronkelijke bericht.

De extra foto `public/assets/op-locatie.webp` staat ook in de beeldstapel, de persoonlijke home-scène en `/over`. Herkomst en bewerkingen: `docs/visuals.md`. Referentieverwerking: `docs/design.md`. Testresultaten en beperkingen: `docs/verification.md`.

Lettertypen en eigen media worden lokaal geleverd. Animaties respecteren `prefers-reduced-motion`; de site gebruikt normale browserscrolling. Bij reduced motion staan alle onderdelen als gewone secties onder elkaar, zonder lange lege scrolltrajecten; de galerij verwijdert perspectief en autoplay.

De schakelaar in de navigatie deelt één voorkeur met de portaalinstellingen: Licht, Donker of Automatisch. De voorkeur wordt lokaal bewaard in `rossenaar-theme`; Automatisch volgt het apparaat. Er worden hiervoor geen gegevens verstuurd.

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

De SEO richt zich primair op Enkhuizen en West-Friesland, met landelijke beschikbaarheid. Metadata en gekoppelde organisatie-/persoonsgegevens staan in `lib/seo.ts`; diensteninhoud in `lib/service-pages.ts`. De sitemap bevat ook klantbeelden en lokale video's. Vercel-previews krijgen noindex; de openbare portaaldata is uitgesloten van snippets.

Zie [SEO/GEO-audit](docs/seo-geo-audit.md) voor onderzoek, wijzigingen en vervolgprioriteiten en [SEO-beheer](docs/seo-beheer.md) voor Search Console, Bing en de gerenderde SEO-controle. `GOOGLE_SITE_VERIFICATION` en `BING_SITE_VERIFICATION` zijn optionele verificatiewaarden uit de eigen accounts. Accounts zijn niet automatisch gekoppeld door deze code.
