import type { Metadata } from 'next'
import { ScholarshipContent } from '@/components/scholarship/ScholarshipContent'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Scholarship',
  description:
    "Apply for the Pixl Pluz Academy scholarship program. A test-based merit scholarship for students who can't afford digital education.",
  path: '/scholarship',
})

export default function ScholarshipPage() {
  return <ScholarshipContent />
}
