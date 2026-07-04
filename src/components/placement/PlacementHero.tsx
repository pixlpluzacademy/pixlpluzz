'use client'

import { BlurText } from '@/components/ui/BlurText'

const STATS = [
  { value: '100%', label: 'Placement Assistance' },
  { value: '20+', label: 'Hiring Partners' },
  { value: '₹3L+', label: 'Avg Starting Package' },
  { value: '< 60', label: 'Days to Placement' },
]

export function PlacementHero() {
  return (
    <section className="bg-navy-950 px-4 pt-24 pb-16 sm:px-6 lg:px-12" data-page-hero>
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent">
          Placement
        </p>
        <BlurText
          as="h1"
          onLoad
          className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          text="Our graduates work at top companies."
        />
        <BlurText
          as="p"
          onLoad
          className="mt-6 max-w-xl text-lg text-gray-400"
          text="Real careers, real companies — across India and beyond."
        />

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:mt-20 sm:gap-x-8 sm:gap-y-10 sm:pt-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
