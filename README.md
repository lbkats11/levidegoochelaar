# Levi de Goochelaar — website

De officiële website van Levi de Goochelaar. Een snelle, moderne one-page site
(HTML, CSS en een klein beetje JavaScript) met een ingebouwd **beheerpaneel**
waarin je zelf de teksten kunt aanpassen.

**Live domein:** https://levidegoochelaar.nl
**Beheerpaneel:** https://levidegoochelaar.nl/admin

---

## 📁 Structuur

```
levidegoochelaar/
├─ index.html          # De volledige pagina
├─ styles.css          # Alle styling
├─ script.js           # Menu, animaties, laadt de teksten in
├─ content/
│  └─ site.json        # Alle teksten (worden via /admin bewerkt)
├─ admin/
│  ├─ index.html       # Het beheerpaneel (Decap CMS)
│  └─ config.yml        # Welke velden je kunt bewerken
├─ netlify.toml        # Netlify-instellingen
├─ CNAME               # Domeinnaam (voor GitHub Pages; op Netlify genegeerd)
└─ assets/img/         # Alle afbeeldingen (geoptimaliseerd voor web)
```

## 🧩 Hoe werkt het beheerpaneel?

De teksten van de site staan in `content/site.json`. De website laadt dat bestand
in en toont de teksten. In het beheerpaneel (`/admin`) pas je die teksten aan in
nette invulvelden; bij "Publiceren" wordt `content/site.json` automatisch
bijgewerkt in je GitHub-repo en zet Netlify de nieuwe versie live. Meestal binnen
een minuut zichtbaar.

> De teksten in `index.html` zijn een **reservekopie** die verschijnt als er iets
> misgaat met laden. Bewerk je teksten voortaan via `/admin`, niet in de HTML.

---

## 🚀 Online zetten + beheerpaneel activeren (Netlify)

Je hebt gekozen voor Netlify: je code staat op **GitHub**, en **Netlify** host de
site, regelt HTTPS én verzorgt het inloggen op het beheerpaneel.

### Stap 1 — Zet de code op GitHub
1. Maak een gratis account op https://github.com.
2. Maak een nieuwe **repository** aan, bijv. `levidegoochelaar` (Public). Vink
   géén README/gitignore aan; die zitten er al in.
3. Push deze map (zie de commando's die GitHub toont, of):
   ```bash
   git remote add origin https://github.com/JOUW-NAAM/levidegoochelaar.git
   git branch -M main
   git push -u origin main
   ```

### Stap 2 — Koppel GitHub aan Netlify
1. Maak een gratis account op https://netlify.com (kies "Sign up with GitHub").
2. Klik **Add new site → Import an existing project → GitHub** en kies je
   `levidegoochelaar`-repo.
3. Build settings mag je leeg laten (het is een statische site). Publish
   directory: `.` (staat al in `netlify.toml`). Klik **Deploy**.
4. Na een halve minuut staat je site live op een tijdelijk adres zoals
   `https://willekeurige-naam.netlify.app`.

### Stap 3 — Zet het inloggen aan (Netlify Identity + Git Gateway)
Dit is nodig zodat jij (en niemand anders) kunt inloggen op `/admin`.
1. In je Netlify-site: **Integrations / Identity** → klik **Enable Identity**.
2. Ga naar **Identity → Services → Git Gateway** en klik **Enable Git Gateway**.
3. Onder **Identity → Registration** zet je "Registration" op **Invite only**
   (zodat niet zomaar iemand een account kan aanmaken).
4. Klik **Identity → Invite users** en nodig je eigen e-mailadres uit. Je krijgt
   een mailtje; klik de link en kies een wachtwoord.
5. Ga nu naar `https://JOUW-SITE.netlify.app/admin` en log in. Klaar!

### Stap 4 — Koppel je domein levidegoochelaar.nl
1. In Netlify: **Domain management → Add a domain** → typ `levidegoochelaar.nl`.
2. Netlify laat zien welke DNS-instellingen je bij je **domeinprovider** (waar je
   het domein hebt gekocht) moet zetten. Er zijn twee manieren:
   - **Makkelijkst:** de nameservers van je domein wijzigen naar die van Netlify
     (Netlify beheert dan alles). Netlify toont de exacte nameservers.
   - **Of** handmatig records zetten: een `A`-record voor het hoofddomein naar
     het IP dat Netlify toont, en een `CNAME` voor `www` naar je
     `JOUW-SITE.netlify.app`.
3. Zet in Netlify **HTTPS** aan (gebeurt meestal automatisch zodra de DNS klopt).

> DNS-wijzigingen kunnen tot ~24 uur duren voordat ze wereldwijd actief zijn;
> vaak gaat het sneller.

---

## ✏️ Teksten aanpassen (dagelijks gebruik)
1. Ga naar https://levidegoochelaar.nl/admin en log in.
2. Klik op **Website → Teksten van de website**.
3. Pas aan wat je wilt en klik **Publiceren**.
4. Even wachten — je wijziging staat live.

## 🖼️ Foto's beheren (via /admin)
Foto's ga je net als teksten via het beheerpaneel beheren:
- **Galerij:** open **Website → Teksten van de website → Foto's**. Onder "Foto's
  in de galerij" kun je foto's **toevoegen** (Add), **verwijderen** (prullenbak),
  **herschikken** (slepen) en per foto een nieuwe afbeelding **uploaden**.
- **Portretfoto** (bij "Over Levi") en de **illustratie bovenaan** (Hero) vervang
  je in diezelfde secties met het foto-veld.

Geüploade foto's komen in de map `assets/img/uploads/`. Houd bestanden bij
voorkeur klein (max ~1600px breed) zodat de site snel blijft laden.

---

_Gemaakt met oog voor detail — veel plezier en succes met je optredens! ✨_
