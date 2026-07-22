'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { FloatingPixels } from '@/components/ui/FloatingPixels'

const CTA_PIXELS = [
  { size: 6,  top: '20%', left: '10%',  delay: '0s',   color: 'blue' as const,  speed: 'slow' as const },
  { size: 10, top: '70%', right: '12%', delay: '0.6s', color: 'blue' as const,  speed: 'normal' as const },
  { size: 8,  top: '40%', left: '88%',  delay: '1.2s', color: 'white' as const, speed: 'fast' as const },
]

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-[clamp(64px,6vw,96px)]">
      <div className="pointer-events-none absolute inset-0 pixel-dot-bg opacity-15" aria-hidden />
      <FloatingPixels pixels={CTA_PIXELS} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 30% 50%, rgba(21, 62, 144, 0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 50%, rgba(84, 227, 70, 0.12) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div className="site-container relative z-10">
        <div className="mx-auto max-w-3xl text-center" data-no-blur-text>
        <h2 className="mb-6 text-4xl font-black leading-tight text-green-accent sm:text-5xl">
          Pass the Test. Show Your Work.<br />Start Your Career.
        </h2>

        <AnimatedSection variant="fadeUp" delay={0.2}>
          <p className="mx-auto mb-10 max-w-xl text-justify text-gray-400">
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
                className="btn-glaze btn-cta-green inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest pixel-corner-sm"
              >
                Apply Now &rsaquo;
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/courses"
                className="btn-glaze btn-outline-bright inline-flex items-center gap-2 border-2 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors pixel-corner-sm"
              >
                Explore Courses &rsaquo;
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
