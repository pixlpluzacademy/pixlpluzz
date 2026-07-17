'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { labelLines: ['Scholarship', 'Based Courses'], image: '/images/students/scholarship-based-courses.png' },
  { labelLines: ['Live Project &', 'Training'], image: '/images/students/live-project-training.png' },
  { labelLines: ['Industry Expert', 'Mentors'], image: '/images/students/industry-expert-mentors.png' },
  { labelLines: ['AI Tools &', 'Automation'], image: '/images/students/ai-tools-automation.png' },
  { labelLines: ['Career &', 'Placement Support'], image: '/images/students/career-placement-support.png' },
  { labelLines: ['Interview', 'Preparation'], image: '/images/students/interview-preparation.png' },
  { labelLines: ['Practical', 'Learning'], image: '/images/students/practical-learning.png' },
  { labelLines: ['Verified', 'Portfolio'], image: '/images/students/verified-portfolio.png' },
  { labelLines: ['Industry', 'Certification'], image: '/images/students/industry-certification.png' },
]

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

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
    <section ref={sectionRef} className="relative overflow-x-clip overflow-y-visible bg-black py-16 sm:py-24">
      <div className="relative overflow-visible">
        <FloatingPixels />

        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-4 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-no-blur-text className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel className="mb-4">
              The PixlPluz Advantage
            </SectionLabel>

            <h2 className="mb-6 text-4xl font-black leading-tight text-green-accent lg:text-4xl">
              Your Career Powered by  AI
            </h2>

            <div className="mb-10 max-w-xl space-y-4">
              <p className="m-0 text-justify text-gray-400 leading-relaxed">
                Job-ready skills, real AI training, and career support built for how industries
                actually hire today. Courses include AI-Integrated Digital Marketing,
                AI-Integrated Web Development, Data Science &amp; AI, and Cybersecurity — each
                designed around how AI is reshaping these fields right now.
              </p>
              <p className="m-0 text-justify text-gray-400 leading-relaxed">
                Fresh graduate, working professional, or career switcher — it doesn&apos;t matter
                where you&apos;re starting from. Pixl Pluz builds job-ready skills through live
                projects, mentor feedback, and real portfolio work, backed by Neo Digital Hub, Dubai.
              </p>
              <p className="m-0 text-justify text-gray-400 leading-relaxed">
                This isn&apos;t theory-heavy classroom learning. It&apos;s a launchpad with
                scholarships, interview prep, and placement support built in, so every step comes
                with real backing.
              </p>
              <p className="m-0 text-justify text-gray-400 leading-relaxed">
                Whether you are a graduate or switching careers, we meet you where you are. Through
                AI-integrated live projects and expert mentorship, we bridge the gap between learning
                and doing — with the backing of Neo Digital Hub to help you excel.
              </p>
            </div>

            <Link
              href="/courses"
              className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
            >
              Become a Student
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-3.5 lg:ml-auto lg:max-w-[34rem] lg:grid-cols-3 xl:max-w-[36rem]"
          >
            {FEATURES.map(({ labelLines, image }, i) => {
              const label = labelLines.join(' ')
              const isOpen = openIdx === i
              const isHidden = openIdx !== null && !isOpen

              return (
                <div
                  key={label}
                  ref={(el) => { cardsRef.current[i] = el }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Collapse ${label}` : `Expand ${label}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenIdx(isOpen ? null : i)
                    }
                  }}
                  className={cn(
                    'advantage-card group relative w-full cursor-pointer border border-white/10 bg-[#141414]',
                    'transition-[border-color,box-shadow] duration-[400ms] ease-out',
                    'hover:border-white/18',
                    isOpen
                      ? 'col-span-full z-40 mx-auto aspect-square w-full max-w-[min(100%,28rem)] sm:max-w-[32rem] border-white/15 shadow-[0_0_32px_rgba(84,227,70,0.35),0_0_64px_rgba(84,227,70,0.2)]'
                      : 'aspect-square',
                    isHidden && 'hidden',
                  )}
                >
                  {/* Clip media inside so outer glow is not cut off */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={cn(
                        'object-cover transition-all duration-500 ease-out',
                        isOpen
                          ? 'scale-100 blur-none brightness-100'
                          : 'scale-110 blur-[6px] brightness-75 group-hover:scale-100 group-hover:blur-none group-hover:brightness-100',
                      )}
                    />
                    <div
                      className={cn(
                        'absolute inset-0 transition-colors duration-500',
                        isOpen ? 'bg-black/20' : 'bg-black/55 group-hover:bg-black/25',
                      )}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    <p
                      className={cn(
                        'absolute inset-x-0 bottom-0 z-10 p-3.5 font-black uppercase leading-[1.2] tracking-wide text-white sm:p-4',
                        isOpen ? 'text-sm sm:text-base md:text-lg' : 'text-[10px] sm:text-[11px]',
                      )}
                    >
                      <span className="block whitespace-nowrap">{labelLines[0]}</span>
                      <span className="block whitespace-nowrap">{labelLines[1]}</span>
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
