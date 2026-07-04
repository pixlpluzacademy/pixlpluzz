'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'

const CTA_PIXELS = [
  { size: 6,  top: '20%', left: '10%',  delay: '0s',   color: 'blue' as const,  speed: 'slow' as const },
  { size: 10, top: '70%', right: '12%', delay: '0.6s', color: 'blue' as const,  speed: 'normal' as const },
  { size: 8,  top: '40%', left: '88%',  delay: '1.2s', color: 'white' as const, speed: 'fast' as const },
]

export function CTASection() {
  return (
    <section className="relative bg-navy-800 py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 pixel-dot-bg opacity-20" aria-hidden />
      <FloatingPixels pixels={CTA_PIXELS} />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-75 w-150 rounded-full bg-blue-primary/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <AnimatedSection variant="fadeIn" delay={0} className="mb-6">
          <SectionLabel light className="mx-auto">The Steps</SectionLabel>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.1}>
          <h2 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl">
            Pass the Test. Show Your Work.<br />Start Your Career.
          </h2>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.2}>
          <p className="mx-auto mb-10 max-w-xl text-gray-400">
            Your digital career can start this July. Apply for the Pixl Pluz Academy scholarship program and
            take your first step into digital marketing, AI tools, online business skills, and practical
            industry learning.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="scaleUp" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/scholarship"
                className="inline-flex items-center gap-2 bg-blue-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:brightness-110 pixel-corner-sm"
              >
                Apply Now &rsaquo;
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-navy-900 pixel-corner-sm"
              >
                Explore Courses &rsaquo;
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
