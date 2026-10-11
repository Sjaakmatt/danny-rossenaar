# Herkomst van de portaalpreview

De gebruiker wees `Sjaakmatt/Ads-manager-` aan als bron voor het bestaande klantportaal. Referentie: commit `c0739d7`, `apps/web/app/portal/` en de bijbehorende `tokens.css` en thematokens uit `factum.css`. De Ads-manager-repository is alleen gelezen.

Overgenomen en aangepast voor embedding: Resultaten, Aanvragen, aanvraagdetails, iconen, helpers en portalstijl. De grafiek gebruikt dezelfde Recharts BarChart met ResponsiveContainer, assen, raster en dagtooltip. Geen statische illustratie van een grafiek.

Aanpassingen:

- `components/portal/api.ts` bevat types en een lokale demo-adapter. Geen fetch, cookies, authenticatie of echte klantdata.
- Dataset: 90 dagen t/m 11 oktober 2026. Een reproduceerbaar campagnemodel met variabel dagbudget, weekendeffect, klikken, vertoningen en conversies. Elke conversie heeft één voorbeeldaanvraag. 7 dagen: 24 aanvragen; 30 dagen: 77; 90 dagen: 157.
- Statussen, uitkomst, notities en contactlogs veranderen alleen browsergeheugen en werken door in de funnel. Herladen of “Voorbeeld opnieuw beginnen” herstelt de fixtures.
- Contactknoppen demonstreren de registratie; ze openen geen telefoon-, mail- of WhatsApp-app. E-mailadressen gebruiken `example.com`.
- Thema volgt de gedeelde websitevoorkeur. Instellingen kan dezelfde voorkeur wijzigen; Automatisch volgt het apparaat.
- Header, tabbar, toast en achtergrond zijn begrensd tot de preview. De mobiele tabbar blijft bereikbaar tijdens het scrollen. In de volledige rondleiding worden aanvragen per twaalf getoond, met “Meer aanvragen tonen”.
- Navigatie blijft binnen het paneel; op de volledige portaalpagina brengt een tabwissel de nieuwe inhoud in beeld. Geen echte login- of uitlogflow nagebouwd.

De klanten krijgen hun echte portaal via een persoonlijke uitnodiging. De openbare site bevat alleen de duidelijk gemarkeerde rondleiding.
