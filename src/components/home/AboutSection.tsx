'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { cn } from '@/lib/utils'
import type { Course } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    titleLines: ['PRACTICAL', 'LEARNING'],
    desc: 'Real projects, not just theory. Work on AI-assisted tasks, content plans, analytics exercises, and industry-style assignments designed to mirror actual job workflows.',
    more: 'Every brief mirrors workplace practice with clear goals, revisions, deadlines, and presentation. You grow confidence by shipping work instead of only watching lectures.',
    image: '/images/students/practical-learning.png',
    imageAlt: 'Students in a practical training session',
  },
  {
    titleLines: ['AI', 'COURSES'],
    desc: 'Built for what employers are hiring for right now. Master AI tools, automation workflows, and digital skills that keep you ahead in a fast-changing job market.',
    more: 'Modules stay aligned with hiring trends across Kerala and the Gulf. You learn AI automation with digital skills as one connected workflow used by modern teams.',
    image: '/images/students/clearing-doubts.jpeg',
    imageAlt: 'Students collaborating on digital projects',
  },
  {
    titleLines: ['INTERNATIONAL', 'MENTORS'],
    desc: 'Learn directly from professionals working in the field. Get hands-on guidance across AI, digital skills, security, and development from people who do this every day.',
    more: 'Mentors share project lessons, portfolio feedback, and career guidance drawn from daily industry practice. You get answers from people who still work in the field.',
    image: '/images/students/live-project-training.png',
    imageAlt: 'Mentor guiding a student',
  },
  {
    titleLines: ['GLOBAL', 'EXPERIENCE'],
    desc: 'Backed by Neo Digital Hub Dubai, training here is benchmarked to international standards, giving you skills and exposure that open doors beyond Kerala.',
    more: 'You study in Kochi with international backing that strengthens portfolios, interviews, and roles that value global awareness with practical AI-integrated skills.',
    image: '/images/students/career-placement-support.png',
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
  const rootRef = useRef<HTMLElement>(null)
  const siteReady = useSiteReady()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.set('.about-hero-pop', { opacity: 0 })
      gsap.set('.about-reveal', { opacity: 0, y: 28 })

      if (!siteReady) return

      gsap.to('.about-hero-pop', {
        opacity: 1,
        duration: 0.05,
        stagger: 0.18,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      })

      gsap.to('.about-reveal', {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      })
    }, root)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [siteReady])

  return (
    <section
      ref={rootRef}
      className="relative overflow-visible bg-black px-4 py-16 text-gray-400 sm:px-6 sm:py-24 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 40%, rgba(20, 61, 143, 0.18) 0%, transparent 55%), radial-gradient(ellipse 45% 35% at 88% 70%, rgba(255, 250, 164, 0.04) 0%, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 pixel-grid-bg opacity-10" aria-hidden />

      <div className="relative z-10">
        <div className="grid items-stretch gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:gap-5 xl:gap-6">
          <div
            data-no-blur-text
            className="flex min-h-[28rem] w-full min-w-0 flex-col justify-between sm:min-h-[30rem] lg:min-h-[32rem]"
          >
            <div className="w-full max-w-sm lg:max-w-md">
              <h2 className="relative mb-6 font-black uppercase leading-[0.88] tracking-tight sm:mb-8">
                <PixelTrail />
                <span className="about-hero-pop block text-[clamp(2rem,7vw,4.75rem)] text-white">
                  About
                </span>
                <span className="about-hero-pop block text-[clamp(2rem,7vw,4.75rem)]">
                  <span className="text-green-accent">Pixl</span>{' '}
                  <span
                    className="career-outline-word"
                    style={{ WebkitTextStroke: '2px #54e345' }}
                  >
                    Pluz
                  </span>
                </span>
              </h2>
              <p className="about-reveal m-0 w-full text-justify text-base leading-relaxed text-gray-400 sm:text-lg">
                At Pixl Pluz Academy, we believe learning should move as fast as the modern industry.
                We bring international standards from Neo Digital Hub in Dubai directly to our Kochi
                campus, focusing on the AI-integrated skills that top companies are hiring for today.
                By ditching outdated theory in favor of real projects and expert mentorship, we give
                you the tools to stand out in a competitive job market. We are here to help you bridge
                the gap between where you are now and the career you are aiming for.
              </p>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="about-reveal mt-8 inline-block">
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
            className="relative min-h-[28rem] w-full overflow-visible sm:min-h-[30rem] lg:min-h-[32rem]"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onMouseLeave={() => setActive(null)}
          >
            {FEATURES.map(({ titleLines, desc, more, image, imageAlt }, i) => {
              const title = titleLines.join(' ')
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
                        isExpanded ? 'p-6 sm:p-8 lg:p-10' : 'p-3 sm:p-4',
                      )}
                    >
                      <h3
                        className={cn(
                          'w-full shrink-0 font-black text-green-accent transition-[font-size] duration-400',
                          isExpanded
                            ? 'text-2xl leading-[1.2] sm:text-3xl lg:text-4xl'
                            : 'text-base leading-[1.15] sm:text-lg lg:text-xl',
                        )}
                      >
                        <span className="block">{titleLines[0]}</span>
                        <span className="block">{titleLines[1]}</span>
                      </h3>
                      <p
                        className={cn(
                          'about-card-copy w-full shrink-0 text-justify leading-relaxed text-gray-400 transition-[font-size] duration-400',
                          isExpanded ? 'text-sm sm:text-base' : 'text-xs sm:text-sm',
                        )}
                      >
                        {desc}
                      </p>
                      <p
                        className={cn(
                          'about-card-copy w-full text-justify leading-relaxed text-gray-400',
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
