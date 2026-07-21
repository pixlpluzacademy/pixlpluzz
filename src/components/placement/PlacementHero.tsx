'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { PixelTrail } from '@/components/ui/PixelTrail'

export function PlacementHero() {
  const rootRef = useRef<HTMLElement>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      if (!siteReady) {
        gsap.set('.plc-hero-pop', { opacity: 0 })
        return
      }

      gsap.fromTo(
        '.plc-hero-pop',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, stagger: 0.18, ease: 'none', delay: 0.2 },
      )
    }, root)

    return () => ctx.revert()
  }, [siteReady])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[clamp(28rem,78svh,42rem)] flex-col justify-between overflow-hidden bg-black px-4 pt-24 pb-12 sm:px-6 lg:px-12"
      data-page-hero
    >
      <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

      <div className="relative z-10 mt-auto">
        <h1 className="relative z-10 font-black uppercase leading-[0.88] tracking-tight">
          <PixelTrail />
          <span className="plc-hero-pop block text-[clamp(2.5rem,13vw,11rem)] career-outline-word evt-outline-muted">
            Our
          </span>
          <span className="plc-hero-pop block text-[clamp(2.5rem,13vw,11rem)] text-gray-400">
            Graduates
          </span>
        </h1>
      </div>

      <div className="plc-hero-pop relative z-10 mt-10 max-w-md self-end text-left sm:text-right">
        <p className="font-mono text-[11px] uppercase tracking-widest text-sky-400">across india & beyond</p>
        <p className="mt-2 text-base text-gray-400 sm:text-lg">
          Real Careers, Real Companies - No Shortcuts.<br></br> Just Work That Shows.
        </p>
      </div>
    </section>
  )
}
