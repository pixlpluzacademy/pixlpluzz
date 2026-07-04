'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Course } from '@/lib/data'
import { getCourseImage, LEVEL_STYLES } from '@/lib/course-assets'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { cn } from '@/lib/utils'

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
        className="relative min-h-[220px] md:min-h-[280px] overflow-hidden border-b border-white/10 px-4 py-14 md:py-20"
      >
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-[15%] h-[130%] w-full will-change-transform"
          aria-hidden
        >
          <Image
            src="/images/bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-blue-primary/75 mix-blend-multiply" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950/90 via-blue-dark/70 to-navy-950/50" aria-hidden />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-widest text-blue-light/80 mb-3">
            Home / Courses
          </p>
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

function CourseCard({ course }: { course: Course }) {
  const image = getCourseImage(course.slug)

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        'course-card group flex flex-col overflow-hidden',
        'bg-navy-800/80 border border-white/8',
        'transition-all duration-300 hover:border-green-accent/40 hover:shadow-lg hover:shadow-green-accent/10',
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
        <span
          className={cn(
            'absolute top-3 left-3 rounded-sm border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm',
            LEVEL_STYLES[course.level] ?? LEVEL_STYLES.Beginner,
          )}
        >
          {course.level}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 text-base font-bold leading-snug text-white group-hover:text-green-accent transition-colors line-clamp-2">
          {course.title}
        </h2>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-white/60 line-clamp-3">
          {course.shortDescription}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <BookOpen size={14} className="shrink-0 text-white/55" />
          <span>{course.lessons} Lessons</span>
        </div>
      </div>
    </Link>
  )
}
