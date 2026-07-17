'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FAQ {
  q: string
  a: string
}

export function CourseFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={faq.q}
          className={cn(
            'overflow-hidden border backdrop-blur-sm transition-colors duration-200',
            openIdx === i
              ? 'border-[color:var(--accent)]/50 bg-[color:var(--card-bg)]'
              : 'border-[color:var(--card-border)] bg-[color:var(--card-bg)]',
          )}
        >
          <button
            type="button"
            className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/5"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
          >
            <span className="flex items-start gap-3">
              <span
                className={cn(
                  'mt-1.5 h-4 w-1 shrink-0 transition-colors duration-200',
                  openIdx === i ? 'bg-[color:var(--accent)]' : 'bg-[color:var(--accent)]/50',
                )}
              />
              <span className="text-base font-bold leading-snug text-[color:var(--heading,#fff)]">
                {faq.q}
              </span>
            </span>
            <motion.span
              animate={{ rotate: openIdx === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 shrink-0"
            >
              {openIdx === i ? (
                <Minus size={18} className="text-[color:var(--accent)]" />
              ) : (
                <Plus size={18} className="text-[color:var(--body)]" />
              )}
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
                <div className="border-t border-[color:var(--card-border)] px-6 pb-5 pt-4 text-base font-semibold leading-relaxed text-justify text-[color:var(--body)]">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
