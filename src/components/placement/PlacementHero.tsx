'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'

gsap.registerPlugin(SplitText)

const HEADING = 'Our graduates work at top companies.'

export function PlacementHero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady) return
    const heading = headingRef.current
    if (!heading) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let split: SplitText | null = null
    let cancelled = false

    const ctx = gsap.context(() => {
      const run = () => {
        if (cancelled || !headingRef.current) return

        split = SplitText.create(heading, {
          type: 'chars',
          charsClass: 'placement-roll-char',
        })

        // 3D rolling reveal — adapted from https://demos.gsap.com/demo/rolling-text/
        const depth = -Math.min(heading.offsetWidth, 720) / 10
        const transformOrigin = `50% 50% ${depth}`

        gsap.set(heading, { perspective: 700, transformStyle: 'preserve-3d' })
        gsap.set(split.chars, {
          transformOrigin,
          transformStyle: 'preserve-3d',
          display: 'inline-block',
        })

        gsap.fromTo(
          split.chars,
          { rotationX: -90, opacity: 0 },
          {
            rotationX: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power2.out',
            transformOrigin,
            delay: 0.12,
          },
        )
      }

      if (document.fonts?.ready) {
        document.fonts.ready.then(run)
      } else {
        run()
      }
    }, heading)

    return () => {
      cancelled = true
      ctx.revert()
      split?.revert()
    }
  }, [isSiteReady])

  return (
    <section className="bg-navy-950 pt-32 pb-24 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32" data-page-hero>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent sm:mb-10">
          Placement
        </p>
        <h1
          ref={headingRef}
          className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          style={{ fontKerning: 'none', textRendering: 'optimizeSpeed' }}
        >
          {HEADING}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-gray-400 sm:mt-10">
          Real careers, real companies — across India and beyond.
        </p>
      </div>
    </section>
  )
}
