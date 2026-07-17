'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { BlurText } from '@/components/ui/BlurText'

const COMPANIES = [
  'Copernicus',
  'Neo Digital Hub',
  'Lathief Production',
  'Black White viz',
] as const

/** How many fall into the pile (repeats company names so it feels collected). */
const DROP_COUNT = 14

function pileSpot(i: number) {
  // Messy collected pile — slight overlap like mustard settling
  const col = i % 5
  const row = Math.floor(i / 5)
  return {
    x: -110 + col * 58 + (i % 3) * 10,
    y: -row * 22 - (i % 2) * 6,
    rotate: -12 + (i % 7) * 4,
  }
}

export function PlacementHero() {
  const heroRef = useRef<HTMLElement>(null)
  const pileRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const pile = pileRef.current
    if (!hero || !pile) return

    const boxes = Array.from(pile.querySelectorAll<HTMLElement>('[data-fall-box]'))
    if (!boxes.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      boxes.forEach((box, i) => {
        const spot = pileSpot(i)
        gsap.set(box, {
          x: spot.x,
          y: spot.y,
          rotation: spot.rotate,
          opacity: 1,
        })
      })
      return
    }

    const fallDistance = Math.max(hero.offsetHeight * 0.55, 280)

    const ctx = gsap.context(() => {
      boxes.forEach((box, i) => {
        const spot = pileSpot(i)
        const startX = -40 + (i % 6) * 36 + Math.sin(i) * 24

        gsap.set(box, {
          x: startX,
          y: -fallDistance - 40 - (i % 4) * 30,
          rotation: -18 + (i % 5) * 8,
          opacity: 0,
          scale: 0.92,
        })

        gsap
          .timeline({ delay: 0.35 + i * 0.28 })
          .to(box, {
            opacity: 1,
            duration: 0.15,
            ease: 'power1.out',
          })
          .to(
            box,
            {
              y: spot.y,
              x: spot.x,
              rotation: spot.rotate,
              scale: 1,
              duration: 1.05 + (i % 3) * 0.12,
              ease: 'bounce.out',
            },
            '<',
          )
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  const drops = Array.from({ length: DROP_COUNT }, (_, i) => ({
    name: COMPANIES[i % COMPANIES.length],
    key: `${COMPANIES[i % COMPANIES.length]}-${i}`,
  }))

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-navy-950 pt-32 pb-36 sm:pt-36 sm:pb-40 lg:pt-40 lg:pb-44"
      data-page-hero
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent sm:mb-10">
          Placement
        </p>
        <BlurText
          as="h1"
          onLoad
          className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          text="Our graduates work at top companies."
        />
        <BlurText
          as="p"
          onLoad
          className="mt-8 max-w-xl text-lg text-gray-400 sm:mt-10"
          text="Real careers, real companies — across India and beyond."
        />
      </div>

      {/* Collection pile — boxes fall from above the hero and settle here */}
      <div
        ref={pileRef}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-0 flex justify-center sm:bottom-12 lg:bottom-14"
        aria-label="Hiring partners"
      >
        <div className="relative h-28 w-[min(100%,520px)] sm:h-32">
          {drops.map((item) => (
            <span
              key={item.key}
              data-fall-box
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-green-accent px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-black shadow-[0_6px_16px_rgba(0,0,0,0.35)] sm:px-5 sm:py-3 sm:text-xs"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
