'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PixelButton } from '@/components/ui/PixelButton'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { icon: '/icons/dark-mode/submissions.svg', step: '01', title: 'Fill the Form', desc: 'Complete the scholarship application with your personal details, educational background, and motivation.' },
  { icon: '/icons/dark-mode/tasks.svg', step: '02', title: 'Take the Test', desc: 'Attend our online scholarship aptitude test covering logical thinking, digital awareness, and basic skills.' },
  { icon: '/icons/dark-mode/21-Approved dark.svg', step: '03', title: 'Get Evaluated', desc: 'Top scorers are shortlisted. Our panel evaluates financial eligibility and commitment.' },
  { icon: '/icons/dark-mode/career.svg', step: '04', title: 'Start Learning', desc: 'Selected candidates receive up to 100% fee waiver and begin their course journey.' },
]

const ELIGIBILITY = [
  'You must be a resident of Kerala or a neighbouring state',
  'Annual family income below ₹4,00,000',
  'You must pass the scholarship entrance test',
  'Aged between 17 and 30 years',
  'Genuine financial need and strong motivation to learn',
  'Must commit to completing the full course',
]

/**
 * The word is rendered at 4x its visual size and scaled down to 0.25 at rest.
 * The browser rasterizes text at its layout size, so this gives the zoom a
 * 4x-resolution bitmap to stretch — glyph edges stay crisp far deeper into
 * the dive instead of blurring immediately past scale 1.
 */
const WORD_BASE_SCALE = 0.3

function layoutWordFocus(zoomWrap: HTMLElement, letterL: HTMLElement) {
  gsap.set(zoomWrap, { scale: 1, x: 0, y: 0, opacity: 1 })

  // Rects measured untransformed — transform-origin lives in the element's
  // local coordinate space, so these values stay valid at any scale
  const wrapRect = zoomWrap.getBoundingClientRect()
  const letterRect = letterL.getBoundingClientRect()
  const originX = letterRect.left - wrapRect.left + letterRect.width / 2
  const originY = letterRect.top - wrapRect.top + letterRect.height / 2

  // Scaling happens around the "l", which is off the word's midpoint — so a
  // plain scale pulls the word sideways. cx/cy is the offset from the origin
  // to the wrap centre; translating by cx*(1-s) keeps the word visually
  // centred at rest, and translating to the full cx centres the "l" on the
  // viewport at the end of the dive.
  const cx = wrapRect.width / 2 - originX
  const cy = wrapRect.height / 2 - originY
  zoomWrap.dataset.cx = String(cx)
  zoomWrap.dataset.cy = String(cy)

  gsap.set(zoomWrap, {
    transformOrigin: `${originX}px ${originY}px`,
    x: cx * (1 - WORD_BASE_SCALE),
    y: cy * (1 - WORD_BASE_SCALE),
    scale: WORD_BASE_SCALE,
  })
}

/**
 * Scale needed for the white stroke of the "l" to fully cover the viewport —
 * that's the moment the letter becomes the white background.
 */
function computeCoverScale(zoomWrap: HTMLElement, letterL: HTMLElement) {
  const prevTransform = zoomWrap.style.transform
  zoomWrap.style.transform = 'none'
  const letterRect = letterL.getBoundingClientRect()
  zoomWrap.style.transform = prevTransform

  // The vertical stem is narrower than the glyph box — assume ~45% of it
  const stemWidth = Math.max(letterRect.width * 0.45, 1)
  const scaleForWidth = window.innerWidth / stemWidth
  const scaleForHeight = window.innerHeight / Math.max(letterRect.height * 0.72, 1)

  // The white flash completes the coverage, so no extra margin needed —
  // keeps the rasterized layer smaller and the reverse scroll smoother
  return Math.max(scaleForWidth, scaleForHeight)
}

export function ScholarshipContent() {
  const rootRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const zoomWrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLSpanElement>(null)
  const afterRef = useRef<HTMLSpanElement>(null)
  const wordRef = useRef<HTMLHeadingElement>(null)
  const letterLRef = useRef<HTMLSpanElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const revealTitleRef = useRef<HTMLHeadingElement>(null)
  const revealBodyRef = useRef<HTMLParagraphElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady || !rootRef.current) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bg = bgRef.current
    const flash = flashRef.current
    const zoomWrap = zoomWrapRef.current
    const before = beforeRef.current
    const after = afterRef.current
    const word = wordRef.current
    const letterL = letterLRef.current
    const reveal = revealRef.current
    const revealTitle = revealTitleRef.current
    const revealBody = revealBodyRef.current
    const intro = introRef.current
    const stage = stageRef.current

    let removeResize: (() => void) | undefined
    let introScrollTrigger: ScrollTrigger | null = null

    const relayoutIfAtTop = () => {
      if (!zoomWrap || !letterL) return
      const progress = introScrollTrigger?.progress ?? 0
      if (progress <= 0.02) {
        layoutWordFocus(zoomWrap, letterL)
      }
    }

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        if (bg) gsap.set(bg, { backgroundColor: '#ffffff' })
        if (zoomWrap) gsap.set(zoomWrap, { opacity: 0 })
        if (reveal) gsap.set(reveal, { opacity: 1 })
        if (revealTitle) gsap.set(revealTitle, { opacity: 1, y: 0 })
        if (revealBody) gsap.set(revealBody, { opacity: 1, y: 0 })
        return
      }

      if (zoomWrap && letterL) {
        layoutWordFocus(zoomWrap, letterL)

        const onResize = () => {
          relayoutIfAtTop()
          ScrollTrigger.refresh()
        }
        window.addEventListener('resize', onResize)
        removeResize = () => window.removeEventListener('resize', onResize)

        gsap.set(zoomWrap, { opacity: 0 })
        gsap.to(zoomWrap, {
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.05,
          onComplete: () => layoutWordFocus(zoomWrap, letterL),
        })
      }

      if (reveal) gsap.set(reveal, { opacity: 0 })
      if (revealTitle) gsap.set(revealTitle, { opacity: 0, y: 40 })
      if (revealBody) gsap.set(revealBody, { opacity: 0, y: 28 })
      if (before && after) gsap.set([before, after], { opacity: 1 })

      if (bg && zoomWrap && letterL && before && after && reveal && revealTitle && revealBody && intro && stage) {
        layoutWordFocus(zoomWrap, letterL)

        if (flash) gsap.set(flash, { opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: 'top top',
            end: 'bottom bottom',
            // Smoothed scrub — reverse scrolling interpolates instead of
            // jumping between wildly different zoom scales
            scrub: 0.6,
            scroller: document.documentElement,
            invalidateOnRefresh: true,
          },
        })

        introScrollTrigger = tl.scrollTrigger ?? null

        ScrollTrigger.addEventListener('refreshInit', relayoutIfAtTop)

        // 0 → 0.15 is a hold: no tween needed, the word rests at its base scale.
        // (A `.to()` here would re-capture its start value on any mid-zoom
        // refresh and freeze the word at giant scale near the top.)

        // Zoom bigger and bigger, anchored on the "l". The whole word stays
        // visible — outer letters slide off-screen as we fly into the stroke.
        // power2.in = slow start, accelerating dive into the letter.
        const getCx = () => parseFloat(zoomWrap.dataset.cx || '0')
        const getCy = () => parseFloat(zoomWrap.dataset.cy || '0')

        tl.fromTo(
          zoomWrap,
          {
            scale: WORD_BASE_SCALE,
            x: () => getCx() * (1 - WORD_BASE_SCALE),
            y: () => getCy() * (1 - WORD_BASE_SCALE),
            opacity: 1,
          },
          {
            scale: () =>
              zoomWrap && letterL ? computeCoverScale(zoomWrap, letterL) : 30,
            // Translate fully to cx/cy — the "l" lands dead-centre on screen
            x: () => getCx(),
            y: () => getCy(),
            ease: 'power2.in',
            duration: 0.55,
          },
          0.15,
        )

        // White flash bridges the last stretch of the dive — it covers the
        // giant letter fragments so both directions pass through clean white
        if (flash) {
          tl.fromTo(
            flash,
            { opacity: 0 },
            { opacity: 1, duration: 0.1, ease: 'none' },
            0.56,
          )
        }

        // By ~0.66 the screen is white (letter stroke + flash) — swapping the
        // real background is invisible. Explicit fromTo so start values never
        // get re-captured mid-zoom by a ScrollTrigger refresh.
        tl.fromTo(
          bg,
          { backgroundColor: '#060b16' },
          { backgroundColor: '#ffffff', duration: 0.001, ease: 'none', immediateRender: false },
          0.66,
        )
        tl.fromTo(
          zoomWrap,
          { opacity: 1 },
          { opacity: 0, duration: 0.001, ease: 'none', immediateRender: false },
          0.7,
        )

        // Reveal fund text on the white the letter left behind
        // (fromTo, not to — keeps start values stable across refreshes)
        tl.fromTo(
          reveal,
          { opacity: 0 },
          { opacity: 1, duration: 0.1, ease: 'none' },
          0.7,
        )
        tl.fromTo(
          revealTitle,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'none' },
          0.72,
        )
        tl.fromTo(
          revealBody,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'none' },
          0.8,
        )
      }

      gsap.utils.toArray<HTMLElement>('.sch-fade-in', rootRef.current!).forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: 'power3.out',
        })
      })
    }, rootRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', relayoutIfAtTop)
      removeResize?.()
      introScrollTrigger = null
      ctx.revert()
    }
  }, [isSiteReady])

  return (
    <div ref={rootRef} className="scholarship-page min-h-screen">
      {/* Intro — zoom through "l", white flash, reveal */}
      <div ref={introRef} className="relative h-[320vh] bg-[#060b16]" data-page-hero>
        <div ref={stageRef} className="sch-intro-stage sticky top-0 h-svh">
          <div ref={bgRef} className="absolute inset-0 z-0 bg-[#060b16]" aria-hidden />

          {/* White flash — completes the fly-through, masks giant letter fragments */}
          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 z-[15] bg-white opacity-0"
            aria-hidden
          />

          {/* Reveal — shows on white after zoom */}
          <div
            ref={revealRef}
            className="sch-reveal-white absolute inset-0 z-20 flex items-center justify-center px-4"
          >
            <div className="mx-auto max-w-3xl text-center">
              <p className="sch-kicker mb-5">Pixl Pluz Academy</p>
              <h2
                ref={revealTitleRef}
                className="text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-[1.05] text-navy-950"
              >
                ₹50 Lakh
                <span className="block text-green-accent">Scholarship Fund</span>
              </h2>
              <p
                ref={revealBodyRef}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg"
              >
                Education shouldn&apos;t have a price tag. Pass the test, prove your commitment,
                and start your digital career — for free.
              </p>
            </div>
          </div>

          {/* Scholarship — "l" centred, wrapper scales on scroll */}
          <div className="sch-word-stage absolute inset-0 z-10 flex items-center justify-center px-4">
            {/* No will-change — the browser must stay free to re-rasterize the
                text at higher resolution as the zoom progresses */}
            <div ref={zoomWrapRef} className="sch-word-zoom">
              <h1
                ref={wordRef}
                className="sch-mega-word whitespace-nowrap text-center font-black leading-none tracking-tight text-white"
              >
                <span ref={beforeRef}>Scho</span>
                <span ref={letterLRef} className="sch-letter-l inline-block">
                  l
                </span>
                <span ref={afterRef}>arship</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Fund stats */}
      <section className="border-t border-white/8 bg-[#060b16] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="sch-fade-in mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="border border-white/10 bg-navy-900/60 p-8 text-center">
            <p className="text-4xl font-black text-green-accent">100%</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/45">Fee waiver for top scorers</p>
          </div>
          <div className="border border-white/10 bg-navy-900/60 p-8 text-center">
            <p className="text-4xl font-black text-green-accent">50%</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/45">Partial aid for eligible students</p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-white/8 bg-[#060b16] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="sch-fade-in sch-kicker mb-4">How it works</p>
          <h2 className="mb-10 text-3xl font-black text-white sm:mb-14 sm:text-4xl">Four simple steps</h2>
          <div className="sch-fade-in grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="border border-white/8 bg-navy-900/40 p-6">
                <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-green-accent/60">{s.step}</span>
                <img src={s.icon} alt="" className="mb-4 h-7 w-7 object-contain" />
                <h3 className="mb-2 font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="border-t border-white/8 bg-[#060b16] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="sch-fade-in sch-kicker mb-4">Who can apply</p>
          <h2 className="mb-10 text-3xl font-black text-white">Eligibility criteria</h2>
          <ul className="sch-fade-in space-y-3">
            {ELIGIBILITY.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border border-white/8 bg-navy-900/40 p-4"
              >
                <img
                  src="/icons/dark-mode/patch.svg"
                  alt=""
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 object-contain"
                />
                <span className="text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        id="apply"
        className="relative border-t border-white/8 bg-navy-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="sch-fade-in sch-kicker mb-4 text-blue-light/70">Ready to apply?</p>
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            Your career shouldn&apos;t wait for permission.
          </h2>
          <p className="sch-fade-in mb-10 text-blue-light/80">
            Fill out the form and we will contact you with the scholarship test schedule.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PixelButton href="/contact" variant="green" size="lg">
              Apply Now — It&apos;s Free
            </PixelButton>
            <Link
              href="/courses"
              className="text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              View courses →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
