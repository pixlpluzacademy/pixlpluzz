import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PixelButton } from '@/components/ui/PixelButton'
import { PlacementWall } from '@/components/placement/PlacementWall'

export const metadata: Metadata = {
  title: 'Placement',
  description: 'Meet the students placed by Pixl Pluz Academy — real careers, real companies, real success stories.',
}

const STATS = [
  { value: '100%', label: 'Placement Assistance' },
  { value: '20+',  label: 'Hiring Partners' },
  { value: '₹3L+', label: 'Avg Starting Package' },
  { value: '< 60', label: 'Days to Placement' },
]

export default function PlacementPage() {
  return (
    <>
      {/* Hero — dark editorial */}
      <section className="bg-navy-950 px-4 pt-24 pb-16 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-green-accent">
            Placement
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Our graduates work at top companies.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-400">
            Real careers, real companies — across India and beyond.
          </p>

          {/* Stats — quiet, editorial */}
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10 lg:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-4xl font-black text-white lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student wall — custom-designed cards, no names needed */}
      <PlacementWall />

      {/* CTA */}
      <section className="border-t border-white/8 bg-navy-950 py-24 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="mb-4 mx-auto">Join Them</SectionLabel>
          <h2 className="text-4xl font-black text-white mb-4">
            Your Name Could Be on This Page.
          </h2>
          <p className="text-gray-400 mb-8">
            Enrol in a course, build your portfolio, and let us help you land your first digital career.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <PixelButton href="/courses">Browse Courses</PixelButton>
            <PixelButton href="/scholarship" variant="outline">Apply for Scholarship</PixelButton>
          </div>
        </div>
      </section>
    </>
  )
}
