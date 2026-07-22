import type { Metadata } from 'next'
import { PlacementHero } from '@/components/placement/PlacementHero'
import { PlacementWall } from '@/components/placement/PlacementWall'
import { ClientLogoCarousel } from '@/components/placement/ClientLogoCarousel'

export const metadata: Metadata = {
  title: 'Placement',
  description: 'Meet the students placed by Pixl Pluz Academy — real careers, real companies, real success stories.',
}

export default function PlacementPage() {
  return (
    <>
      <PlacementHero />
      <PlacementWall />
      <ClientLogoCarousel />
    </>
  )
}
