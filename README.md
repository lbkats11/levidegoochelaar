# Levi de Goochelaar — website

De officiële website van Levi de Goochelaar. Een snelle, moderne one-page site
(HTML, CSS en een klein beetje JavaScript) zonder afhankelijkheden — hij werkt
overal en laadt razendsnel.

**Live domein:** https://levidegoochelaar.nl

---

## 📁 Structuur

```
levidegoochelaar/
├─ index.html          # De volledige pagina
├─ styles.css          # Alle styling
├─ script.js           # Menu, scroll-animaties, jaartal
├─ CNAME               # Koppelt GitHub Pages aan levidegoochelaar.nl
├─ .nojekyll           # Zorgt dat GitHub Pages alle bestanden serveert
└─ assets/img/         # Alle afbeeldingen (geoptimaliseerd voor web)
```

## 👀 Lokaal bekijken

Open `index.html` gewoon in je browser (dubbelklikken).

## ✏️ Tekst aanpassen

Alle teksten staan in `index.html`. Zoek de sectie die je wilt wijzigen
(bijv. `<!-- OVER LEVI -->`) en pas de tekst tussen de tags aan. De
huidige teksten zijn een startpunt — pas ze gerust aan naar jouw eigen woorden.

Een paar dingen die je waarschijnlijk wilt aanpassen:
- **E-mailadres:** staat op twee plekken in `index.html` (zoek op `info@levidegoochelaar.nl`).
  Let op: zorg dat je dit mailadres ook echt instelt bij je domein-/mailprovider,
  zodat berichten aankomen. (Wil je toch een ander adres? Vervang het daar.)
- **Reviews:** de reviews zijn nu voorbeelden. Vervang ze door echte reacties.
- **Aantal optredens:** het "100+" bolletje bij je portret in de `<!-- OVER LEVI -->` sectie.

## 🖼️ Foto's vervangen

Zet nieuwe foto's in `assets/img/` en verwijs ernaar in `index.html`.
Houd bestanden klein (max ~1600px breed) zodat de site snel blijft.

---

## 🚀 Online zetten via GitHub Pages (gratis) + je domein koppelen

### Stap 1 — Zet de code op GitHub
1. Maak een gratis account op https://github.com (als je die nog niet hebt).
2. Maak een nieuwe **repository** aan, bijvoorbeeld `levidegoochelaar`.
   Kies **Public**. Vink géén README/gitignore aan (die hebben we al).
3. Volg op de GitHub-pagina de instructie "…or push an existing repository",
   of gebruik in deze map:
   ```bash
   git remote add origin https://github.com/JOUW-NAAM/levidegoochelaar.git
   git branch -M main
   git push -u origin main
   ```

### Stap 2 — Zet GitHub Pages aan
1. Ga in je repository naar **Settings → Pages**.
2. Bij "Build and deployment" → Source: **Deploy from a branch**.
3. Branch: **main**, map: **/ (root)**. Klik **Save**.
4. Na een minuutje staat de site live op `https://JOUW-NAAM.github.io/levidegoochelaar/`.

### Stap 3 — Koppel je domein levidegoochelaar.nl
Het bestand `CNAME` zorgt er al voor dat GitHub weet welk domein bij de site hoort.
Je hoeft alleen nog bij je **domeinprovider** (waar je levidegoochelaar.nl hebt gekocht)
de DNS-instellingen aan te passen:

**Voor het hoofddomein (levidegoochelaar.nl)** — voeg 4 A-records toe die naar GitHub wijzen:
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

**Voor www (www.levidegoochelaar.nl)** — voeg een CNAME-record toe:
```
CNAME   www   JOUW-NAAM.github.io
```

4. Ga daarna terug naar **Settings → Pages** en vul bij "Custom domain"
   `levidegoochelaar.nl` in. Zet **"Enforce HTTPS"** aan (kan even duren voor
   het certificaat klaar is).

> DNS-wijzigingen kunnen tot ~24 uur duren voordat ze wereldwijd actief zijn.
> Meestal gaat het een stuk sneller.

---

### Alternatief: nog makkelijker met Netlify
Geen zin in DNS-gedoe? Op https://netlify.com kun je deze map slepen (of je
GitHub-repo koppelen) en in de interface je domein toevoegen. Netlify regelt
HTTPS en geeft je duidelijke DNS-instructies.

---

_Gemaakt met oog voor detail — veel plezier en succes met je optredens! ✨_
