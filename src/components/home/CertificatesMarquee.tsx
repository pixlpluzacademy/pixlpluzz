'use client'

import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Demo certificate names — replace with real list when ready */
const CERTIFICATES = [
  'Google Ads Certification',
  'Meta Blueprint Certificate',
  'HubSpot Inbound Marketing',
  'Google Analytics GA4',
  'SEO Specialist Certificate',
  'AI Tools & Automation',
  'Digital Marketing Certificate',
  'Web Development Certificate',
  'Data Science & AI Certificate',
  'Cyber Security Fundamentals',
  'Content Strategy Certificate',
  'Pixl Pluz Academy Certificate',
]

export function CertificatesMarquee({ className }: { className?: string }) {
  const track = [...CERTIFICATES, ...CERTIFICATES]

  return (
    <section
      className={cn(
        'relative overflow-hidden border-y border-white/10 bg-navy-900 py-5 sm:py-6',
        className,
      )}
      aria-label="Certificates offered"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-navy-900 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-navy-900 to-transparent sm:w-24" />

      <div className="flex w-max animate-marquee-fast items-center">
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="mx-4 flex shrink-0 items-center gap-3 sm:mx-6"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-green-accent/40 bg-green-accent/10 text-green-accent">
              <Award size={16} strokeWidth={1.75} />
            </span>
            <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em] text-white/85 sm:text-base">
              {name}
            </span>
            <span className="ml-2 h-1 w-1 rounded-full bg-blue-primary/70" aria-hidden />
          </div>
        ))}
      </div>
    </section>
  )
}
