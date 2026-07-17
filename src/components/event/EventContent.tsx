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

      // Chapter titles — clip uncover + blur on scroll
      gsap.utils.toArray<HTMLElement>('.evt-chapter', root).forEach((section) => {
        const titleLine = section.querySelectorAll<HTMLElement>('.evt-chapter-line')
        const reveal = section.querySelectorAll<HTMLElement>('.evt-reveal')
        const specs = section.querySelectorAll<HTMLElement>('.evt-spec-row')

        gsap.set(titleLine, {
          clipPath: 'inset(0 100% -0.45em 0)',
          filter: 'blur(8px)',
          scale: 0.985,
        })

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        })
        tl.to(titleLine, {
          clipPath: 'inset(0 0% -0.45em 0)',
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
        })
        tl.fromTo(
          reveal,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
          0.2,
        )
        tl.fromTo(
          specs,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          0.3,
        )
      })

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

      // Outro heading + fades
      const outroLines = root.querySelectorAll<HTMLElement>('.evt-outro-line')
      const outroFades = root.querySelectorAll<HTMLElement>('.evt-outro-reveal')
      gsap.set(outroLines, {
        clipPath: 'inset(0 100% -0.45em 0)',
        filter: 'blur(8px)',
        scale: 0.985,
      })
      gsap
        .timeline({
          scrollTrigger: { trigger: outroLines[0] ?? root, start: 'top 85%', once: true },
        })
        .to(outroLines, {
          clipPath: 'inset(0 0% -0.45em 0)',
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
        })
        .fromTo(
          outroFades,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
          0.2,
        )
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [siteReady])

  return (
    <div ref={rootRef} className="bg-black text-gray-400">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[clamp(28rem,78svh,42rem)] flex-col justify-between overflow-hidden px-4 pt-24 pb-12 sm:px-6 lg:px-12" data-page-hero>
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

        <div className="evt-hero-pop relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-sky-400">
          <span>[status:<span className="text-sky-400">active</span>]</span>
          <span>© PIXLPLUZ — {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">{'//'} events.upcoming</span>
        </div>

        <div className="relative z-10">
          <p className="evt-hero-pop mb-4 font-mono text-xs uppercase tracking-[0.35em] text-sky-400">
            chapter index
          </p>
          <h1 className="relative z-10 font-black uppercase leading-[0.88] tracking-tight">
            <PixelTrail />
            <span className="evt-hero-pop block text-[clamp(2.5rem,13vw,11rem)] career-outline-word evt-outline-muted">What&apos;s</span>
            <span className="evt-hero-pop block text-[clamp(2.5rem,13vw,11rem)] text-gray-400">Happening</span>
          </h1>
        </div>

        <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="evt-hero-pop font-mono text-xs leading-relaxed text-sky-400/80">
            <p className="text-sky-400">[f] initEvents() {'{'}</p>
            <p className="pl-5 text-sky-400/70">loadWorkshops();</p>
            <p className="pl-5 text-sky-400/70">openScholarshipTest();</p>
            <p className="pl-5 text-sky-400/70">reserveSeats();</p>
            <p className="text-sky-400">{'}'}</p>
          </div>
          <div className="evt-hero-pop text-left sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-widest text-sky-400">upcoming</p>
            <p className="text-6xl font-black text-gray-400 sm:text-7xl">{chapterNo(events.length - 1)}</p>
          </div>
        </div>
      </section>

      {events.map((event, i) => (
        <section
          key={event.id}
          className="evt-chapter relative overflow-hidden border-t border-white/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
        >
          <span
            className="evt-ghost-num pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/[0.04] text-[clamp(12rem,32vw,26rem)]"
            aria-hidden
          >
            {chapterNo(i)}
          </span>

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="evt-reveal mb-10 font-mono text-xs uppercase tracking-[0.35em] text-sky-400">
              chapter {chapterNo(i)}: {event.type === 'Online' ? 'online session' : 'on campus'}
            </p>

            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
              <div>
                <h2 className="mb-6 text-4xl font-black leading-[1.02] text-gray-400 sm:text-5xl lg:text-6xl">
                  <span className="evt-chapter-line block pb-[0.12em]">{event.title}</span>
                </h2>
                <p className="evt-reveal mb-10 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
                  {event.description}
                </p>
                <div className="evt-reveal flex flex-wrap items-center gap-5">
                  <Link
                    href={event.registrationUrl}
                    className="btn-glaze group inline-flex items-center gap-2 bg-green-accent px-7 py-3.5 text-xs font-black uppercase tracking-widest text-navy-950 transition-all hover:brightness-110 pixel-corner-sm"
                  >
                    Register Now
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                  {event.isFree && (
                    <span className="font-mono text-xs uppercase tracking-widest text-sky-400">
                      [price: free]
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="evt-reveal mb-4 font-mono text-[11px] uppercase tracking-widest text-sky-400">
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
                      <dt className="font-mono text-xs uppercase tracking-widest text-sky-400">{label}</dt>
                      <dd className="text-right text-sm font-bold text-gray-400 sm:text-base">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      ))}

      {events.length === 0 && (
        <section className="border-t border-white/8 px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-12">
          <p className="font-mono text-sm text-sky-400">[status: no upcoming events — check back soon]</p>
        </section>
      )}

      <section className="relative overflow-hidden border-t border-white/8 px-4 py-20 sm:px-6 sm:py-28 lg:px-12">
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="evt-outro-reveal mb-8 font-mono text-xs uppercase tracking-[0.35em] text-sky-400">
            final word
          </p>
          <h2 className="mb-10 max-w-4xl text-3xl font-black leading-tight text-gray-400 sm:text-5xl">
            <span className="evt-outro-line block pb-[0.12em]">
              Seats fill fast. Don&apos;t just scroll past — show up and build something.
            </span>
          </h2>
          <div className="evt-outro-reveal">
            <Link
              href="/contact"
              className="btn-glaze btn-outline-bright group inline-flex items-center gap-2 border-2 px-8 py-4 text-xs font-black uppercase tracking-widest transition-colors pixel-corner-sm"
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
