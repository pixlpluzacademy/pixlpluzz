# Pixl Pluz — Image Size Specs (Designer Handoff)

> Send this file to the designer for export sizes.  
> **Last updated:** 2026-07-13  
> **Source folder:** `public/images/`

All sizes below are **export / deliverable** targets (width × height in px). Prefer **sRGB PNG** for graphics/UI art and **JPEG quality 80–85** for photos unless transparency is needed.

---

## 1. Recommended export sizes by homepage section

| Section | Usage | Aspect | Recommended export | Notes |
|---------|--------|--------|--------------------|-------|
| **Hero** | Full-bleed background (if used) | ~16:9 or wider | **2560 × 1440** (min **1920 × 1080**) | Keep subject toward center; dark edges OK |
| **FAQ – Questions & Answers** | Section background (`bg.png`) | ~16:10 | **1920 × 1080** or **2400 × 1350** | Neon art; leave readable center for FAQ panel |
| **Advantage** | Section background (`bg-advantage.png`) | ~16:9 | **1920 × 1080** | Same idea as FAQ; text on left must stay readable under dark overlay |
| **Advantage cards** (9 tiles) | Square tile photos | **1:1** | **800 × 800** (min **600 × 600**) | Shown blurred by default; clear on hover / expand |
| **Advantage card – expanded** | Same assets, big square | **1:1** | Same **800 × 800** | Click expands to large square; crop must work at 1:1 |
| **About feature cards** | Half-card photo (left of text) | **1:1** preferred | **800 × 800** or **900 × 900** | Card is 50% image / 50% text; faces near center |
| **Mentors** | Portrait cards | **3:4** | **900 × 1200** | Matches current mentor PNGs; black edges blend with site |
| **Purpose** | Tall side image | **4:5** | **1200 × 1500** | Portrait crop; subject top-weighted |
| **Contact** | Left panel photo | ~3:4 or 4:5 | **1200 × 1500** | Subject readable behind dark gradient |
| **Courses cards** | Course thumbnail | ~16:10 or 3:2 | **1200 × 750** | Title overlay area at bottom |
| **Blog cards** | Post thumbnail | ~16:10 | **1200 × 675** | Height ~192px on site; sharp at 2× |

---

## 2. Homepage mapping (which file goes where)

### Advantage section — 9 square cards

| Label | Current file | Current px | Target |
|-------|--------------|------------|--------|
| Scholarship Based Courses | `graduation.jpg` | 500 × 300 | **800 × 800** |
| Live Project & Training | `class2.jpg` | 500 × 419 | **800 × 800** |
| Industry Expert Mentors | `student2.jpg` | 500 × 419 | **800 × 800** |
| AI Tools & Automation | `students2.jpg` | 1499 × 1124 | **800 × 800** |
| Career & Placement Support | `graduation2.jpg` | 500 × 217 | **800 × 800** |
| Interview Preparation | `students.jpg` | 1499 × 1920 | **800 × 800** |
| Practical Learning | `room.jpg` | 100 × 100 | **800 × 800** (replace — too small) |
| Verified Portfolio | `boy.jpg` | 287 × 474 | **800 × 800** |
| Industry Certification | `student.jpg` | 500 × 655 | **800 × 800** |
| Section background | `bg-advantage.png` | 1672 × 941 | **1920 × 1080** |

### About section — 4 feature cards

| Title | Current file | Target |
|-------|--------------|--------|
| Learn by Working | `class2.jpg` | **800 × 800** |
| Future-Ready Curriculum | `students.jpg` | **800 × 800** |
| Industry Expert Mentorship | `student2.jpg` | **800 × 800** |
| Placement & Career Support | `graduation.jpg` | **800 × 800** |

### Mentors section — portraits (3:4)

| Mentor slot | Current file | Current px | Target |
|-------------|--------------|------------|--------|
| Slot 1 | `Aishh_option_1.png` | 900 × 1200 | **900 × 1200** (keep) |
| Slot 2 | `Aishh_option_2.png` | 900 × 1200 | **900 × 1200** |
| Slot 3 | `Aishh_option_3.png` | 900 × 1200 | **900 × 1200** |
| Slot 4 | `Aishh_option_4.png` | 900 × 1200 | **900 × 1200** |
| Slot 5 | `Aishh_option_5.png` | 900 × 1200 | **900 × 1200** |

Legacy portraits also in folder (`Ahmed Noor.jpeg`, `Hina2.jpeg`, etc.) at **2083 × 2604** (same 3:4) — usable if renamed into slots.

### Section backgrounds

| Section | Current file | Current px | Target |
|---------|--------------|------------|--------|
| FAQ | `bg.png` | 1506 × 914 | **1920 × 1080** |
| Advantage | `bg-advantage.png` | 1672 × 941 | **1920 × 1080** |
| Courses page (other) | `bg.jpg` | 2000 × 768 | **2400 × 900** or **1920 × 720** |
| Contact / hero art | `contact-bg.png`, `Hero background.png` | 8641 × 5162 | Downscale to **2560 × 1440** for web |

### Purpose / Contact

| Usage | Current file | Target |
|-------|--------------|--------|
| Purpose tall image | `students2.jpg` (1499 × 1124) | **1200 × 1500** (4:5 crop) |
| Contact left image | `student2.jpg` | **1200 × 1500** |

---

## 3. Inventory — files currently in `public/images/`

| File | Width × Height | ~Size |
|------|----------------|-------|
| Ahmed Noor.jpeg | 2083 × 2604 | 948 KB |
| Aishh_option_1.png | 900 × 1200 | 1.7 MB |
| Aishh_option_2.png | 900 × 1200 | 1.4 MB |
| Aishh_option_3.png | 900 × 1200 | 1.3 MB |
| Aishh_option_4.png | 900 × 1200 | 858 KB |
| Aishh_option_5.png | 900 × 1200 | 1.0 MB |
| Aishh_option_6.png | 900 × 1200 | 1.0 MB |
| Aiswarya2.jpeg | 2083 × 2604 | 852 KB |
| bg-advantage.png | 1672 × 941 | 1.6 MB |
| bg.jpg | 2000 × 768 | 128 KB |
| bg.png | 1506 × 914 | 1.7 MB |
| boy.jpg | 287 × 474 | 61 KB |
| boy2.png | 640 × 740 | 158 KB |
| class2.jpg | 500 × 419 | 57 KB |
| contact-bg.png | 8641 × 5162 | 2.4 MB |
| girl.jpg | 1920 × 979 | 82 KB |
| girl2.jpg | 100 × 100 | 7 KB |
| girl3.jpg | 302 × 294 | 39 KB |
| graduation.jpg | 500 × 300 | 76 KB |
| graduation2.jpg | 500 × 217 | 40 KB |
| Hero background.png | 8641 × 5162 | 2.4 MB |
| Hina2.jpeg | 2083 × 2604 | 785 KB |
| Hojjat.jpeg | 2083 × 2604 | 906 KB |
| Lakshmi.jpeg | 2083 × 2604 | 935 KB |
| room.jpg | 100 × 100 | 8 KB |
| student.jpg | 500 × 655 | 56 KB |
| student2.jpg | 500 × 419 | 36 KB |
| students.jpg | 1499 × 1920 | 139 KB |
| students2.jpg | 1499 × 1124 | 161 KB |

---

## 4. Designer checklist

1. Export **Advantage / About card photos** as **1:1 squares at 800×800** (or 1200×1200 for retina).
2. Keep **Mentor portraits** at **3:4 — 900×1200**.
3. Export **section backgrounds** at **1920×1080**; avoid critical detail in the far corners (overlays + text sit on top).
4. Replace undersized assets (`room.jpg` 100×100, `girl2.jpg` 100×100) — they look soft on desktop.
5. Prefer **faces / subjects centered**; Advantage cards crop with `object-cover`.
6. File naming: lowercase, hyphens, e.g. `advantage-scholarship.jpg`, `mentor-01.png`.
7. Max web file size guide: photos **≤ 250 KB** JPEG; UI backgrounds **≤ 400 KB** (compressed PNG/WebP).

---

## 5. Quick ratio cheat sheet

| Ratio | Use |
|-------|-----|
| **1:1** | Advantage tiles, About card photos |
| **3:4** | Mentors |
| **4:5** | Purpose / contact tall panels |
| **16:9** | Section backgrounds, blog thumbs |

---

*Update this file whenever new image slots are added to the homepage.*
