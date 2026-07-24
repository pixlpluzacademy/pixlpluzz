# Pixl Pluz — UI/UX Design Guidelines

> **Purpose:** Persistent design rules for agents and developers. The customer site is **dark-mode first**. Follow this file whenever building or editing UI — no need to re-explain design intent in every chat.

**Last updated:** 2026-07-18

---

## 1. Brand identity

| Element | Rule |
|---------|------|
| **Primary palette** | Command Blue, Electric Verdant, Pure White, Butter Glow (from branding PDF). |
| **Mode** | Dark mode is the default experience. Light sections are secondary. |
| **Mood** | Modern, tech-forward, agency-grade — not corporate or flat. |
| **Pixel motif** | Keep pixel corners, dot/grid backgrounds, and floating pixels as brand texture. |

---

## 2. Colour system

### Surfaces — black canvas

Use true black-based surfaces. Blue/green/butter are accents only — never large solid colour fills for sections.

| Role | Target |
|------|--------|
| Page background | `#000000` / `bg-black` |
| Section background | `#0a0a0a` – `#111111` |
| Elevated cards | `#141414` with `border-white/8` |
| Hero | Black base + blue atmosphere glow (+ soft green spark on the warm side) |

### Brand tokens

```css
--color-blue-primary:  #143d8f;  /* Command Blue */
--color-green-accent:  #54e345;  /* Electric Verdant */
--color-butter-glow:   #fffaa4;  /* Butter Glow */
/* Pure White = #ffffff */
```

| Colour | Role |
|--------|------|
| **Electric Verdant `#54E345`** | **Section headings (H2), card titles, primary buttons** — main highlight on dark |
| **Pure White** | Body copy, nav, secondary text |
| **Command Blue `#143D8F`** | Atmosphere (radials, grids), secondary chrome, header Contact |
| **Butter Glow `#FFFAA4`** | Rare accents only (e.g. “Scholarship Fund”, badges) — never headings or buttons |

### Headings & buttons (locked)

On dark backgrounds, highlight must read clearly:

| Element | Colour |
|---------|--------|
| Section H2 / card titles | `text-green-accent` |
| Hero H1 | White lines + one green key line (e.g. “AI Integrated”) |
| Primary CTA | `btn-cta-green` (green fill, dark text) |
| Secondary CTA | White outline → green on hover |
| Butter Glow | Accents only — not headings or buttons |

### Neon / glow effects

- **Hero / sections:** blue radial `rgba(20, 61, 143, 0.14–0.28)` on black; soft green spark optional.
- **Cards on hover:** `border-green-accent/40`, soft green shadow.
- **Butter:** tiny sparks — not continuous chrome.

Avoid: navy section fills, blue primary CTAs, butter on headings/buttons.

---

## 3. Buttons & CTAs

**Rule: Primary CTAs and section headings use Electric Verdant** so they pop on black.

| Type | Style | Example labels |
|------|-------|----------------|
| **Primary CTA** | Green fill (`btn-cta-green`, dark text) | Apply For Scholarship, Apply Now, Enroll Now |
| **Secondary CTA** | Outline — white border, green border + text on hover | Explore Courses, Learn More, View All |
| **Tertiary / text link** | `text-green-accent` with underline on hover | join our counselling session |

**Do not** use blue gradient fills (`btn-primary-fill`) for primary actions. Reserve blue for atmosphere and header Contact.

Hover: slight brightness increase + soft green glow. Active: `scale(0.98)`.

---

## 4. Typography & text layout

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Display / H1–H4 | Red Hat Display | 700–900 (black) | All main headings |
| Body / paragraphs | Arial | 400–600 | `leading-relaxed`; justified where required |
| Labels / kickers / UI chrome | Arial | 600 | Uppercase labels, buttons, nav |
| Mono / terminal | System mono | — | Event/career script blocks only |

### Text alignment — **justify body copy**

All paragraph and card description text must use **justified alignment**:

```html
<p className="text-justify ...">
```

Apply to: section intros, feature card descriptions, accordion bodies, FAQ answers, course card descriptions, blog excerpts.

**Exceptions (keep centered or left):**
- Hero H1 and kicker (centered)
- Section H2 titles (centered when in `text-center` blocks)
- Short labels, buttons, nav, mentor names, advantage grid labels (left or centered per layout)
- Single-line subtitles under centered headings may stay centered if justified looks uneven at narrow widths

---

## 5. Section patterns

### Dark sections (majority)
`bg-black` or `bg-[#0a0a0a]`, white headings, `text-gray-400` body, pixel-dot or grid overlay at low opacity.

### Light sections (minority — About, Purpose, FAQ, Blog)
`bg-white dark:bg-black` — in dark mode these should still read as dark, not navy.

### Cards
- Border: `border-white/8` or `border-white/10`
- Hover: green border accent, slight lift (`-translate-y-1`)
- Image overlays: black gradient from bottom, not navy

### Contact section
Already uses `bg-black` — use this as the reference for other sections.

---

## 6. Content rules (design + copy overlap)

These affect what appears on screen:

| Rule | Detail |
|------|--------|
| **No scholarship numbers** | Do not show ₹ amounts, lakh figures, fund totals, or percentage fee waivers (e.g. no "₹50 Lakh", no "100% fee waiver"). Say "scholarship program", "scholarship fund", "merit-based support". |
| **No placement percentages** | Do not use "100% placement", "100% placement assistance", or similar guaranteed claims. Say "placement support", "career support", "career guidance". |
| **No fake stats** | Avoid invented numeric claims in hero stats, counters, or badges unless verified by client. |

See `docs/SEO-CONTENT-SPECS.md` for word-length targets and SEO copy rules.

---

## 7. Accessibility & motion

- Respect `prefers-reduced-motion`: disable scrub animations, parallax, and stagger reveals.
- Maintain contrast: green CTA text on green fill needs dark text (`#000` or `#060b16`).
- Focus states: visible outline using `green-accent` or `blue-primary`.
- All images: meaningful `alt` text (except decorative overlays marked `aria-hidden`).

---

## 8. Component checklist (before shipping UI)

- [ ] Background is black-based, not navy
- [ ] Blue/green glow present on hero or key sections
- [ ] Primary CTA is **green**
- [ ] Body paragraphs use `text-justify`
- [ ] No scholarship rupee amounts or placement % claims in visible copy
- [ ] Hover states use green accent
- [ ] Dark mode looks intentional (not a grey/navy afterthought)

---

## 9. Migration notes (current codebase)

Files still using navy / blue CTAs / forbidden copy — update when touching these areas:

| File | Issue |
|------|-------|
| `HeroSection.tsx` | Intentionally unchanged — navy gradient + blue CTA kept per client request |
| `AboutContent.tsx`, `PlacementHero.tsx`, `layout.tsx` | Numeric scholarship / placement claims in metadata and stats |

---

*When in doubt: black background, blue atmosphere, green action.*
