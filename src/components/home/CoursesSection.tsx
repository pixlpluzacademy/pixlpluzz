'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CourseCard } from '@/components/courses/CourseCard'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
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
    <section ref={sectionRef} className="bg-navy-950 py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-14">
          <AnimatedSection variant="fadeUp">
            <SectionLabel className="mb-4 mx-auto">Our Courses</SectionLabel>
          </AnimatedSection>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            AI-Integrated Career Programs
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.1}>
            <p className="max-w-2xl mx-auto text-gray-400">
              Live projects, mentor support, and placement guidance — choose the path that fits your career goals.
            </p>
          </AnimatedSection>
        </div>

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <AnimatedSection variant="fadeUp" delay={0.2} className="mt-10 text-center">
          <Link
            href="/courses"
            className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all pixel-corner-sm"
          >
            View All Courses <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
