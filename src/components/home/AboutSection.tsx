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
    desc: 'From day one you handle practical assignments, AI-assisted tasks, content plans, analytics drills, and real industry-style projects.',
    more: 'Every brief mirrors workplace practice with clear goals, revisions, deadlines, and presentation. You grow confidence by shipping work instead of only watching lectures.',
    image: '/images/students/group-discussion.png',
    imageAlt: 'Students in a practical training session',
  },
  {
    title: 'AI-Integrated Courses',
    desc: 'A curriculum shaped around hiring needs: AI tools, automation workflows, and digital skills that keep you competitive in the market.',
    more: 'Modules stay aligned with hiring trends across Kerala and the Gulf. You learn AI automation with digital skills as one connected workflow used by modern teams.',
    image: '/images/students/clearing-doubts.jpeg',
    imageAlt: 'Students collaborating on digital projects',
  },
  {
    title: 'Mentorship by Industry Experts',
    desc: 'Train directly with working professionals across AI, digital skills, security, and development fields.',
    more: 'Mentors share project lessons, portfolio feedback, and career guidance drawn from daily industry practice. You get answers from people who still work in the field.',
    image: '/images/students/student.jpeg',
    imageAlt: 'Mentor guiding a student',
  },
  {
    title: 'International Exposure',
    desc: 'Backed by Neo Digital Hub Dubai, your training connects to global standards and wider career paths beyond Kerala.',
    more: 'You study in Kochi with international backing that strengthens portfolios, interviews, and roles that value global awareness with practical AI-integrated skills.',
    image: '/images/students/graduation.png',
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

/** Expanded card fills the entire grid; siblings are fully hidden */
const EXPANDED = 'inset-0' as const

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
    <section className="relative overflow-visible bg-black py-16 sm:py-24 px-4">
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
              <h2 className="mb-6 block w-full text-2xl font-black leading-snug text-green-accent lg:text-3xl">
                Best AI-Integrated Academy in Kochi
              </h2>
              <div className="space-y-4">
                <p className="m-0 block w-full text-justify text-white/65 leading-relaxed">
                  Pixl Pluz is an AI-integrated academy in Kochi that prepares ambitious students for modern digital
                  careers. We teach practical, future-ready programs that blend AI tools with in-demand skills so
                  learners build confidence, strong portfolios, and job-ready capability from day one.
                </p>
                <p className="m-0 block w-full text-justify text-white/65 leading-relaxed">
                  Our academy focuses on hands-on learning across AI-integrated courses — from digital skills and
                  automation to content, analytics, and career-ready workflows.
                </p>
                <p className="m-0 block w-full text-justify text-white/65 leading-relaxed">
                  Backed by Neo Digital Hub Dubai, Pixl Pluz brings international exposure and industry insight to
                  Kerala classrooms. 
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
            className="relative overflow-visible lg:col-span-2 min-h-[28rem] sm:min-h-[30rem] lg:min-h-[32rem]"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onMouseLeave={() => setActive(null)}
          >
            {FEATURES.map(({ title, desc, more, image, imageAlt }, i) => {
              const isExpanded = active === i
              const isHidden = active !== null && active !== i

              return (
                <motion.div
                  key={title}
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    'absolute overflow-visible will-change-[top,right,bottom,left]',
                    'transition-[top,right,bottom,left,opacity,transform] duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    isExpanded ? EXPANDED : SLOT[i],
                    isExpanded && 'z-30',
                    isHidden && 'pointer-events-none z-0 scale-95 opacity-0',
                    !isHidden && !isExpanded && 'z-10',
                  )}
                  onMouseEnter={() => {
                    if (canHoverExpand()) setActive(i)
                  }}
                >
                  {/* Outer glow — renders behind the card, visible around expanded edges */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -inset-6 z-0 rounded-sm transition-opacity duration-[400ms]',
                      isExpanded ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                      background:
                        'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(96, 165, 250, 0.65) 0%, rgba(59, 130, 246, 0.4) 35%, transparent 70%)',
                      filter: 'blur(28px)',
                    }}
                    aria-hidden
                  />

                  <article
                    className={cn(
                      'relative z-10 grid h-full w-full grid-cols-2 overflow-hidden border border-white/8 bg-[#141414]',
                      'transition-[border-color,box-shadow] duration-500',
                      isExpanded &&
                        'border-blue-400/60 shadow-[0_0_0_1px_rgba(96,165,250,0.35),0_0_32px_rgba(96,165,250,0.55),0_0_72px_rgba(59,130,246,0.4),0_24px_48px_rgba(0,0,0,0.5)]',
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

                    <div
                      className={cn(
                        'flex h-full min-w-0 flex-col justify-center gap-2 overflow-hidden',
                        'transition-[padding] duration-400',
                        isExpanded ? 'p-6 sm:p-8 lg:p-10' : 'p-4 sm:p-5',
                      )}
                    >
                      <h3
                        className={cn(
                          'w-full shrink-0 font-black leading-snug text-green-accent transition-[font-size] duration-400',
                          isExpanded ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg',
                        )}
                      >
                        {title}
                      </h3>
                      <p
                        className={cn(
                          'about-card-copy w-full shrink-0 text-justify leading-relaxed text-white/80 transition-[font-size] duration-400',
                          isExpanded ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                        )}
                      >
                        {desc}
                      </p>
                      <p
                        className={cn(
                          'about-card-copy w-full text-justify leading-relaxed text-white/75',
                          'overflow-hidden transition-[opacity,max-height,margin,font-size] duration-300 ease-out',
                          isExpanded
                            ? 'mt-2 max-h-48 text-sm opacity-100 delay-200 sm:text-base'
                            : 'mt-0 max-h-0 text-xs opacity-0 delay-0 sm:text-sm',
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
