'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
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

/** Desktop 2×2 slots — only from xl (1280px+) so mid laptops stay stacked */
const SLOT = [
  'xl:top-0 xl:left-0 xl:right-[calc(50%+0.625rem)] xl:bottom-[calc(50%+0.625rem)]',
  'xl:top-0 xl:left-[calc(50%+0.625rem)] xl:right-0 xl:bottom-[calc(50%+0.625rem)]',
  'xl:top-[calc(50%+0.625rem)] xl:left-0 xl:right-[calc(50%+0.625rem)] xl:bottom-0',
  'xl:top-[calc(50%+0.625rem)] xl:left-[calc(50%+0.625rem)] xl:right-0 xl:bottom-0',
] as const

const EXPANDED = 'xl:inset-0' as const

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
  return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1280px)').matches
}

export function AboutSection({ courses: _courses }: { courses: Course[] }) {
  const [active, setActive] = useState<number | null>(null)
  const rootRef = useRef<HTMLElement>(null)
  const siteReady = useSiteReady()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const clear = () => {
      if (!mq.matches) setActive(null)
    }
    clear()
    mq.addEventListener('change', clear)
    return () => mq.removeEventListener('change', clear)
  }, [])

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
      className="relative overflow-x-clip overflow-y-visible bg-black py-[clamp(64px,6vw,96px)] text-gray-400"
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

      <div className="site-container-wide relative z-10">
        <div className="grid items-stretch gap-8 xl:grid-cols-[clamp(340px,24vw,470px)_minmax(0,1fr)] xl:gap-[clamp(28px,2.5vw,56px)]">
          {/* Intro — centered on mobile, left on desktop */}
          <div
            data-no-blur-text
            className="flex w-full min-w-0 flex-col items-center text-center xl:items-start xl:text-left"
          >
            <div className="flex w-full min-w-0 flex-col items-center text-center xl:items-start xl:text-left">
              <h2 className="relative mb-6 w-full font-black uppercase leading-[0.88] tracking-tight sm:mb-8">
                <PixelTrail />
                <span className="about-hero-pop block text-[clamp(2rem,7vw,3.75rem)] text-white">
                  About
                </span>
                <span className="about-hero-pop block whitespace-nowrap text-[clamp(1.75rem,5.5vw,3.75rem)]">
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
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="about-reveal mt-8 flex w-full justify-center xl:mt-10 xl:justify-start"
              >
                <Link
                  href="/about"
                  className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
                >
                  More About Us
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>

          {/*
            Below 1280px: stacked cards
            xl+: original 2×2 absolute hover grid
          */}
          <motion.div
            className="relative flex w-full flex-col gap-4 overflow-visible sm:gap-5 xl:aspect-[16/11] xl:block xl:h-auto xl:min-h-0"
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
                    'relative overflow-visible',
                    'xl:absolute xl:will-change-[top,right,bottom,left]',
                    'xl:transition-[top,right,bottom,left,opacity,transform] xl:duration-[400ms] xl:ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    isExpanded ? EXPANDED : SLOT[i],
                    isExpanded && 'xl:z-30',
                    isHidden && 'xl:pointer-events-none xl:z-0 xl:scale-95 xl:opacity-0',
                    !isHidden && !isExpanded && 'xl:z-10',
                  )}
                  onMouseEnter={() => {
                    if (canHoverExpand()) setActive(i)
                  }}
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute -inset-6 z-0 hidden rounded-sm transition-opacity duration-[400ms] xl:block',
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
                      'relative z-10 grid w-full overflow-hidden border border-white/8 bg-[#141414]',
                      'grid-cols-1 xl:h-full xl:grid-cols-2',
                      'transition-[border-color,box-shadow] duration-500',
                      isExpanded &&
                        'xl:border-blue-400/60 xl:shadow-[0_0_0_1px_rgba(96,165,250,0.35),0_0_32px_rgba(96,165,250,0.55),0_0_72px_rgba(59,130,246,0.4),0_24px_48px_rgba(0,0,0,0.5)]',
                    )}
                  >
                    <div className="relative aspect-[16/10] min-h-0 overflow-hidden xl:aspect-auto xl:h-full">
                      <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 1280px) 100vw, 40vw"
                        className="object-cover object-center"
                      />
                    </div>

                    <div
                      className={cn(
                        'flex min-w-0 flex-col',
                        'items-center px-4 py-4 text-center',
                        'xl:h-full xl:items-stretch xl:justify-center xl:overflow-hidden xl:text-left',
                        'transition-[padding] duration-400',
                        isExpanded ? 'xl:px-6 xl:py-6 2xl:px-8 2xl:py-8' : 'xl:px-3 xl:py-3 2xl:px-3.5 2xl:py-3.5',
                      )}
                    >
                      <div className="flex w-full min-w-0 flex-col gap-2">
                        <h3
                          className={cn(
                            'w-full shrink-0 font-black tracking-tight text-green-accent transition-[font-size] duration-400',
                            isExpanded
                              ? 'text-xl leading-[1.2] xl:text-3xl 2xl:text-4xl'
                              : 'text-[clamp(0.95rem,3.8vw,1.15rem)] leading-none xl:text-lg 2xl:text-xl xl:leading-[1.15]',
                          )}
                        >
                          {/* Phone: one line · Desktop: two lines */}
                          <span className="whitespace-nowrap xl:hidden">
                            {titleLines.join(' ')}
                          </span>
                          <span className="hidden xl:block">
                            <span className="block">{titleLines[0]}</span>
                            <span className="block">{titleLines[1]}</span>
                          </span>
                        </h3>
                        <p
                          className={cn(
                            'about-card-copy m-0 w-full shrink-0 text-justify leading-relaxed text-gray-400 transition-[font-size] duration-400',
                            isExpanded ? 'text-sm xl:text-base' : 'text-sm xl:text-xs 2xl:text-sm',
                          )}
                        >
                          {desc}
                        </p>
                        {/* Full text on phone; desktop only when expanded */}
                        <p
                          className={cn(
                            'about-card-copy m-0 w-full text-justify leading-relaxed text-gray-400',
                            'text-sm',
                            isExpanded
                              ? 'mt-2 max-h-none opacity-100 xl:max-h-48 xl:text-base xl:opacity-100'
                              : 'mt-2 max-h-none opacity-100 xl:mt-0 xl:hidden',
                          )}
                        >
                          {more}
                        </p>
                      </div>
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
