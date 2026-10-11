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

Online preview gebruikt de bestaande Vercel-integratie en vraagt Vercel-login. Er is geen live-site-merge uitgevoerd. Het echte uitnodigingsportaal en echte advertentiegegevens zijn niet gekoppeld aan deze openbare demo. De visuele beoordeling door de gebruiker blijft open.

## Laatste galerij- en mediacontrole

- Video Slide Show geïnspireerde coverflow op desktop en 390px: juiste laagvolgorde, middenbeeld scherp, zijkaarten teruggedraaid en vervaagd. Slepen wisselde van item 3 naar 4; positieknoppen, pijlen en End-toets gecontroleerd. Laatste item 9 staat gecentreerd en de volgende-knop is uitgeschakeld. Pagina-overloop: 375px scrollbreedte bij 390px viewport (scrollbar meegerekend).
- Alle vijf lokale clips geladen zonder mediafouten. Autoplay van uitsluitend het actieve zichtbare item, pauze bij wissel en werkende pauze/geluidsknoppen gecontroleerd. Stille bronclips tonen geen geluidsknop. De 4:5-video en vierkante advertenties behouden het volledige kader.
- Beide Chikado-reels laden via Instagram in de dialoog. Werkelijk afspelen gecontroleerd (`paused=false`, oplopende tijd), evenals sluiten en Escape. De achterliggende galerijvideo pauzeert tijdens de dialoog. Instagram blijft een externe afhankelijkheid.
- Nieuwe productiebuild, typecheck, formatting, vijf tests en Git-whitespacecontrole geslaagd. Twaalf routes en dertien lokale media-assets geven HTTP 200; MP4-byte-range geeft HTTP 206. Beide 404’s en de 308-redirect van /index.html werken. Geen verwijzingen naar de verwijderde gegenereerde foto’s in gerenderde pagina’s.
- Geoptimaliseerde originele lokale video’s staan in public/media; bronbestanden van de gebruiker zijn niet gewijzigd. Geen AI-foto’s blijven in app, componenten of publieke assets.
