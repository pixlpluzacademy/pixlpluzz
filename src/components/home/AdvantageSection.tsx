'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, Flip)

const SPOTLIGHT_MS = 4500

const FEATURES = [
  {
    id: 'ai-learning',
    title: 'AI Learning',
    lines: ['AI', 'LEARNING'] as const,
    description: 'Learn with tools shaping tomorrow’s careers.',
    image: '/images/students/practical-learning.png',
    area: 'feat',
  },
  {
    id: 'live-project-training',
    title: 'Live Project and Training',
    lines: ['LIVE PROJECT', 'AND TRAINING'] as const,
    description: 'Ship real work with mentors guiding every sprint.',
    image: '/images/students/live-project-training.png',
    area: 'live',
  },
  {
    id: 'industry-experts',
    title: 'Industry Experts',
    lines: ['INDUSTRY', 'EXPERTS'] as const,
    description: 'Learn from practitioners who build for the market.',
    image: '/images/students/industry-expert-mentors.png',
    area: 'exp',
  },
  {
    id: 'placement-support',
    title: 'Placement Support',
    lines: ['PLACEMENT', 'SUPPORT'] as const,
    description: 'Guidance from portfolio polish to interview day.',
    image: '/images/students/career-placement-support.png',
    area: 'plc',
  },
  {
    id: 'scholarship-courses',
    title: 'Scholarship Courses',
    lines: ['SCHOLARSHIP', 'COURSES'] as const,
    description: 'Merit-based pathways that keep learning reachable.',
    image: '/images/students/scholarship-based-courses.png',
    area: 'sch',
  },
  {
    id: 'industry-certification',
    title: 'Industry Certification',
    lines: ['INDUSTRY', 'CERTIFICATION'] as const,
    description: 'Recognised proof of the skills you can deliver.',
    image: '/images/students/industry-certification.png',
    area: 'cer',
  },
  {
    id: 'paid-ai-tools',
    title: 'Paid AI Tools',
    lines: ['PAID', 'AI TOOLS'] as const,
    description: 'Premium AI tools included so practice stays real.',
    image: '/images/students/ai-tools-automation.png',
    area: 'paid',
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    lines: ['INTERVIEW', 'PREPARATION'] as const,
    description: 'Mock rounds that mirror how hiring actually works.',
    image: '/images/students/interview-preparation.png',
    area: 'int',
  },
  {
    id: 'verified-portfolio',
    title: 'Verified Portfolio',
    lines: ['VERIFIED', 'PORTFOLIO'] as const,
    description: 'A body of work you can show with confidence.',
    image: '/images/students/verified-portfolio.png',
    area: 'port',
  },
] as const

function displayArea(index: number, spotlight: number, enableSwap: boolean) {
  if (!enableSwap) return FEATURES[index].area
  if (index === spotlight) return 'feat'
  if (index === 0 && spotlight !== 0) return FEATURES[spotlight].area
  return FEATURES[index].area
}

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const reduceMotionRef = useRef(false)
  const desktopRef = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [desktopLayout, setDesktopLayout] = useState(false)

  const lenis = useLenis()
  /** Layout slot swap follows the auto-spotlight only — hover keeps cards in place. */
  const layoutSpotlight = activeIndex
  const visualSpotlight = hoveredIndex ?? activeIndex

  const captureFlip = () => {
    if (reduceMotionRef.current || !desktopRef.current) return
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
    if (!cards.length) return
    flipStateRef.current = Flip.getState(cards)
  }

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopMq = window.matchMedia('(min-width: 1024px)')
    const syncMotion = () => {
      reduceMotionRef.current = motionMq.matches
      setReduceMotion(motionMq.matches)
    }
    const syncDesktop = () => {
      desktopRef.current = desktopMq.matches
      setDesktopLayout(desktopMq.matches)
    }
    syncMotion()
    syncDesktop()
    motionMq.addEventListener('change', syncMotion)
    desktopMq.addEventListener('change', syncDesktop)
    return () => {
      motionMq.removeEventListener('change', syncMotion)
      desktopMq.removeEventListener('change', syncDesktop)
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setInterval(() => {
      captureFlip()
      setActiveIndex((prev) => (prev + 1) % FEATURES.length)
    }, SPOTLIGHT_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion])

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null)
    if (!cards.length) return

    if (reduceMotion) {
      gsap.set(cards, { clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      const mediaNodes: Element[] = []
      const borderNodes: Element[] = []
      const contentNodes: Element[] = []

      cards.forEach((card) => {
        const media = card.querySelector('.advantage-card-media')
        const border = card.querySelector('.advantage-card-border')
        const content = card.querySelector('.advantage-card-content')
        if (media) mediaNodes.push(media)
        if (border) borderNodes.push(border)
        if (content) contentNodes.push(content)
      })

      if (!mediaNodes.length) return

      gsap.set(mediaNodes, { clipPath: 'inset(0 0 100% 0)' })
      gsap.set(borderNodes, { opacity: 0 })
      gsap.set(contentNodes, { opacity: 0, filter: 'blur(6px)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: 'top 88%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      borderNodes.forEach((border, i) => {
        const t = i * 0.06
        tl.to(border, { opacity: 1, duration: 0.35, ease: 'power2.out' }, t)
        tl.to(mediaNodes[i], { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut' }, t + 0.05)
        tl.to(contentNodes[i], { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' }, t + 0.35)
      })
    }, sectionRef)

    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh()
      } catch {
        // Ignore refresh races with sibling sections
      }
    })
    return () => ctx.revert()
  }, [reduceMotion])

  useLayoutEffect(() => {
    if (!flipStateRef.current || reduceMotionRef.current) {
      flipStateRef.current = null
      return
    }

    const state = flipStateRef.current
    flipStateRef.current = null

    try {
      Flip.from(state, {
        duration: 0.55,
        ease: 'power2.inOut',
        absolute: false,
        nested: true,
        scale: false,
      })
    } catch {
      // Layout swap still applies via React; skip broken FLIP mid-refresh
    }
  }, [layoutSpotlight])

  return (
    <section
      ref={sectionRef}
      className="advantage-section relative overflow-x-clip overflow-y-visible px-8 py-16 sm:px-12 sm:py-24 lg:px-20"
    >
      <div className="advantage-section-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="advantage-section-grid pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="relative overflow-visible">
        <FloatingPixels />

        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <div
            data-no-blur-text
            className="flex w-full min-w-0 flex-col lg:sticky lg:top-28 lg:self-start"
          >


            <h2 className="mb-6 font-black uppercase leading-[0.88] tracking-tight sm:mb-7">
              <span className="mb-[0.12em] block text-[clamp(2.25rem,6.5vw,4.5rem)] text-white">
                Why AI
              </span>
              <span className="block text-[clamp(2.25rem,6.5vw,4.5rem)] text-green-accent">
                Courses ?
              </span>
            </h2>

            <div className="max-w-[480px] space-y-4">
              <p className="m-0 text-justify text-[0.95rem] leading-[1.85] text-gray-300 sm:text-base">
              AI is changing every industry and the way we learn needs to change too. Our courses in Digital Marketing, Web Development, Data Science, and Cybersecurity are built around real AI skills employers want today.
              </p>
              <p className="m-0 text-justify text-[0.95rem] leading-[1.85] text-gray-400 sm:text-base">
              Whether you're a fresh graduate, a working professional, or switching careers, we meet you where you are. You'll learn by doing live projects, mentor feedback, and real portfolio work backed by Neo Digital Hub, Dubai.
              No heavy theory. Just job-ready skills, career support, and a clear path from learning to doing.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/courses"
                className="btn-glaze btn-primary-fill group/cta inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
              >
                Become a Student
                <ArrowRight
                  size={14}
                  className="transition-colors duration-300 group-hover/cta:text-green-accent"
                />
              </Link>
            </div>
          </div>

          <div
            ref={gridRef}
            className="advantage-bento w-full"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false)
              setHoveredIndex(null)
            }}
          >
            {FEATURES.map((feature, i) => {
              const isActive = visualSpotlight === i
              const area = displayArea(i, layoutSpotlight, desktopLayout)

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    cardsRef.current[i] = el
                  }}
                  data-area={area}
                  data-featured={isActive ? 'true' : 'false'}
                  className={cn(
                    'advantage-card group relative z-0 min-h-0 origin-center overflow-visible',
                    isActive && 'z-20',
                  )}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onFocus={() => setHoveredIndex(i)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
                  role="group"
                  aria-label={`${feature.title}. ${feature.description}`}
                >
                  <div
                    className={cn(
                      'advantage-card-inner relative h-full min-h-[140px] overflow-hidden border bg-[#0a0f1a]/80 transition-[border-color,filter] duration-500 ease-out sm:min-h-[152px]',
                      isActive
                        ? 'border-blue-primary'
                        : 'border-blue-primary/35',
                      !isActive && 'brightness-[0.72]',
                    )}
                  >
                    <div className="advantage-card-border pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-500 group-hover:border-blue-primary/70" />

                    <div className="advantage-card-media absolute inset-0 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className={cn(
                          'object-cover object-[center_18%] transition-[transform,filter] duration-700 ease-out',
                          isActive
                            ? 'scale-[1.025] grayscale-0 brightness-100'
                            : 'scale-100 grayscale brightness-90 group-hover:scale-[1.025] group-hover:grayscale-0 group-hover:brightness-100',
                        )}
                      />
                      <div
                        className={cn(
                          'absolute inset-0 bg-black/50 transition-colors duration-500',
                          isActive ? 'bg-black/28' : 'group-hover:bg-black/30',
                        )}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />
                    </div>

                    <div className="advantage-card-content relative z-10 flex h-full min-h-[140px] flex-col justify-end p-3.5 sm:min-h-[152px] sm:p-4">
                      <div className="max-w-[18rem]">
                        <h3
                          className="font-black uppercase leading-[1.05] tracking-wide text-white"
                          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.35rem)' }}
                        >
                          {feature.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </h3>
                        <span
                          className={cn(
                            'mt-2 block h-px origin-left bg-green-accent transition-transform duration-500 ease-out',
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                          )}
                          style={{ width: '2.5rem' }}
                          aria-hidden
                        />
                        <p
                          className={cn(
                            'advantage-card-desc m-0 overflow-hidden text-left text-sm leading-relaxed text-white/75 transition-all duration-500 ease-out',
                            isActive
                              ? 'mt-2.5 max-h-20 opacity-100'
                              : 'mt-0 max-h-0 opacity-0 group-hover:mt-2.5 group-hover:max-h-20 group-hover:opacity-100',
                          )}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {isActive && !reduceMotion && hoveredIndex === null && (
                      <div className="advantage-progress absolute inset-x-0 bottom-0 z-20 h-[2px] overflow-hidden bg-white/10">
                        <div
                          key={`${activeIndex}-${paused}`}
                          className={cn(
                            'h-full origin-left bg-green-accent',
                            paused ? 'w-full' : 'advantage-progress-bar',
                          )}
                        />
                      </div>
                    )}
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
