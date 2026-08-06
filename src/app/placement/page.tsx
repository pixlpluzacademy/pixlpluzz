import type { Metadata } from 'next'
import { PlacementHero } from '@/components/placement/PlacementHero'
import { PlacementWall } from '@/components/placement/PlacementWall'
import { ClientLogoCarousel } from '@/components/placement/ClientLogoCarousel'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Meet students from Pixl Pluz Academy building real careers — placement support, portfolio work, and industry pathways in Kochi.'

export const metadata: Metadata = pageMetadata({
  title: 'Placement',
  description,
  path: '/placement',
})

export default function PlacementPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/placement',
            name: 'Placement',
            description,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Placement', path: '/placement' },
          ]),
        ]}
      />
      <PlacementHero />
      <PlacementWall />
      <ClientLogoCarousel />
    </>
  )
}
