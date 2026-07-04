import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Pixl Pluz Academy is an AI-integrated digital marketing and tech academy based in Kerala, backed by Neo Digital Hub Dubai. Practical training, live projects, ₹50 Lakh scholarship fund.',
}

export default function AboutPage() {
  return <AboutContent />
}
