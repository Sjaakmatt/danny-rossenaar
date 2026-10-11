# Mobiele snelheid en klikbare diensten

Gecontroleerd op 11 oktober 2026. De wijzigingen staan op `codex/mobile-performance` en moeten nog naar productie.

## Aanpassingen

- De decoratieve herovideo is een aparte loop van 10 seconden: 526.896 bytes in plaats van 10.106.393 bytes (94,8% kleiner), zonder geluid en met faststart. Het volledige origineel blijft beschikbaar in de carousel en de case.
- Een responsive Next/Image toont direct het eerste beeld met hoge downloadprioriteit. De video start pas na de eerste paginaresources. De bestaande scrollanimaties blijven behouden.
- Alleen de actieve carouselvideo in beeld laadt. Afbeeldingen laden pas in de buurt van de carousel, maximaal de actieve kaart en drie buren aan elke kant. Verlaten video's stoppen met downloaden.
- Het interactieve demoportaal en de grafiekcode laden pas wanneer de bezoeker de sectie nadert. De gesloten mobiele navigatie haalt geen pagina's vooraf op; de portaal-link prefetch is uitgeschakeld.
- Bestaande lokale lettertypen worden via next/font geladen, met preload en passende fallback.
- Dienstenkaarten 01–04 zijn volledig klikbaar, met toetsenbordfocus en elk een eigen detailpagina. Labels, homepage-links en contactformulier sluiten aan op social media beheer, contentcreatie, Meta-advertenties en personeelswerving.

## Metingen

Vergelijking met Lighthouse 13.5.0 op lokale **productiebuilds**, hetzelfde mobiele profiel met gesimuleerde langzame 4G:

| Metriek                  | Voor      | Na        |
| ------------------------ | --------- | --------- |
| Performance              | 77        | 89        |
| First Contentful Paint   | 1,5 s     | 1,1 s     |
| Largest Contentful Paint | 6,0 s     | 3,8 s     |
| Speed Index              | 2,7 s     | 1,1 s     |
| Total Blocking Time      | 20 ms     | 0 ms      |
| Cumulative Layout Shift  | 0,012     | 0         |
| Gemeten downloads        | 1.805 KiB | 1.027 KiB |

Desktop in dezelfde lokale test: performance 100, FCP 0,3 s, LCP 0,7 s en CLS 0.

De eerdere PageSpeed Insights-meting van productie gaf mobiel 67 en LCP 6,9 s; die is niet rechtstreeks vergelijkbaar met deze lokale test. Er is nog geen nieuwe productiemeting van deze wijzigingen. LCP 3,8 s vraagt nog verbetering richting 2,5 s; de score is geen garantie voor prestaties op echte toestellen. Er waren geen CrUX-veldgegevens beschikbaar.

## Controle

- Productiebuild met TypeScript: geslaagd, alle 21 routes gebouwd.
- Vijf contactformulier-tests en formattering: geslaagd.
- SEO-crawl: 16 pagina's, geen fouten in metadata, canonicals of structured data.
- Mobiele browser: hero speelt/pauzeert, slechts de actieve carouselvideo laadt, geluid en pauze werken, laatste → eerste en eerste → laatste blijven werken.
- Demoportaal verschijnt tijdens scrollen; wisselen van 30 naar 7 dagen wijzigt grafiek en totalen.
- Alle vier dienstenlinks openen de juiste detailpagina; klikken op de achtergrond/tekst van de eerste kaart werkt ook. Personeelswerving wordt correct geselecteerd in het contactformulier.

Herhalen tegen een productiebuild:

```sh
npm run build
npm start -- --port 3104
npx --yes lighthouse http://127.0.0.1:3104/ --only-categories=performance --chrome-flags='--headless=new' --output=json --output=html --output-path=work/lighthouse-mobile --quiet
```
