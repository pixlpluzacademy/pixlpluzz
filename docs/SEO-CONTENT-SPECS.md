# Pixl Pluz — SEO Content Specifications

> **Audience:** SEO specialists, copywriters, and AI agents generating website content.
>
> **Maintenance rule:** Update the **Current copy snapshot** and **Last updated** date in this file **every time** section copy is created or changed in the codebase. Word counts below are targets — the snapshot reflects what is live in components today.

**Last updated:** 2026-07-18  
**Snapshot source:** `src/components/home/*`, `src/components/courses/*`, `src/components/scholarship/*`, `src/app/layout.tsx`, `src/app/page.tsx`

---

## Global copy rules

### Forbidden phrases & numbers

| Do NOT write | Write instead |
|--------------|---------------|
| ₹50 Lakh / 50 Lakh / any rupee amount for scholarship | "scholarship program", "merit-based scholarship", "scholarship fund" |
| 100% placement / 100% placement assistance | "placement support", "career support", "career guidance" |
| 100% fee waiver | "scholarship support", "fee support for selected candidates" |
| Guaranteed placement / job guarantee | "career-focused support", "interview preparation" |
| Unverified stats (e.g. "< 60 days to placement") | Remove or replace with qualitative benefit |

### Tone & SEO

- Primary location keywords: **Kochi**, **Kerala**, **Thiruvananthapuram**, **Calicut** (use naturally, not stuffed).
- Brand name: **Pixl Pluz** or **Pixl Pluz Academy** (consistent spelling).
- Differentiator keywords: AI-integrated academy, Neo Digital Hub Dubai, international exposure, practical learning, scholarship-based.
- Body text: **justified** in UI (`text-justify`) — write sentences that flow well when justified (avoid very short choppy lines).
- One primary keyword per section H2; support with long-tail terms in body copy.

### Word-count conventions

- Counts are **English words** (contractions = 1 word).
- Ranges are **targets**; stay inside min–max unless design explicitly changes.
- `line-clamp` components: never exceed max — overflow is hidden.

---

## Homepage — section order

`Hero → About → CertificatesMarquee → Courses → Advantage → Mentors → AI Tools → Scholarship → Contact → Blog → CTA → FAQ`

---

## Homepage sections

### 1. Hero (`HeroSection.tsx`)

| Field | Word target | Current (2026-07-17) | Notes |
|-------|-------------|----------------------|-------|
| Kicker / eyebrow | 3–6 | — | Removed from hero |
| H1 (full, all lines) | 6–12 | 5 — *"Kerala's Best / AI-Integrated / Courses"* | Equal line spacing; line 2 green accent |
| Subtitle paragraph | 14–24 | — | Removed from hero |
| Primary CTA label | 2–4 | 4 — *"Apply For Scholarship"* | |
| Secondary CTA label | 2–3 | 2 — *"Free Consultation"* | Opens WhatsApp; float button hidden over hero |

**SEO title pattern (page meta):** `Pixl Pluz Academy | AI-Integrated Digital Marketing Courses in Kochi`

---

### 2. About (`AboutSection.tsx`)

| Field | Word target | Current (2026-07-17) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 3 | 3 — *"About / Pixl Pluz"* | Line 1 white About; line 2 green Pixl + outline Pluz |
| Intro paragraph | 70–100 | ~90 | Single full-column paragraph; Neo Digital Hub Dubai; Kochi; AI-integrated skills |
| Feature card — title | 2–5 | 2–4 each | 4 cards |
| Feature card — description | 12–30 | 18–28 each | Visible in collapsed state |
| Feature card — hover extra | 22–40 | ~28–34 each | Shown only when card expands on hover |

**Current card titles:** PRACTICAL LEARNING · AI COURSES · INTERNATIONAL MENTORS · GLOBAL EXPERIENCE

**Copy rule:** Do not describe Pixl Pluz as a digital marketing agency in this section. Position as an academy teaching AI-integrated courses, backed by Neo Digital Hub Dubai.

---

### 3. Certificates marquee (`CertificatesMarquee.tsx`)

| Field | Word target | Notes |
|-------|-------------|-------|
| Marquee items | 1–6 each | Live credentials: ISO 9001-2015, ISO 29993:2017, MSME, Startup India, NSDC |

---

### 4. Courses (`CoursesSection.tsx` + `CourseCard.tsx`)

| Field | Word target | Current (2026-07-17) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 2 | 2 — *"Our Courses"* | One line; Our white, Courses green |
| Section subtitle | 12–20 | ~42 | AI-integrated course list; real-world AI skills |
| Course card — title | 4–12 | from `course.title` | Larger type (`text-lg`/`sm:text-xl`); AI-integrated naming |
| Course card — shortDescription | 18–28 | from `course.shortDescription` | `line-clamp-3`, justified |
| Course card — meta (lessons) | 2–3 | 2 — *"N Lessons"* | Numeric lesson count is OK |

---

### 5. Advantage (`AdvantageSection.tsx`)

| Field | Word target | Current (2026-07-21) | Notes |
|-------|-------------|----------------------|-------|
| Micro-label | 1–3 | 2 — *"Academy edge"* | Butter Glow accent |
| H2 | 3–5 | 4 — *"Why Learn / With AI?"* | White + Electric Verdant; sticky left editorial |
| Intro paragraph 1 | 35–50 | ~42 | AI changing industry; course list; left-aligned, max ~480px |
| Intro paragraph 2 | 25–40 | ~32 | Graduates/professionals; Neo Digital Hub Dubai |
| Bento card title | 2–4 | 2–4 each | Original labels restored (AI Learning, Live Project and Training, …); no placement % |
| Bento card blurb | 6–12 | ~8–10 each | Revealed on hover / spotlight |

---

### 6. Mentors (`MentorsSection.tsx`)

| Field | Word target | Current (2026-07-18) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 3–5 | 3 — *"OUR AI EXPERTS"* | Green outline; same size as subtitle; moves left→right on scroll only |
| Subtitle | 10–18 | 6 — *"YOUR MENTORS, FROM ACROSS THE WORLD"* | White outline; same size; moves right→left on scroll only |
| Mentor — name | 2–3 | 2 each | Open typography — no nameplate box |
| Mentor — designation | 2–4 | 2–3 each | Role only |

**UI note:** No bordered/boxed name cards. Title is a full-bleed green marquee tied to scroll.

---

### 7. AI Tools (`AiToolsSection.tsx`)

| Field | Word target | Current (2026-07-18) | Notes |
|-------|-------------|----------------------|-------|
| H2 (sr-only) | 2–4 | 2 — *"AI Tools"* | Visual hero word in cloud |
| Cloud hero word | 2 | *"AI TOOLS"* | Mid-size green label |
| Tool labels | 1–3 each | ~30 famous tools (ChatGPT, Claude, Cursor, Midjourney, etc.) | Green / blue / butter / white |

**UI note:** Sticky scroll-dispersing word cloud on all breakpoints; mobile scales positions + fonts together and flattens vertical labels to avoid overlaps.

---

### 8. Scholarship (`ScholarshipSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 3–5 | 3 — *"Merit Based Scholarship"* | One line; Merit Based white, Scholarship green; large type |
| Intro paragraph 1 | 14–22 | 14 — *"We are launching our first batch this July with a scholarship fund for eligible students."* | No amounts |
| Intro paragraph 2 | 18–30 | 22 | |
| Step — title | 2–4 | 2–3 each | 4 steps |
| Step — description | 8–16 | 10–14 each | |
| CTA label | 3–4 | 4 — *"Apply For Scholarship"* | |

---

### 9. Contact (`ContactSection.tsx`)

| Field | Word target | Current (2026-07-20) | Notes |
|-------|-------------|----------------------|-------|
| Left copy | — | — | Removed — photo only on left |
| Form H2 | 4–6 | 5 — *"Your AI Future Is Waiting"* | One line; white + green |
| Form intro | 8–16 | ~12 | |
| Inquiry chips | 1–2 each | Digital Marketing, Web Development, etc. | Square chips, not pills |

**UI note:** Framed photo (About-width paddings, no overlay). Form card square-edged (`#141414`) on the right — no rounded corners.

---

### 10. Blog (`BlogSection.tsx`)

| Field | Word target | Current (2026-07-20) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 3–5 | 3 — *"AI Latest Updates"* | One line; green + white; large clamp type |
| Section subtitle | 22–35 | ~28 | Tied to heading — latest AI tools, course news, digital skills |
| Blog card — title | 6–14 | from `blog.title` | |
| Blog card — excerpt | 20–40 | from `blog.excerpt` | 2–3 lines |

---

### 11. CTA (`CTASection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | — | — | Removed |
| H2 | 6–12 | 8 | |
| Body paragraph | 28–42 | 35 | Centered in layout; still write balanced sentences |
| Primary CTA | 2–4 | 3 — *"Apply Now"* | |
| Secondary CTA | 2–3 | 2 — *"Explore Courses"* | |

---

### 12. FAQ (`FAQSection.tsx`)

Two-column layout: left intro + “Still Have Questions?” / Contact; right accordion.

| Field | Word target | Current (2026-07-23) | Notes |
|-------|-------------|----------------------|-------|
| H2 | 3 | Frequently / Asked / Questions | Three lines; first letter of each word green |
| Still have questions body | 12–25 | ~18 | + Contact Us link to `/contact` |
| Question | 10–22 | 12–18 each | 5 items; include location/skill keywords |
| Answer | 22–45 | 25–35 each | Use "comprehensive placement support" — no "100%" |

---

## Optional / legacy — Cards fan (`CardsSection.tsx`)

Not on homepage currently; include if re-enabled.

| Field | Word target | Current |
|-------|-------------|---------|
| Card title | 2–4 | 2–4 each |
| Card description | 18–28 | 18–22 each |
| Footer link line | 12–20 | 14 |

---

## Inner pages — quick reference

| Page | H1 target | Meta description | Body sections |
|------|-----------|------------------|---------------|
| `/about` | 4–8 words | 120–160 chars | Stats row: **no ₹ or 100% labels** |
| `/courses` | 3–5 — *"Our AI Courses"* | 120–160 chars | Photo hero + solid navbar bar; intro 25–40 words; cards same as homepage |
| `/courses/[slug]` | 4–12 words | 120–160 chars | Hero + enroll CTAs; Structure heading; modules (left) + AI tools falling-stack (right); Who it’s for — no fake stats |
| `/scholarship` | 1 word — *"Scholarship"* | 120–160 chars | Video hero (top-right outlined H1); steps + apply CTA — **no amounts** |
| `/placement` | 4–8 words | 120–160 chars | Hero + wall (8 photos, 4/row) + client logo carousel — **no placement % / package / days stats** |
| `/contact` | 2–4 — *"Contact Us"* | 120–160 chars | Image hero; form card heading *"Connect With Pixl Pluz"* + contact grid + map; office CTA → WhatsApp consultation |
| `/blog` | 2–4 — *"Blog & Insights"* | 120–160 chars | Nova magazine layout: editorial hero, featured lead, latest grid |
| `/blog/[slug]` | 6–14 words | 120–160 chars | Article 600–1200 words (editorial) |

### Site-wide meta (`layout.tsx`)

| Field | Target | Current issue |
|-------|--------|---------------|
| `title` default | 50–60 chars | OK |
| `description` | 120–160 chars | Remove "₹50 Lakh scholarship fund" |

---

## Keyword bank (use sparingly)

**Primary:** digital marketing course Kochi, AI integrated academy Kerala, Pixl Pluz Academy

**Secondary:** Neo Digital Hub Dubai, international exposure, scholarship program, live projects, mentor support, career support, AI tools, automation

**Avoid overuse:** "best" (max once per page), "100%", any unverified claim; do not brand Pixl Pluz as a "digital marketing agency" on the homepage About section

---

## Update log

| Date | Section | Change |
|------|---------|--------|
| 2026-07-21 | Advantage | Editorial sticky intro + asymmetric bento; H2 → *"Why Learn / With AI?"*; auto-spotlight Flip; card blurbs |
| 2026-07-23 | Contact page | Image hero; form card + 2×2 details + map; office CTA → WhatsApp free consultation |
| 2026-07-20 | Homepage Courses | H2 → *"Our Courses"* (Courses green) |
| 2026-07-20 | Scholarship page steps | H2 → *"How it works"* (large); removed *"Four simple steps"* |
| 2026-07-20 | Course detail | Removed Questions & Answers / FAQ section |
| 2026-07-20 | Course detail curriculum | Modules left + AI tools falling-stack right (GSAP bounce pile); removed tools marquee |
| 2026-07-17 | Course detail curriculum | Expanded each module with description (~50–70 words) + more topic pills |
| 2026-07-18 | Scholarship page hero | Full-bleed `scholarship-bg-video.mp4`; left-aligned H1 only — *"Scholarship"* (removed kicker + subtitle) |
| 2026-07-17 | Course detail curriculum | Blue/white module switcher; AI tools moved to horizontal carousel below |
| 2026-07-17 | Course detail curriculum | Left “Modules” nav + right detail (title, topic pills, brief); click swaps content |
| 2026-07-17 | Course detail AI tools | Restored AI tool popups; removed only the “AI Tools” heading |
| 2026-07-17 | Homepage copy | Hero, About, Courses, Advantage, Purpose sections updated to client copy |
| 2026-07-17 | Homepage brand colours | Applied Command Blue / Verdant / White / Butter Glow roles across home |
| 2026-07-18 | Scholarship | H2 → *"Merit Based Scholarship"* large type |
| 2026-07-18 | Homepage | Replaced Purpose accordion with AI Tools word-cloud (black + green/blue/butter/white) |
| 2026-07-18 | Mentors | H2 → *"OUR AI EXPERTS"* large scroll-scrub marquee (moves left on scroll) |
| 2026-07-17 | Course detail certificates | Reverted 3D looping stack; restored simple front/back cycle |
| 2026-07-20 | Placement hero | Matched event-page hero layout (stacked type, pixel trail, mono status, pop-in) |
| 2026-07-16 | Placement hero | Green company boxes fall from hero and collect in a bottom pile |
| 2026-07-16 | Course detail AI tools | Moved AI tools marquee below curriculum modules |
| 2026-07-16 | Course detail certificate | Compact stacked certificates in hero (right), using `/images/certificates/*` |
| 2026-07-16 | Courses | First course → *"Digital Marketing Course with AI"*; bigger card titles; AI naming across all four |
| 2026-07-16 | Contact | Left panel is image-only — removed Contact Us heading, body, and phone/location/email overlay |
| 2026-07-16 | Scholarship hero | Removed scroll-zoom text mask; simple full-bleed photo hero with Scholarship Fund copy |
| 2026-07-16 | Course detail hero | Replaced mentor/portfolio/career points with AI tools marquee (10+ tools per course) |
| 2026-07-16 | Course detail curriculum | CDA-style modules: 3-col gradient cards with topic pills + brief (no accordion/expand) |
| 2026-07-15 | About cards | Tightened justified copy + hyphenation to reduce large word gaps in narrow columns |
| 2026-07-15 | Scholarship page | Removed ₹50 Lakh from hero reveal + meta; H2 is *"Scholarship Fund"* only |
| 2026-07-15 | Course detail FAQ | Matched homepage FAQ accordion styles (no bg image); H2 → *"Questions & Answers"* |
| 2026-07-15 | Course detail | CDA-inspired modern layout: hero + enroll card, curriculum accordion, tools, audience, FAQ |
| 2026-07-14 | Mentors | Removed boxed nameplates; open typography with 3 rotating name/role layouts |
| 2026-07-14 | About | Reframed as AI-integrated academy backed by Neo Digital Hub Dubai; removed agency language; card 4 → International Exposure |
| 2026-07-13 | Advantage | Expanded left copy; cards show blurred images that clear on hover |
| 2026-07-13 | About intro | Expanded left column to 3 white justified paragraphs for card-height balance |
| 2026-07-13 | About cards | Added hover-only extra copy (~28–32 words) per feature card |
| 2026-07-13 | Homepage | Applied black/neon design; removed ₹50 Lakh and 100% placement copy |
| 2026-07-13 | All | Initial spec created from current `src/components/home/*` copy |

---

## Checklist for SEO agent (every content task)

1. Read forbidden phrases table — zero violations.
2. Match word targets for the specific field.
3. Include at least one location keyword in homepage H2 or first paragraph of major sections.
4. Primary CTA copy aligns with green button labels in `DESIGN-GUIDELINES.md`.
5. After merging copy to code, update **Current** column and **Update log** in this file.
