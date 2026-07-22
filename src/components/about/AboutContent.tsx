'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AboutBlurText } from '@/components/about/AboutBlurText'
import { AboutOfficeGallery } from '@/components/about/AboutOfficeGallery'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { PixelButton } from '@/components/ui/PixelButton'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    title: 'DRIVEN BY EXCELLENCE',
    desc: 'Our programs are shaped by high standards, continuous curriculum updates, and deep respect for craft — pushing every student beyond the expected.',
  },
  {
    title: 'HONESTY AND AUTHENTICITY',
    desc: 'In an industry full of noise and inflated promises, we focus on clarity, transparency, and outcomes we are proud to stand behind.',
  },
  {
    title: 'SKILLS THAT LAST',
    desc: 'We teach systems, tools, and workflows built to endure — balancing creativity, technology, and purpose for long-term career impact.',
  },
  {
    title: 'PURPOSEFUL LEARNING',
    desc: 'We are an academy of practitioners and mentors, prioritizing real capability and emotional confidence, even when it takes more time.',
  },
  {
    title: 'AI WITH IMPACT',
    desc: 'We do not chase trends. We integrate AI where it adds real value — creativity matters only when it serves purpose and endures over time.',
  },
  {
    title: 'EXPERIENCE AND ATTITUDE',
    desc: 'Our edge comes from years of exploration, teaching, and solving complex industry challenges — evolving with every batch we train.',
  },
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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="about-hero relative flex flex-col justify-end px-6 md:px-16 lg:px-20 pb-14 pt-28 sm:pb-20 md:pb-24 overflow-hidden" data-page-hero>
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-blue-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-mid/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <div className="ab-fade mb-8 flex flex-wrap items-end justify-between gap-8 md:mb-14">
            <div>
              <p className="about-kicker mb-3">Est. 2026</p>
              <p className="about-muted text-sm font-medium tracking-tight md:text-base">
                Kerala&apos;s Best AI-Integrated<br className="hidden sm:block" /> Digital Academy.
              </p>
            </div>
            {/* <div className="text-right">
              <p className="about-kicker mb-3">Backed by</p>
              <p className="about-muted text-sm md:text-base font-medium">Neo Digital Hub Dubai</p>
            </div> */}
          </div>

          <h1 className="mb-10 w-full max-w-none text-[clamp(2.1rem,6.2vw,5.5rem)] font-black uppercase leading-[1.1] tracking-tight">
            <span className="about-display mb-[0.12em] block">
              <AboutBlurText
                as="p"
                onLoad
                className="about-display inline text-inherit text-white"
                text="Work"
              />
              <AboutBlurText
                as="p"
                onLoad
                className="about-display inline text-inherit text-green-accent"
                text="smarter"
              />
            </span>
            <span className="about-display mb-[0.12em] block">
              <AboutBlurText
                as="p"
                onLoad
                className="about-display inline text-inherit text-white"
                text="Not"
              />
              <AboutBlurText
                as="p"
                onLoad
                className="about-display inline text-inherit text-green-accent"
                text="harder"
              />
            </span>
            <AboutBlurText
              as="p"
              onLoad
              className="about-display mb-[0.12em] block text-inherit text-white"
              text="You can be anything"
            />
            <AboutBlurText
              as="p"
              onLoad
              className="about-display block text-inherit text-green-accent"
              text="With AI"
            />
          </h1>

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

      <AboutOfficeGallery />

      {/* ── Values ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-20 py-14 sm:py-20 md:py-24 border-b border-blue-primary/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 md:mb-20">
            <p className="ab-reveal about-kicker mb-5">Our values</p>
            <AboutBlurText
              as="h2"
              className="about-display mb-5 text-[clamp(1.5rem,6.5vw,3.25rem)] uppercase text-white"
              text="What we believe shapes better learning"
            />
            <p className="ab-reveal about-body max-w-2xl text-base">
              Kerala&apos;s most career-focused AI academy. Driven by purpose, craft, and bold ideas.
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

        </div>
      </section>


    </div>
  )
}
