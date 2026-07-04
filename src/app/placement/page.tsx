import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PixelButton } from '@/components/ui/PixelButton'
import { PlacementHero } from '@/components/placement/PlacementHero'
import { PlacementWall } from '@/components/placement/PlacementWall'

export const metadata: Metadata = {
  title: 'Placement',
  description: 'Meet the students placed by Pixl Pluz Academy — real careers, real companies, real success stories.',
}

export default function PlacementPage() {
  return (
    <>
      <PlacementHero />
      <PlacementWall />

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
