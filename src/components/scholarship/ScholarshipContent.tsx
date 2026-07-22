'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PixelButton } from '@/components/ui/PixelButton'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'

gsap.registerPlugin(ScrollTrigger)

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
    desc: 'Selected students can join the first batch with scholarship support.',
    icon: '/icons/start-your-career.svg',
  },
]

const SCHOLARSHIP_VIDEO = '/video/scholarship-bg-video.mp4'
const SCHOLARSHIP_POSTER = '/images/bg-scholarship5.png'
const HERO_WORD = 'SCHOLARSHIP'
const APPLY_WORDS = ['How', 'To', 'Apply'] as const

export function ScholarshipContent() {
  const rootRef = useRef<HTMLDivElement>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Same pop-in as career hero — abrupt opacity, no pixel trail
      if (!siteReady) {
        gsap.set('.sch-hero-letter', { opacity: 0 })
        gsap.set('.sch-apply-word', { opacity: 0 })
        return
      }

      gsap.fromTo(
        '.sch-hero-letter',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.08,
          ease: 'none',
          delay: 0.2,
        },
      )

      gsap.set('.sch-apply-word', { opacity: 0 })
      ScrollTrigger.create({
        trigger: '.sch-apply-heading',
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            '.sch-apply-word',
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.05,
              stagger: 0.35,
              ease: 'none',
            },
          )
        },
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [siteReady])

  return (
    <div
      ref={rootRef}
      className="scholarship-page min-h-screen"
      data-no-blur-text
    >
      <section
        className="relative h-[min(58svh,26rem)] overflow-hidden bg-black sm:h-[min(72svh,38rem)] lg:h-auto lg:min-h-[clamp(28rem,70svh,38rem)]"
        data-page-hero
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_28%] sm:object-center"
            src={SCHOLARSHIP_VIDEO}
            poster={SCHOLARSHIP_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/55" />
        </div>

        <h1 className="pointer-events-none absolute right-4 top-[4.75rem] z-10 max-w-[calc(100%-1.5rem)] text-right font-black uppercase leading-[0.95] drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:right-6 sm:top-24 sm:max-w-none lg:right-12 lg:top-28">
          <span className="inline-flex justify-end tracking-[-0.04em] sm:tracking-tight">
            {HERO_WORD.split('').map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className="sch-hero-letter career-outline-word inline-block text-[clamp(1.25rem,7.8vw,5rem)] sm:text-[clamp(2.25rem,8vw,5rem)]"
                style={{ opacity: 0 }}
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>
      </section>

      <section className="border-t border-white/8 bg-black py-[clamp(64px,6vw,96px)]">
        <div className="site-container-wide">
          <h2 className="sch-apply-heading mb-10 text-[clamp(2rem,9.5vw,5.5rem)] font-black uppercase leading-[1.05] tracking-tight text-green-accent sm:mb-16 sm:leading-[0.92]">
            {APPLY_WORDS.map((word) => (
              <span
                key={word}
                className="sch-apply-word mr-[0.22em] inline-block last:mr-0 sm:mr-[0.28em]"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex min-h-[22rem] flex-col border border-white/8 bg-[#141414] p-8 sm:min-h-[24rem] sm:p-9 lg:p-10"
              >
                <span className="mb-5 block font-mono text-sm tracking-[0.3em] text-green-accent/60">
                  {step.num}
                </span>
                <Image
                  src={step.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="mb-6 h-11 w-11 object-contain"
                />
                <h3 className="mb-3 text-xl font-black leading-snug text-green-accent sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-white/55">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="relative overflow-hidden border-t border-white/8 py-[clamp(64px,6vw,96px)]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/bgg.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="site-container relative z-10">
          <div className="overflow-hidden border border-white/10 bg-black/50 px-8 py-12 text-center backdrop-blur-md pixel-corner sm:px-12 sm:py-14 lg:px-14">
            <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
              Your Future Shouldn&apos;t Wait for Permission.
            </h2>
            <p className="mb-10 text-white/80">
              Fill out the form and we will contact you with the scholarship test
              schedule.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PixelButton href="/contact" variant="green" size="lg">
                Apply Now
              </PixelButton>
              <Link
                href="/courses"
                className="text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
              >
                View courses →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
