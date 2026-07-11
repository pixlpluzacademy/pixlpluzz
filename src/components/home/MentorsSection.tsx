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
    image: '/images/Ahmed Noor.jpeg',
  },
  {
    name: 'Aiswarya VP',
    designation: 'SEO Specialist',
    image: '/images/Aiswarya.jpeg',
  },
  {
    name: 'Hina Javaid',
    designation: 'Digital Marketing Expert',
    image: '/images/Hina.jpeg',
  },
  {
    name: 'Hojjat',
    designation: '3D Visualizer',
    image: '/images/Hojjat.jpeg',
  },
  {
    name: 'Lakshmi',
    designation: 'Web Developer',
    image: '/images/Lakshmi.jpeg',
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
    <section ref={sectionRef} className="border-t border-white/8 bg-navy-900 py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-7xl">
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
              className="mentor-card group overflow-hidden border border-white/10 bg-navy-950 pixel-corner transition-all duration-300 hover:border-green-accent/40 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={encodeURI(image)}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-white group-hover:text-green-accent transition-colors">
                  {name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
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
