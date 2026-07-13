'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const MENTORS = [
  {
    name: 'Ahmed Noor',
    designation: '3D Specialist',
    image: '/images/Aishh_option_1.png',
  },
  {
    name: 'Aiswarya VP',
    designation: 'SEO Specialist',
    image: '/images/Aishh_option_2.png',
  },
  {
    name: 'Hina Javaid',
    designation: 'Digital Marketing Expert',
    image: '/images/Aishh_option_3.png',
  },
  {
    name: 'Hojjat',
    designation: '3D Visualizer',
    image: '/images/Aishh_option_4.png',
  },
  {
    name: 'Lakshmi',
    designation: 'Web Developer',
    image: '/images/Aishh_option_5.png',
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
    <section ref={sectionRef} className="relative border-t border-white/8 bg-black py-16 sm:py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 80% 50%, rgba(84, 227, 70, 0.07) 0%, transparent 55%)',
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
              Practitioners and specialists who bring real agency experience into every session.
            </p>
          </AnimatedSection>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {MENTORS.map(({ name, designation, image }) => (
            <article
              key={name}
              className="mentor-card group flex flex-col gap-3 bg-transparent transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={encodeURI(image)}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="border border-white/12 bg-black/55 px-3.5 py-3 backdrop-blur-md transition-all duration-300 group-hover:border-green-accent/40 group-hover:bg-black/70 group-hover:shadow-[0_0_24px_rgba(84,227,70,0.18)]">
                <h3 className="text-sm font-bold tracking-tight text-white sm:text-base">
                  {name}
                </h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-green-accent sm:text-[11px]">
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
