# Änderungsprotokoll

## 2026-11-16 – Hinweis „im Aufbau“

### Was geändert wurde

- Alle Seiten mit Kopfzeile (`404.html` hat keine): Unter der Kopfzeile steht auf jeder Seite der Hinweis „Diese Website ist noch im Aufbau. Inhalte und Funktionen werden laufend ergänzt und verbessert.“, gleichlautend mit dangulea.at. Stile in `assets/site.css`.

### Warum

- Auf Wunsch des Betreibers tragen alle eigenen Websites denselben Hinweis zum Entwicklungsstand. Das macht sichtbar, dass Inhalte und Funktionen sich noch ändern.

## 2026-11-16 – Satz zur Verbraucherschlichtung entfernt

### Was geändert wurde

- `impressum.html`: Der Abschnitt „Verbraucherschlichtung“ mit dem Satz „Ich bin weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.“ ist entfernt.

### Warum

- Die Formulierung stammt aus dem deutschen Verbraucherstreitbeilegungsgesetz (§ 36 VSBG). Für ein österreichisches Einzelunternehmen gilt das Alternative-Streitbeilegung-Gesetz (AStG). Nach § 19 AStG muss nur informieren, wer sich zur Teilnahme an Schlichtungsverfahren verpflichtet hat oder gesetzlich dazu verpflichtet ist. Wer das nicht ist, braucht vorab keinen Hinweis auf der Website (WKO, „Alternative Streitbeilegung in Verbraucherangelegenheiten“).
- Ob im Einzelfall eine Schlichtung in Frage kommt, bleibt damit offen. Der Satz legte das vorab unnötig und schroff ablehnend fest. Kommt es zu einem konkreten Streitfall, der sich nicht direkt lösen lässt, ist dann zu sagen, ob man an einem Verfahren teilnimmt (§ 19 Abs. 3 AStG).
- Auf Rückfrage des Betreibers, der den Satz für unsicher und unpassend formuliert hielt.

## 2026-11-16 – Datenschutzhinweis

### Was geändert wurde

- `assets/site.js`, `assets/site.css`: Auf allen Seiten mit `site.js` erscheint am unteren Rand ein Datenschutzhinweis. Er informiert nur: keine Cookies, kein Tracking, keine externen Dienste; Werkzeug-Eingaben bleiben im Browser. Es gibt keine Auswahl und keine Einwilligungsabfrage. „Verstanden“ schließt den Hinweis und speichert im localStorage den Schlüssel `cwt.datenschutzhinweis.v1` mit dem Wert `geschlossen`. Ist localStorage gesperrt, verschwindet der Hinweis nur für den aktuellen Seitenaufruf.
- `datenschutz.html`: neuer Abschnitt „Datenschutzhinweis“ (Zweck, Schlüssel, Speicherdauer, Rechtsgrundlage § 165 Abs. 3 TKG 2021), Punkt in „Kurz gesagt“ ergänzt, Stand 16. November 2026.
- `data/site.json` und die statischen `data-stand`-Ersatztexte: Stand 16. November 2026.

### Warum

- Am 16.11.2026 wurden alle eigenen Websites (dangulea.at, erp.contact, ethics.at, digitalpath.at, coolwebtoday.org) live geprüft: Cookies, Browser-Speicher und angefragte Hosts. Anlass war, dass dangulea.at Schriftarten bis dahin von Google-Servern geladen hatte.
- coolwebtoday.org war bereits sauber: nur Anfragen an die eigene Domain, lokale Schriften, keine Cookies, localStorage nur nach eigener Eingabe in den Werkzeugen. Das ist in der Datenschutzerklärung korrekt beschrieben.
- Der Hinweis wurde auf Wunsch des Betreibers für alle Seiten einheitlich eingeführt. Damit sehen Besucherinnen und Besucher sofort, dass nichts nachverfolgt wird, und finden die Datenschutzerklärung mit einem Klick.
- Eine Einwilligung wird bewusst nicht abgefragt. Die Seite setzt nichts ein, was eine Einwilligung erfordert. Ein „Akzeptieren“-Knopf würde etwas anderes suggerieren (vgl. DSB-FAQ zu Cookies: Einwilligung nur für technisch nicht notwendige Cookies und vergleichbare Speicherungen).
- Das Schließen wird gemerkt, damit der Hinweis nicht bei jedem Seitenaufruf wiederkommt. Diese Speicherung selbst ist in der Datenschutzerklärung offengelegt.

## 2026-11-16 – Verweis auf die ePrivacy-Richtlinie

### Was geändert wurde

- Datenschutzerklärung, Abschnitt „Datenschutzhinweis“: Neben § 165 Abs. 3 TKG 2021 steht jetzt auch die zugrunde liegende EU-Norm, Art. 5 Abs. 3 der ePrivacy-Richtlinie 2002/58/EG.

### Warum

- Auf Hinweis des Betreibers. § 165 Abs. 3 TKG 2021 setzt die Vorgabe der ePrivacy-Richtlinie für das Speichern von Informationen im Endgerät in österreichisches Recht um. Der Doppelverweis macht für Leserinnen und Leser außerhalb Österreichs nachvollziehbar, auf welcher Regel die einwilligungsfreie Speicherung beruht.
