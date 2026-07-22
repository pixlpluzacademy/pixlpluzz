'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    num: '01',
    title: 'REGISTER ONLINE',
    desc: 'Fill out the scholarship application form with your basic details.',
    icon: '/icons/register-online.svg',
  },
  {
    num: '02',
    title: 'ENTRANCE TEST',
    desc: 'Complete the entrance test and show us your interest, effort, and learning potential.',
    icon: '/icons/attend-the-test.svg',
  },
  {
    num: '03',
    title: 'INTERVIEW',
    desc: 'Share your ideas, portfolio or assignment based on the program requirement.',
    icon: '/icons/interview.svg',
  },
  {
    num: '04',
    title: 'START YOUR CAREER',
    desc: 'Selected students join the first batch with scholarship support and practical training.',
    icon: '/icons/start-your-career.svg',
  },
]

export function ScholarshipSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
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
          // CSS sticky + capped stage (no JS height from innerHeight)
          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start:   'top top',
                end:     'bottom bottom',
                scrub:   0.4,
                invalidateOnRefresh: true,
              },
            })

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
          }

          // ── Mobile / tablet ────────────────────────────────────────
          // No sticky needed — steps stack vertically in natural flow.
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
    // Desktop: capped sticky stage + scrub track. Mobile: natural height.
    <div ref={wrapperRef} className="scholarship-scroll-track relative">
      <section className="scholarship-sticky-stage relative overflow-hidden bg-black py-[clamp(64px,6vw,96px)] lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-center lg:py-[clamp(2rem,4vh,3.5rem)]">
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
        <div className="site-container relative z-10 w-full text-center">

          {/* Heading — always visible; stays fixed while steps animate */}
          <h2 className="mb-5 font-black uppercase leading-[0.92] tracking-tight sm:mb-6 text-[clamp(2rem,6.5vw,4.25rem)]">
            <span className="text-white">Merit Based</span>{' '}
            <span className="text-green-accent">Scholarship</span>
          </h2>

          <p className="mx-auto mb-3 max-w-[42rem] text-center text-gray-400">
          As we begin, we're opening doors not just to a new batch, but to opportunity. Our scholarship fund is here to make sure talent, not tuition, decides who gets to build a career in AI. 
          </p>
          <p className="mx-auto mb-8 max-w-[42rem] text-center text-gray-400">
          Limited seats. Limited time. Unlimited potential.
          </p>

          <div className="mb-10 sm:mb-12">
            <div className="inline-block transition-transform duration-150 hover:scale-105 active:scale-95">
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
            <div className="grid gap-[clamp(1rem,1.5vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                  style={{ opacity: 0 }}
                >
                  <div
                    ref={(el) => { iconRefs.current[i] = el }}
                    className="mb-5 flex flex-col items-center gap-3 lg:items-start"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/40 select-none">
                      {step.num}
                    </span>
                    <Image
                      src={step.icon}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </div>

                  <h3 className="mb-2 font-black leading-snug text-green-accent">
                    {step.title}
                  </h3>
                  <p className="text-center text-sm leading-relaxed text-gray-400 lg:text-left lg:text-justify">
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
