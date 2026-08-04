import type { Metadata } from 'next'
import { getCareers } from '@/lib/data'
import { CareerContent } from '@/components/career/CareerContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description:
    'Join the Pixl Pluz Academy team. View open positions for trainers, instructors, and counsellors in Kochi.',
  path: '/career',
})

export default function CareerPage() {
  const careers = getCareers()
  return <CareerContent careers={careers} />
}
