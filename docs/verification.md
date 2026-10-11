# Verificatie — 11 oktober 2026

## Automatische controles

- `npm run build`: geslaagd, Next.js 16.4.0; 15 statische uitvoerpagina’s gegenereerd, contactpagina en contact-API dynamisch.
- `npm run typecheck`: geslaagd.
- `npm test`: alle 5 tests geslaagd. Dekt normalisatie, onjuiste types, verplichte velden, e-mail/headerinjectie, veldlengtes, honeypot en vaste ontvanger met plain-textinhoud.
- `npm run format:check`: geslaagd.
- Lokale HTTP-controle op de productiebuild: alle tien inhoudsroutes, sitemap en robots geven 200; onbekende pagina en onbekend project 404; `/index.html` 308; GET op contact-API 405.
- Contact-API: verkeerde body/JSON/velden 400, andere Origin 403, te grote body 413, verkeerd contenttype 415. Een geldig verzoek met dezelfde Origin geeft bij ontbrekende mailconfiguratie 503. Honeypot geeft 200 zonder e-mail te maken.

## Browsercontroles

Uitgevoerd in de Codex-browser op desktop (1440 pixels) en mobiel (390 pixels).

- Homepage: scrollbeweging verandert waaier, positie en perspectief; vorige/volgende en pijltjestoetsen wisselen het actieve verhaal. Originele persoonsfoto’s en geoptimaliseerde conceptbeelden laden.
- Navigatie: interne pagina’s en projectlinks werken; mobiel menu opent/sluit en Escape brengt focus terug naar de menuknop. Eerste Tab bereikt de skiplink.
- Diensten: kaarten stapelen tijdens desktopscroll; mobiel losse secties. FAQ opent en sluit.
- Werk: het filter Persoonlijk contact laat alleen FactumAI zien; projectdetail opent.
- Reviews: de volgende-knop wisselt naar de volgende oorspronkelijke klantreview.
- Portaal: 7/30/90 dagen wijzigt perioden, KPI’s en grafiek; grafiekkeuze Klikken wijzigt de meetreeks. Aanvragen zoeken op Oost en filter Klant werkt; aanvraagdetails openen.
- CSV-download: het daadwerkelijk gedownloade 90-dagenbestand bevat 90 dagregels en twee kopregels; totalen 198 aanvragen en 5.750 klikken komen overeen met de demo.
- Contact: bij ontbreken van de sleutel verschijnt de echte foutmelding met directe contactgegevens; ingevulde velden blijven staan. Er is geen e-mail verzonden.
- Mobiele layouts van home, over, werk, projectdetail, contact, diensten en portaal bekeken. De perspectiefkanteling van het portaal is op mobiel uitgeschakeld om horizontale overloop te voorkomen.
- Productiepreview: geen waarschuwingen of fouten in de bekeken browserconsole.

## Begrenzing

Reduced motion is in de CSS en Motion-componenten geïmplementeerd en in de bron gecontroleerd; een veranderde OS-voorkeur is niet nagebootst. Er is geen volledige WCAG-, Lighthouse- of cross-browseraudit uitgevoerd. Echte e-mailbezorging en een hostingdeployment zijn niet getest. Het portaal is een openbare demonstratie, zonder authenticatie of verbinding met echte advertentiegegevens. Visuele goedkeuring door de gebruiker staat nog open.
