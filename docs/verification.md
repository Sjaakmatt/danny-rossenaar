# Verificatie — 11 oktober 2026, filmische herziening

## Automatisch

- Next.js 16.4.0-productiebuild geslaagd; vijftien uitvoerpagina’s gegenereerd.
- TypeScriptcontrole geslaagd.
- Vijf contactvalidatietests geslaagd. Contactverwerking is ongewijzigd; er is geen e-mail verzonden.
- Formatting en Git-whitespacecontrole uitgevoerd bij oplevering.

## Browser, 1440 × 1000 en 390 × 844

- Hero begin, tussenstand en beeldvullende eindstand bekeken; vijf lagen veranderen positie, rotatie en schaal. Op mobiel drie centrale lagen; overige echte klantfoto blijft in de persoonlijke scène beschikbaar.
- Diensten: eerste, tweede en laatste hoofdstuk plus overlappende tussenstand visueel gecontroleerd; mobiele versie blijft leesbaar en bevat dezelfde scrolltransformaties.
- Aangeleverde klantfoto bekeken in de persoonlijke scène. Tekstlaag gecorrigeerd zodat de achtergrondtypografie het label niet bedekt.
- Portaal: zwevende kaarten, gekantelde tussenstand en bedienbare eindstand bekeken. Ook de 7-dagenknop binnen de homepage-preview werkt.
- Volledige portaalpagina: 7/30/90 dagen verandert KPI’s, dagbalken en funnel; klikken/aanvragen verandert de meetreeks. Dagtooltip gecontroleerd: 6 oktober, 85 klikken. Alle totalen volgen dezelfde 90-dagendataset (157 aanvragen en 4.823 klikken).
- Zoeken op Sanne, aanvraag openen, notitie bewaren, klantstatus en € 2.500 klantwaarde vastleggen. Funnel wijzigde van 17 naar 18 klanten en van € 25.500 naar € 28.000. Geen externe writes.
- Mobiel: aanvraag openen, contactmoment loggen; status veranderde Nieuw → Contact gehad en nieuw-badge 33 → 32. Daarna afwijsreden “Nu niet het juiste moment” opgeslagen. Reset herstelde 33 nieuwe aanvragen en oorspronkelijke cijfers.
- Lichte en donkere weergave visueel gecontroleerd. Portaalkeuze Licht veranderde zowel de site als de portal-root naar light. Automatisch gaf siteThemeChoice=system. Navigatieschakelaar en portalinstellingen gebruiken dezelfde voorkeur; bewaren na reload geverifieerd.
- Mobiele portaalnavigatie blijft onderin binnen de preview. Aanvraaglijst toont twaalf items per stap. Geen horizontale paginaoverloop bij 390px.

## Eerdere regressiecontrole

De eerdere versie doorliep HTTP-controles voor alle pagina’s, 404’s, de oude /index.html-redirect en contact-APIvalidatie. Contactroute en projectrouting zijn niet inhoudelijk gewijzigd in deze herziening. De oorspronkelijke HTML-bestanden blijven in legacy/.

## Grenzen

Reduced motion is in Motion-componenten en CSS gecontroleerd: geen pinning of verborgen diensten en geen lange lege scrollruimte. Een gewijzigde OS-voorkeur is niet via de browser nagebootst. Er is geen volledige WCAG-, Lighthouse- of cross-browseraudit uitgevoerd.

Hosting is op 17 oktober 2026 verhuisd van Vercel naar Cloudflare Workers (OpenNext). `npm run preview` is lokaal in de Workers-runtime gecontroleerd: alle pagina’s 200, voorgerenderde pagina’s uit de cache (`x-nextjs-cache: HIT`), `/index.html` 308, onbekende URL 404, beveiligingsheaders aanwezig, `next/image` werkt en de contactroute geeft zonder sleutel 503. Een echte Cloudflare-deploy en e-mailbezorging zijn niet getest. De gebruiker heeft op 11 oktober 2026 merge naar `main` geautoriseerd; de actuele mergestatus staat in PR #16. Het echte uitnodigingsportaal en echte advertentiegegevens zijn niet gekoppeld aan deze openbare demo. De gebruiker heeft de visuele richting op 11 oktober 2026 goedgekeurd.

## Eerdere galerij- en mediacontrole (voor onderstaande herziening)

- Video Slide Show geïnspireerde coverflow op desktop en 390px: juiste laagvolgorde, middenbeeld scherp, zijkaarten teruggedraaid en vervaagd. Slepen wisselde van item 3 naar 4; positieknoppen, pijlen en End-toets gecontroleerd. Laatste item 9 staat gecentreerd en de volgende-knop is uitgeschakeld. Pagina-overloop: 375px scrollbreedte bij 390px viewport (scrollbar meegerekend).
- Alle vijf lokale clips geladen zonder mediafouten. Autoplay van uitsluitend het actieve zichtbare item, pauze bij wissel en werkende pauze/geluidsknoppen gecontroleerd. Stille bronclips tonen geen geluidsknop. De 4:5-video en vierkante advertenties behouden het volledige kader.
- Beide Chikado-reels laden via Instagram in de dialoog. Werkelijk afspelen gecontroleerd (`paused=false`, oplopende tijd), evenals sluiten en Escape. De achterliggende galerijvideo pauzeert tijdens de dialoog. Instagram blijft een externe afhankelijkheid.
- Nieuwe productiebuild, typecheck, formatting, vijf tests en Git-whitespacecontrole geslaagd. Twaalf routes en dertien lokale media-assets geven HTTP 200; MP4-byte-range geeft HTTP 206. Beide 404’s en de 308-redirect van /index.html werken. Geen verwijzingen naar de verwijderde gegenereerde foto’s in gerenderde pagina’s.
- Geoptimaliseerde originele lokale video’s staan in public/media; bronbestanden van de gebruiker zijn niet gewijzigd. Geen AI-foto’s blijven in app, componenten of publieke assets.

## Hero, logo en doorlopende carousel — laatste herziening

- Nieuwe hero: direct zichtbare videolaag, foto en advertentie. Openingscompositie en overgang naar beeldvullende klantfoto in de browser gecontroleerd. Hero-video pauzeert via de knop en wanneer hij uit beeld verdwijnt.
- Mobiele openingscompositie op 390 × 844 gecontroleerd: kop, kennismakingsknop en beelden zichtbaar. Geen horizontale paginaoverloop. Donkere desktopweergave gecontroleerd; het hertekende blauw/groene beeldmerk blijft leesbaar. Navigatie en footer tonen “Rossenaar” met hoofdletter R. De logo-link keert ook vanaf een homepage-anker terug naar boven.
- Beide Chikado-reels zijn nu lokale H.264/AAC-bestanden met volledige beeldverhouding, originele audio en faststart. Beide speelden in de galerij zonder mediafout. Pauze, geluid aanzetten en automatisch dempen bij wissel gecontroleerd.
- Elf logische items, drie identieke reeksen voor een doorlopende track. In de browser 11 → 1 en 1 → 11 gecontroleerd met pijlen en toetsenbord. Op 390px werkt slepen van 1 terug naar 11 en weer vooruit naar 1. De rebase herstelt de middelste reeks zonder lege eindpositie.
- Na wisselen naar Chikado speelde precies één galerijvideo; de andere videokaarten stonden gepauzeerd. De Werk-pagina gebruikt dezelfde doorlopende carousel als de homepage.
- Reduced-motioncode nagekeken: hero staat in normale documentflow, parallax staat uit en autoplay wordt overgeslagen. Geen gewijzigde OS-voorkeur gesimuleerd.
- Laatste productiebuild, TypeScript, formatting en Git-whitespacecontrole geslaagd. Homepage, Werk, Inzicht, Privacy en beide nieuwe posters geven HTTP 200; beide Chikado-video’s ondersteunen byte-rangeverzoeken met HTTP 206.
- Kleine mobiele hero op 375 × 667 gecontroleerd. De carousel behoudt item 8 bij wisselen tussen 375px en 1440px; native scroll-anchoring wordt tijdens het opnieuw meten opgevangen. De overgangen 11 → 1 en 1 → 11 zijn ook in de productiebuild op mobiel gecontroleerd.

## Persoonlijk verhaal en vloeiender scrollen

- Aangeleverde biografie volledig verwerkt op /over, met de cliëntquote als blockquote en de korte versie in het persoonlijke homepagegedeelte. Verhaal, leesbreedte en quote in lichte en donkere desktopweergave gecontroleerd. Op 390 × 844 passen kop en tekst binnen de pagina; geen horizontale overloop.
- Alle scrollscènes gebruiken gedempte voortgang via dezelfde Motion-spring. De hero gecontroleerd met kleine en grote scrollstappen en omgekeerde richting op desktop, en een overgang op 390px mobiel. Hoofdstukstatus en zichtbare lagen volgen dezelfde voortgang. De browser houdt zijn gewone scrollgedrag; reduced motion gebruikt de ruwe voortgang en bestaande statische weergave.
- Productiebuild (15 pagina’s), TypeScript, formatting en Git-whitespacecontrole geslaagd. Er zijn geen nieuwe interacties of wijzigingen aan de contactverwerking toegevoegd.

## Klantcases Chikado en Emiel Buis Visspecialist

- Werk toont vijf cases. De filters Content (1) en Personeelswerving (1) tonen respectievelijk Chikado en Emiel Buis Visspecialist; Alles herstelt vijf kaarten. Filteren, openen en terugkeren gecontroleerd op 390px. Filters wrappen over meerdere regels; de lange titel van Emiel blijft binnen de mobiele pagina.
- Beide detailpagina’s bevatten twee bestaande lokale video’s met native bediening, posters en onderschriften. De bestaande review van Emiel Buis staat bij zijn eigen case. Chikado heeft geen tekstuele klantreview. Chocolate Planet behoudt zijn video’s en review via dezelfde gegevensstructuur.
- Laatste productiebuild genereert 17 pagina’s, inclusief /werk/chikado en /werk/emiel-buis. TypeScript, formatting en Git-whitespacecontrole geslaagd. Nieuwe cases worden automatisch opgenomen in de sitemap.

## SEO/GEO — 11 oktober 2026

- Productiebuild met 21 gegenereerde routes succesvol; TypeScript en Prettier slagen.
- Gerenderde SEO-check: 16 documentpagina’s, geen fouten. Controleert ook interne documentlinks/ankers, JSON-LD-verwijzingen, canonicals met contactparameters en echte 404s. Resultaat in `docs/seo-verificatie.json`.
- Sitemap: 15 indexeerbare pagina’s, 6 video’s; alle 21 beeld-/videobronverwijzingen bestaan lokaal.
- Afzonderlijke previewbuild: blokkerende robots.txt, lege sitemap en noindex in alle 16 relevante statische HTML-pagina’s (de framework-500-fallback valt buiten deze check). Daarna de productiebuild hersteld.
- Desktop en mobiel (390 × 844): dienstpagina’s, veelgestelde vraag en donker/licht gecontroleerd.
- Hero-foto: hogere uitsnede op 1500 × 798; mobiele focus naar rechts op 390 × 844.
- Bestaande vijf contactvalidatietests slagen.
- PageSpeed API gaf HTTP 429; geen geverifieerde Core Web Vitals-score. Search Console vereist nog login en eigendomsverificatie.
