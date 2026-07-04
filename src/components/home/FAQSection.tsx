'use client'

import { useState } from 'react'
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
    a: 'Yes. We offer 100% placement assistance including portfolio reviews, resume coaching, LinkedIn optimisation, mock interviews, and direct connections to hiring companies.',
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
    <section id="faq" className="bg-white dark:bg-navy-950 py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2">
            Questions &amp; Answers
          </h2>
          <AnimatedSection variant="fadeUp">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                'border pixel-corner overflow-hidden transition-colors duration-200',
                openIdx === i
                  ? 'border-blue-primary/40 dark:border-green-accent/40'
                  : 'border-gray-200 dark:border-white/10'
              )}
            >
              <button
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="flex items-start gap-3">
                  <span className={cn(
                    'mt-0.5 w-1 h-4 shrink-0 transition-colors duration-200',
                    openIdx === i ? 'bg-green-accent' : 'bg-blue-primary dark:bg-green-accent'
                  )} />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                </span>
                <motion.span
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-0.5 shrink-0"
                >
                  {openIdx === i
                    ? <Minus size={16} className="text-blue-primary dark:text-green-accent" />
                    : <Plus size={16} className="text-gray-400" />}
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
                    <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
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
