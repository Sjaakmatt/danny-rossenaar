# Goal

**Objective:** Migreer Rossenaar Marketing van HTML naar een persoonlijke, visueel uitgesproken Next.js-website met scrollende lagen, meerdere pagina’s en een interactief klantportaalvoorbeeld.
**Status:** active
**Started:** 2026-10-11
**Iterations:** 4

## Acceptance criteria

- [x] Repository en originele inhoud behouden — controleer git history, legacy/ en contactgegevens.
- [x] Next.js met Home, Werk, Diensten, Over Danny, Inzicht en Contact — `npm run build` en HTTP-routecontroles.
- [x] Scrollgestuurde campagnegalerij, gelaagde secties, hoverinteracties en reduced-motion — inspecteer in de browser en controleer CSS/DOM.
- [x] Interactieve portaalpreview met perioden, grafieken en aanvragen — browsercontrole; voorbeelddata expliciet gemarkeerd.
- [x] Contactformulier gemigreerd met validatie, foutmeldingen en server-only mailconfiguratie — `npm test` en lokale API-controles zonder mail te versturen.
- [x] Mobiele en desktopweergave en toetsenbordnavigatie bruikbaar — browsercontrole op 390px en 1440px.
- [x] Bekijkbaar resultaat en documentatie van resterende koppelingen — lokale preview openen en README controleren.
- [ ] Visuele richting goedgekeurd — gebruiker beoordeelt de werkende preview.

## Out of scope

- Een nieuwe productie-authenticatie of advertentiedatabase bouwen; de gebruiker bevestigde dat het echte portaal alleen op uitnodiging is; de site bevat een openbare rondleiding.
- Automatisch vervangen van de live site of mergen naar de standaardbranch.

## State

**Done:** Next.js-pagina’s en ontwerp gebouwd; alle specifieke referenties visueel onderzocht; productiebuild en 5 validatietests geslaagd; HTTP-routes gecontroleerd; portaalfilters, aanvragen, CSV-download, mobiele navigatie en foutweergave in browser geverifieerd.
**Now:** Werkende productiepreview en reviewbranch opleveren.
**Next:** Visuele beoordeling door gebruiker; daarna eventuele ontwerpaanpassingen.
**Blocked:** none

## Log

- 2026-10-11 iteratie 1: branch codex/nextjs-design; warme editorial richting met navy, crème en lime; echte foto’s/reviews behouden; ontbrekende campagnebestanden met gelabelde conceptbeelden invullen.

- 2026-10-11 iteratie 2: 6 hoofdpagina’s, 3 projectdetails, native scroll-lagen, dark portal en contactroute gebouwd.
- 2026-10-11 iteratie 3: mobiele en desktopinteracties getest; proxy-Hostcontrole hersteld; CSV-bestand met 90 dagen gecontroleerd.

- 2026-10-11 iteratie 4: productiebuild, typecheck, tests en HTTP-smokecheck geslaagd; toetsenbordbediening en laatste mobiele layouts gecontroleerd; referenties, assets en verificatie gedocumenteerd.
