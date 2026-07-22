'use client'

import { useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExpandableLogoPortrait } from '@/components/home/ExpandableLogoPortrait'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const TITLE = 'OUR AI EXPERTS'
const SUBTITLE = 'MENTORS FROM ACROSS THE WORLD'
/** Phrases per loop segment — keep each segment wider than the viewport */
const PHRASES_PER_SEGMENT = 4
/** Identical segments for seamless wrap (no blank gaps) */
const LOOP_SEGMENTS = 3

const MENTORS = [
  {
    name: 'Ahmed Noor',
    designation: 'Sr 3D Specialist',
    image: '/images/mentors/ahmed_noor.png',
  },
  {
    name: 'Aiswarya VP',
    designation: 'SEO Specialist',
    image: '/images/mentors/aiswarya_vp.png',
  },
  {
    name: 'Hina Javaid',
    designation: 'Digital Marketing Expert',
    image: '/images/mentors/hina_javaid.png',
  },
  {
    name: 'Hojjat',
    designation: 'Sr 3D Visualizer',
    image: '/images/mentors/hojat_penhan.png',
  },
  {
    name: 'Lakshmi',
    designation: 'Web Developer',
    image: '/images/mentors/lakshmi.png',
  },
]

const MARQUEE_TEXT =
  'text-[clamp(2.75rem,9vw,6.5rem)] font-black uppercase leading-none tracking-tight'

function MarqueeTrack({
  trackRef,
  text,
  stroke,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>
  text: string
  stroke: string
}) {
  return (
    <div className="overflow-hidden" aria-hidden>
      <div
        ref={trackRef}
        className="flex w-max select-none will-change-transform"
      >
        {Array.from({ length: LOOP_SEGMENTS }, (_, seg) => (
          <div key={seg} className="flex shrink-0">
            {Array.from({ length: PHRASES_PER_SEGMENT }, (_, i) => (
              <span
                key={`${seg}-${i}`}
                className={cn(
                  'career-outline-word shrink-0 px-5 sm:px-8 lg:px-10',
                  MARQUEE_TEXT,
                )}
                style={{ WebkitTextStroke: stroke }}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MentorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const topMarqueeRef = useRef<HTMLDivElement>(null)
  const bottomMarqueeRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const lenis = useLenis()

  useLayoutEffect(() => {
    if (!lenis) return
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const top = topMarqueeRef.current
    const bottom = bottomMarqueeRef.current
    const grid = gridRef.current
    if (!section || !top || !bottom || !grid) return

    let ctx: gsap.Context | null = null
    let cancelled = false
    let retryId = 0
    let attempts = 0

    const setup = () => {
      if (cancelled) return

      const loopWidthTop = top.scrollWidth / LOOP_SEGMENTS
      const loopWidthBottom = bottom.scrollWidth / LOOP_SEGMENTS

      // Marquee width can be 0 before fonts/layout settle — retry briefly
      if ((!loopWidthTop || !loopWidthBottom) && attempts < 30) {
        attempts += 1
        retryId = window.requestAnimationFrame(setup)
        return
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const safeTop = loopWidthTop || 1
      const safeBottom = loopWidthBottom || 1

      ctx = gsap.context(() => {
        if (!reduceMotion) {
          gsap.set(top, { x: -safeTop })
          gsap.set(bottom, { x: -safeBottom })

          const travel = () => Math.min(window.innerWidth * 1.1, 960)

          ScrollTrigger.create({
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!top.isConnected || !bottom.isConnected) return
              const d = self.progress * travel()
              gsap.set(top, {
                x: gsap.utils.wrap(-safeTop, 0, -safeTop + d),
              })
              gsap.set(bottom, {
                x: gsap.utils.wrap(-safeBottom, 0, -safeBottom - d),
              })
            },
          })
        }

        const cards = grid.querySelectorAll<HTMLElement>('.mentor-card')
        if (!cards.length) return

        gsap.fromTo(
          cards,
          { opacity: 0, y: 36, immediateRender: false },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        )
      }, section)

      window.requestAnimationFrame(() => {
        if (cancelled) return
        try {
          ScrollTrigger.refresh()
        } catch {
          // Sibling Flip/ST races during dynamic mount can throw mid-refresh
        }
      })
    }

    retryId = window.requestAnimationFrame(setup)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(retryId)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip overflow-y-visible border-t border-white/8 bg-black pb-16 pt-4 sm:pb-24 sm:pt-5"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 80% 50%, rgba(20, 61, 143, 0.14) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 space-y-1.5 sm:space-y-2">
        <h2 className="sr-only">{TITLE}</h2>
        <MarqueeTrack
          trackRef={topMarqueeRef}
          text={TITLE}
          stroke="2.5px #54e345"
        />
        <MarqueeTrack
          trackRef={bottomMarqueeRef}
          text={SUBTITLE}
          stroke="2.5px rgba(255, 255, 255, 0.9)"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-8 gap-y-16 pt-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-20 sm:pt-10 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16 lg:pt-12 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-14"
        >
          {MENTORS.map(({ name, designation, image }) => (
            <article
              key={name}
              className="mentor-card group relative z-0 flex flex-col overflow-visible bg-transparent pt-[36%]"
            >
              <ExpandableLogoPortrait
                src={image}
                alt={name}
                className="mx-auto w-full max-w-[340px] sm:max-w-[300px] lg:max-w-none"
              />

              <div className="relative z-10 mt-5 text-center">
                <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                  {name}
                </h3>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                  {designation}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
