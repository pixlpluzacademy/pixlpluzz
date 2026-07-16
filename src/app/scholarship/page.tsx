import type { Metadata } from 'next'
import { ScholarshipContent } from '@/components/scholarship/ScholarshipContent'

export const metadata: Metadata = {
  title: 'Scholarship',
  description:
    "Apply for the Pixl Pluz Academy scholarship program. A test-based merit scholarship for students who can't afford digital education.",
}

export default function ScholarshipPage() {
  return <ScholarshipContent />
}
