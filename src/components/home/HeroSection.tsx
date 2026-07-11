'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroPixelField = dynamic(
  () => import('@/components/home/HeroPixelField').then(m => ({ default: m.HeroPixelField })),
  { ssr: false },
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const conds = (context.conditions ?? {}) as Record<string, boolean>
        const lines = section.querySelectorAll<HTMLElement>('.hero-line-inner')
        const fades = section.querySelectorAll<HTMLElement>('.hero-fade')
        const shade = section.querySelector<HTMLElement>('.hero-shade')
        const hint = section.querySelector<HTMLElement>('.hero-scroll-hint')

        if (reduceMotion || conds.reduceMotion) {
          gsap.set(lines, { yPercent: 0 })
          gsap.set(fades, { opacity: 1, y: 0 })
          gsap.set(shade, { opacity: 1 })
          if (hint) gsap.set(hint, { opacity: 0 })
          return
        }

        // Hidden until cluster has scattered
        gsap.set(lines, { yPercent: 115 })
        gsap.set(fades, { opacity: 0, y: 20 })
        gsap.set(shade, { opacity: 0 })

        // Mobile: cluster alone → scatter → then clean slide-up text
        if (conds.isMobile) {
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
          if (shade) tl.to(shade, { opacity: 1, duration: 0.4 }, 1.0)
          tl.to(
            lines,
            { yPercent: 0, duration: 0.65, stagger: 0.09 },
            1.15,
          )
          tl.to(
            fades,
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
            1.5,
          )
          return
        }

        // Desktop: cluster scatters first on scroll, then text slides up
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            scroller: document.documentElement,
            invalidateOnRefresh: true,
          },
        })

        // 0 → 0.45: cluster only (scatter / drift)
        if (hint) tl.to(hint, { opacity: 0, duration: 0.08, ease: 'none' }, 0.02)
        if (shade) tl.to(shade, { opacity: 1, duration: 0.16, ease: 'none' }, 0.44)
        // Text reveal after scatter is well underway
        tl.to(
          lines,
          { yPercent: 0, duration: 0.28, stagger: 0.07, ease: 'power2.out' },
          0.48,
        )
        tl.to(
          fades,
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power1.out' },
          0.62,
        )
      },
    )

    return () => mm.revert()
  }, [])

  // Fixed scrub distance so tall monitors don't create a huge scroll gap.
  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 min-h-svh md:h-[calc(100svh+900px)] bg-navy-950"
      data-page-hero
    >
      <div
        className="flex min-h-svh flex-col overflow-hidden md:sticky md:top-0 md:h-svh"
        style={{
          background:
            'radial-gradient(ellipse 140% 95% at 50% 100%, #0d1730 0%, #0a1228 28%, #080d1a 55%, #060b16 80%, #040810 100%)',
        }}
      >
        <HeroPixelField className="absolute inset-0 z-0" />

        <div
          className="hero-shade pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(6,11,22,0.72) 0%, rgba(6,11,22,0.35) 45%, rgba(6,11,22,0) 75%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[1] pixel-grid-bg opacity-10" aria-hidden />

        <div className="relative z-10 flex flex-1 flex-col items-center px-6 pt-28 pb-10 sm:px-12 lg:px-20">
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
            <p className="hero-fade mb-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-primary">
              AI Integrated Academy — Kochi
            </p>

            <h1 className="font-black leading-[1.05] tracking-tight">
              <span className="block overflow-hidden pb-[0.28em]">
                <span className="hero-line-inner block text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.08] text-white">
                  Kerala&apos;s Best
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.28em]">
                <span className="hero-line-inner block text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.08] text-green-accent">
                  AI Integrated
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.28em]">
                <span className="hero-line-inner block text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.08] text-white">
                  Courses
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-6 max-w-md text-base leading-relaxed text-gray-300 sm:text-lg">
              Our first batch starts this July with a{' '}
              <span className="font-semibold text-white">Scholarship Fund</span>{' '}
              for eligible candidates.
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/scholarship"
                className="btn-glaze btn-primary-fill inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest pixel-corner-sm"
              >
                Apply For Scholarship <ChevronRight size={15} />
              </Link>
              <Link
                href="/courses"
                className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-7 py-3 text-sm font-bold uppercase tracking-widest transition-colors pixel-corner-sm"
              >
                Explore Courses <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="hero-scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
            Scroll
          </span>
          <div className="h-8 w-px bg-linear-to-b from-white/0 to-white/40" />
          <div className="h-1 w-1 bg-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
