'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  return (
    <section className="bg-white dark:bg-navy-950 py-16 sm:py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <SectionLabel className="mb-4">About PixlPluz</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Best Digital Marketing Academy in Kochi
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Pixl Pluz is not just another digital marketing institute — it&apos;s a launchpad for the next
              generation of digital and tech professionals. We combine real-world training, industry mentorship,
              and career-first thinking to turn ambitious learners into job-ready experts.
            </p>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="inline-block">
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
            className="lg:col-span-2 grid sm:grid-cols-2 gap-5"
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
                className="group grid h-[200px] grid-cols-2 overflow-hidden border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-navy-800"
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
                <div className="flex h-full flex-col justify-center gap-2 p-4 sm:p-5">
                  <h3 className="font-bold leading-snug text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="line-clamp-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
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
