'use client'

import { useRef, useState, useLayoutEffect } from 'react'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import type { Career } from '@/lib/data'
import { PixelButton } from '@/components/ui/PixelButton'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { formatDate } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const BELIEFS = [
  {
    title: 'Teach by doing.',
    copy: "We don't lecture from slides. Our team builds real campaigns, live projects, and AI-powered workflows alongside students — because that's how skills actually stick.",
  },
  {
    title: 'Growth through craft.',
    copy: "The better we get at what we do, the better our students become. It's that simple.",
  },
]

export function CareerContent({ careers }: { careers: Career[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      // Keep the hero hidden until the site loader clears
      if (!siteReady) {
        gsap.set('.career-hero-word', { opacity: 0 })
        gsap.set('.career-hero-tag', { opacity: 0 })
        return
      }

      // Hero — words pop in abruptly, one after another
      gsap.fromTo(
        '.career-hero-word',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, stagger: 0.35, ease: 'none', delay: 0.2 },
      )
      gsap.fromTo(
        '.career-hero-tag',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, ease: 'none', delay: 1.7 },
      )

      // Scroll reveals for everything below the fold
      gsap.utils.toArray<HTMLElement>('.career-reveal', root).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          },
        )
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [siteReady])

  return (
    <div ref={rootRef} className="bg-navy-950 text-white">
      {/* ── Hero — giant stacked type ─────────────────────────── */}
      <section className="relative flex min-h-[clamp(28rem,78svh,42rem)] flex-col justify-between overflow-hidden px-4 pt-24 pb-14 sm:px-6 lg:px-12" data-page-hero>
        <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

        <h1 className="relative z-10 font-black uppercase leading-[0.88] tracking-tight">
          <PixelTrail />
          <span className="block overflow-hidden">
            <span className="career-hero-word block text-[clamp(2.5rem,14vw,12rem)] text-white">
              Work
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="career-hero-word block text-[clamp(2.5rem,14vw,12rem)] text-white">
              With
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block whitespace-nowrap text-[clamp(2.5rem,14vw,12rem)]">
              {/* Separate pop targets so Pluz appears after Pixl, same line */}
              <span className="career-hero-word inline-block text-green-accent">Pixl</span>{' '}
              <span className="career-hero-word inline-block career-outline-word">Pluz</span>
            </span>
          </span>
        </h1>

        <div className="career-hero-tag relative z-10 mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg text-gray-400 sm:text-xl">
            We&apos;re building something special.
            <br />
            <span className="text-white">Come build it with us.</span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-primary">
            {careers.length} open position{careers.length !== 1 ? 's' : ''} — Kochi
          </p>
        </div>
      </section>

      {/* ── What we believe ───────────────────────────────────── */}
      <section className="border-t border-white/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="career-reveal mb-10 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent sm:mb-16">
            What we believe
          </p>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {BELIEFS.map((b) => (
              <div key={b.title}>
                <h2 className="mb-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  {b.title}
                </h2>
                <p className="career-reveal max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg">
                  {b.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open positions ────────────────────────────────────── */}
      <section className="border-t border-white/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="career-reveal mb-10 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent sm:mb-14">
            Open positions
          </p>

          <div>
            {careers.map((job, i) => {
              const open = openId === job.id
              return (
                <div key={job.id} className="career-reveal border-t border-white/10 last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : job.id)}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-4 py-7 text-left transition-colors sm:py-9"
                  >
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className={`text-sm font-bold transition-colors ${open ? 'text-green-accent' : 'text-gray-500 group-hover:text-green-accent'}`}>
                        ({String(i + 1).padStart(2, '0')})
                      </span>
                      <span className="text-sm text-gray-500">{job.type}</span>
                      <span className="text-xl font-black transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                        {job.title}
                      </span>
                      <span className="text-sm text-gray-500">({job.location})</span>
                    </span>
                    <ArrowUpRight
                      size={26}
                      className={`shrink-0 text-gray-500 transition-all duration-300 group-hover:text-green-accent ${open ? 'rotate-90 text-green-accent' : 'group-hover:rotate-45'}`}
                    />
                  </button>

                  {/* Expandable detail */}
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-10 pr-4 sm:pl-14">
                        <p className="mb-8 max-w-3xl leading-relaxed text-gray-400">{job.description}</p>

                        <div className="mb-8 grid gap-8 sm:grid-cols-2">
                          <div>
                            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((r, ri) => (
                                <li key={ri} className="flex items-start gap-2 text-sm text-gray-400">
                                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-green-accent" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((r, ri) => (
                                <li key={ri} className="flex items-start gap-2 text-sm text-gray-400">
                                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-blue-primary" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                          <PixelButton href="/contact" size="sm">Apply Now</PixelButton>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin size={13} /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Calendar size={13} /> Apply before {formatDate(job.deadline)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {careers.length === 0 && (
            <p className="career-reveal border-t border-white/10 py-16 text-gray-500">
              No open positions right now. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
