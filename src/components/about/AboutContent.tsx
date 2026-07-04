'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AboutMarquee } from '@/components/about/AboutMarquee'
import { AboutBlurText } from '@/components/about/AboutBlurText'
import { AboutServicesTeaser } from '@/components/about/AboutServicesTeaser'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { PixelButton } from '@/components/ui/PixelButton'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_A = ['Practical', 'AI-Integrated', 'Career-First', 'Industry Mentors', 'Live Projects']
const MARQUEE_B = ['Learn', 'Build', 'Launch', 'Grow', 'Pixl Pluz Academy']

const VALUES = [
  {
    title: 'Driven by excellence',
    desc: 'Our programs are shaped by high standards, continuous curriculum updates, and deep respect for craft — pushing every student beyond the expected.',
  },
  {
    title: 'Honesty and authenticity',
    desc: 'In an industry full of noise and inflated promises, we focus on clarity, transparency, and outcomes we are proud to stand behind.',
  },
  {
    title: 'Skills that last',
    desc: 'We teach systems, tools, and workflows built to endure — balancing creativity, technology, and purpose for long-term career impact.',
  },
  {
    title: 'Purposeful learning',
    desc: 'We are an academy of practitioners and mentors, prioritizing real capability and emotional confidence, even when it takes more time.',
  },
  {
    title: 'AI with impact',
    desc: 'We do not chase trends. We integrate AI where it adds real value — creativity matters only when it serves purpose and endures over time.',
  },
  {
    title: 'Experience and attitude',
    desc: 'Our edge comes from years of exploration, teaching, and solving complex industry challenges — evolving with every batch we train.',
  },
]

const PROCESS = [
  {
    step: 'Step — 1',
    title: 'Learn',
    desc: 'We begin by understanding your goals. Structured fundamentals, mentor guidance, and AI tools help you define the right path before you build.',
  },
  {
    step: 'Step — 2',
    title: 'Build',
    desc: 'We translate insight into output — live projects, portfolio work, campaign assignments, and real industry-style deliverables with care and precision.',
  },
  {
    step: 'Step — 3',
    title: 'Launch',
    desc: 'Through placement support, interview prep, and portfolio refinement, we help you step into the market with purpose and confidence.',
  },
]

const STATS = [
  { value: '2026', label: 'Founded' },
  { value: '₹50L', label: 'Scholarship Fund' },
  { value: '5+', label: 'Career Courses' },
  { value: '100%', label: 'Placement Support' },
]

export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady) return

    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const fadeEls = container.querySelectorAll<HTMLElement>('.about-hero .ab-fade')
      gsap.set(fadeEls, { opacity: 0, y: 40 })
      gsap.to(fadeEls, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.utils.toArray<HTMLElement>('.ab-reveal', container).forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray<HTMLElement>('.ab-reveal-stagger', container).forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          opacity: 0,
          y: 36,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        })
      })
    }, containerRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [isSiteReady])

  return (
    <div ref={containerRef} className="about-page">

      <AboutMarquee items={MARQUEE_A} speed="fast" />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="about-hero relative min-h-[calc(100svh-4rem)] flex flex-col justify-end px-6 md:px-16 lg:px-20 pb-16 md:pb-24 pt-24 overflow-hidden" data-page-hero>
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-blue-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-mid/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <div className="ab-fade flex flex-wrap items-end justify-between gap-8 mb-10 md:mb-24">
            <div>
              <p className="about-kicker mb-3">Est. 2026</p>
              <p className="about-muted text-sm md:text-base font-medium tracking-tight">
                Kerala&apos;s AI-integrated<br className="hidden sm:block" /> digital academy.
              </p>
            </div>
            {/* <div className="text-right">
              <p className="about-kicker mb-3">Backed by</p>
              <p className="about-muted text-sm md:text-base font-medium">Neo Digital Hub Dubai</p>
            </div> */}
          </div>

          <AboutBlurText
            as="h1"
            onLoad
            className="about-display text-[clamp(2rem,5.5vw,4.5rem)] text-white max-w-[1200px] mb-10"
            text="We are an AI-integrated academy built on practical training, thoughtful craft, and careers earned through real work."
          />

          <p className="ab-fade about-body text-base md:text-lg max-w-xl mb-4">
            At the intersection of skills, technology, and opportunity.
          </p>
          <p className="ab-fade about-body text-sm md:text-base max-w-2xl">
            Pixl Pluz Academy helps students, graduates, freelancers, and career switchers
            build job-ready expertise through live projects, AI tools, and industry mentorship.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-8 md:right-16 hidden md:flex flex-col items-center gap-3 opacity-25">
          <span className="text-[10px] tracking-[0.35em] uppercase text-blue-light/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="w-px h-14 bg-linear-to-b from-transparent via-blue-light/40 to-transparent" />
        </div>
      </section>

      <AboutMarquee items={MARQUEE_B} />

      {/* ── Story ────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-16 sm:py-24 md:py-36 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-8 lg:gap-24 items-start">
          <p className="ab-reveal about-kicker about-kicker-accent">At Pixl Pluz,</p>

          <div>
            <AboutBlurText
              as="h2"
              className="about-display text-3xl sm:text-4xl lg:text-[2.75rem] text-white mb-8 max-w-3xl"
              text="We build careers around capability. Every program is led by mentors, practitioners, and specialists chosen for the skills you need today."
            />
            <p className="ab-reveal about-body text-base md:text-lg max-w-2xl mb-6">
              We&apos;ve grown through experimentation, learning, and refinement — shaping a
              practice focused on clarity, craft, and long-term impact. Today, we partner with
              ambitious learners to build portfolios, platforms, and careers that scale with
              purpose and endure.
            </p>
            <Link href="/contact" className="ab-reveal about-link">
              let&apos;s connect <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-16 sm:py-24 md:py-36 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 md:mb-20 max-w-2xl">
            <p className="ab-reveal about-kicker mb-5">Our values</p>
            <AboutBlurText
              as="h2"
              className="about-display text-3xl sm:text-4xl text-white mb-5"
              text="What we believe shapes better learning."
            />
            <p className="ab-reveal about-body text-base">
              Kerala&apos;s most career-focused AI academy — driven by purpose, craft, and bold ideas.
            </p>
          </div>

          <div className="divide-y divide-blue-primary/20 border-t border-blue-primary/20">
            {VALUES.map((v) => (
              <article key={v.title} className="py-10 md:py-12 grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 md:gap-16">
                <AboutBlurText
                  as="h3"
                  className="about-value-title text-white"
                  text={v.title}
                />
                <p className="ab-reveal about-body text-sm md:text-base">{v.desc}</p>
              </article>
            ))}
          </div>

          <p className="ab-reveal mt-12 about-kicker text-blue-light/30">
            ✦ What we believe shapes better work.
          </p>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-16 sm:py-24 md:py-36 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 md:mb-20">
            <p className="ab-reveal about-kicker mb-5">Our process</p>
            <AboutBlurText
              as="h2"
              className="about-display text-3xl sm:text-4xl text-white mb-4"
              text="How we work"
            />
            <p className="ab-reveal about-body text-base max-w-lg">
              A repeatable method applied across every course and cohort.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-blue-primary/20">
            {PROCESS.map((p) => (
              <article key={p.title} className="about-surface p-8 md:p-10 lg:p-12">
                <p className="ab-reveal about-process-num mb-8">{p.step}</p>
                <AboutBlurText
                  as="h3"
                  className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight"
                  text={p.title}
                />
                <p className="ab-reveal about-body text-sm md:text-base">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────────── */}
      <section className="ab-split px-6 md:px-16 lg:px-20 py-20 sm:py-28 md:py-40 border-b border-blue-primary/20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="about-quote-mark mb-6" aria-hidden>&ldquo;</p>
          <blockquote className="max-w-4xl mx-auto">
            <AboutBlurText
              as="p"
              className="about-display text-2xl sm:text-4xl lg:text-5xl text-white leading-tight mb-8"
              text="True growth is not about adding more courses —"
            />
            <AboutBlurText
              as="p"
              className="about-display text-2xl sm:text-4xl lg:text-5xl about-quote-dim leading-tight"
              text="but about becoming more capable."
            />
          </blockquote>
          <p className="ab-reveal about-body text-sm mt-10 max-w-md mx-auto">
            Recognized by industry mentors and trusted by learners building careers across Kerala.
          </p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-16 sm:py-24 md:py-32 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="ab-reveal about-kicker mb-4">By the numbers</p>
            <AboutBlurText
              as="h2"
              className="about-display text-2xl sm:text-3xl text-white"
              text="Different paths. One standard."
            />
          </div>

          <div className="ab-reveal-stagger grid grid-cols-2 lg:grid-cols-4 gap-px bg-blue-primary/20">
            {STATS.map((s) => (
              <div key={s.label} className="about-surface p-8 md:p-10">
                <p className="text-3xl md:text-4xl font-black text-blue-light tracking-tight mb-3">{s.value}</p>
                <p className="about-kicker !tracking-[0.25em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we're for ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-16 sm:py-24 md:py-36 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-24">
          <div>
            <p className="ab-reveal about-kicker mb-5">Who we&apos;re for</p>
            <AboutBlurText
              as="h2"
              className="about-display text-3xl sm:text-4xl text-white leading-tight"
              text="We're not the right fit for everyone — and that's intentional."
            />
          </div>
          <div className="ab-reveal space-y-6 about-body text-base">
            <p>
              We don&apos;t do surface-level training, endless theory without direction,
              or courses that exist only to &ldquo;look good&rdquo; on paper.
            </p>
            <p>
              We&apos;re not for learners driven by shortcuts over understanding,
              or decisions made without purpose.
            </p>
            <p className="text-blue-light/80">
              We partner with students who care about outcomes, trust the process,
              and are committed to building something meaningful together.
            </p>
          </div>
        </div>
      </section>

      <AboutServicesTeaser />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="pp-cta-section px-6 md:px-16 lg:px-20 py-20 sm:py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="ab-reveal about-kicker about-kicker-accent mb-8">Start today</p>
          <AboutBlurText
            as="h2"
            className="about-display text-4xl sm:text-5xl lg:text-6xl text-white mb-8 max-w-4xl mx-auto leading-tight"
            text="Your career does not need to wait for the future."
          />
          <p className="ab-reveal about-body text-base md:text-lg mb-12 max-w-lg mx-auto">
            Join Pixl Pluz Academy and transform your skills into a career with practical
            training, mentorship, and real opportunities.
          </p>
          <div className="ab-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <PixelButton href="/courses" variant="primary" size="lg">
              Explore Courses
            </PixelButton>
            <PixelButton href="/scholarship" variant="outline" size="lg">
              Apply for Scholarship
            </PixelButton>
          </div>
        </div>
      </section>

    </div>
  )
}
