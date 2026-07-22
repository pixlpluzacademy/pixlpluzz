'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { cn } from '@/lib/utils'

const ROTATE_MS = 2000
const STEP_DEG = 40
const COUNT = 9
const TRANSITION_MS = 900
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const FEATURES = [
  {
    id: 'ai-learning',
    title: 'AI Learning',
    lines: ['AI', 'LEARNING'] as const,
    description: 'Learn with tools shaping tomorrow’s careers.',
    image: '/images/students/practical-learning.png',
  },
  {
    id: 'live-project-training',
    title: 'Live Project and Training',
    lines: ['LIVE PROJECT', 'AND TRAINING'] as const,
    description: 'Ship real work with mentors guiding every sprint.',
    image: '/images/students/live-project-training.png',
  },
  {
    id: 'industry-experts',
    title: 'Industry Experts',
    lines: ['INDUSTRY', 'EXPERTS'] as const,
    description: 'Learn from practitioners who build for the market.',
    image: '/images/students/industry-expert-mentors.png',
  },
  {
    id: 'placement-support',
    title: 'Placement Support',
    lines: ['PLACEMENT', 'SUPPORT'] as const,
    description: 'Guidance from portfolio polish to interview day.',
    image: '/images/students/career-placement-support.png',
  },
  {
    id: 'scholarship-courses',
    title: 'Scholarship Courses',
    lines: ['SCHOLARSHIP', 'COURSES'] as const,
    description: 'Merit-based pathways that keep learning reachable.',
    image: '/images/students/scholarship-based-courses.png',
  },
  {
    id: 'industry-certification',
    title: 'Industry Certification',
    lines: ['INDUSTRY', 'CERTIFICATION'] as const,
    description: 'Recognised proof of the skills you can deliver.',
    image: '/images/students/industry-certification.png',
  },
  {
    id: 'paid-ai-tools',
    title: 'Paid AI Tools',
    lines: ['PAID', 'AI TOOLS'] as const,
    description: 'Premium AI tools included so practice stays real.',
    image: '/images/students/ai-tools-automation.png',
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    lines: ['INTERVIEW', 'PREPARATION'] as const,
    description: 'Mock rounds that mirror how hiring actually works.',
    image: '/images/students/interview-preparation.png',
  },
  {
    id: 'verified-portfolio',
    title: 'Verified Portfolio',
    lines: ['VERIFIED', 'PORTFOLIO'] as const,
    description: 'A body of work you can show with confidence.',
    image: '/images/students/verified-portfolio.png',
  },
] as const

type CarouselMode = 'desktop' | 'tablet' | 'mobile'

type CardPose = {
  x: number
  z: number
  scale: number
  blur: number
  opacity: number
  dim: number
  zIndex: number
  isActive: boolean
}

/** Normalize index delta into shortest signed steps in [-4, 4]. */
function signedOffset(index: number, active: number): number {
  let offset = index - active
  offset = ((offset % COUNT) + COUNT) % COUNT
  if (offset > COUNT / 2) offset -= COUNT
  return offset
}

function depthStyle(absOffset: number): Pick<CardPose, 'scale' | 'blur' | 'opacity' | 'dim'> {
  // Depth via scale/opacity/dim overlay — avoid brightness() filters (they soften images).
  // Blur only on far cards; front + neighbours stay sharp.
  if (absOffset === 0) return { scale: 1, blur: 0, opacity: 1, dim: 0 }
  if (absOffset === 1) return { scale: 1 / 1.4, blur: 0, opacity: 0.95, dim: 0.22 }
  if (absOffset === 2) return { scale: 0.58, blur: 0.8, opacity: 0.8, dim: 0.38 }
  if (absOffset === 3) return { scale: 0.48, blur: 1.4, opacity: 0.6, dim: 0.52 }
  return { scale: 0.4, blur: 2, opacity: 0.45, dim: 0.62 }
}

function circularPose(index: number, active: number, radius: number): CardPose {
  const offset = signedOffset(index, active)
  const angle = (offset * STEP_DEG * Math.PI) / 180
  const visual = depthStyle(Math.abs(offset))

  return {
    x: Math.sin(angle) * radius,
    z: Math.cos(angle) * radius,
    ...visual,
    zIndex: 30 + Math.round(Math.cos(angle) * 20),
    isActive: offset === 0,
  }
}

/** Flat coverflow for mobile — active centre, partial neighbours. */
function coverflowPose(index: number, active: number, spacing: number): CardPose {
  const offset = signedOffset(index, active)
  const abs = Math.abs(offset)
  const visual = depthStyle(abs)

  return {
    x: offset * spacing,
    z: -abs * 36,
    ...visual,
    zIndex: 30 - abs,
    isActive: offset === 0,
  }
}

export function AdvantageSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const cardHoverCount = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mode, setMode] = useState<CarouselMode>('desktop')
  const [radius, setRadius] = useState(220)
  const [autoplayToken, setAutoplayToken] = useState(0)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(motionMq.matches)
    syncMotion()
    motionMq.addEventListener('change', syncMotion)
    return () => motionMq.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    const tabletMq = window.matchMedia('(max-width: 1023px)')
    const mobileMq = window.matchMedia('(max-width: 767px)')

    const syncMode = () => {
      if (mobileMq.matches) setMode('mobile')
      else if (tabletMq.matches) setMode('tablet')
      else setMode('desktop')
    }

    syncMode()
    tabletMq.addEventListener('change', syncMode)
    mobileMq.addEventListener('change', syncMode)
    return () => {
      tabletMq.removeEventListener('change', syncMode)
      mobileMq.removeEventListener('change', syncMode)
    }
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      // Keep the ring inside the clipped stage so nothing creates inner scroll
      if (mode === 'mobile') {
        setRadius(Math.min(110, w * 0.24, h * 0.24))
      } else if (mode === 'tablet') {
        setRadius(Math.min(160, w * 0.28, h * 0.28))
      } else {
        setRadius(Math.min(270, Math.max(180, Math.min(w, h) * 0.34)))
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [mode])

  useEffect(() => {
    if (hoverPaused || reduceMotion) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COUNT)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [hoverPaused, reduceMotion, autoplayToken])

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % COUNT) + COUNT) % COUNT)
    // Restart autoplay countdown after a manual selection
    setAutoplayToken((t) => t + 1)
  }, [])

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  const goNext = useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const onCardPointerEnter = useCallback(() => {
    cardHoverCount.current += 1
    setHoverPaused(true)
  }, [])

  const onCardPointerLeave = useCallback(() => {
    cardHoverCount.current = Math.max(0, cardHoverCount.current - 1)
    if (cardHoverCount.current === 0) setHoverPaused(false)
  }, [])

  const poses = useMemo(() => {
    if (mode === 'mobile') {
      const spacing = Math.max(72, radius * 0.85)
      return FEATURES.map((_, i) => coverflowPose(i, activeIndex, spacing))
    }
    return FEATURES.map((_, i) => circularPose(i, activeIndex, radius))
  }, [activeIndex, radius, mode])

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null
    setHoverPaused(true)
  }

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    const end = e.changedTouches[0]?.clientX
    if (start == null || end == null) {
      setHoverPaused(false)
      return
    }
    const dx = end - start
    if (Math.abs(dx) > 40) {
      goTo(activeIndex + (dx < 0 ? 1 : -1))
    }
    window.setTimeout(() => setHoverPaused(false), reduceMotion ? 0 : TRANSITION_MS)
  }

  return (
    <section className="advantage-section relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="advantage-section-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="advantage-section-grid pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1500px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <FloatingPixels />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(260px,380px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(280px,400px)_minmax(0,1fr)] xl:gap-14">
          <div
            data-no-blur-text
            className="flex w-full min-w-0 flex-col lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="mb-6 font-black uppercase leading-[0.88] tracking-tight sm:mb-7">
              <span className="mb-[0.12em] block text-[clamp(2.25rem,6.5vw,4.5rem)] text-white">
                Why AI
              </span>
              <span className="block whitespace-nowrap text-[clamp(2.25rem,6.5vw,4.5rem)] text-green-accent">
                Courses ?
              </span>
            </h2>

            <div className="max-w-[480px] space-y-4">
              <p className="m-0 text-justify text-[0.95rem] leading-[1.85] text-gray-300 sm:text-base">
                AI is changing every industry and the way we learn needs to change too. Our courses
                in Digital Marketing, Web Development, Data Science, and Cybersecurity are built
                around real AI skills employers want today.
              </p>
              <p className="m-0 text-justify text-[0.95rem] leading-[1.85] text-gray-300 sm:text-base">
                Whether you&apos;re a fresh graduate, a working professional, or switching careers,
                we meet you where you are. You&apos;ll learn by doing live projects, mentor feedback,
                and real portfolio work backed by Neo Digital Hub, Dubai. No heavy theory. Just
                job-ready skills, career support, and a clear path from learning to doing.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/courses"
                className="btn-glaze btn-cta-green group/cta inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all pixel-corner-sm"
              >
                Become a Student
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <div className="advantage-carousel-wrap mx-auto w-full min-w-0">
            <div
              ref={stageRef}
              className={cn(
                'advantage-carousel relative mx-auto w-full',
                mode === 'mobile' && 'advantage-carousel--mobile',
                mode === 'tablet' && 'advantage-carousel--tablet',
              )}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              role="region"
              aria-roledescription="carousel"
              aria-label="Academy advantages"
            >
              {/* Subtle blue-green glow behind the front/active slot only */}
              <div className="advantage-carousel-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden />

              <div className="advantage-carousel-stage">
                {FEATURES.map((feature, i) => {
                  const pose = poses[i]

                  return (
                    <button
                      key={feature.id}
                      type="button"
                      className={cn(
                        'advantage-carousel-card',
                        pose.isActive && 'is-active',
                      )}
                      style={{
                        zIndex: pose.zIndex,
                        opacity: pose.opacity,
                        transform: `translate(-50%, -50%) translate3d(${pose.x}px, 0, ${pose.z}px) scale(${pose.scale})`,
                        transition: reduceMotion
                          ? 'none'
                          : `transform ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}`,
                      }}
                      onMouseEnter={onCardPointerEnter}
                      onMouseLeave={onCardPointerLeave}
                      onClick={() => goTo(i)}
                      aria-label={feature.title}
                      aria-current={pose.isActive ? 'true' : undefined}
                    >
                      <span
                        className={cn(
                          'advantage-carousel-card-media absolute inset-0 block overflow-hidden',
                          pose.isActive && 'is-sharp',
                        )}
                        style={
                          pose.blur > 0 && !pose.isActive
                            ? { filter: `blur(${pose.blur}px)` }
                            : undefined
                        }
                      >
                        <Image
                          src={feature.image}
                          alt=""
                          aria-hidden
                          fill
                          quality={90}
                          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 360px"
                          className="object-cover object-[center_18%]"
                          draggable={false}
                        />
                        <span
                          className="absolute inset-0 bg-black transition-opacity duration-500"
                          style={{ opacity: pose.dim }}
                          aria-hidden
                        />
                        <span className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />
                      </span>

                      {pose.isActive && (
                        <span className="absolute inset-x-0 bottom-8 z-10 px-3.5 sm:bottom-10 sm:px-4">
                          <span
                            className="block font-black uppercase leading-[1.05] tracking-wide text-white"
                            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.25rem)' }}
                          >
                            {feature.lines.map((line) => (
                              <span key={line} className="block">
                                {line}
                              </span>
                            ))}
                          </span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="advantage-carousel-nav advantage-carousel-nav--prev"
                onClick={goPrev}
                aria-label="Previous advantage"
              >
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  width={12}
                  height={16}
                  className="advantage-carousel-nav-icon -scale-x-100"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className="advantage-carousel-nav advantage-carousel-nav--next"
                onClick={goNext}
                aria-label="Next advantage"
              >
                <Image
                  src="/icons/arrow.svg"
                  alt=""
                  width={12}
                  height={16}
                  className="advantage-carousel-nav-icon"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
