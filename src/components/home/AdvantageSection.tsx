'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FloatingPixels } from '@/components/ui/FloatingPixels'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { lines: ['AI', 'LEARNING'], image: '/images/students/practical-learning.png' },
  { lines: ['LIVE PROJECT', 'AND TRAINING'], image: '/images/students/live-project-training.png' },
  { lines: ['INDUSTRY', 'EXPERTS'], image: '/images/students/industry-expert-mentors.png' },
  { lines: ['PLACEMENT', 'SUPPORT'], image: '/images/students/career-placement-support.png' },
  { lines: ['SCHOLARSHIP', 'COURSES'], image: '/images/students/scholarship-based-courses.png' },
  { lines: ['INDUSTRY', 'CERTIFICATION'], image: '/images/students/industry-certification.png' },
  { lines: ['PAID', 'AI TOOLS'], image: '/images/students/ai-tools-automation.png' },
  { lines: ['INTERVIEW', 'PREPARATION'], image: '/images/students/interview-preparation.png' },
  { lines: ['VERIFIED', 'PORTFOLIO'], image: '/images/students/verified-portfolio.png' },
]

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)

  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => { lenis.off('scroll', onScroll) }
  }, [lenis])

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
    if (!cards.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set(cards, { opacity: 1, scale: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.88, y: 40, immediateRender: false },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, sectionRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip overflow-y-visible bg-black px-4 py-16 sm:px-6 sm:py-24 lg:px-12"
    >
      <div className="relative overflow-visible">
        <FloatingPixels />

        <div className="relative z-10 grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-5">
          <div
            data-no-blur-text
            className="flex h-full w-full min-w-0 flex-col justify-between"
          >
            <div className="w-full max-w-sm lg:max-w-md">
              <h2 className="relative mb-6 font-black uppercase leading-[0.88] tracking-tight sm:mb-8">
                <span className="mb-[0.2em] block text-[clamp(2rem,7vw,4.75rem)] text-green-accent">
                  Why AI
                </span>
                <span className="block text-[clamp(2rem,7vw,4.75rem)] text-white">
                  Courses?
                </span>
              </h2>

              <div className="space-y-4">
                <p className="m-0 text-justify text-gray-400 leading-relaxed">
                  AI is changing every industry and the way we learn needs to change too. Our courses in
                  Digital Marketing, Web Development, Data Science, and Cybersecurity are built around
                  real AI skills employers want today.
                </p>
                <p className="m-0 text-justify text-gray-400 leading-relaxed">
                  Whether you&apos;re a fresh graduate, a working professional, or switching careers, we
                  meet you where you are. You&apos;ll learn by doing live projects, mentor feedback, and
                  real portfolio work backed by Neo Digital Hub, Dubai.
                </p>
                <p className="m-0 text-justify text-gray-400 leading-relaxed">
                  No heavy theory. Just job-ready skills, career support, and a clear path from learning
                  to doing.
                </p>
              </div>
            </div>

            <div className="mt-8 w-full max-w-sm lg:mt-0 lg:max-w-md">
              <Link
                href="/courses"
                className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
              >
                Become a Student
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-4 overflow-visible sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5"
          >
            {FEATURES.map(({ lines, image }, i) => {
              const label = lines.join(' ')

              return (
                <div
                  key={label}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="advantage-card group relative z-0 h-40 w-full origin-center border border-white/10 bg-[#141414] transition-[transform,z-index] duration-300 ease-out hover:z-30 hover:scale-[1.06] sm:h-44 lg:h-48"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover scale-110 grayscale brightness-90 transition-all duration-500 ease-out group-hover:scale-100 group-hover:grayscale-0 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 z-10 p-3.5 text-sm font-black uppercase leading-[1.05] tracking-wide text-white sm:p-4 sm:text-base lg:text-lg">
                      {lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
