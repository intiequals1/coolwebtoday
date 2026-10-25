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

  window.CWT = {
    url: url, loadJSON: loadJSON, esc: esc, store: store, copy: copy,
    download: download, formatDate: formatDate, slug: slug, site: siteReady
  };
})();
