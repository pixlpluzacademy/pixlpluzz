'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQ { q: string; a: string }

export function CourseFAQ({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="overflow-hidden border border-white/10 bg-navy-900/30">
          <button
            type="button"
            className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <span className="text-sm font-semibold text-white">{faq.q}</span>
            {openIdx === i ? (
              <Minus size={14} className="mt-0.5 shrink-0 text-green-accent" />
            ) : (
              <Plus size={14} className="mt-0.5 shrink-0 text-white/40" />
            )}
          </button>
          {openIdx === i && (
            <div className="border-t border-white/8 px-5 pb-4 pt-3 text-sm leading-relaxed text-white/55">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
