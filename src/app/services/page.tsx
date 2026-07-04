import type { Metadata } from 'next'
import { ServicesContent } from '@/components/services/ServicesContent'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Pixl Pluz Academy services — Digital Marketing, Web Development, Data Science, AI Training, and more with hands-on projects and mentorship.',
}

export default function ServicesPage() {
  return <ServicesContent />
}
