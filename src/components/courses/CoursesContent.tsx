'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Course } from '@/lib/data'
import { CourseCard } from '@/components/courses/CourseCard'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { COURSES_PAGE_HERO_IMAGE } from '@/lib/course-assets'
import { PixelTrail } from '@/components/ui/PixelTrail'

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
    <div className="courses-page min-h-screen bg-black">
      {/* Photo hero — courses listing only */}
      <section
        ref={heroRef}
        data-page-hero
        data-nav-solid
        className="relative flex min-h-[clamp(22rem,58svh,34rem)] flex-col justify-end overflow-hidden border-b border-white/10 pb-14 pt-28 sm:pb-16 md:pt-32"
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

        <div className="site-container-wide relative z-10 w-full">
          <h1 className="relative font-black uppercase leading-[0.9] tracking-tight">
            <PixelTrail />
            <span className="block text-[clamp(2.75rem,10vw,7.5rem)]">
              <span className="text-white">Our </span>
              <span className="text-green-accent">AI </span>
              <span className="text-white">Courses</span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 sm:mt-6 sm:text-lg">
            AI-integrated programs with live projects, mentor support, and placement guidance.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-black py-[clamp(64px,6vw,96px)]">
        <div
          ref={gridRef}
          className="site-container-wide grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  )
}
