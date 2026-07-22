'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import type { Course } from '@/lib/data'
import { getCourseImage, getCourseAiTools } from '@/lib/course-assets'
import { AiToolsFallingStack } from '@/components/courses/AiToolsFallingStack'
import { CertificatesMarquee } from '@/components/home/CertificatesMarquee'
import { SectionLabel } from '@/components/ui/SectionLabel'
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
  {
    title: 'Beginners',
    desc: 'Starting from the basics with clear steps, mentors, and hands-on practice.',
    icon: '/icons/dark-mode/admission.svg',
  },
]

function SectionHeader({
  kicker,
  title,
  body,
  className,
  titleClassName,
  align = 'left',
}: {
  kicker?: string
  title: string
  body?: string
  className?: string
  titleClassName?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mb-10 max-w-3xl',
        centered && 'mx-auto flex flex-col items-center text-center',
        className,
      )}
    >
      {kicker ? <SectionLabel className="mb-4">{kicker}</SectionLabel> : null}
      <h2
        className={cn(
          'text-3xl font-black leading-tight tracking-tight text-green-accent sm:text-4xl lg:text-[2.75rem]',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            'course-body mt-4 text-base leading-relaxed text-white/65',
            centered ? 'text-center' : 'text-justify',
          )}
        >
          {body}
        </p>
      )}
    </div>
  )
}

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

function cleanModuleTitle(title: string) {
  return title.replace(/^Module\s*\d+:\s*/i, '')
}

function ModuleDetail({
  module,
  index,
}: {
  module: Course['curriculum'][number]
  index: number
}) {
  const fullTitle = cleanModuleTitle(module.title)
  const brief =
    module.description?.trim() || moduleBrief(fullTitle, module.lessons)

  return (
    <>
      <p className="module-switch-eyebrow">
        Module {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="module-switch-title">{fullTitle}</h3>
      <p className="course-body module-switch-brief text-justify">{brief}</p>
      <p className="module-switch-topics-label">Topics you will cover</p>
      <ul className="module-switch-pills">
        {module.lessons.map((lesson) => (
          <li key={lesson.title}>
            <span className="module-switch-pill">{lesson.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function CurriculumModules({ course }: { course: Course }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(true)
  const active = course.curriculum[activeIdx] ?? course.curriculum[0]
  if (!active) return null

  const selectModule = (i: number) => {
    if (i === activeIdx) {
      setMobileOpen((open) => !open)
      return
    }
    setActiveIdx(i)
    setMobileOpen(true)
  }

  return (
    <div className="module-switch">
      <nav className="module-switch-nav" aria-label="Course modules">
        <p className="module-switch-nav-label">Modules</p>
        <ul className="module-switch-nav-list">
          {course.curriculum.map((module, i) => {
            const selected = activeIdx === i
            const expanded = selected && mobileOpen
            return (
              <li
                key={module.title}
                className={cn('module-switch-item', expanded && 'is-open')}
              >
                <button
                  type="button"
                  className={cn(
                    'module-switch-tab',
                    selected && 'is-selected',
                    expanded && 'is-active',
                  )}
                  aria-expanded={expanded}
                  aria-controls={`module-panel-${i}`}
                  onClick={() => selectModule(i)}
                >
                  Module {String(i + 1).padStart(2, '0')}
                </button>
                <div className="module-switch-accordion" id={`module-panel-${i}`}>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        key={module.title}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="module-switch-accordion-inner">
                          <ModuleDetail module={module} index={i} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="module-switch-panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <ModuleDetail module={active} index={activeIdx} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
    <div ref={containerRef} className="course-detail-page min-h-screen">
      {/* ── Hero: full-bleed visual + composition ── */}
      <section
        data-page-hero
        className="relative min-h-[clamp(32rem,70svh,48rem)] overflow-hidden"
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
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.88)' }} />
        </div>

        <div className="site-container relative z-10 flex min-h-[clamp(32rem,70svh,48rem)] flex-col justify-end pb-8 pt-28 lg:pb-10 lg:pt-32">
          <Link
            href="/courses"
            className="course-hero-fade course-body mb-10 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors hover:text-green-accent"
          >
            <ArrowLeft size={14} />
            All courses
          </Link>

          <h1 className="course-hero-fade whitespace-nowrap font-black uppercase leading-[1.05] tracking-tight text-[clamp(1.35rem,4.8vw,4.25rem)]">
            {/\bCOURSE\b$/i.test(course.title.trim())
              ? course.title
              : `${course.title} COURSE`}
          </h1>

          <div className="course-hero-fade mt-6 flex flex-wrap gap-2.5">
            {[
              { label: 'Fee', value: formatPrice(course.price) },
              { label: 'Duration', value: course.duration },
              { label: 'Modules', value: String(course.curriculum.length) },
              { label: 'Hours', value: course.durationHours },
            ].map((item) => (
              <div
                key={item.label}
                className="course-card-surface pixel-corner-sm border px-4 py-3 backdrop-blur-md"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] course-body opacity-70">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-black text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <p className="course-hero-fade course-body mt-6 max-w-2xl text-justify text-sm leading-relaxed sm:text-base">
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

      <CertificatesMarquee />

      {/* ── Curriculum + AI tools falling stack ── */}
      <section className="course-section-surface relative py-[clamp(64px,6vw,96px)]">
        <div className="course-section-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="site-container-wide relative z-10">
          <SectionHeader
            className="course-reveal mb-10"
            align="center"
            title="STRUCTURE"
            titleClassName="text-[clamp(2rem,5vw,3.75rem)] uppercase"
            body="A structured path from foundations to portfolio work select a module to explore topics and outcomes."
          />
          <div className="curriculum-with-tools">
            <div className="course-reveal curriculum-with-tools-modules">
              <CurriculumModules course={course} />
            </div>
            <AiToolsFallingStack tools={aiTools} />
          </div>
        </div>
      </section>

      {/* ── Audience ── */}
      <section className="course-section-surface relative border-t border-[color:var(--card-border)] py-[clamp(64px,6vw,96px)]">
        <div className="site-container">
          <SectionHeader
            className="course-reveal"
            title="WHO THIS COURSE IS FOR ?"
            body="Built for learners who want practical skills, mentorship, and a clearer path into digital careers."
          />
          <div className="course-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map(({ title, desc, icon }) => (
              <article
                key={title}
                className="audience-card group relative overflow-hidden p-6 transition-all duration-300"
              >
                <span className="audience-card-icon relative mb-5 inline-flex h-11 w-11 items-center justify-center">
                  <Image src={icon} alt="" width={22} height={22} className="object-contain" />
                </span>
                <h3 className="relative text-lg font-black text-white">
                  {title}
                </h3>
                <p className="audience-card-body relative mt-3 text-sm leading-relaxed text-justify">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="course-reveal relative overflow-hidden border-t border-[color:var(--card-border)] py-[clamp(64px,6vw,96px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/bgg.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.72)' }} />
        </div>
        <div className="site-container relative z-10">
          <div className="course-card-surface overflow-hidden border p-6 backdrop-blur-md pixel-corner sm:p-12 lg:p-14">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-accent">
              Start your learning journey
            </p>
            <h2 className="text-[1.25rem] font-black leading-snug sm:text-3xl sm:leading-tight lg:text-4xl">
              Ready to build real skills&nbsp;with{' '}
              <span className="whitespace-nowrap text-green-accent">
                Pixl Pluz Academy?
              </span>
            </h2>
            <p className="course-body mt-4 max-w-2xl text-sm leading-relaxed text-justify sm:text-left">
              Talk to admissions, explore scholarship support, or download the
              brochure to see the full course plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-glaze btn-cta-green inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wide pixel-corner-sm sm:w-auto sm:px-8"
              >
                Talk to Admissions
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
