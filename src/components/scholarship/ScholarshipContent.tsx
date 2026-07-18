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
    icon: '/icons/dark-mode/submissions.svg',
    step: '01',
    title: 'Fill the Form',
    desc: 'Complete the scholarship application with your personal details, educational background, and motivation.',
  },
  {
    icon: '/icons/dark-mode/tasks.svg',
    step: '02',
    title: 'Take the Test',
    desc: 'Attend our online scholarship aptitude test covering logical thinking, digital awareness, and basic skills.',
  },
  {
    icon: '/icons/dark-mode/21-Approved dark.svg',
    step: '03',
    title: 'Get Evaluated',
    desc: 'Top scorers are shortlisted. Our panel evaluates financial eligibility and commitment.',
  },
  {
    icon: '/icons/dark-mode/career.svg',
    step: '04',
    title: 'Start Learning',
    desc: 'Selected candidates receive scholarship support and begin their course journey.',
  },
]

const ELIGIBILITY = [
  'You must be a resident of Kerala or a neighbouring state',
  'Annual family income below ₹4,00,000',
  'You must pass the scholarship entrance test',
  'Aged between 17 and 30 years',
  'Genuine financial need and strong motivation to learn',
  'Must commit to completing the full course',
]

const SCHOLARSHIP_VIDEO = '/video/scholarship-bg-video.mp4'
const SCHOLARSHIP_POSTER = '/images/bg-scholarship5.png'

export function ScholarshipContent() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady || !rootRef.current) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      gsap.utils
        .toArray<HTMLElement>('.sch-fade-in', rootRef.current!)
        .forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            opacity: 0,
            y: 40,
            duration: 0.85,
            ease: 'power3.out',
          })
        })
    }, rootRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [isSiteReady])

  return (
    <div ref={rootRef} className="scholarship-page min-h-screen">
      <section
        className="relative min-h-svh overflow-hidden bg-black"
        data-page-hero
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={SCHOLARSHIP_VIDEO}
            poster={SCHOLARSHIP_POSTER}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <h1 className="absolute bottom-6 left-4 z-10 text-[clamp(2.75rem,10vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-12">
          Scholarship
        </h1>
      </section>

      <section className="border-t border-white/8 bg-black px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="sch-fade-in sch-kicker mb-4 text-green-accent/70">How it works</p>
          <h2 className="mb-10 text-3xl font-black text-white sm:mb-14 sm:text-4xl">
            Four simple steps
          </h2>
          <div className="sch-fade-in grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="border border-white/8 bg-[#141414] p-6"
              >
                <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-green-accent/60">
                  {s.step}
                </span>
                <img
                  src={s.icon}
                  alt=""
                  className="mb-4 h-7 w-7 object-contain"
                />
                <h3 className="mb-2 font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-black px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="sch-fade-in sch-kicker mb-4 text-green-accent/70">Who can apply</p>
          <h2 className="mb-10 text-3xl font-black text-white">
            Eligibility criteria
          </h2>
          <ul className="sch-fade-in space-y-3">
            {ELIGIBILITY.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border border-white/8 bg-[#141414] p-4"
              >
                <span
                  className="mt-1.5 h-3.5 w-3.5 shrink-0 border border-green-accent/70 bg-green-accent/15"
                  aria-hidden
                />
                <span className="text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="apply"
        className="relative overflow-hidden border-t border-white/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
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
        <div className="relative z-10 mx-auto max-w-5xl overflow-hidden border border-white/10 bg-black/50 px-8 py-12 text-center backdrop-blur-md pixel-corner sm:px-12 sm:py-14 lg:max-w-7xl lg:px-14">
          <p className="sch-fade-in sch-kicker mb-5 text-white">
            Ready to apply?
          </p>
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            Your career shouldn&apos;t wait for permission.
          </h2>
          <p className="sch-fade-in mb-10 text-white/80">
            Fill out the form and we will contact you with the scholarship test
            schedule.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PixelButton href="/contact" variant="green" size="lg">
              Apply Now — It&apos;s Free
            </PixelButton>
            <Link
              href="/courses"
              className="text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              View courses →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
