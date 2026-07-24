'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { cn } from '@/lib/utils'

type FaqItem = {
  q: string
  a?: string
  bullets?: string[]
}

const FAQS: FaqItem[] = [
  {
    q: ' Why Pixl Pluz Academy the best option for an AI-integrated course in Kochi?',
    a: 'Pixl Pluz Academy combines AI-integrated, scholarship-based training with a strong focus on practical learning. Live projects, agency-style training, placement support, International exposure, and mentorship from industry professionals make it a well-rounded choice for building real, job-ready skills.',
  },
  {
    q: 'What AI courses does Pixl Pluz provide?',
    bullets: [
      'AI-integrated digital marketing course',
      'AI-powered web development course',
      'Data science and AI course',
      'Cybersecurity course with AI',
    ],
  },
  {
    q: 'Does Pixl Pluz offer an online AI-integrated course in Kochi?',
    a: 'Yes. Pixl Pluz provides flexible learning options for students looking for an online/offline digital marketing course in Kochi with practical assignments, mentor support, and a live project with global exposure.',
  },
  {
    q: 'What are the eligibility criteria for Pixl Pluz scholarship-based AI-integrated course?',
    a: 'At Pixl Pluz, Candidates must register and attend the entrance test. Our counsellor then contacts shortlisted candidates, and scholarship winners are selected based on the results.',
  },
  {
    q: 'Does Pixl Pluz provide an AI tools subscription for the students?',
    a: 'Yes. We provide access to pro-versions of the key AI tools needed for each course including AI writing assistants, design tools, SEO tools, and automation platforms.',
    bullets: [
      'ChatGPT Plus',
      'Perplexity Pro',
      'Canva Pro',
      'Notion AI Plus',
      'Claude Pro',
      'Jasper Creator',
      'Grammarly Premium',
      'Leonardo AI Pro',
    ],
  },
  {
    q: 'Does Pixl Plus provide placement assistance after the course?',
    a: 'Yes, Pixl Plus offers placement assistance to help students transition smoothly into the industry, including support with resume building, interview preparation, and connecting learners to relevant job opportunities after course completion.',
  },
  {
    q:'Do I need any prior knowledge of AI or coding to join Pixl Plus?',
    a:'No, the courses are designed for beginners, so you can start with zero prior experience.',
  },
  {
    q:'Which course should I choose if I&apos;m not sure what I want to specialize in?',
    a:'Start with our AI-integrated digital marketing course it&apos;s the most beginner-friendly and helps you explore the digital field before specializing further.',
  },
  {
    q:'How is "AI-integrated" different from a normal digital marketing or web development course?',
    a:'Our courses teach you to use AI tools alongside core skills, so you learn faster, work smarter, and stay updated with how the industry actually works today.',
  },
  {
    q:'Is the data science and AI course suitable for non-engineering students?',
    a:'Yes, the course is designed to be beginner-friendly, so non-engineering students can join and learn step by step.',
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
          {/* Left — heading + still have questions kept together */}
          <div className="lg:col-span-5">
            <h2 className="relative mb-8 font-black leading-[1.02] tracking-tight text-[clamp(2.25rem,6vw,4.5rem)]">
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
                    <Image
                      src="/icons/arrow.svg"
                      alt=""
                      width={14}
                      height={18}
                      className={cn(
                        'h-[18px] w-auto shrink-0 transition-transform duration-200',
                        open ? 'rotate-[-90deg] brightness-0 invert' : 'rotate-90',
                      )}
                      aria-hidden
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
                        <div className="border-t border-white/10 bg-black/40 px-5 py-4 text-sm font-medium leading-relaxed text-gray-400 sm:px-6 sm:py-5 sm:text-base">
                          {faq.a && (
                            <p className={cn('text-justify', faq.bullets && 'mb-3')}>{faq.a}</p>
                          )}
                          {faq.bullets && (
                            <ul className="space-y-2.5">
                              {faq.bullets.map((item) => (
                                <li key={item} className="flex gap-3 text-left">
                                  <span
                                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-[#143d8f]"
                                    aria-hidden
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
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
