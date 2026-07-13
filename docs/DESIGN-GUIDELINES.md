# Pixl Pluz — UI/UX Design Guidelines

> **Purpose:** Persistent design rules for agents and developers. The customer site is **dark-mode first**. Follow this file whenever building or editing UI — no need to re-explain design intent in every chat.

**Last updated:** 2026-07-13

---

## 1. Brand identity

| Element | Rule |
|---------|------|
| **Primary palette** | Blue + green only. No extra accent colours. |
| **Mode** | Dark mode is the default experience. Light sections are secondary. |
| **Mood** | Modern, tech-forward, agency-grade — not corporate or flat. |
| **Pixel motif** | Keep pixel corners, dot/grid backgrounds, and floating pixels as brand texture. |

---

## 2. Colour system

### Move away from navy

The current navy-heavy surfaces (`navy-950`, `navy-900`, `navy-800`) feel too cold and muddy. **Replace with true black-based surfaces** and use blue/green only for accents, glow, and gradients.

| Role | Current (deprecate) | Target |
|------|---------------------|--------|
| Page background | `#060b16` / `bg-navy-950` | `#000000` / `bg-black` |
| Section background | `#080d1a` / `bg-navy-900` | `#0a0a0a` – `#111111` |
| Elevated cards | `#0d1730` / `bg-navy-800` | `#141414` with `border-white/8` |
| Hero gradient | Navy radial stack | Black base + blue/green neon radial glow |

### Brand tokens (keep)

```css
--color-blue-primary:  #153e90;
--color-green-accent:  #54e346;
```

Use blue for: labels, links, secondary buttons, headings highlights, ambient glow (left/cool side).

Use green for: **primary CTAs**, hover states on interactive cards, active accordion indicators, success states, neon glow (right/warm side).

### Neon / glow effects

Apply subtle glow on dark backgrounds — never flat solid fills alone.

- **Hero / CTA sections:** radial gradients mixing `rgba(21, 62, 144, 0.25)` (blue) and `rgba(84, 227, 70, 0.15)` (green) on `#000`.
- **Cards on hover:** `border-green-accent/40`, soft `shadow-green-accent/10`, optional `box-shadow: 0 0 24px rgba(84, 227, 70, 0.2)`.
- **Ambient blobs:** blurred circles (`blur-[80px–120px]`) at low opacity behind content.
- **Text highlights:** key words in `text-green-accent` on white headings (see Hero pattern).

Avoid: heavy navy overlays, pure grey sections without glow, rainbow gradients.

---

## 3. Buttons & CTAs

**Rule: Primary CTAs must be green** so they stand out against the blue-heavy UI.

| Type | Style | Example labels |
|------|-------|----------------|
| **Primary CTA** | Green fill (`bg-green-accent`, dark text `text-black` or `text-navy-950`) | Apply For Scholarship, Apply Now, Enrol Now |
| **Secondary CTA** | Outline — white border, green border + text on hover | Explore Courses, Learn More, View All |
| **Tertiary / text link** | `text-green-accent` with underline on hover | join our counselling session |

**Do not** use blue gradient fills (`btn-primary-fill`) for primary actions anymore. Reserve blue for secondary/outline or decorative elements.

Hover: slight brightness increase + soft green glow. Active: `scale(0.98)`.

---

## 4. Typography & text layout

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Display / H1 | Red Hat Display | 800–900 (black) | Large, tight leading |
| H2 / H3 | Red Hat Display | 700–900 | Section titles |
| Body | Red Hat Display | 400 | `leading-relaxed` |
| Labels / kickers | Red Hat Display | 600 | Uppercase, `tracking-[0.35em]`, small size |

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
