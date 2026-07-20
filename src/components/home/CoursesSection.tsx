'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CourseCard } from '@/components/courses/CourseCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PixelTrail } from '@/components/ui/PixelTrail'
import type { Course } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export function CoursesSection({ courses }: { courses: Course[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll<HTMLElement>('.course-card')
      gsap.set(cards, { opacity: 0, y: 32 })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      })
    }, section)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-16 sm:py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(21, 62, 144, 0.12) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-14">
          <h2 className="relative mb-4 font-black uppercase leading-[1.12] tracking-tight">
            <PixelTrail />
            <span className="block whitespace-nowrap text-[clamp(2rem,7vw,4.5rem)]">
              <span className="text-white">Our</span>{' '}
              <span className="text-green-accent">AI Integrated</span>{' '}
              <span className="text-white">Courses</span>
            </span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* <AnimatedSection variant="fadeUp" delay={0.2} className="mt-10 text-center">
          <Link
            href="/courses"
            className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all pixel-corner-sm"
          >
            View All Courses <ArrowRight size={14} />
          </Link>
        </AnimatedSection> */}
      </div>
    </section>
  )
}
