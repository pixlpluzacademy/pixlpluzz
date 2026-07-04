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

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll<HTMLElement>('.hero-line-inner')
      const fades = section.querySelectorAll<HTMLElement>('.hero-fade')
      const shade = section.querySelector<HTMLElement>('.hero-shade')
      const hint = section.querySelector<HTMLElement>('.hero-scroll-hint')

      if (reduceMotion) {
        gsap.set(lines, { yPercent: 0 })
        gsap.set(fades, { opacity: 1, y: 0 })
        gsap.set(shade, { opacity: 1 })
        return
      }

      // Start: only the cube cluster is visible
      gsap.set(lines, { yPercent: 115 })
      gsap.set(fades, { opacity: 0, y: 30 })
      gsap.set(shade, { opacity: 0 })

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

      // Scroll hint disappears as soon as scrolling starts
      if (hint) tl.to(hint, { opacity: 0, duration: 0.06, ease: 'none' }, 0.01)

      // 0 → 0.3: cluster alone drifts and scatters (handled inside HeroPixelField)

      // Darken the text side so the headline stays readable
      if (shade) tl.to(shade, { opacity: 1, duration: 0.2, ease: 'none' }, 0.22)

      // Headline lines rise out of their masks
      tl.to(
        lines,
        { yPercent: 0, duration: 0.28, stagger: 0.07, ease: 'power2.out' },
        0.3,
      )

      // Kicker, subtitle, CTAs, credit fade in
      tl.to(
        fades,
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.05, ease: 'power1.out' },
        0.44,
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative -mt-16 h-[280vh] bg-navy-950">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* 3D cube cluster — the only thing visible at the top */}
        <HeroPixelField className="absolute inset-0 z-0" />

        {/* Readability gradient — fades in together with the text */}
        <div
          className="hero-shade pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(6,11,22,0.88) 0%, rgba(6,11,22,0.55) 42%, rgba(6,11,22,0.05) 75%, rgba(6,11,22,0) 100%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[1] pixel-grid-bg opacity-10" aria-hidden />

        {/* Content — revealed by scroll */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 pb-20 sm:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1400px]">
            <p className="hero-fade mb-8 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-primary">
              AI Integrated Academy — Kochi
            </p>

            <h1 className="font-black leading-[1.05] tracking-tight">
              <span className="block overflow-hidden pb-[0.32em]">
                <span className="hero-line-inner block text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[1.08] text-white">
                  Kerala&apos;s Best
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.32em]">
                <span className="hero-line-inner block text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[1.08] text-green-accent">
                  AI Integrated
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.32em]">
                <span className="hero-line-inner block text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[1.08] text-white">
                  Courses<span className="text-green-accent"></span>
                </span>
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <p className="hero-fade max-w-md text-base leading-relaxed text-gray-300 sm:text-lg">
                Our first batch starts this July with a{' '}
                <span className="font-semibold text-white">₹50 Lakh Scholarship Fund</span>{' '}
                for eligible candidates.
              </p>

              <div className="hero-fade flex flex-wrap items-center gap-4">
                <Link
                  href="/scholarship"
                  className="inline-flex items-center gap-2 bg-blue-primary px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:brightness-110 pixel-corner-sm"
                >
                  Apply For Scholarship <ChevronRight size={15} />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 border-2 border-white/25 px-7 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-green-accent hover:text-green-accent pixel-corner-sm"
                >
                  Explore Courses <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <p className="hero-fade mt-12 text-xs text-gray-500">
              Backed by{' '}
              <span className="font-semibold text-green-accent">Neo Digital Hub</span>{' '}
              and real agency mentors
            </p>
          </div>
        </div>

        {/* Scroll hint — visible at load, gone once scrolling starts */}
        <div
          className="hero-scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
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
