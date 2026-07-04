'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  Lock,
  Unlock,
  Users,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Course } from '@/lib/data'
import { getCourseImage, LEVEL_STYLES } from '@/lib/course-assets'
import { CourseFAQ } from '@/components/courses/CourseFAQ'
import { PixelButton } from '@/components/ui/PixelButton'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

function downloadSyllabus(course: Course) {
  const lines = [
    `${course.title} — Syllabus`,
    'Pixl Pluz Academy',
    '',
    `Duration: ${course.duration} (${course.durationHours})`,
    `Level: ${course.level}`,
    `Modules: ${course.lessons}`,
    '',
    ...course.curriculum.flatMap((mod, i) => [
      `Module ${i + 1}: ${mod.title}`,
      ...mod.lessons.map((lesson, j) => `  ${j + 1}. ${lesson.title}`),
      '',
    ]),
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${course.slug}-syllabus.txt`
  link.click()
  URL.revokeObjectURL(url)
}

interface CourseDetailContentProps {
  course: Course
}

export function CourseDetailContent({ course }: CourseDetailContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()

  const image = getCourseImage(course.slug)

  useLayoutEffect(() => {
    if (!isSiteReady) return
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const heroEls = container.querySelectorAll<HTMLElement>('.course-hero-fade')
      gsap.set(heroEls, { opacity: 0, y: 28 })
      gsap.to(heroEls, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      })

      const hero = heroRef.current
      const parallax = parallaxRef.current
      if (hero && parallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(
          parallax,
          { yPercent: -10 },
          {
            yPercent: 15,
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

      gsap.utils.toArray<HTMLElement>('.course-reveal', container).forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
        })
      })
    }, container)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [isSiteReady])

  return (
    <div ref={containerRef} className="course-detail-page min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[min(52vh,480px)] overflow-hidden border-b border-white/10"
      >
        <div
          ref={parallaxRef}
          className="absolute inset-0 -top-[12%] h-[125%] w-full will-change-transform"
          aria-hidden
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-blue-primary/70 mix-blend-multiply" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/80 to-navy-950/40" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[min(52vh,480px)] max-w-7xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="course-hero-fade mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-green-accent transition-colors"
          >
            <ArrowLeft size={14} />
            All courses
          </Link>

          <div className="course-hero-fade mb-4 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'rounded-sm border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
                LEVEL_STYLES[course.level] ?? LEVEL_STYLES.Beginner,
              )}
            >
              {course.level}
            </span>
            {course.featured && (
              <span className="rounded-sm border border-green-accent/30 bg-green-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-green-accent">
                Featured
              </span>
            )}
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="course-hero-fade mb-4 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            {course.title}
          </h1>
          <p className="course-hero-fade max-w-2xl text-base text-white/70 sm:text-lg">
            {course.shortDescription}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3 lg:gap-14">
          <div className="space-y-14 lg:col-span-2">
            {/* About */}
            <div className="course-reveal">
              <p className="course-kicker mb-3">Overview</p>
              <h2 className="mb-5 text-2xl font-bold text-white">About this course</h2>
              <p className="text-base leading-relaxed text-white/60">{course.description}</p>
            </div>

            {/* Features */}
            <div className="course-reveal">
              <p className="course-kicker mb-3">Included</p>
              <h2 className="mb-6 text-2xl font-bold text-white">What you&apos;ll get</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {course.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 border border-white/8 bg-navy-900/50 p-4 transition-colors hover:border-green-accent/25"
                  >
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-green-accent" />
                    <span className="text-sm text-white/75">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="course-reveal">
              <p className="course-kicker mb-3">Syllabus</p>
              <h2 className="mb-6 text-2xl font-bold text-white">Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, mi) => (
                  <div
                    key={module.title}
                    className="overflow-hidden border border-white/10 bg-navy-900/40"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-navy-800/60 px-5 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg font-black tabular-nums text-blue-light/40">
                          {String(mi + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-sm font-bold text-white sm:text-base">{module.title}</h3>
                      </div>
                      <span className="shrink-0 text-xs text-white/40">
                        {module.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.title}
                          className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/3"
                        >
                          {lesson.locked ? (
                            <Lock size={14} className="shrink-0 text-white/30" />
                          ) : (
                            <Unlock size={14} className="shrink-0 text-green-accent" />
                          )}
                          <span
                            className={cn(
                              'text-sm',
                              lesson.locked ? 'text-white/40' : 'text-white/80',
                            )}
                          >
                            {lesson.title}
                          </span>
                          {!lesson.locked && (
                            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-green-accent">
                              Preview
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="course-reveal">
              <p className="course-kicker mb-3">Questions</p>
              <h2 className="mb-6 text-2xl font-bold text-white">FAQ</h2>
              <CourseFAQ faqs={course.faqs} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="course-reveal sticky top-24 overflow-hidden border border-white/10 bg-navy-900 shadow-2xl shadow-black/30">
              <div className="border-b border-white/10 bg-navy-800 px-6 py-6">
                <p className="text-3xl font-black text-white">{formatPrice(course.price)}</p>
                <p className="mt-1.5 text-sm text-white/60">
                  One-time fee · Lifetime access
                </p>
              </div>

              <div className="space-y-4 p-6">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat icon={Clock} value={course.duration} label="Duration" />
                  <Stat icon={BookOpen} value={String(course.lessons)} label="Modules" />
                  <Stat icon={Users} value={course.durationHours.replace(/\s*hours?$/i, '')} label="Hours" />
                </div>

                <PixelButton href="/contact" className="w-full justify-center" size="lg">
                  Enrol Now
                </PixelButton>
                <PixelButton href="/scholarship" variant="outline" className="w-full justify-center">
                  Apply for Scholarship
                </PixelButton>
                <PixelButton
                  variant="outline"
                  className="w-full justify-center gap-2"
                  onClick={() => downloadSyllabus(course)}
                >
                  <Download size={16} />
                  Download Syllabus
                </PixelButton>
                <p className="text-center text-xs text-white/50">
                  Free counselling available · No obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="course-reveal border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="course-kicker mb-2">Ready to start?</p>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Take the first step toward your career in {course.tags[0] ?? 'tech'}.
            </h2>
          </div>
          <PixelButton href="/contact" variant="green" size="lg">
            Talk to Admissions
          </PixelButton>
        </div>
      </section>
    </div>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  value: string
  label: string
}) {
  return (
    <div className="bg-navy-800/80 p-3">
      <Icon size={15} className="mx-auto mb-1.5 text-green-accent" />
      <p className="text-xs font-bold text-white">{value}</p>
      <p className="text-[10px] text-white/55">{label}</p>
    </div>
  )
}
