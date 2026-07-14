'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ExpandableLogoPortrait } from '@/components/home/ExpandableLogoPortrait'

gsap.registerPlugin(ScrollTrigger)

const MENTORS = [
  {
    name: 'Ahmed Noor',
    designation: '3D Specialist',
    image: '/images/Hin.png',
  },
  {
    name: 'Aiswarya VP',
    designation: 'SEO Specialist',
    image: '/images/Hin.png',
  },
  {
    name: 'Hina Javaid',
    designation: 'Digital Marketing Expert',
    image: '/images/Hin.png',
  },
  {
    name: 'Hojjat',
    designation: '3D Visualizer',
    image: '/images/Hin.png',
  },
  {
    name: 'Lakshmi',
    designation: 'Web Developer',
    image: '/images/Hin.png',
  },
]

export function MentorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>('.mentor-card')
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
      className="relative overflow-x-clip overflow-y-visible border-t border-white/8 bg-black px-4 py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 80% 50%, rgba(84, 227, 70, 0.07) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-14">
          <AnimatedSection variant="fadeUp">
            <SectionLabel className="mb-4 mx-auto">Our Mentors</SectionLabel>
          </AnimatedSection>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Learn From Industry Experts
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Practitioners and specialists who bring real industry experience into every session.
            </p>
          </AnimatedSection>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6"
        >
          {MENTORS.map(({ name, designation, image }, i) => {
            const variant = i % 3

            return (
              <article
                key={name}
                className="mentor-card group relative flex flex-col overflow-visible bg-transparent"
              >
                <ExpandableLogoPortrait
                  src={encodeURI(image)}
                  alt={name}
                  className="mx-auto max-w-[280px] sm:max-w-none"
                />

                {variant === 0 && (
                  <div className="mt-5 pl-1">
                    <h3 className="text-xl font-black tracking-tight text-white">
                      {name}
                    </h3>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-green-accent">
                      {designation}
                    </p>
                  </div>
                )}

                {variant === 1 && (
                  <div className="mt-5 flex items-start gap-3 pl-1">
                    <span
                      className="mt-1.5 h-10 w-px shrink-0 bg-green-accent/70"
                      aria-hidden
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-accent">
                        {designation}
                      </p>
                      <h3 className="mt-1.5 text-lg font-black leading-snug text-white">
                        {name}
                      </h3>
                    </div>
                  </div>
                )}

                {variant === 2 && (
                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                      {name}
                    </h3>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="h-px w-4 bg-blue-primary/60" aria-hidden />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-green-accent">
                        {designation}
                      </p>
                      <span className="h-px w-4 bg-blue-primary/60" aria-hidden />
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
