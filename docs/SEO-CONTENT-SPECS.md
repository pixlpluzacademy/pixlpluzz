# Pixl Pluz — SEO Content Specifications

> **Audience:** SEO specialists, copywriters, and AI agents generating website content.
>
> **Maintenance rule:** Update the **Current copy snapshot** and **Last updated** date in this file **every time** section copy is created or changed in the codebase. Word counts below are targets — the snapshot reflects what is live in components today.

**Last updated:** 2026-07-13  
**Snapshot source:** `src/components/home/*`, `src/app/layout.tsx`, `src/app/page.tsx`

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
- Differentiator keywords: AI-integrated, digital marketing, agency-style, practical learning, scholarship-based.
- Body text: **justified** in UI (`text-justify`) — write sentences that flow well when justified (avoid very short choppy lines).
- One primary keyword per section H2; support with long-tail terms in body copy.

### Word-count conventions

- Counts are **English words** (contractions = 1 word).
- Ranges are **targets**; stay inside min–max unless design explicitly changes.
- `line-clamp` components: never exceed max — overflow is hidden.

---

## Homepage — section order

`Hero → About → CertificatesMarquee → Courses → Advantage → Mentors → Purpose → Scholarship → Contact → Blog → CTA → FAQ`

---

## Homepage sections

### 1. Hero (`HeroSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Kicker / eyebrow | 3–6 | 4 — *"AI Integrated Academy — Kochi"* | Uppercase, location optional |
| H1 (full, all lines) | 6–12 | 7 — *"Kerala's Best / AI Integrated / Courses"* | Line 2 may use green accent word |
| Subtitle paragraph | 14–24 | 16 | Mention scholarship without amounts |
| Primary CTA label | 2–4 | 4 — *"Apply For Scholarship"* | |
| Secondary CTA label | 2–3 | 2 — *"Explore Courses"* | |

**SEO title pattern (page meta):** `Pixl Pluz Academy | AI-Integrated Digital Marketing Courses in Kochi`

---

### 2. About (`AboutSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"About PixlPluz"* | |
| H2 | 6–10 | 7 — *"Best Digital Marketing Academy in Kochi"* | |
| Intro paragraph | 40–55 | 47 (para 1) | Justified; white text |
| Intro paragraph 2 | 35–50 | ~42 | Agency-style learning in Kochi |
| Intro paragraph 3 | 35–50 | ~40 | Audience + Neo Digital Hub Dubai |
| Feature card — title | 2–5 | 3–4 each | 4 cards |
| Feature card — description | 12–30 | 12–29 each | Visible in collapsed state |
| Feature card — hover extra | 22–40 | ~28–32 each | Shown only when card expands on hover |

**Current card titles:** Learn by Working · Future-Ready Curriculum · Mentorship by Industry Experts · Placement & Career Support

---

### 3. Certificates marquee (`CertificatesMarquee.tsx`)

| Field | Word target | Notes |
|-------|-------------|-------|
| Marquee items | 1–3 each | Certification / partner names only, not sentences |

---

### 4. Courses (`CoursesSection.tsx` + `CourseCard.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"Our Courses"* | |
| H2 | 4–8 | 4 — *"AI-Integrated Career Programs"* | |
| Section subtitle | 12–20 | 14 | No "100% placement" |
| Course card — title | 4–10 | from `course.title` | `line-clamp-2` |
| Course card — shortDescription | 18–28 | from `course.shortDescription` | `line-clamp-3`, justified |
| Course card — meta (lessons) | 2–3 | 2 — *"N Lessons"* | Numeric lesson count is OK |

---

### 5. Advantage (`AdvantageSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 3–5 | 3 — *"The PixlPluz Advantage"* | |
| H2 | 5–10 | 6 — *"Digital marketing agency in kerala"* | Title case optional |
| Intro paragraph | 55–80 | split into 4 paras | Justified; white; balances card grid height |
| Intro para 2–4 | 35–55 each | ~40–48 | Career paths, modules, scholarship/support |
| Grid feature label | 2–5 | 2–4 each | 9 tiles; use "Career & Placement Support" not "100% Placement Assistance" |

---

### 6. Mentors (`MentorsSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"Our Mentors"* | |
| H2 | 4–8 | 4 — *"Learn From Industry Experts"* | |
| Subtitle | 10–18 | 12 | |
| Mentor card — name | 2–3 | 2 each | Proper names |
| Mentor card — designation | 2–4 | 2–3 each | Role only, no bio |

---

### 7. Purpose (`PurposeSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"Our Purpose"* | |
| H2 | 6–12 | 7 | |
| Intro paragraph 1 | 45–60 | 55 | Justified |
| Intro paragraph 2 | 18–30 | 22 | Justified |
| Accordion — title | 4–8 | 5–7 each | 3 items |
| Accordion — body | 18–35 | 22–28 each | **No ₹ amounts in scholarship item** |

---

### 8. Scholarship (`ScholarshipSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"Scholarship Program"* | |
| H2 | 6–12 | 7 — *"Apply for Our Merit / Scholarship Fund"* | **No rupee amounts** |
| Intro paragraph 1 | 14–22 | 14 — *"We are launching our first batch this July with a scholarship fund for eligible students."* | No amounts |
| Intro paragraph 2 | 18–30 | 22 | |
| Step — title | 2–4 | 2–3 each | 4 steps |
| Step — description | 8–16 | 10–14 each | |
| CTA label | 3–4 | 4 — *"Apply For Scholarship"* | |

---

### 9. Contact (`ContactSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"Contact Us"* | |
| H3 | 5–10 | 6 — *"Ready to Build Your Digital Career?"* | |
| Intro paragraph | 18–30 | 22 | Justified |
| Form placeholders | 1–3 each | — | Short, action-oriented |

---

### 10. Blog (`BlogSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 3–4 | 3 — *"Our Latest Posts"* | |
| H2 | 6–12 | 8 | |
| Section subtitle | 22–35 | 28 | |
| Blog card — title | 6–14 | from `blog.title` | |
| Blog card — excerpt | 20–40 | from `blog.excerpt` | 2–3 lines |

---

### 11. CTA (`CTASection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| Section label | 2–3 | 2 — *"The Steps"* | |
| H2 | 6–12 | 8 | |
| Body paragraph | 28–42 | 35 | Centered in layout; still write balanced sentences |
| Primary CTA | 2–4 | 3 — *"Apply Now"* | |
| Secondary CTA | 2–3 | 2 — *"Explore Courses"* | |

---

### 12. FAQ (`FAQSection.tsx`)

| Field | Word target | Current (2026-07-13) | Notes |
|-------|-------------|----------------------|-------|
| H2 | 2–4 | 3 — *"Questions & Answers"* | |
| Subtitle (optional) | 10–18 | 14 | Can mirror top FAQ topic |
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
| `/courses` | 4–8 words | 120–160 chars | Intro 25–40 words; cards same as homepage |
| `/courses/[slug]` | 4–12 words | 120–160 chars | Overview 80–120 words; modules list |
| `/scholarship` | 4–10 words | 120–160 chars | Steps, eligibility — **no amounts** |
| `/placement` | 4–8 words | 120–160 chars | **No "100% Placement Assistance" stat** |
| `/contact` | 4–8 words | 120–160 chars | Match Contact section tone |
| `/blog/[slug]` | 6–14 words | 120–160 chars | Article 600–1200 words (editorial) |

### Site-wide meta (`layout.tsx`)

| Field | Target | Current issue |
|-------|--------|---------------|
| `title` default | 50–60 chars | OK |
| `description` | 120–160 chars | Remove "₹50 Lakh scholarship fund" |

---

## Keyword bank (use sparingly)

**Primary:** digital marketing course Kochi, AI integrated academy Kerala, Pixl Pluz Academy

**Secondary:** agency-style training, scholarship program, live projects, mentor support, career support, SEO course, social media marketing, Google Ads

**Avoid overuse:** "best" (max once per page), "100%", any unverified claim

---

## Update log

| Date | Section | Change |
|------|---------|--------|
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
