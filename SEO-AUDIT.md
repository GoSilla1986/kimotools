# Kimotools — SEO-Audit

**Stand:** 11. Juni 2026
**Auditor:** Claude Opus 4.7
**Scope:** index.html, tools.html, compare.html, datenschutz.html, impressum.html + globale Foundation (robots.txt, sitemap.xml, /images, /css, /js)

---

## 🚨 Executive Summary

**Gesamtbewertung:** 4/10

Die Seite hat eine solide Grundstruktur (Sitemap ✓, Robots.txt ✓, semantisches HTML ✓), aber **kritische SEO-Lücken und ein massives Performance-Problem** verhindern aktuell jede Chance auf gutes Ranking.

**Top 3 Findings (höchster Impact):**
1. 🔴 **Bilder-Performance:** Mehrere Bilder >5 MB pro Datei = Mobile Lighthouse Score wahrscheinlich <40
2. 🔴 **Keine Schema.org Markup:** Verschenkt Rich Snippets, Featured Snippets, Knowledge Graph
3. 🔴 **Brand-Konflikt:** Site ist Dark Mode mit Purple — die eigene CLAUDE.md verbietet beides explizit

---

## 🔴 KRITISCHE FIXES (sofort, vor Content-Produktion)

### 1. Bilder-Performance ist katastrophal
**Problem:** `/images/` enthält Bilder mit absurden Dateigrößen:

| Datei | Größe | Status |
|---|---|---|
| project3.png | 6.9 MB | 🔴 Kritisch |
| full-img-1.png | 6.4 MB | 🔴 Kritisch |
| project4.png | 3.7 MB | 🔴 Kritisch |
| hero.mp4 | 3.9 MB | 🟡 OK falls lazy-loaded |
| project1.png | 2.0 MB | 🟡 Reduzieren |

**Impact:** Mobile-Nutzer mit 4G laden mehrere Sekunden. Google bestraft Core Web Vitals (LCP > 2.5s = Ranking-Verlust).

**Fix:**
```bash
# Konvertiere alle PNGs zu WebP, max 1920px breit, ~80% Quality
brew install webp imagemagick

cd /Users/d065335/kimotools/images/
for img in *.png *.jpg; do
    cwebp -q 80 -resize 1920 0 "$img" -o "${img%.*}.webp"
done
```

**Erwartung:** 95% Größenreduktion (6.9 MB PNG → ~300 KB WebP).

### 2. Keine Schema.org / JSON-LD Markup
**Problem:** Komplette Seite hat KEIN strukturiertes Markup. Google kann nicht erkennen:
- Dass es eine Software-/Tool-Bewertung ist
- Wer der Author/Publisher ist
- Welche Tools verglichen werden
- FAQ-Inhalte für Featured Snippets

**Impact:** Verlierst sofort 30-50% des SERP-Real-Estates (keine Rich Snippets, keine Sterne-Bewertungen, kein Sitelinks-Search-Box).

**Fix:** Pro Tool-Detail-Page brauchst du `Product` + `Review` Schema. Pro Artikel `Article` + `FAQPage` Schema. Code dazu liefere ich in Task #6 inline mit jedem Artikel.

**Quick-Win für Index:** Füge dieses JSON-LD jetzt schon im `<head>` der index.html ein:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KImotools",
  "description": "Kuratierte KI-Tools für Immobilienmakler",
  "url": "https://www.kimotools.de",
  "publisher": {
    "@type": "Organization",
    "name": "KImotools",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.kimotools.de/logo-kimo.svg"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.kimotools.de/tools.html?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 3. Open Graph + Twitter Cards fehlen komplett
**Problem:** Wenn jemand kimotools.de auf LinkedIn, Facebook, Twitter, WhatsApp teilt, gibt es **keinen schönen Preview** — nur ein nackter Link.

**Impact:** Verheerende Click-Through-Rate auf Social Media. Bei Affiliate-Sites ist Social-Sharing oft 20-40% des Traffics.

**Fix:** In jeden `<head>` einbauen (mit page-spezifischen Werten):

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.kimotools.de/">
<meta property="og:title" content="KImotools — KI-Tools für Immobilienmakler">
<meta property="og:description" content="33 KI-Tools für Immobilienmakler, kuratiert und bewertet. Direkt vergleichbar.">
<meta property="og:image" content="https://www.kimotools.de/og-image.png">
<meta property="og:locale" content="de_DE">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="KImotools — KI-Tools für Immobilienmakler">
<meta name="twitter:description" content="33 KI-Tools für Immobilienmakler, kuratiert und bewertet.">
<meta name="twitter:image" content="https://www.kimotools.de/og-image.png">
```

**TODO:** OG-Image (1200x630px) erstellen — kann ich in Task #6 mit-generieren.

### 4. Canonical Tags fehlen
**Problem:** Keine `<link rel="canonical">` auf irgendeiner Page. Wenn jemand kimotools.de mit `?utm=...` oder `/index.html` aufruft, sieht Google das als Duplicate Content.

**Fix:** In jeden `<head>`:
```html
<!-- index.html -->
<link rel="canonical" href="https://www.kimotools.de/">

<!-- tools.html -->
<link rel="canonical" href="https://www.kimotools.de/tools.html">

<!-- etc. -->
```

### 5. Brand-Konflikt: Dark Mode vs CLAUDE.md
**Problem:** Deine eigene `/Users/d065335/kimotools/CLAUDE.md` definiert **explizit**:
- ✅ "Light mode base — warm off-white #FAFAF8"
- ❌ "Anti-reference: Dark mode with glowing accents (overdone in AI tools)"
- ❌ "Avoid purple/cyan AI clichés"

Aber `index.html` ist:
- 🚫 `--bg: #06060e` (Dark Mode)
- 🚫 `--accent: #7c5cfc` (Purple!)
- 🚫 `--accent-glow: rgba(124,92,252,0.18)` (Glow!)

**Frage an dich:** Hast du die Brand-Direction bewusst geändert oder ist das "alter Stand"? Falls bewusst geändert → CLAUDE.md updaten. Falls Versehen → Site überarbeiten (großer Job).

---

## 🟡 MITTLERE FIXES (Phase 1, vor erstem Artikel)

### 6. Title Tags optimieren
**Aktuell:**
- index.html: `KImotools — KI-Tools für Immobilienmakler` (44 Zeichen) ✅ OK
- tools.html: `Alle KI-Tools für Makler — KImotools` (39 Zeichen) ✅ OK
- compare.html: `KI-Tools Vergleichen — KImotools` (32 Zeichen) ⚠️ Zu kurz
- datenschutz.html: `Datenschutz — KImotools` ✅ OK
- impressum.html: `Impressum — KImotools` ✅ OK

**Optimierung:**
- compare.html → `Bis zu 4 KI-Tools für Makler vergleichen | KImotools` (52 Zeichen, Long-Tail)

### 7. Meta Descriptions verbessern
Aktuelle Descriptions sind beschreibend, aber **fehlen Call-to-Actions**:

**Vorher:** "33 KI-Tools für Immobilienmakler, kuratiert und bewertet."
**Nachher:** "33 KI-Tools für Immobilienmakler im Vergleich — kuratiert, bewertet und direkt vergleichbar. Jetzt das richtige Tool für dein Maklerbüro finden →"

(155 Zeichen Limit nutzen, CTA mit Pfeil signalisiert Action)

### 8. Heading-Hierarchie prüfen
Schnell-Check:
- ✅ Jede Page hat genau 1x `<h1>`
- ⚠️ `<h1>` enthält `<br>` und `<em>` → für Screenreader OK, aber Title-Optimierung schwer

**Empfehlung:** H1 einfacher halten, semantisch sauber:
```html
<!-- Statt: <h1>KI-Tools für<br><em>Immobilienmakler</em></h1> -->
<h1>KI-Tools für Immobilienmakler</h1>
```

Visuelle Splittung über CSS lösen (`white-space: pre-line` oder `<span>` mit Klasse).

### 9. Internal Linking Strategie fehlt
**Problem:** Keine Cross-Links zwischen Tools, Kategorien, oder zu künftigen Artikeln. Google erwartet thematische Cluster.

**Fix:** Bei jedem Tool-Eintrag verlinken auf:
- Verwandte Tools (z.B. ChatGPT → "Auch interessant: Neuroflash, Jasper")
- Kategorie-Page
- Künftig: Artikel zu dem Tool

### 10. `lang` Attribut nur "de", kein Englisch?
**Aktuell:** `<html lang="de">`  ✅ Korrekt

Du hast keine englische Version. Anders als beim AI Tools Hub (43 DE + 43 EN). Strategisch klug — Makler-Markt ist national.

### 11. Sitemap.xml ist mager (5 URLs)
**Aktuell:** Nur 5 Pages. Wird wachsen.

**Action für Phase 2:** Auto-Generation der Sitemap einrichten oder bei jedem Artikel manuell ergänzen.

---

## 🟢 KLEINE FIXES (kann mit künftigem Content kommen)

### 12. `<link rel="alternate" hreflang>` aktuell nicht nötig
Da nur deutsche Version existiert.

### 13. Favicon vorhanden ✅
`favicon.svg` und `favicon-kimo.svg` da.

### 14. Mobile Viewport Meta vorhanden ✅
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### 15. Sicherheit: `<script>` von unpkg.com
```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```
**Empfehlung:** Auf konkrete Version pinnen (`@phosphor-icons/web@2.0.3`) — sonst kann ein gehacktes Package deine Site kapern. Oder selbst hosten.

### 16. Externe Fonts blockieren Render
Google Fonts werden synchron geladen. Mit `font-display: swap` bauen, oder selbst hosten:

```html
<link href="...&display=swap" rel="stylesheet">
```
✅ Bereits drin (`&display=swap` in URL).

### 17. Dateien aufräumen
Im Repo liegen:
- `index-backup.html`, `index-premium.html`, `index-v2.html`
- `logo-preview.html`, `logo-test.html`

**Action:** robots.txt blockt schon die ersten zwei. Aber besser: löschen oder nach `/_archive/` verschieben.

---

## 📊 Lighthouse-Score-Schätzung (heutiger Stand)

| Metrik | Geschätzt | Optimum |
|---|---|---|
| Performance (Mobile) | **30-40** 🔴 | >90 |
| Performance (Desktop) | 60-70 🟡 | >90 |
| SEO | **50-60** 🟡 | 100 |
| Accessibility | 80-90 🟢 | 100 |
| Best Practices | 80-90 🟢 | 100 |

Hauptverlierer: Performance (Bilder!) und SEO (fehlendes Schema, OG, Canonicals).

---

## 🎯 Priorisierter Action Plan

**Bis Ende Woche (kritisch, ~2-3h Aufwand):**
1. ⚠️ Brand-Direction klären: Dark Mode beibehalten oder zur CLAUDE.md zurückkehren?
2. 🔴 Alle PNG/JPG Bilder zu WebP konvertieren, max 1920px (1 Befehl, 5 Min)
3. 🔴 Canonical-Tags in alle 5 Pages
4. 🔴 Open Graph + Twitter Card Meta-Tags in alle 5 Pages
5. 🔴 OG-Image (1200x630) erstellen
6. 🔴 Schema.org WebSite-JSON-LD in index.html

**Phase 2 (mit Content-Production parallel):**
7. 🟡 Title-Tags und Meta-Descriptions verbessern (CTA hinzufügen)
8. 🟡 H1 simplifizieren
9. 🟡 Internal Linking Plan umsetzen (mit jedem neuen Artikel)
10. 🟡 Schema.org pro Tool-Detail-Page (Product + Review)
11. 🟢 Aufräumen (alte Backup-Files entfernen)
12. 🟢 unpkg.com Script auf Version pinnen

**Phase 3 (nach erstem Traffic):**
13. Google Search Console einrichten (falls noch nicht)
14. Sitemap.xml automatisieren
15. Strukturiertes Daten Test (search.google.com/test/rich-results)
16. Lighthouse-Tests pro Page

---

## ✅ Was schon gut ist

- ✅ Robots.txt vorhanden und korrekt
- ✅ Sitemap.xml vorhanden
- ✅ HTTPS (kimotools.de hat SSL)
- ✅ Mobile Viewport gesetzt
- ✅ `lang="de"` korrekt
- ✅ Semantisches HTML5 (`<nav>`, `<section>`, etc.)
- ✅ Saubere Title-Tags (gerade richtige Länge)
- ✅ Meta-Descriptions auf den meisten Pages
- ✅ Eigene CLAUDE.md mit klarer Brand-Vision (auch wenn aktueller Stand abweicht)
- ✅ Eigenständige Domain (`kimotools.de`, nicht Subdomain)

---

## 🤔 Brand-Diskrepanz: Klare Frage an dich

Die größte strategische Frage aus diesem Audit:

**`CLAUDE.md` definiert Light-Mode-Editorial-Premium.**
**`index.html` ist Dark-Mode mit Purple-Glow.**

Welche der beiden ist die "wahre Vision"?

- **Variante A (CLAUDE.md gewinnt):** Light, off-white, editorial, restrained → bedeutet **Site-Redesign nötig** (großer Job, aber konsistent)
- **Variante B (Live-Site gewinnt):** Dark, purple, modern AI vibe → bedeutet **CLAUDE.md updaten**, Site so lassen
- **Variante C (Hybrid):** Light Mode behalten als Default, aber Dark Mode-Toggle anbieten → mehr Aufwand, aber zeitgemäß

Die Antwort beeinflusst alle künftigen Artikel-Templates und neue Pages. Bitte vor Content-Production klären.
