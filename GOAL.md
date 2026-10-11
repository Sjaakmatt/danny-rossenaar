# Goal

**Objective:** Migreer Rossenaar Marketing van HTML naar een persoonlijke, visueel uitgesproken Next.js-website met scrollende lagen, meerdere pagina’s en een interactief klantportaalvoorbeeld.
**Status:** active
**Started:** 2026-10-11
**Iterations:** 8

## Acceptance criteria

- [x] Repository en originele inhoud behouden — controleer git history, legacy/ en contactgegevens.
- [x] Next.js met Home, Werk, Diensten, Over Danny, Inzicht en Contact — `npm run build` en HTTP-routecontroles.
- [x] Filmische homepage met beeldvullende scrolltransformaties, overlappende scènes, stapelende diensten en samenkomend portaal — controleer begin-, tussen- en eindtoestanden op desktop en mobiel, plus broncontrole van reduced-motion.
- [x] Portaalpreview op basis van Ads-manager met perioden, staafgrafieken, aanvragen, opvolging en gedeelde licht/donkerkeuze — browsercontrole; voorbeelddata expliciet gemarkeerd.
- [x] Contactformulier gemigreerd met validatie, foutmeldingen en server-only mailconfiguratie — `npm test` en lokale API-controles zonder mail te versturen.
- [x] Mobiele en desktopweergave en toetsenbordnavigatie bruikbaar — browsercontrole op 390px en 1440px.
- [x] Bekijkbaar resultaat en documentatie van resterende koppelingen — lokale preview openen en README controleren.
- [ ] Visuele richting goedgekeurd — gebruiker beoordeelt de werkende preview.

## Out of scope

- Een nieuwe productie-authenticatie of advertentiedatabase bouwen; de gebruiker bevestigde dat het echte portaal alleen op uitnodiging is; de site bevat een openbare rondleiding.
- Automatisch vervangen van de live site of mergen naar de standaardbranch.

## State

**Done:** Next.js-migratie, filmische hero en scrolllagen, stapelende diensten, aangeleverde klantfoto, portaal op basis van Ads-manager-broncode en gedeelde weergavevoorkeur. Desktop- en mobiele browserhandelingen geverifieerd; productiebuild, typecheck en 5 tests geslaagd.
**Now:** Herziening opleveren in dezelfde concept-PR; visuele beoordeling blijft open.
**Next:** Visuele beoordeling door gebruiker; daarna eventuele ontwerpaanpassingen.
**Blocked:** none; gebruiker gaf concrete richting: filmisch zoals Foldfolio, met uitgesproken gepinde scènes.

## Log

- 2026-10-11 iteratie 1: branch codex/nextjs-design; warme editorial richting met navy, crème en lime; echte foto’s/reviews behouden; ontbrekende campagnebestanden met gelabelde conceptbeelden invullen.

- 2026-10-11 iteratie 2: 6 hoofdpagina’s, 3 projectdetails, native scroll-lagen, dark portal en contactroute gebouwd.
- 2026-10-11 iteratie 3: mobiele en desktopinteracties getest; proxy-Hostcontrole hersteld; CSV-bestand met 90 dagen gecontroleerd.

- 2026-10-11 iteratie 4: productiebuild, typecheck, tests en HTTP-smokecheck geslaagd; toetsenbordbediening en laatste mobiele layouts gecontroleerd; referenties, assets en verificatie gedocumenteerd.

- 2026-10-11 iteratie 5: PR en lokale applicatiecommit komen overeen; beide Vercel-checks geslaagd. Online preview vraagt Vercel-login. Visuele beoordeling blijft open (tweede opeenvolgende goal-turn met deze afhankelijkheid).

- 2026-10-11 iteratie 6: derde opeenvolgende goal-turn zonder visuele beoordeling. Technische oplevering blijft gereed; geen nieuwe menselijke feedback ontvangen. Goal geblokkeerd op deze laatste acceptatie, zodat automatische vervolgrondes stoppen.

- 2026-10-11 iteratie 7: gebruiker vindt beweging te slap en kiest filmische, experimentele scroll met grote transformaties. Motion-criterium heropend; hero, diensten, portret en portaal als scènes herbouwd.

- 2026-10-11 iteratie 7 vervolg: Ads-manager-portaalbron verwerkt, werkende demodata met 157 aanvragen en echte daggrafiek, klantfoto toegevoegd, licht/donker/automatisch gedeeld door site en portaal. Desktop en mobiel gecontroleerd.

- 2026-10-11 iteratie 8: Video Slide Show-referentie vertaald naar een galerij met diepte, sleepbediening, native scroll en videobediening. Vijf aangeleverde video’s, drie advertenties en twee Instagram-reels toegevoegd. Alle gegenereerde foto’s en bronbestanden verwijderd op gebruikersverzoek. Ook werkpagina en Chocolate Planet-details bevatten echte media.
