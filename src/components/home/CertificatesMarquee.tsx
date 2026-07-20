'use client'

import { Award } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Academy credentials / certifications */
const CERTIFICATES = [
  'ISO 9001 - 2015',
  'ISO 29993:2017',
  'MSME',
  'Startup India',
  'NSDC',
]

export function CertificatesMarquee({ className }: { className?: string }) {
  // Repeat enough times for a seamless marquee with a short list
  const track = [...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES]

  return (
    <section
      className={cn(
        'relative overflow-hidden border-y border-white/8 bg-black py-5 sm:py-6',
        className,
      )}
      aria-label="Certificates offered"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-black to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-black to-transparent sm:w-24" />

      <div className="flex w-max animate-marquee-fast items-center">
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="mx-4 flex shrink-0 items-center gap-3 sm:mx-6"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-blue-primary/40 bg-blue-primary/10 text-blue-primary">
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
