'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Course } from '@/lib/data'
import { getCourseImage, getCourseAiTools } from '@/lib/course-assets'
import { CourseFAQ } from '@/components/courses/CourseFAQ'
import { CertificateStack } from '@/components/courses/CertificateStack'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { formatPrice, cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const AUDIENCES = [
  {
    title: 'Students & fresh graduates',
    desc: 'Exploring creative, digital, and AI-integrated career paths with guided practice.',
    icon: '/icons/dark-mode/students.svg',
  },
  {
    title: 'Working professionals',
    desc: 'Upskilling or shifting into modern digital roles without pausing your career.',
    icon: '/icons/dark-mode/career.svg',
  },
  {
    title: 'Career switchers',
    desc: 'Moving from a non-tech background into practical, portfolio-led work.',
    icon: '/icons/dark-mode/workstream.svg',
  },
  {
    title: 'Freelancers',
    desc: 'Building stronger delivery habits and client-ready project skills.',
    icon: '/icons/dark-mode/portfolio.svg',
  },
  {
    title: 'Entrepreneurs',
    desc: 'Learning workflows that help grow brands, products, and campaigns.',
    icon: '/icons/dark-mode/analytics.svg',
  },
  // {
  //   title: 'Beginners',
  //   desc: 'Starting from zero with mentorship, clear structure, and real projects.',
  //   icon: '/icons/dark-mode/admission.svg',
  // },
]

function AiToolsCarousel({ tools }: { tools: string[] }) {
  const track = [...tools, ...tools]
  return (
    <div
      className="course-hero-fade relative overflow-hidden border-y border-white/8 py-4 sm:py-5"
      aria-label="AI tools used in this course"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-black to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-black to-transparent sm:w-20" />
      <div className="flex w-max animate-marquee-fast items-center">
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="mx-3 flex shrink-0 items-center gap-3 sm:mx-5"
          >
            <span className="whitespace-nowrap text-sm font-bold text-white/85 sm:text-base">
              {name}
            </span>
            <span className="h-1 w-1 rounded-full bg-blue-primary/70" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeader({
  kicker,
  title,
  body,
  className,
  align = 'left',
}: {
  kicker: string
  title: string
  body?: string
  className?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <div className={cn('mb-10 max-w-3xl', centered && 'mx-auto text-center', className)}>
      <div className={cn('mb-4 flex items-center gap-3', centered && 'justify-center')}>
        <span className="h-px w-8 bg-green-accent" aria-hidden />
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-green-accent">
          {kicker}
        </p>
        {centered && <span className="h-px w-8 bg-green-accent" aria-hidden />}
      </div>
      <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-white/55',
            centered ? 'text-center' : 'text-justify',
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/** Static Pixl mark frame — blue L + green corner block (matches mentor logo proportions). */
function moduleBrief(
  title: string,
  lessons: Course['curriculum'][number]['lessons'],
): string {
  const count = lessons.length
  const focus = lessons
    .slice(0, 2)
    .map((l) => l.title)
    .filter(Boolean)
  if (focus.length === 0) {
    return `A focused module covering the essentials of ${title.toLowerCase()}.`
  }
  const focusLine =
    focus.length === 1 ? focus[0]! : `${focus[0]} and ${focus[1]}`
  return `Learn ${count} practical topic${count === 1 ? '' : 's'} including ${focusLine}${
    count > 2 ? ', and more' : ''
  } — built for hands-on practice and portfolio work.`
}

function CurriculumGrid({ course }: { course: Course }) {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {course.curriculum.map((module, mi) => {
        const title = module.title.replace(/^Module\s*\d+:\s*/i, '')
        const brief = moduleBrief(title, module.lessons)
        return (
          <li key={module.title} className="flex">
            <article
              className="group relative flex w-full flex-col overflow-hidden border border-white/10 px-5 py-7 transition-colors duration-300 hover:border-green-accent/35 sm:px-6 sm:py-8"
              style={{
                background:
                  'linear-gradient(160deg, rgba(21,62,144,0.5) 0%, #0a0a0a 42%, rgba(84,227,70,0.1) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 55% at 15% 0%, rgba(21,62,144,0.4) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 100% 100%, rgba(84,227,70,0.14) 0%, transparent 50%)',
                }}
                aria-hidden
              />
              <div className="relative z-10 flex flex-1 flex-col items-center text-center">
                <span className="font-mono text-[11px] font-bold tabular-nums tracking-[0.28em] text-green-accent">
                  MODULE {String(mi + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-black leading-snug tracking-tight text-white sm:text-xl">
                  {title}
                </h3>
                <ul className="mt-5 flex flex-wrap justify-center gap-2">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson.title}
                      className="border border-white/12 bg-black/35 px-2.5 py-1 text-[11px] leading-snug text-white/70 backdrop-blur-sm"
                    >
                      {lesson.title}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-white/55">
                  {brief}
                </p>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

interface CourseDetailContentProps {
  course: Course
}

export function CourseDetailContent({ course }: CourseDetailContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const isSiteReady = useSiteReady()
  const image = getCourseImage(course.slug)
  const aiTools = getCourseAiTools(course.slug)

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
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.06,
      })

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (heroImgRef.current) {
          gsap.fromTo(
            heroImgRef.current,
            { scale: 1.12, opacity: 0.4 },
            { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
          )
        }

        gsap.utils.toArray<HTMLElement>('.course-reveal', container).forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            opacity: 0,
            y: 40,
            duration: 0.75,
            ease: 'power3.out',
          })
        })

        gsap.utils.toArray<HTMLElement>('.course-stagger > *', container).forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el.parentElement, start: 'top 85%', once: true },
            opacity: 0,
            y: 28,
            duration: 0.55,
            delay: i * 0.06,
            ease: 'power3.out',
          })
        })
      }
    }, container)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [isSiteReady])

  return (
    <div ref={containerRef} className="course-detail-page min-h-screen bg-black text-white">
      {/* ── Hero: full-bleed visual + composition ── */}
      <section
        data-page-hero
        className="relative min-h-[min(92svh,920px)] overflow-hidden"
      >
        <div
          ref={heroImgRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
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
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(92svh,920px)] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-10 lg:pt-32">
          <div className="course-hero-fade absolute right-4 top-28 z-20 sm:right-6 lg:right-8 lg:top-32">
            <CertificateStack />
          </div>

          <Link
            href="/courses"
            className="course-hero-fade mb-10 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-green-accent"
          >
            <ArrowLeft size={14} />
            All courses
          </Link>

          <h1 className="course-hero-fade max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {course.title}
          </h1>

          <div className="course-hero-fade mt-6 flex flex-wrap gap-2.5">
            {[
              { label: 'Fee', value: formatPrice(course.price) },
              { label: 'Duration', value: course.duration },
              { label: 'Modules', value: String(course.lessons) },
              { label: 'Hours', value: course.durationHours },
            ].map((item) => (
              <div
                key={item.label}
                className="pixel-corner-sm border border-white/12 bg-black/45 px-4 py-3 backdrop-blur-md"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-black text-green-accent">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="course-hero-fade mt-6 max-w-2xl text-justify text-sm leading-relaxed text-white/60 sm:text-base">
            {course.description}
          </p>

          <div className="course-hero-fade mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
            >
              Enrol Now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/scholarship"
              className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
            >
              Apply for Scholarship
            </Link>
            <a
              href={`/brochures/${course.slug}.pdf`}
              download
              className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
            >
              <Download size={16} />
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="relative bg-[#050505] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 50% at 50% 0%, rgba(21,62,144,0.18) 0%, transparent 55%), radial-gradient(ellipse 35% 40% at 80% 80%, rgba(84,227,70,0.08) 0%, transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="course-reveal">
            <SectionHeader
              align="center"
              className="mb-12"
              kicker="Curriculum"
              title="What you will learn"
              body="A structured path from foundations to portfolio work. Each module lists the topics you will practice, with a short overview of what you will build."
            />
            <CurriculumGrid course={course} />
          </div>
        </div>
      </section>

      <AiToolsCarousel tools={aiTools} />

      {/* ── Audience ── */}
      <section className="relative border-t border-white/8 bg-[#050505] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            className="course-reveal"
            kicker="Audience"
            title="Who this course is for"
            body="Built for learners who want practical skills, mentorship, and a clearer path into digital careers."
          />
          <div className="course-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map(({ title, desc, icon }, i) => (
              <article
                key={title}
                className={cn(
                  'group relative overflow-hidden border border-white/8 bg-[#0a0a0a] p-6 transition-all duration-300 pixel-corner hover:border-green-accent/35 hover:bg-[#121212]',
                  i === 0 && 'sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[22rem] lg:flex lg:flex-col lg:justify-end',
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(84,227,70,0.14) 0%, transparent 55%)',
                  }}
                  aria-hidden
                />
                <span className="relative mb-5 inline-flex h-11 w-11 items-center justify-center border border-green-accent/35 bg-green-accent/10">
                  <Image src={icon} alt="" width={22} height={22} className="object-contain" />
                </span>
                <h3
                  className={cn(
                    'relative font-black text-white',
                    i === 0 ? 'text-2xl lg:text-3xl' : 'text-lg',
                  )}
                >
                  {title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-justify text-white/55">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Included ── */}
      {/* <section className="relative border-t border-white/8 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            className="course-reveal"
            kicker="Included"
            title="What you'll get"
          />
          <div className="course-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {course.features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-start gap-4 border border-white/8 bg-[#141414] p-5 transition-colors duration-300 pixel-corner-sm hover:border-green-accent/30"
              >
                <span className="font-mono text-xs font-bold text-green-accent/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium leading-relaxed text-white/85">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── FAQ ── */}
      <section className="relative overflow-hidden border-t border-white/8 bg-black px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="course-reveal mb-12 text-center">
            <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl">
              Questions &amp; Answers
            </h2>
            <p className="text-base font-semibold text-white/80">
              Quick answers about the program, access, and support before you apply.
            </p>
          </div>
          <div className="course-reveal">
            <CourseFAQ faqs={course.faqs} />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="course-reveal relative overflow-hidden border-t border-white/8 px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/bgg.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl overflow-hidden border border-white/10 bg-black/50 p-8 backdrop-blur-md pixel-corner sm:p-12 lg:p-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-accent">
            Start your learning journey
          </p>
          <h2 className="whitespace-nowrap text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
            Ready to build real skills with{' '}
            <span className="text-green-accent">Pixl Pluz Academy ?</span>
          </h2>
          <p className="mt-4 max-w-none whitespace-nowrap text-sm leading-relaxed text-white/55">
            Talk to admissions, explore scholarship support, or download the
            brochure to see the full course plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
            >
              Talk to Admissions
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/scholarship"
              className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
            >
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
