import { Suspense }    from 'react'
import dynamic         from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { getBlogs, getCourses } from '@/lib/data'

// ─── Hero is above-the-fold → always eager ─────────────────────────────────

// ─── Every section below the hero gets its own lazy JS chunk ───────────────
// SSR is still ON (no `ssr: false`) so search engines see the HTML and
// there is no layout shift.  Only the JavaScript is deferred.
const AboutSection = dynamic(
  () => import('@/components/home/AboutSection').then(m => ({ default: m.AboutSection }))
)
const AdvantageSection = dynamic(
  () => import('@/components/home/AdvantageSection').then(m => ({ default: m.AdvantageSection }))
)
const CardsSection = dynamic(
  () => import('@/components/home/CardsSection').then(m => ({ default: m.CardsSection }))
)
const PurposeSection = dynamic(
  () => import('@/components/home/PurposeSection').then(m => ({ default: m.PurposeSection }))
)
const ScholarshipSection = dynamic(
  () => import('@/components/home/ScholarshipSection').then(m => ({ default: m.ScholarshipSection }))
)
const ContactSection = dynamic(
  () => import('@/components/home/ContactSection').then(m => ({ default: m.ContactSection }))
)
const BlogSection = dynamic(
  () => import('@/components/home/BlogSection').then(m => ({ default: m.BlogSection }))
)
const CTASection = dynamic(
  () => import('@/components/home/CTASection').then(m => ({ default: m.CTASection }))
)
const FAQSection = dynamic(
  () => import('@/components/home/FAQSection').then(m => ({ default: m.FAQSection }))
)

export default function HomePage() {
  const blogs   = getBlogs().slice(0, 3)
  const courses = getCourses().filter(c => c.featured).slice(0, 4)

  return (
    <>
      {/* Hero — critical path, no lazy wrapping */}
      <HeroSection />

      {/*
        Suspense lets Next.js stream the rest of the page in one go.
        Because all sections are SSR'd, the fallback is only visible
        during client-side navigation (not on initial page load).
      */}
      <Suspense fallback={null}>
        <AboutSection courses={courses} />
        <AdvantageSection />
        <CardsSection />
        <PurposeSection />
        <ScholarshipSection />
        <ContactSection />
        <BlogSection blogs={blogs} />
        <CTASection />
        <FAQSection />
      </Suspense>
    </>
  )
}
