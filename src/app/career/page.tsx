import type { Metadata } from 'next'
import { getCareers } from '@/lib/data'
import { CareerContent } from '@/components/career/CareerContent'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the Pixl Pluz Academy team. View open positions for trainers, instructors, and counsellors.',
}

export default function CareerPage() {
  const careers = getCareers()
  return <CareerContent careers={careers} />
}
