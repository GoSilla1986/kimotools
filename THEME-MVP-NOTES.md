# Theme MVP — Was jetzt funktioniert & was noch kommt

**Branch:** `hybrid-theme-refactor`
**Status:** MVP komplett — Light Default + Dark Toggle funktioniert auf allen 5 Pages
**Datum:** 11. Juni 2026

---

## ✅ Was im MVP funktioniert

### Theme-System
- Zentrale `css/theme.css` mit Light + Dark Token-Variants
- FOUC-Prevention via Inline-Script im `<head>` (vor jedem CSS-Load)
- System-Preference-Detection (`prefers-color-scheme`) als Default
- localStorage-Persistence der User-Wahl
- Live-Update wenn User OS-Theme ändert (nur wenn er nichts manuell gewählt hat)
- Theme-Toggle-Button (Sonne/Mond Phosphor Icons) in der Pill-Nav aller 5 Pages
- Smooth Color-Transition beim Switch (mit FOUC-Suppression auf initial Load)

### Themed Tokens (in beiden Modes funktional)
- `--bg`, `--surface`, `--surface-2`
- `--text`, `--text-secondary`, `--text-muted`, `--text-tertiary`
- `--border`, `--border-2`, `--border-hover`
- `--accent`, `--accent-hover`, `--accent-glow`, `--accent-subtle`, `--accent-on`
- `--shadow-color`, `--shadow-color-strong`
- `--bg-translucent`, `--bg-translucent-strong`, `--hero-overlay`

### Light-Mode Brand-Werte (per CLAUDE.md)
- BG: `#FAFAF8` (warm off-white)
- Text: `#0A0A0A`
- Accent: `#2C4A3D` (Deep Forest Green) / Hover `#3D6552`

---

## ⚠️ Was im MVP noch nicht 100% sauber ist

Im Light Mode werden viele page-lokale Hex-Codes weiterhin Dark-Mode-Werte zeigen — die Page wirkt im Light-Mode "halb light, halb dark". Diese Stellen müssen in einer Folge-Session gezielt zu semantischen Tokens migriert werden.

### Hardcoded Dark-Color-Vorkommen (nicht im Token-System)

**`index.html`** — viele `rgba(255,255,255,0.05)` und ähnliche White-Alpha-Werte (sichtbar auf dunklem Hintergrund, unsichtbar auf hellem):
- Section-Backgrounds, Card-Hovers, Border-Highlights
- Etwa 20-30 Vorkommen, geschätzt

**`tools.html`** — sehr ähnlich, plus:
- Drawer-Overlays mit `rgba(6,6,14,...)` (akzeptabel für Modal-Backdrop)
- Tool-Card-Backgrounds mit hardcoded Werten

**`compare.html`** — größte Page mit:
- Kategorie-Farben (`--color-expose: #a78bfa` etc.) — diese sollten theme-agnostisch sein, sind sie aber als hellere Pastell-Töne gedacht für Dark Mode. Bei Light Mode evtl. anpassen.
- Picker-Hovers, Selection-States

**`datenschutz.html` / `impressum.html`** — minimal, vermutlich nur 1-2 Stellen jeweils

---

## 📋 Plan für vollständigen Light-Mode-Refactor (separate Session, ~3-4h)

### Schritt 1 — Audit aller hardcoded Colors (15 Min)
```bash
grep -nE "#[0-9a-fA-F]{3,8}\b|rgba\(" index.html tools.html compare.html | wc -l
```
Liefert Liste aller Vorkommen, gruppiert nach Page.

### Schritt 2 — Pro Page systematisch durchgehen (60-90 Min/Page)
Für jeden hardcoded Color:
1. Welcher Theme-Token passt semantisch? (z.B. `rgba(255,255,255,0.05)` → `var(--surface)`)
2. Falls kein Token passt: neuen semantischen Token in theme.css definieren
3. Replace in der Page

### Schritt 3 — Light-Mode visuell testen (30 Min)
- Jede Page in Light Mode aufrufen
- Screenshots machen
- Auffällige "Halb-Dark"-Stellen identifizieren und fixen

### Schritt 4 — Kategorie-Farben für Light Mode anpassen (30 Min)
Aktuelle Kategorie-Farben sind Pastell für Dark BG:
- `--color-expose: #a78bfa` (light purple) → bei Light BG eher gesättigter
- `--color-foto: #34d399` → ggf. dunkler
- etc.

Lösung: per Theme variieren via `[data-theme="light"]` und `[data-theme="dark"]` overrides.

### Schritt 5 — Light-Mode-spezifische Adjustments
- Hero-Section: ohne dunklen Overlay, evtl. anderer Treatment
- Editorial-Typography stärker betonen (per CLAUDE.md)
- `<em>` Wörter im Akzent-Grün

---

## 🎨 Style-Inkonsistenzen die in einer separaten Refactor-Session adressiert werden sollten

Sobald die Color-Tokens komplett tokenisiert sind, ist der nächste Schritt:

**Light-Mode Editorial Polish** (per CLAUDE.md):
- Mehr Weißraum (Padding/Margin in Sections erhöhen)
- Größere Typographie-Hierarchie (Hero 4-5x Body-Size)
- Italics als Akzent (Instrument Serif italic auf Schlüsselwörtern)
- Subtile Border statt harten Backgrounds
- Vaulk/LAGOM-Vibe stärker rausarbeiten

Diese Polish-Arbeit ist **separat** vom Theme-Refactor — Theme bringt die Variablen, Polish nutzt sie für eine spezifische Light-Mode-Ästhetik.

---

## 🚀 Acceptance des MVP

- [x] Theme-Toggle existiert auf allen 5 Pages
- [x] Light Mode ist Default (mit System-Preference-Override)
- [x] Dark Mode wird korrekt als Toggle persistiert
- [x] Keine FOUC auf initial Load
- [x] Toggle persistiert über Page-Wechsel
- [x] Smooth Transition zwischen Themes
- [x] Hauptelemente (BG, Text, Akzent, Borders) switchen sauber
- [ ] *Verschoben:* Alle Detail-Elements perfekt im Light Mode
- [ ] *Verschoben:* Light-Mode Editorial Polish per CLAUDE.md
- [ ] *Verschoben:* Light-Mode Lighthouse-Score 100 SEO

**Empfehlung:** MVP-Branch in PR/Review nehmen. Folgesession kann den vollständigen Light-Mode-Polish machen — als separater Branch `light-mode-polish` aufsetzbar.
