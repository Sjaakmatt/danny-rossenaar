# Rossenaar Marketing: website

Eén-pagina website voor Rossenaar Marketing: warm, persoonlijk en niet te techy.
De kleuren komen rechtstreeks uit het logo (navy, blauw, teal en frisgroen),
gecombineerd met warme crèmetinten.

## Structuur

- `index.html`: de volledige pagina (hero, diensten, over mij, werkwijze, reviews, contact)
- `css/style.css`: alle styling, met de kleuren als CSS-variabelen bovenin
- `js/main.js`: mobiel menu, scroll-animaties, uitklapbare reviews en het contactformulier
- `api/contact.js`: serverless functie die het contactformulier via Resend verstuurt
- `assets/`: logo, favicons, foto's en de social-media-afbeelding

## Lokaal bekijken

Open `index.html` in de browser, of start een simpele server:

```bash
python3 -m http.server 8000
```

en ga naar http://localhost:8000. Let op: het contactformulier werkt alleen
als de site draait op een omgeving die serverless functies ondersteunt
(zie hieronder): lokaal kan dat met `vercel dev`.

## Contactformulier instellen (Resend)

Het formulier stuurt berichten naar **danny@rossenaarmarketing.nl**, met
**Rossenaar Marketing &lt;contact@rossenaarmarketing.nl&gt;** als afzender. Het
antwoordadres wordt automatisch het adres van de afzender van het bericht,
dus je kunt direct op de mail antwoorden.

Wat er nog moet gebeuren om het werkend te krijgen:

1. **Domein verifiëren bij Resend**. Voeg `rossenaarmarketing.nl` toe in het
   Resend-dashboard onder *Domains* en zet de DNS-records (SPF, DKIM) klaar bij
   je domeinprovider. Zonder verificatie mag Resend niet vanaf
   `contact@rossenaarmarketing.nl` versturen.
2. **API-sleutel aanmaken** in Resend onder *API Keys*.
3. **Omgevingsvariabele instellen** in je hostingomgeving:

   ```
   RESEND_API_KEY=re_...
   ```

   Bij Vercel doe je dat via *Settings → Environment Variables*. Zet hem
   nooit in de code of in dit bestand.

De functie in `api/contact.js` gebruikt het Vercel-formaat voor serverless
functies. Draait de site ergens anders (Netlify, Cloudflare), dan hoeft alleen
de buitenkant van dat bestand aangepast te worden: de logica blijft gelijk.

Ingebouwde bescherming: een verborgen veld tegen bots, controle op een geldig
e-mailadres en een maximale lengte per veld.

## Aanpassen

- **Kleuren**: bovenin `css/style.css` onder `:root`.
- **Teksten**: rechtstreeks in `index.html`, alles is in het Nederlands en in de je-vorm.
- **Contactgegevens**: e-mailadres en telefoonnummer staan in de contactsectie,
  de footer en in de structured data bovenin `index.html`.
- **Domein / SEO**: de SEO-tags, `sitemap.xml` en `robots.txt` gebruiken
  `https://www.rossenaarmarketing.nl/`. Pas dit aan als het domein anders wordt.
