# CoolWebToday – Website mit Toolwerkstatt

Statische Website für www.coolwebtoday.org. Kein Build-Schritt, keine externen Dienste, keine Cookies.

## Aufbau

```
index.html              Startseite: Vorhaben, drei Wege, Grundsätze, Stand
werkstatt.html          Toolwerkstatt: eigene Werkzeuge + Werkzeugwand (Katalog mit Filtern)
journeys.html           Kuratierte Journeys (aus data/journeys.json)
werkzeuge/              Eigene Werkzeuge, laufen nur im Browser (localStorage)
  steckbrief.html       Ideen-Steckbrief → Markdown im Aufbau des digitalpath-Labors
  logbuch.html          Hürden-Logbuch → Markdown oder CSV
  ki-auftrag.html       KI-Auftrag-Baukasten → Text zum Kopieren
impressum.html          ENTWURF – gelb markierte Angaben ergänzen
datenschutz.html        ENTWURF – gelb markierte Angaben ergänzen, rechtlich prüfen lassen
data/site.json          Kontakt-E-Mail und Stand der Seite
data/werkzeuge.json     Werkzeugkatalog
data/journeys.json      Journeys
assets/                 CSS, JS, Schriften (selbst gehostet, SIL Open Font License)
CNAME                   Eigene Domain für GitHub Pages
```

## Inhalte aktualisieren

Alle laufend gepflegten Inhalte stehen in `data/`. Nach einer Änderung genügt ein Commit; die Seiten lesen die Dateien beim Laden.

### Werkzeug ergänzen (`data/werkzeuge.json`)

Einen Eintrag in `werkzeuge` hinzufügen:

```json
{
  "id": "kurzer-name",
  "name": "Anzeigename",
  "kategorie": "ki | automatisierung | daten | wissen | gestalten | zusammenarbeit | barrierefreiheit",
  "wofuer": "Ein Satz: wofür beim Umsetzen einer Idee.",
  "schritte": ["klaeren", "bauen", "pruefen", "teilen"],
  "betrieb": "lokal | browser | cloud | selbst-hosten",
  "lizenz": "open-source | quelloffen | proprietaer",
  "konto": "nein | optional | ja",
  "einstieg": "leicht | mittel | fortgeschritten",
  "hinweis": "Datenschutz, Grenzen, Voraussetzungen.",
  "url": "https://…",
  "erfasst": "JJJJ-MM"
}
```

Beim Prüfen eines bestehenden Eintrags `erfasst` aktualisieren und oben `stand` auf das Prüfdatum setzen. Die `id` wird in Journeys referenziert; nicht ändern, solange eine Journey sie nutzt.

### Journey ergänzen oder ändern (`data/journeys.json`)

- `status`: `"entwurf"` zeigt „In Vorbereitung“; jeder andere Wert blendet das Schild aus.
- `preis`: `null` zeigt „Preis folgt“, sonst den Text, z. B. `"89 € pro Person"`.
- `stationen[].werkzeuge`: IDs aus `werkzeuge` oder `eigene` (`steckbrief`, `logbuch`, `ki-auftrag`).

### Kontakt eintragen (`data/site.json`)

`kontakt.email` setzen. Danach erscheint die Adresse auf allen Seiten, und „Interesse melden“ öffnet eine E-Mail.

## Lokal ansehen

Die Seiten laden JSON-Dateien, deshalb über einen kleinen Server öffnen, nicht per Doppelklick:

```
python3 -m http.server 8000
```

Dann http://localhost:8000 im Browser öffnen.

## Veröffentlichen mit GitHub Pages

1. Neues Repository anlegen (z. B. `coolwebtoday`) und den Inhalt dieses Ordners hochladen.
2. Repository → Settings → Pages: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Unter „Custom domain“ `www.coolwebtoday.org` eintragen (die Datei `CNAME` enthält sie bereits).
4. DNS beim Domain-Anbieter:
   - `www` als CNAME auf `<github-benutzername>.github.io`
   - Domain ohne `www` (Apex) als A-Einträge auf 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - optional AAAA: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
5. Wenn das Zertifikat ausgestellt ist: „Enforce HTTPS“ aktivieren.

Hinweis: coolwebtoday.org leitet derzeit von https auf http um. Nach der Umstellung auf GitHub Pages übernimmt GitHub das Zertifikat.

## Vor dem Livegang

- [ ] Impressum: Anschrift, E-Mail, Gewerbewortlaut, Behörde, Kammer, UID bzw. Kleinunternehmerhinweis
- [ ] Datenschutz: Platzhalter füllen, Übermittlungsgrundlage USA prüfen, rechtlich prüfen lassen
- [ ] `data/site.json`: Kontakt-E-Mail
- [ ] Journeys: Inhalte, Dauer, Preise festlegen (die vorhandenen Einträge sind Entwürfe)
- [ ] Vor dem Verkauf an Verbraucher: AGB, Widerrufsbelehrung, Preisangaben
- [ ] Werkzeugkatalog: Einträge einmal selbst gegenprüfen
