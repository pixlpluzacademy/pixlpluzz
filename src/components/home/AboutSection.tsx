'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'
import type { Course } from '@/lib/data'

const FEATURES = [
  {
    title: 'Learn by Working',
    desc: 'Work on practical assignments, campaign ideas, social media plans, SEO tasks, ad strategies, content calendars, and real industry-style projects from the beginning.',
    more: 'Every task mirrors how a real digital marketing agency works in Kochi — briefs, revisions, deadlines, and presentation. You build confidence by shipping work, not just watching lectures.',
    image: '/images/class2.jpg',
    imageAlt: 'Students in a practical training session',
  },
  {
    title: 'Future-Ready Curriculum',
    desc: 'Courses updated to reflect what employers actually want — including AI tools and automation workflows.',
    more: 'Modules stay aligned with hiring trends across Kerala and the Gulf. You learn SEO, ads, content, analytics, and AI automation as one connected workflow used in modern agencies.',
    image: '/images/students.jpg',
    imageAlt: 'Students collaborating on digital projects',
  },
  {
    title: 'Mentorship by Industry Experts',
    desc: 'Learn directly from working professionals in digital marketing, AI, security, and development.',
    more: 'Mentors share live campaign lessons, portfolio feedback, and career guidance from real client work. You get answers from people who still practice the craft every day.',
    image: '/images/student2.jpg',
    imageAlt: 'Mentor guiding a student',
  },
  {
    title: 'Placement & Career Support',
    desc: 'Portfolio reviews, resume coaching, LinkedIn optimisation, and mock interviews to get you hired.',
    more: 'We help you present skills clearly to employers — stronger profiles, sharper interviews, and practical career guidance so you can move into digital roles with confidence.',
    image: '/images/graduation.jpg',
    imageAlt: 'Graduate ready for career placement',
  },
]

/** Grid slot positions (2×2) with gap — used when collapsed */
const SLOT = [
  'top-0 left-0 right-[calc(50%+0.625rem)] bottom-[calc(50%+0.625rem)]',
  'top-0 left-[calc(50%+0.625rem)] right-0 bottom-[calc(50%+0.625rem)]',
  'top-[calc(50%+0.625rem)] left-0 right-[calc(50%+0.625rem)] bottom-0',
  'top-[calc(50%+0.625rem)] left-[calc(50%+0.625rem)] right-0 bottom-0',
] as const

/** Expanded covers ~3/4 of the grid from its corner — leaves a strip to switch cards */
const EXPANDED = [
  'top-0 left-0 right-[25%] bottom-[25%]',
  'top-0 left-[25%] right-0 bottom-[25%]',
  'top-[25%] left-0 right-[25%] bottom-0',
  'top-[25%] left-[25%] right-0 bottom-0',
] as const

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function canHoverExpand() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function AboutSection({ courses: _courses }: { courses: Course[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="relative bg-black py-16 sm:py-24 px-4 overflow-x-clip overflow-y-visible">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 40%, rgba(21, 62, 144, 0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 60%, rgba(84, 227, 70, 0.08) 0%, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-stretch lg:items-center">
          <div
            data-no-blur-text
            className="flex w-full min-w-0 flex-col items-start justify-center lg:col-span-1 lg:py-2"
          >
            <SectionLabel className="mb-4">About PixlPluz</SectionLabel>
            <div className="w-full max-w-md">
              <h2 className="mb-6 block w-full text-2xl font-black leading-snug text-white lg:text-3xl">
                Best Digital Marketing Academy in Kochi
              </h2>
              <div className="space-y-4">
                <p className="m-0 block w-full text-justify text-white leading-relaxed">
                  We combine real-world training, industry mentorship, and career-first thinking to turn ambitious learners into job-ready experts.
                </p>
                <p className="m-0 block w-full text-justify text-white leading-relaxed">
                  Our academy in Kochi is built around agency-style learning. Students work on live-style briefs,
                  campaign planning and AI-assisted workflows that mirror how modern
                  marketing teams operate every day.
                </p>
                <p className="m-0 block w-full text-justify text-white leading-relaxed">
                  Whether you are a fresh graduate, working professional, or career switcher, Pixl Pluz helps you
                  build a strong portfolio, grow practical skills, and move toward digital careers with clarity and
                  confidence.
                </p>
              </div>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="mt-8 inline-block">
              <Link
                href="/about"
                className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
              >
                More About Us
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-2 min-h-[28rem] sm:min-h-[30rem] lg:min-h-[32rem]"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onMouseLeave={() => setActive(null)}
          >
            {FEATURES.map(({ title, desc, more, image, imageAlt }, i) => {
              const isExpanded = active === i
              const isDimmed = active !== null && active !== i

              return (
                <motion.div
                  key={title}
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    'absolute overflow-visible isolate will-change-[top,right,bottom,left]',
                    'transition-[top,right,bottom,left,opacity,filter,transform] duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    isExpanded ? EXPANDED[i] : SLOT[i],
                    isExpanded && 'z-30',
                    isDimmed && 'z-10 scale-[0.98] opacity-80 blur-[1px]',
                    !isDimmed && !isExpanded && 'z-10',
                  )}
                  onMouseEnter={() => {
                    if (canHoverExpand()) setActive(i)
                  }}
                >
                  {/* Dark shade on non-hovered cards so the active one pops */}
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 z-20 bg-black/45 transition-opacity duration-[400ms]',
                      isDimmed ? 'opacity-100' : 'opacity-0',
                    )}
                    aria-hidden
                  />

                  {/* Bright blue glow behind card when expanded */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -inset-3 -z-10 rounded-sm transition-opacity duration-[400ms]',
                      isExpanded ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(96, 165, 250, 0.55) 0%, rgba(59, 130, 246, 0.35) 40%, transparent 72%)',
                      filter: 'blur(18px)',
                    }}
                    aria-hidden
                  />

                  <article
                    className={cn(
                      'relative z-10 grid h-full w-full grid-cols-2 overflow-hidden border border-white/8 bg-[#141414]',
                      'transition-[border-color,box-shadow] duration-500',
                      isExpanded &&
                        'border-blue-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_40px_rgba(96,165,250,0.5),0_0_80px_rgba(59,130,246,0.35)]',
                    )}
                  >
                    <div className="relative h-full min-h-0 overflow-hidden">
                      <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Base copy stays fixed; extra copy fades in after expand */}
                    <div className="flex h-full min-w-0 flex-col justify-center gap-2 overflow-hidden p-4 sm:p-5">
                      <h3 className="w-full shrink-0 text-base font-bold leading-snug text-white sm:text-lg">
                        {title}
                      </h3>
                      <p className="w-full shrink-0 text-justify text-xs leading-relaxed text-white sm:text-sm">
                        {desc}
                      </p>
                      <p
                        className={cn(
                          'w-full text-justify text-xs leading-relaxed text-white sm:text-sm',
                          'overflow-hidden transition-[opacity,max-height,margin] duration-300 ease-out',
                          isExpanded
                            ? 'mt-1 max-h-40 opacity-100 delay-200'
                            : 'mt-0 max-h-0 opacity-0 delay-0',
                        )}
                      >
                        {more}
                      </p>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
