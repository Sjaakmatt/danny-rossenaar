# Rossenaar Marketing — website

Eén-pagina website voor Rossenaar Marketing: warm, persoonlijk en niet te techy.
De kleuren komen rechtstreeks uit het logo (navy, blauw, teal en frisgroen),
gecombineerd met warme crèmetinten.

## Structuur

- `index.html` — de volledige pagina (hero, diensten, over Danny, werkwijze, verhalen, contact)
- `css/style.css` — alle styling, met de kleuren als CSS-variabelen bovenin
- `js/main.js` — mobiel menu en scroll-animaties
- `assets/logo.png` — bijgesneden logo (gebruikt op de site)
- `assets/logo-origineel.jpeg` — het aangeleverde originele logobestand

## Lokaal bekijken

Open `index.html` in de browser, of start een simpele server:

```bash
python3 -m http.server 8000
```

en ga naar http://localhost:8000.

## Aanpassen

- **Kleuren**: bovenin `css/style.css` onder `:root`.
- **Teksten**: rechtstreeks in `index.html` — alle teksten zijn in het Nederlands geschreven in de je-vorm.
- **Contactgegevens**: e-mailadres en telefoonnummer zijn placeholders — pas ze aan in de contactsectie en de footer van `index.html`.
- **Foto van Danny**: de "over"-sectie heeft nu een placeholder; vervang het blok `.about-photo` door een `<img>` zodra er een foto is.
