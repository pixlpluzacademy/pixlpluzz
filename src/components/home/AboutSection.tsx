'use client'

import Link from 'next/link'
import { ArrowRight, Briefcase, Brain, Users, TrendingUp, BarChart2, Monitor, BrainCircuit, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Course } from '@/lib/data'

const FEATURES = [
  {
    icon: Briefcase,
    title: 'Learn by Working',
    desc: 'Work on practical assignments, campaign ideas, social media plans, SEO tasks, ad strategies, content calendars, and real industry-style projects from the beginning.',
  },
  {
    icon: Brain,
    title: 'Future-Ready Curriculum',
    desc: 'Courses updated to reflect what employers actually want — including AI tools and automation workflows.',
  },
  {
    icon: Users,
    title: 'Mentorship by Industry Experts',
    desc: 'Learn directly from working professionals in digital marketing, AI, security, and development.',
  },
  {
    icon: TrendingUp,
    title: 'Placement & Career Support',
    desc: 'Portfolio reviews, resume coaching, LinkedIn optimisation, and mock interviews to get you hired.',
  },
]

function CourseIcon({ slug }: { slug: string }) {
  const cls = 'text-blue-primary/40 dark:text-green-accent/40'
  if (slug.includes('marketing')) return <BarChart2 size={32} className={cls} />
  if (slug.includes('web'))       return <Monitor size={32} className={cls} />
  if (slug.includes('data'))      return <BrainCircuit size={32} className={cls} />
  return <ShieldCheck size={32} className={cls} />
}

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.93, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0 },
}

const courseContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const courseCardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function AboutSection({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-white dark:bg-navy-950 py-16 sm:py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Main grid */}
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
                className="inline-flex items-center gap-2 bg-blue-primary text-white px-7 py-3 text-sm font-bold uppercase tracking-wide pixel-corner-sm hover:brightness-110 transition-colors"
              >
                More About Us
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          {/* Right: feature cards */}
          <motion.div
            className="lg:col-span-2 grid sm:grid-cols-2 gap-6"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                whileHover={{
                  y: -14,
                  scale: 1.04,
                  boxShadow: '0 28px 64px rgba(0,0,0,0.22)',
                  transition: { type: 'spring', stiffness: 320, damping: 22 },
                }}
                whileTap={{ scale: 0.97 }}
                className="group p-6 border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-navy-800 hover:border-blue-primary dark:hover:border-green-accent transition-colors duration-300 pixel-corner cursor-default"
              >
                <div className="mb-4 w-10 h-10 bg-blue-primary/10 dark:bg-green-accent/10 group-hover:bg-blue-primary/20 dark:group-hover:bg-green-accent/20 flex items-center justify-center pixel-corner-sm transition-colors duration-200">
                  <Icon size={20} className="text-blue-primary dark:text-green-accent" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Courses preview strip */}
        {/* {courses.length > 0 && (
          <div className="mt-20">
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h3>
                <Link href="/courses" className="text-sm font-semibold text-blue-primary dark:text-green-accent hover:underline flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={courseContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {courses.map(course => (
                <motion.div key={course.id} variants={courseCardVariants} transition={{ duration: 0.5, ease: 'easeOut' as const }}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-navy-800 hover:border-blue-primary dark:hover:border-green-accent hover:-translate-y-1 transition-all duration-300 pixel-corner overflow-hidden"
                  >
                    <div className="h-32 bg-linear-to-br from-blue-primary/20 to-green-accent/10 flex items-center justify-center overflow-hidden">
                      <CourseIcon slug={course.slug} />
                    </div>
                    <div className="p-4">
                      <span className="inline-block text-xs font-bold uppercase tracking-wide text-green-accent dark:text-green-accent bg-green-accent/10 px-2 py-0.5 mb-2">
                        {course.level}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-primary dark:group-hover:text-green-accent transition-colors">
                        {course.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">{course.lessons} Lessons</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )} */}
      </div>
    </section>
  )
}
