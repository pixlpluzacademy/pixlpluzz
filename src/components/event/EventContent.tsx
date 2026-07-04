'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import type { Event } from '@/lib/data'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { formatDate } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

function chapterNo(i: number) {
  return String(i + 1).padStart(2, '0')
}

export function EventContent({ events }: { events: Event[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      // Keep the hero hidden until the site loader clears
      if (!siteReady) {
        gsap.set('.evt-hero-pop', { opacity: 0 })
        return
      }

      // Hero — elements pop in abruptly one after another, terminal style
      gsap.fromTo(
        '.evt-hero-pop',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, stagger: 0.18, ease: 'none', delay: 0.2 },
      )

      // Chapter sections — headline rises, spec rows stagger in
      gsap.utils.toArray<HTMLElement>('.evt-chapter', root).forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        })
        tl.fromTo(
          section.querySelectorAll('.evt-reveal'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
        )
        tl.fromTo(
          section.querySelectorAll('.evt-spec-row'),
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          0.35,
        )
      })

      // Ghost chapter numbers drift slower than the page (parallax)
      gsap.utils.toArray<HTMLElement>('.evt-ghost-num', root).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 20 },
          {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('.evt-chapter'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Outro reveal
      gsap.utils.toArray<HTMLElement>('.evt-outro-reveal', root).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [siteReady])

  return (
    <div ref={rootRef} className="bg-navy-950 text-white">
      {/* ── Hero — terminal-style opener ──────────────────────── */}
      <section className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden px-4 pt-10 pb-12 sm:px-6 lg:px-12" data-page-hero>
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

        {/* Top status bar */}
        <div className="evt-hero-pop relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-gray-500">
          <span>[status:<span className="text-green-accent">active</span>]</span>
          <span>© PIXLPLUZ — {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">{'//'} events.upcoming</span>
        </div>

        {/* Giant heading */}
        <div className="relative z-10">
          <p className="evt-hero-pop mb-4 font-mono text-xs uppercase tracking-[0.35em] text-blue-primary">
            chapter index
          </p>
          {/* z-10 creates the stacking context that keeps the trail cubes behind the letters */}
          <h1 className="relative z-10 font-black uppercase leading-[0.88] tracking-tight">
            <PixelTrail />
            <span className="evt-hero-pop block text-[clamp(2.5rem,13vw,11rem)] career-outline-word">What&apos;s</span>
            <span className="evt-hero-pop block text-[clamp(2.5rem,13vw,11rem)] text-white">Happening</span>
          </h1>
        </div>

        {/* Bottom row — fake script block + count */}
        <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="evt-hero-pop font-mono text-xs leading-relaxed text-gray-500">
            <p className="text-gray-400">[f] initEvents() {'{'}</p>
            <p className="pl-5">loadWorkshops();</p>
            <p className="pl-5">openScholarshipTest();</p>
            <p className="pl-5">reserveSeats();</p>
            <p className="text-gray-400">{'}'}</p>
          </div>
          <div className="evt-hero-pop text-left sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-widest text-gray-500">upcoming</p>
            <p className="text-6xl font-black text-white sm:text-7xl">{chapterNo(events.length - 1)}</p>
          </div>
        </div>
      </section>

      {/* ── Chapters — one per event ──────────────────────────── */}
      {events.map((event, i) => (
        <section
          key={event.id}
          className="evt-chapter relative overflow-hidden border-t border-white/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
        >
          {/* Ghost number */}
          <span
            className="evt-ghost-num pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/[0.04] text-[clamp(12rem,32vw,26rem)]"
            aria-hidden
          >
            {chapterNo(i)}
          </span>

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="evt-reveal mb-10 font-mono text-xs uppercase tracking-[0.35em] text-green-accent">
              chapter {chapterNo(i)}: {event.type === 'Online' ? 'online session' : 'on campus'}
            </p>

            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              {/* Left — title + description + CTA */}
              <div>
                <h2 className="mb-6 text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
                  {event.title}
                </h2>
                <p className="evt-reveal mb-10 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                  {event.description}
                </p>
                <div className="evt-reveal flex flex-wrap items-center gap-5">
                  <Link
                    href={event.registrationUrl}
                    className="group inline-flex items-center gap-2 bg-green-accent px-7 py-3.5 text-xs font-black uppercase tracking-widest text-navy-950 transition-all hover:brightness-110 pixel-corner-sm"
                  >
                    Register Now
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                  {event.isFree && (
                    <span className="font-mono text-xs uppercase tracking-widest text-green-accent">
                      [price: free]
                    </span>
                  )}
                </div>
              </div>

              {/* Right — spec table */}
              <div>
                <p className="evt-reveal mb-4 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                  #current event specs
                </p>
                <dl className="border-t border-white/10">
                  {[
                    ['date', formatDate(event.date)],
                    ['time', event.time],
                    ['location', event.location],
                    ['format', event.type],
                    ['seats', `${event.seats} available`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="evt-spec-row flex items-baseline justify-between gap-6 border-b border-white/10 py-4"
                    >
                      <dt className="font-mono text-xs uppercase tracking-widest text-gray-500">{label}</dt>
                      <dd className="text-right text-sm font-bold text-white sm:text-base">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      ))}

      {events.length === 0 && (
        <section className="border-t border-white/8 px-4 py-32 text-center sm:px-6 lg:px-12">
          <p className="font-mono text-sm text-gray-500">[status: no upcoming events — check back soon]</p>
        </section>
      )}

      {/* ── Final word ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-12">
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="evt-outro-reveal mb-8 font-mono text-xs uppercase tracking-[0.35em] text-green-accent">
            final word
          </p>
          <h2 className="mb-10 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Seats fill fast. Don&apos;t just scroll past — show up and build something.
          </h2>
          <div className="evt-outro-reveal">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-navy-950 pixel-corner-sm"
            >
              Talk to us
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
