'use client'

import { useState, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'

const ACCORDION_ITEMS = [
  {
    title: 'Practical Learning for Real Careers',
    body: 'Training is built around how work actually happens in the industry — from planning and execution to real client-style delivery, not just theory.',
  },
  {
    title: 'Scholarship Opportunities for Students',
    body: 'Merit-based scholarships make quality, AI-integrated education accessible to more students, regardless of where they\'re starting from.',
  },
  {
    title: 'Built for AI-Integrated Careers',
    body: 'Courses in Digital Marketing, Web Development, Data Science & AI, and Cybersecurity are all designed around how AI is reshaping these fields today.',
  },
  {
    title: 'Career & Placement Support',
    body: 'Interview preparation, mentor guidance, and placement support help you take the final step from training to a real job.',
  },
]

export function PurposeSection() {
  const [openIdx, setOpenIdx] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Inner layer moves slower than scroll → classic parallax depth
  const imageY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] py-16 sm:py-24 px-4 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 20% 50%, rgba(21, 62, 144, 0.1) 0%, transparent 55%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* Left image — shown below the text on mobile */}
        <AnimatedSection variant="slideLeft" className="relative overflow-hidden pixel-corner-lg aspect-4/5 order-2 lg:order-1">
          {/* Parallax layer — oversized so movement never reveals empty edges */}
          <motion.div
            style={{ y: imageY, position: 'absolute', inset: '-20%' }}
          >
            <Image
              src="/images/clearing-doubts.jpeg"
              alt="Students"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </motion.div>

        </AnimatedSection>

        {/* Right text — comes first on mobile */}
        <AnimatedSection variant="slideRight" delay={0.15} className="order-1 lg:order-2">
          <AnimatedSection variant="fadeIn" delay={0}>
            <SectionLabel className="mb-4">Our Purpose</SectionLabel>
          </AnimatedSection>
          <h2 className="text-4xl lg:text-4xl font-black text-green-accent leading-tight mb-6">
            Turning Learners Into Job Ready Tech Professionals
          </h2>
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <p className="text-justify text-gray-400 leading-relaxed mb-3">
              Pixl Pluz Academy was created to help students build real, in-demand skills for
              today&apos;s AI-driven industry. Learning here isn&apos;t just about tools or software.
              It&apos;s about knowing how to use AI to solve real problems, build real projects, and
              deliver work that actually gets you hired.
            </p>
          </AnimatedSection>
          <AnimatedSection variant="fadeUp" delay={0.25}>
            <p className="text-justify text-gray-400 leading-relaxed mb-8">
              The goal is simple: move students from learning to doing, from theory to execution,
              and from classroom knowledge to career-ready confidence.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.3}>
            <div className="space-y-3">
              {ACCORDION_ITEMS.map((item, i) => (
                <div key={item.title} className={`border pixel-corner overflow-hidden transition-colors duration-200 ${openIdx === i ? 'border-green-accent/40' : 'border-white/10'}`}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-white hover:bg-white/5 hover:pl-6 transition-all duration-200"
                    onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-1 h-5 shrink-0 transition-colors duration-200 ${openIdx === i ? 'bg-green-accent' : 'bg-white/25'}`} />
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: openIdx === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      {openIdx === i
                        ? <Minus size={16} className="text-green-accent" />
                        : <Plus size={16} className="text-gray-400" />}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openIdx === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-5 pb-4 text-sm text-justify text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                          {item.body}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  )
}
