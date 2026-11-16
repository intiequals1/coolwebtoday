/* CoolWebToday – gemeinsame Hilfsfunktionen. Kein Tracking, keine externen Anfragen. */
(function () {
  "use strict";

  var root = document.documentElement.getAttribute("data-root") || "";

  function url(path) { return root + path; }

  function loadJSON(path) {
    return fetch(url(path), { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(path + " konnte nicht geladen werden (" + r.status + ")");
      return r.json();
    });
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var store = {
    get: function (key, fallback) {
      try { var v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    remove: function (key) {
      try { window.localStorage.removeItem(key); return true; }
      catch (e) { return false; }
    }
  };

  function copy(text, feedbackEl, selectEl) {
    function done(msg) { if (feedbackEl) { feedbackEl.textContent = msg; } }
    function fallback() {
      if (selectEl) {
        var range = document.createRange();
        range.selectNodeContents(selectEl);
        var sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
        done("Text markiert. Mit Strg+C oder ⌘+C kopieren.");
      } else {
        done("Kopieren war nicht möglich. Bitte den Text markieren und kopieren.");
      }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("Kopiert."); }, fallback);
      } else { fallback(); }
    } catch (e) { fallback(); }
  }

  function download(filename, text, mime, feedbackEl) {
    try {
      var blob = new Blob([text], { type: (mime || "text/plain") + ";charset=utf-8" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      if (feedbackEl) feedbackEl.textContent = "Datei „" + filename + "“ wird gespeichert.";
    } catch (e) {
      if (feedbackEl) feedbackEl.textContent = "Speichern war nicht möglich. Bitte den Text kopieren.";
    }
  }

  function formatDate(iso) {
    try {
      var d = new Date(iso + "T12:00:00");
      return d.toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) { return iso; }
  }

  function slug(s) {
    return String(s || "").toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "notiz";
  }

  /* Kontakt und Stand aus data/site.json in die Seite schreiben */
  function fillSite(site) {
    var email = site && site.kontakt && site.kontakt.email;
    document.querySelectorAll("[data-kontakt]").forEach(function (el) {
      if (email) {
        el.innerHTML = '<span class="contact-line"><code>' + esc(email) + '</code>' +
          '<a href="mailto:' + esc(email) + '">E-Mail schreiben</a></span>';
      } else {
        el.textContent = (site && site.kontakt && site.kontakt.hinweis) || "Kontaktadresse folgt.";
      }
    });
    document.querySelectorAll("[data-stand]").forEach(function (el) {
      if (site && site.stand) el.textContent = formatDate(site.stand);
    });
  }

  var siteReady = loadJSON("data/site.json").then(function (site) { fillSite(site); return site; })
    .catch(function () { fillSite(null); return null; });

  /* Datenschutzhinweis: informiert und fragt keine Einwilligung ab, weil die Seite keine
     Cookies, kein Tracking und keine externen Dienste nutzt. Gespeichert wird nur, dass der
     Hinweis geschlossen wurde (Schlüssel siehe NOTICE_KEY, beschrieben in datenschutz.html). */
  var NOTICE_KEY = "cwt.datenschutzhinweis.v1";

  function privacyNotice() {
    var closed = null;
    try { closed = window.localStorage.getItem(NOTICE_KEY); } catch (e) { closed = null; }
    if (closed === "geschlossen" || !document.body) return;
    var box = document.createElement("aside");
    box.className = "privacy-notice";
    box.setAttribute("aria-label", "Datenschutzhinweis");
    box.innerHTML =
      '<p>Diese Seite setzt keine Cookies und kein Tracking ein und lädt keine externen Dienste. ' +
      'Was du in die Werkzeuge eingibst, bleibt in deinem Browser. Schließt du diesen Hinweis, ' +
      'wird nur das in deinem Browser vermerkt.</p>' +
      '<div class="privacy-notice-actions"><a href="' + esc(url("datenschutz.html")) + '">Datenschutz</a>' +
      '<button type="button" class="btn small">Verstanden</button></div>';
    document.body.appendChild(box);
    document.body.style.paddingBottom = (box.offsetHeight + 24) + "px";
    box.querySelector("button").addEventListener("click", function () {
      try { window.localStorage.setItem(NOTICE_KEY, "geschlossen"); } catch (e) { /* nur für diesen Aufruf */ }
      box.parentNode.removeChild(box);
      document.body.style.paddingBottom = "";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", privacyNotice);
  else privacyNotice();

  window.CWT = {
    url: url, loadJSON: loadJSON, esc: esc, store: store, copy: copy,
    download: download, formatDate: formatDate, slug: slug, site: siteReady
  };
})();
