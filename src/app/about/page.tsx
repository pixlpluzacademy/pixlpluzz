import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'Pixl Pluz Academy is an AI-integrated digital marketing and tech academy in Kerala, backed by Neo Digital Hub Dubai. Practical training, live projects, and mentorship.',
  path: '/about',
})

export default function AboutPage() {
  return <AboutContent />
}
