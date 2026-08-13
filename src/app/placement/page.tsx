import type { Metadata } from 'next'
import { PlacementHero } from '@/components/placement/PlacementHero'
import { PlacementWall } from '@/components/placement/PlacementWall'
import { ClientLogoCarousel } from '@/components/placement/ClientLogoCarousel'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { PAGE_SEO } from '@/data/page-seo'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: PAGE_SEO.placement.title,
  description: PAGE_SEO.placement.description,
  path: '/placement',
  absoluteTitle: true,
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
