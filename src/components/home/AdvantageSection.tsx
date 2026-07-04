'use client'

import Link from 'next/link'
import { useRef, useEffect, useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import {
  ArrowRight,
  GraduationCap,
  Construction,
  Users,
  Bot,
  TrendingUp,
  Mic,
  BookOpen,
  BadgeCheck,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: GraduationCap, label: 'Scholarship Based Courses', num: '01' },
  { icon: Construction, label: 'Live Project & Training', num: '02' },
  { icon: Users, label: 'Industry Expert Mentors', num: '03' },
  { icon: Bot, label: 'AI Tools & Automation', num: '04' },
  { icon: TrendingUp, label: '100% Placement Assistance', num: '05' },
  { icon: Mic, label: 'Interview Preparation', num: '06' },
  { icon: BookOpen, label: 'Practical Learning', num: '07' },
  { icon: BadgeCheck, label: 'Verified Portfolio', num: '08' },
]

const CARD = 380
const STEP = 30

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const mobileGridRef = useRef<HTMLDivElement>(null)

  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => { lenis.off('scroll', onScroll) }
  }, [lenis])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // gsap.matchMedia() manages its own context — no nested gsap.context() needed
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
      if (!cards.length) return

      gsap.set(cards, {
        opacity: 0,
        x: 600,
        y: 350,
        scale: 0.9,
        rotate: 3,
        filter: 'blur(10px)',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            x: i * STEP,
            y: i * STEP,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
          },
          i * 0.7
        )
      })
    })

    mm.add('(max-width: 1023px)', () => {
      const mobileCards = mobileCardsRef.current.filter(
        (c): c is HTMLDivElement => c !== null
      )
      const trigger = mobileGridRef.current ?? section
      if (!mobileCards.length) return

      gsap.set(mobileCards, {
        opacity: 0,
        y: 60,
        scale: 0.92,
        filter: 'blur(8px)',
      })

      gsap.to(mobileCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => mm.revert()
  }, [])

  const cascadeSize = CARD + (FEATURES.length - 1) * STEP

  return (
    // Desktop: 500vh outer section + CSS sticky inner panel (no GSAP pin)
    // Mobile: natural height, inner panel is just a normal block
    <section
      ref={sectionRef}
      className="relative bg-navy-950 lg:h-[500vh]"
    >
      <div className="overflow-hidden py-16 sm:py-24 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div
          className="pointer-events-none absolute inset-0 pixel-dot-bg opacity-20"
          aria-hidden
        />

        <FloatingPixels />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl items-center gap-12 px-4 sm:gap-16 lg:grid-cols-2">
          {/* Left: static text content — opt out of auto blur (sticky scroll leaves words at mixed opacity) */}
          <div data-no-blur-text>
            <SectionLabel className="mb-4">
              The PixlPluz Advantage
            </SectionLabel>

            <h2 className="mb-6 text-4xl font-black leading-tight text-white lg:text-6xl">
              Digital marketing agency in kerala
            </h2>

            <p className="mb-10 max-w-xl text-gray-400 leading-relaxed">
              Pixl Pluz offers an agency-based digital marketing course in Kochi,
              Thiruvananthapuram, and Calicut. Learners can choose between our
              Live Online Program or offline classes at our institutes, with
              weekend batches available at all centres. Whether you&apos;re a
              fresh graduate, working professional, homemaker, or business owner,
              Pixl Pluz academy builds job-ready digital marketing careers through
              hands-on, agency-style training — backed by Neo Digital Hub, Dubai.
            </p>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-green-accent hover:text-green-accent pixel-corner-sm"
            >
              Become a Student
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: desktop card cascade — visible on lg+ only */}
          <div className="hidden items-center justify-center lg:flex">
            <div
              className="relative"
              style={{ width: cascadeSize, height: cascadeSize }}
            >
              {FEATURES.map(({ icon: Icon, label, num }, i) => (
                <div
                  key={label}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="absolute left-0 top-0 flex flex-col justify-between bg-navy-900/95 backdrop-blur-md"
                  style={{
                    width: CARD,
                    height: CARD,
                    zIndex: i + 1,
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
                    padding: '2.5rem',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="advantage-number select-none text-[105px] font-black leading-none text-green-accent tabular-nums">
                      {num}
                    </span>
                    <Icon
                      size={30}
                      className="advantage-icon mt-2 shrink-0 text-white/35"
                    />
                  </div>

                  <p className="advantage-label max-w-[240px] text-xl font-black uppercase leading-tight tracking-wide text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile card grid — visible below lg only */}
          <div ref={mobileGridRef} className="grid grid-cols-2 gap-4 sm:gap-5 lg:hidden">
            {FEATURES.map(({ icon: Icon, label, num }, i) => (
              <div
                key={label}
                ref={(el) => { mobileCardsRef.current[i] = el }}
                className="aspect-square bg-navy-900/95 p-4 sm:p-7"
                style={{
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="advantage-number text-4xl font-black leading-none text-green-accent sm:text-6xl">
                      {num}
                    </span>
                    <Icon className="advantage-icon shrink-0 text-white/35" size={22} />
                  </div>

                  <p className="advantage-label text-sm font-black uppercase leading-tight text-white sm:text-lg">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
