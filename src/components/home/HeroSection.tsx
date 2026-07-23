'use client'

import { useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { getWhatsAppUrl } from '@/lib/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const HeroPixelField = dynamic(
  () => import('@/components/home/HeroPixelField').then(m => ({ default: m.HeroPixelField })),
  { ssr: false },
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || !siteReady) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const copy = section.querySelector<HTMLElement>('.hero-copy')
    const lines = section.querySelectorAll<HTMLElement>('.hero-line-inner')
    const fades = section.querySelectorAll<HTMLElement>('.hero-fade')
    const shade = section.querySelector<HTMLElement>('.hero-shade')
    const hint = section.querySelector<HTMLElement>('.hero-scroll-hint')

    if (reduceMotion) {
      gsap.set([copy, lines, fades, shade], { clearProps: 'all' })
      gsap.set(copy, { opacity: 1, visibility: 'visible' })
      gsap.set(lines, { clipPath: 'inset(0 0% -0.45em 0)', yPercent: 0 })
      gsap.set(fades, { opacity: 1 })
      gsap.set(shade, { opacity: 1 })
      if (hint) gsap.set(hint, { opacity: 0 })
      return
    }

    gsap.set(copy, { opacity: 0, visibility: 'hidden' })
    gsap.set(lines, { yPercent: 105, clipPath: 'inset(0 0% -0.45em 0)' })
    gsap.set(fades, { opacity: 0, y: 12 })
    gsap.set(shade, { opacity: 0 })
    if (hint) gsap.set(hint, { opacity: 1 })

    const show = () => {
      const tl = gsap.timeline()
      if (hint) tl.to(hint, { opacity: 0, duration: 0.08, ease: 'none' }, 0)
      if (shade) tl.to(shade, { opacity: 1, duration: 0.18, ease: 'power1.out' }, 0)
      tl.set(copy, { visibility: 'visible', opacity: 1 }, 0)
      tl.to(lines, { yPercent: 0, duration: 0.45, ease: 'power3.out' }, 0.03)
      tl.to(fades, { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.18)
    }

    const hide = () => {
      gsap.set(copy, { opacity: 0, visibility: 'hidden' })
      gsap.set(lines, { yPercent: 105 })
      gsap.set(fades, { opacity: 0, y: 12 })
      gsap.set(shade, { opacity: 0 })
      if (hint) gsap.set(hint, { opacity: 1 })
    }

    let revealed = false
    const progressTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate(self) {
        // Heading reveals mid-scrub; 3D cluster keeps full scroll length
        if (self.progress >= 0.5 && !revealed) {
          revealed = true
          show()
        } else if (self.progress < 0.35 && revealed) {
          revealed = false
          hide()
        }
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)
    const t = window.setTimeout(refresh, 200)

    return () => {
      window.clearTimeout(t)
      progressTrigger.kill()
    }
  }, [siteReady])

  // Sticky hero — pixel cluster first; copy reveals on scroll.
  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh+min(480px,50dvh))] bg-black"
      data-page-hero
    >
      <div
        className="sticky top-0 flex h-svh flex-col overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(20,61,143,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 78% 35%, rgba(84,227,69,0.1) 0%, transparent 50%), #000000',
        }}
      >
        <HeroPixelField className="absolute inset-0 z-0" />

        <div
          className="hero-shade pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[1] pixel-grid-bg opacity-10" aria-hidden />

        {/* Hidden until siteReady; then GSAP owns opacity (no React style prop to overwrite tweens) */}
        <div
          className={
            siteReady
              ? 'hero-copy relative z-10 flex flex-1 flex-col items-center px-6 pt-28 pb-10 sm:px-12 lg:px-20'
              : 'hero-copy relative z-10 flex flex-1 flex-col items-center px-6 pt-28 pb-10 opacity-0 invisible sm:px-12 lg:px-20'
          }
        >
          <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center">


            <h1 className="hero-title relative z-10 w-full max-w-none text-[clamp(1.75rem,min(5.4vw,calc((100vw-3rem)/12.2)),5rem)] font-black uppercase tracking-[-0.01em]">
              <span className="mb-[0.28em] block overflow-hidden whitespace-nowrap leading-[1.2]">
                <span className="hero-line-inner block pr-[0.06em] text-white">
                  Kerala&apos;s Best
                </span>
              </span>
              <span className="mb-[0.28em] block overflow-hidden whitespace-nowrap leading-[1.2]">
                <span className="hero-line-inner block pr-[0.06em] text-green-accent">
                  AI Integrated Courses
                </span>
              </span>
              <span className="block overflow-hidden whitespace-nowrap leading-[1.2]">
                <span className="hero-line-inner block pr-[0.06em] text-white">
                  In Kochi
                </span>
              </span>
            </h1>

            <div className="hero-fade relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/scholarship"
                className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-widest pixel-corner-sm"
              >
                Apply For Scholarship <ChevronRight size={15} />
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-7 py-3 text-sm font-bold uppercase tracking-widest transition-colors pixel-corner-sm"
              >
                Free Consultation <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="hero-scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
            Scroll
          </span>
          <div className="h-8 w-px bg-linear-to-b from-white/0 to-white/40" />
          <div className="h-1 w-1 bg-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
