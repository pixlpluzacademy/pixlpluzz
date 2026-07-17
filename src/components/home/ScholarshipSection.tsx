'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ClipboardList, FlaskConical, FolderOpen, Rocket } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

const STEPS = [
  {
    num: '01',
    title: 'Register Online',
    desc: 'Fill out the scholarship application form with your basic details.',
    icon: ClipboardList,
  },
  {
    num: '02',
    title: 'Attend the Test',
    desc: 'Complete the entrance test and show us your interest, effort, and learning potential.',
    icon: FlaskConical,
  },
  {
    num: '03',
    title: 'Submit Your Work',
    desc: 'Share your ideas, portfolio or assignment based on the program requirement.',
    icon: FolderOpen,
  },
  {
    num: '04',
    title: 'Start Your Career',
    desc: 'Selected students join the first batch with scholarship support and practical training.',
    icon: Rocket,
  },
]

export function ScholarshipSection() {
  // Outer div — gets dynamic height injected on desktop so there is
  // enough scroll room for the sticky section to animate through.
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const stepRefs   = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()


      mm.add(
        {
          isDesktop:    '(min-width: 1024px)',
          isMobile:     '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const conds        = (context.conditions ?? {}) as Record<string, boolean>
          const isDesktop    = conds.isDesktop    ?? false
          const isMobile     = conds.isMobile     ?? false
          const reduceMotion = conds.reduceMotion ?? false

          if (reduceMotion) return

          const steps = stepRefs.current.filter((el): el is HTMLDivElement => el !== null)
          const icons = iconRefs.current.filter((el): el is HTMLDivElement => el !== null)

          // ── Desktop ────────────────────────────────────────────────
          // The section is CSS-sticky (not GSAP-pinned).  We make the
          // outer wrapper tall enough that ~900 px of scroll passes
          // while the inner section is stuck at top:0.
          // ScrollTrigger watches the wrapper; scrub drives the timeline.
          if (isDesktop) {
            // Stick only while the 4 steps reveal — release as soon as the last appears
            const SCROLL_DIST = Math.round(window.innerHeight * 1.05)

            const setHeight = () => {
              if (wrapperRef.current) {
                wrapperRef.current.style.height = `${window.innerHeight + SCROLL_DIST}px`
              }
            }
            setHeight()
            window.addEventListener('resize', setHeight)

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start:   'top top',
                end:     'bottom bottom',
                scrub:   0.4,
              },
            })

            // Connector line grows across the reveal phase
            if (lineRef.current) {
              tl.fromTo(
                lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 2.4, ease: 'none' },
                0,
              )
            }

            // Sequential step + icon reveals (one by one while section stays stuck)
            steps.forEach((step, i) => {
              const at = i * 0.6
              tl.fromTo(
                step,
                { autoAlpha: 0, y: 36, scale: 0.94 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                at,
              )
              if (icons[i]) {
                tl.fromTo(
                  icons[i],
                  { autoAlpha: 0, y: 10 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.35,
                    ease: 'power2.out',
                  },
                  at + 0.06,
                )
              }
            })

            return () => {
              window.removeEventListener('resize', setHeight)
              if (wrapperRef.current) wrapperRef.current.style.height = ''
            }
          }

          // ── Mobile / tablet ────────────────────────────────────────
          // No sticky needed — steps stack vertically in natural flow.
          // Each step gets its own scrub ScrollTrigger that fires as it
          // enters the viewport, producing the "one by one" reveal.
          if (isMobile) {
            steps.forEach((step, i) => {
              gsap.fromTo(
                step,
                { autoAlpha: 0, y: 40, scale: 0.95 },
                {
                  autoAlpha: 1, y: 0, scale: 1,
                  duration: 0.6, ease: 'power2.out',
                  scrollTrigger: {
                    trigger: step,
                    start:   'top 88%',
                    end:     'top 52%',
                    scrub:   0.5,
                  },
                }
              )
              if (icons[i]) {
                gsap.fromTo(
                  icons[i],
                  { autoAlpha: 0, y: 12 },
                  {
                    autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out',
                    scrollTrigger: {
                      trigger: step,
                      start:   'top 84%',
                      end:     'top 48%',
                      scrub:   0.5,
                    },
                  }
                )
              }
            })
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    // Outer scroll-track wrapper.
    // On desktop its height is set dynamically in the effect.
    // On mobile it's height:auto (natural flow).
    <div ref={wrapperRef} className="relative">

      {/*
        lg:sticky lg:top-0 lg:h-svh  — CSS pin (React-safe, no DOM moves)
        py-24 lg:py-0                   — normal padding on mobile; centered via flex on desktop
      */}
      <section className="lg:sticky lg:top-0 lg:h-svh relative bg-black py-16 sm:py-24 lg:py-[clamp(2rem,6vh,4.5rem)] px-4 lg:flex lg:flex-col lg:justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/bg-scholarship-2.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl w-full text-center">

          {/* Heading — always visible; stays fixed while steps animate */}
          <div className="mb-6 mx-auto">
            <SectionLabel className="mx-auto">Scholarship Program</SectionLabel>
          </div>

          <h2 className="text-4xl sm:text-4xl font-black text-green-accent mb-4">
            Apply for Our Merit
            <br />
            Scholarship
          </h2>

          <p className="max-w-2xl mx-auto text-center text-gray-400 mb-3">
            We are launching our first batch this July with a scholarship fund for eligible students.
          </p>
          <p className="max-w-2xl mx-auto text-center text-gray-400 mb-10">
            To apply, register for the scholarship program and complete the entrance test.
            Pass the test. Show us your work. Start your creative career with Pixl Pluz Academy.
          </p>

          <div className="mb-16">
            <div className="inline-block hover:scale-105 active:scale-95 transition-transform duration-150">
              <Link
                href="/scholarship"
                className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest pixel-corner-sm"
              >
                Apply For Scholarship
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">

            {/* Connector line — GSAP drives scaleX 0 → 1 from left (desktop only) */}
            <div
              ref={lineRef}
              className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-blue-primary/25"
              style={{ transformOrigin: 'left center' }}
              aria-hidden
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                  style={{ opacity: 0 }}
                >
                  {/* Step number + icon — flat, no circle, no arrow */}
                  <div
                    ref={(el) => { iconRefs.current[i] = el }}
                    className="mb-5 flex flex-col items-center lg:items-start gap-3"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-mono text-xs tracking-[0.22em] text-white/40 uppercase select-none">
                      {step.num}
                    </span>
                    <step.icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-blue-primary"
                    />
                  </div>

                  <h3 className="font-black text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-justify text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
