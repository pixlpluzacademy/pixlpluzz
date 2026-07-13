'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
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
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-black py-16 sm:py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/bg2.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Questions &amp; Answers
          </h2>
          <AnimatedSection variant="fadeUp">
            <p className="text-base font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              What skills will I gain from the digital marketing course at Pixl Pluz Academy?
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          className="space-y-3"
          variants={faqContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={faqItemVariants}
              transition={{ duration: 0.4, ease: 'easeOut' as const }}
              className={cn(
                'overflow-hidden border bg-black/75 backdrop-blur-sm transition-colors duration-200',
                openIdx === i
                  ? 'border-green-accent/50'
                  : 'border-white/20'
              )}
            >
              <button
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="flex items-start gap-3">
                  <span className={cn(
                    'mt-1.5 w-1 h-4 shrink-0 transition-colors duration-200',
                    openIdx === i ? 'bg-green-accent' : 'bg-green-accent/50'
                  )} />
                  <span className="text-base font-bold leading-snug text-white">
                    {faq.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 shrink-0"
                >
                  {openIdx === i
                    ? <Minus size={18} className="text-green-accent" />
                    : <Plus size={18} className="text-white" />}
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    key="faq-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="border-t border-white/10 px-6 pb-5 pt-4 text-base font-semibold leading-relaxed text-justify text-white">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
