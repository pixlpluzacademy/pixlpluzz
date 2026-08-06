import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'

const description =
  'Pixl Pluz Academy is an AI-integrated digital marketing and tech academy in Kerala, backed by Neo Digital Hub Dubai. Practical training, live projects, and mentorship.'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description,
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: '/about',
            name: 'About Us',
            description,
            type: 'AboutPage',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ]),
        ]}
      />
      <AboutContent />
    </>
  )
}
