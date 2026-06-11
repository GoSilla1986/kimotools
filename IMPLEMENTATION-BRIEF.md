# Implementation Brief — Kimotools Tech-Fixes & Hybrid Theme Refactor

**Created:** 11. Juni 2026
**Estimated work:** 10 hours (split into 2-3 sessions of ~3-4h each)
**Goal:** Bring kimotools.de from SEO-Score 4/10 to 8/10 + add Hybrid Theme (Light default + Dark toggle)

---

## 📋 Read these first (in order)

1. **`/Users/d065335/kimotools/CLAUDE.md`** — Brand vision (light editorial premium)
2. **`/Users/d065335/kimotools/SEO-AUDIT.md`** — All findings + fixes prioritized
3. **`/Users/d065335/kimotools/SEO-STRATEGY.md`** — Future content plan (so refactor doesn't break it)
4. **`/Users/d065335/kimotools/AFFILIATE-RESEARCH.md`** — Top money tools (so refactor sets up tracking correctly)

---

## 🎯 Three work blocks

### Block 1 — Critical Tech Fixes (~2 hours)

**Image optimization:**
1. Install: `brew install webp imagemagick`
2. Convert all `/images/*.png` and `*.jpg` to WebP with max width 1920px, quality 80
3. Update HTML files to reference `.webp` instead of `.png`/`.jpg`
4. Add `loading="lazy"` to all non-hero images
5. Verify visually that all images still load

**Meta tags + Schema (in all 5 HTML files: index, tools, compare, datenschutz, impressum):**
1. Add `<link rel="canonical">` per page
2. Add Open Graph meta tags (og:type, og:url, og:title, og:description, og:image, og:locale)
3. Add Twitter Card meta tags
4. Add `application/ld+json` Schema.org markup:
   - **index.html:** WebSite + Organization
   - **tools.html:** ItemList of all 33 tools with Product schema for each
   - **compare.html:** WebApplication
   - All pages: BreadcrumbList
5. Create OG image (1200x630px) — use the brand colors and typography from CLAUDE.md

**Verification:**
- Run https://search.google.com/test/rich-results on each page
- Run Lighthouse on each page (target: SEO 100, Performance >85)
- Test social share preview with https://www.opengraph.xyz/

### Block 2 — Hybrid Theme Refactor (~6-8 hours)

**Strategy:** Light mode is default (per CLAUDE.md), Dark mode is opt-in toggle.

**Step 1 — CSS Token system:**
- Define semantic color tokens in `:root` (light defaults from CLAUDE.md)
- Define dark variants in `[data-theme="dark"]`
- Tokens needed: `--bg`, `--surface`, `--text`, `--text-secondary`, `--text-muted`, `--border`, `--accent`, `--accent-hover`, `--shadow-color`
- Light values: `--bg: #FAFAF8`, `--text: #0A0A0A`, `--accent: <not-purple, see CLAUDE.md anti-references>`
- Dark values: keep current `#06060e` etc. as the dark theme

**Step 2 — Refactor each HTML file (5 files):**
For each `<style>` block:
1. Replace hex colors with `var(--token)` references
2. Make sure no hard-coded colors remain
3. Ensure both light and dark themes are visually tested

**Step 3 — Theme Toggle component:**
- Add toggle button in nav (sun/moon icon from Phosphor Icons)
- Vanilla JS in `js/theme.js`:
  - On load: check `localStorage.getItem('theme')` → fall back to `prefers-color-scheme: dark` → fall back to `'light'`
  - On click: toggle `document.documentElement.dataset.theme` between 'light' and 'dark'
  - Persist choice to localStorage
- Avoid FOUC (Flash Of Unstyled Content): inline `<script>` in `<head>` to set theme before page renders

**Step 4 — Verify:**
- All 5 pages tested in light mode
- All 5 pages tested in dark mode
- Toggle persists across pages
- No FOUC on initial load
- Lighthouse Accessibility still 100

### Block 3 — Cleanup (~30 min)

1. Delete or move to `/_archive/`: `index-backup.html`, `index-premium.html`, `index-v2.html`, `logo-preview.html`, `logo-test.html`
2. Pin Phosphor Icons to a specific version: `<script src="https://unpkg.com/@phosphor-icons/web@2.x.x">`
3. Update sitemap.xml `<lastmod>` dates after deploy

---

## 🚦 Acceptance criteria

After this work is done:
- [ ] Mobile Lighthouse Performance > 85
- [ ] SEO score 100 on all 5 pages
- [ ] Rich Results Test passes for index + tools
- [ ] Social share previews work (LinkedIn, Twitter, Facebook)
- [ ] Theme toggle works on all pages with persistence
- [ ] No FOUC on theme load
- [ ] All images < 500KB each
- [ ] CLAUDE.md still accurate (or updated to reflect hybrid)

---

## 🚧 Out of scope (do NOT do in this session)

- Writing new SEO articles (that's a separate session, see SEO-STRATEGY.md)
- Setting up affiliate tracking redirects (separate task)
- Newsletter integration (separate task)
- Adding new tool pages (separate task)
- Changing the underlying tool data structure

---

## ⚠️ Things to ask the user before starting

1. **Light Mode accent color:** CLAUDE.md says "avoid purple/cyan, no dark mode with glowing accents" — what's the actual accent color for light mode? Suggest 2-3 options (e.g., warm terracotta, restrained navy, deep forest green) before refactoring.
2. **Default theme:** Confirm light is the default (per CLAUDE.md), not "auto" based on system preference.
3. **Toggle position:** In the existing pill-shaped nav? As a new icon? Separate place?
4. **Branch strategy:** Are we working on `main` directly, or should I create a feature branch like `hybrid-theme-refactor`?
