'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Course } from '@/lib/data'
import { CourseCard } from '@/components/courses/CourseCard'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { COURSES_PAGE_HERO_IMAGE } from '@/lib/course-assets'

gsap.registerPlugin(ScrollTrigger)

interface CoursesContentProps {
  courses: Course[]
}

export function CoursesContent({ courses }: CoursesContentProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()

  useLayoutEffect(() => {
    if (!isSiteReady) return

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.course-card')
        gsap.set(cards, { opacity: 0, y: 24 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        })
      }

      const hero = heroRef.current
      const parallax = parallaxRef.current
      if (hero && parallax) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!reduceMotion) {
          gsap.fromTo(
            parallax,
            { yPercent: -12 },
            {
              yPercent: 18,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          )
        }
      }
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [isSiteReady])

  return (
    <div className="courses-page min-h-screen">
      {/* Header */}
      <section
        ref={heroRef}
        data-page-hero
        className="relative min-h-[220px] overflow-hidden border-b border-white/10 px-4 pb-14 pt-28 md:min-h-[280px] md:pb-20 md:pt-32"
      >
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-[15%] h-[130%] w-full will-change-transform"
          aria-hidden
        >
          <Image
            src={COURSES_PAGE_HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/65" aria-hidden />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our Courses
          </h1>
          <p className="mt-3 max-w-xl text-sm md:text-base text-white/75">
            AI-integrated programs with live projects, mentor support, and placement guidance.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-4 py-12 md:py-16">
        <div
          ref={gridRef}
          className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  )
}
