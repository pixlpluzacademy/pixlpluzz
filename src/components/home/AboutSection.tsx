'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Course } from '@/lib/data'

const FEATURES = [
  {
    title: 'Learn by Working',
    desc: 'Work on practical assignments, campaign ideas, social media plans, SEO tasks, ad strategies, content calendars, and real industry-style projects from the beginning.',
    image: '/images/class2.jpg',
    imageAlt: 'Students in a practical training session',
  },
  {
    title: 'Future-Ready Curriculum',
    desc: 'Courses updated to reflect what employers actually want — including AI tools and automation workflows.',
    image: '/images/students.jpg',
    imageAlt: 'Students collaborating on digital projects',
  },
  {
    title: 'Mentorship by Industry Experts',
    desc: 'Learn directly from working professionals in digital marketing, AI, security, and development.',
    image: '/images/student2.jpg',
    imageAlt: 'Mentor guiding a student',
  },
  {
    title: 'Placement & Career Support',
    desc: 'Portfolio reviews, resume coaching, LinkedIn optimisation, and mock interviews to get you hired.',
    image: '/images/graduation.jpg',
    imageAlt: 'Graduate ready for career placement',
  },
]

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function AboutSection({ courses: _courses }: { courses: Course[] }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [rulerWidth, setRulerWidth] = useState<number | null>(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const update = () => setRulerWidth(heading.getBoundingClientRect().width)

    update()
    const observer = new ResizeObserver(update)
    observer.observe(heading)
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="bg-white dark:bg-navy-950 py-16 sm:py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-center">
          <div
            data-no-blur-text
            className="flex w-full min-w-0 flex-col items-start lg:col-span-1 lg:py-2"
          >
            <SectionLabel className="mb-4">About PixlPluz</SectionLabel>
            <div className="w-full max-w-md">
              <h2
                ref={headingRef}
                className="mb-6 inline-block max-w-full text-2xl font-black leading-snug text-gray-900 dark:text-white lg:text-3xl"
              >
                Best Digital Marketing Academy in Kochi
              </h2>
              <p
                className="m-0 block text-left text-gray-600 dark:text-gray-400 leading-relaxed"
                style={rulerWidth != null ? { width: rulerWidth, maxWidth: '100%' } : undefined}
              >
                Pixl Pluz is not just another digital marketing institute — it&apos;s a launchpad for the next
                generation of digital and tech professionals. We combine real-world training, industry mentorship,
                and career-first thinking to turn ambitious learners into job-ready experts.
              </p>
            </div>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="mt-8 inline-block">
              <Link
                href="/about"
                className="btn-glaze btn-primary-fill inline-flex items-center gap-2 px-7 py-3 text-sm font-bold uppercase tracking-wide pixel-corner-sm"
              >
                More About Us
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-2 grid sm:grid-cols-2 gap-4 sm:gap-5 items-stretch"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {FEATURES.map(({ title, desc, image, imageAlt }) => (
              <motion.article
                key={title}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group grid h-full min-h-[200px] sm:min-h-[220px] grid-cols-2 overflow-hidden border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-navy-800"
              >
                {/* Left — image fills full column height (no stretch) */}
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, 220px"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[#153e90]/0 transition-colors duration-500 group-hover:bg-[#153e90]/45"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_40px_rgba(21,62,144,0.85)] transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                {/* Right — text, same height */}
                <div className="flex h-full min-w-0 flex-col justify-center gap-2 p-4 sm:p-5">
                  <h3 className="w-full font-bold leading-snug text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="w-full text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                    {desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
