import type { Metadata } from 'next'
import { PlacementHero } from '@/components/placement/PlacementHero'
import { PlacementWall } from '@/components/placement/PlacementWall'
import { ClientLogoCarousel } from '@/components/placement/ClientLogoCarousel'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Placement',
  description:
    'Meet students from Pixl Pluz Academy building real careers — placement support, portfolio work, and industry pathways in Kochi.',
  path: '/placement',
})

export default function PlacementPage() {
  return (
    <>
      <PlacementHero />
      <PlacementWall />
      <ClientLogoCarousel />
    </>
  )
}
