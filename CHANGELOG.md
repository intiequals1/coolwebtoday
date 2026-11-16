# Änderungsprotokoll

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
