'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    q: 'Why is Pixl Pluz Academy the best option for an AI-integrated course in Kochi?',
    a: 'Pixl Pluz Academy offers a scholarship-based, AI-integrated 2-month digital and tech-based course in Kochi focused on practical learning, live projects, agency-style training, placement support, and mentorship from industry professionals.',
  },
  {
    q: 'What skills will I gain from the digital marketing course at Pixl Pluz Academy?',
    a: 'You will gain hands-on skills in SEO, Google Ads, social media marketing, content strategy, email marketing, analytics, AI tools automation, portfolio building, and career preparation.',
  },
  {
    q: 'What are the career opportunities available after a digital marketing course?',
    a: 'Graduates can pursue roles like Digital Marketing Executive, SEO Specialist, Social Media Manager, Content Strategist, Google Ads Manager, and more in agencies, startups, or as freelancers.',
  },
  {
    q: 'Does Pixl Pluz provide an AI tools subscription for the students?',
    a: 'Yes. We provide access to pro-versions of the key AI tools needed for each course — including AI writing assistants, design tools, SEO tools, and automation platforms.',
  },
  {
    q: 'Does Pixl Pluz offer placement support after the course?',
    a: 'Yes. We offer comprehensive placement support including portfolio reviews, resume coaching, LinkedIn optimisation, mock interviews, and connections to hiring companies.',
  },
]

const faqContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-x-clip bg-[#0a0a0a] py-[clamp(64px,6vw,96px)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 15% 30%, rgba(20, 61, 143, 0.14) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className="site-container relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left — heading top, still have questions bottom-aligned with accordion */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <h2 className="relative font-black leading-[1.02] tracking-tight text-[clamp(2.25rem,6vw,4.5rem)]">
              <PixelTrail />
              <span className="block">
                <span className="text-green-accent">F</span>
                <span className="text-white">requently</span>
              </span>
              <span className="block">
                <span className="text-green-accent">A</span>
                <span className="text-white">sked</span>
              </span>
              <span className="block">
                <span className="text-green-accent">Q</span>
                <span className="text-white">uestions</span>
              </span>
            </h2>

            <AnimatedSection variant="fadeUp" delay={0.12}>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Still Have Questions?</h3>
                <p className="mb-4 max-w-sm text-sm leading-relaxed text-gray-400 text-justify">
                  Reach out and our team will guide you through courses, scholarships, and next
                  steps.
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-sm font-bold uppercase tracking-wider text-green-accent underline decoration-green-accent/50 underline-offset-4 transition-colors hover:decoration-green-accent"
                >
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — accordion */}
          <motion.div
            className="space-y-3 lg:col-span-7"
            variants={faqContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {FAQS.map((faq, i) => {
              const open = openIdx === i
              return (
                <motion.div
                  key={i}
                  variants={faqItemVariants}
                  transition={{ duration: 0.4, ease: 'easeOut' as const }}
                  className={cn(
                    'overflow-hidden border transition-colors duration-200',
                    open
                      ? 'border-green-accent/45'
                      : 'border-white/12 bg-[#141414] hover:border-white/25',
                  )}
                >
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5',
                      open
                        ? 'bg-gradient-to-r from-[#143d8f] via-[#2a7a5a] to-[#54e345] text-white'
                        : 'bg-[#141414] text-white hover:bg-white/[0.04]',
                    )}
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold leading-snug sm:text-base">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        'shrink-0 transition-transform duration-200',
                        open ? 'rotate-180 text-white' : 'text-green-accent',
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="faq-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="border-t border-white/10 bg-black/40 px-5 py-4 text-sm font-medium leading-relaxed text-justify text-gray-400 sm:px-6 sm:py-5 sm:text-base">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
