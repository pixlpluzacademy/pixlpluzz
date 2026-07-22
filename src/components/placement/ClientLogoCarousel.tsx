'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

const CLIENT_LOGOS = [
  { src: '/images/client logo/neo.svg', alt: 'Neo Digital Hub' },
  { src: '/images/client logo/copernicus.svg', alt: 'Copernicus' },
  { src: '/images/client logo/latief-production.svg', alt: 'Latheif Productions' },
  { src: '/images/client logo/blackwhite.svg', alt: 'Black & White' },
] as const

export function ClientLogoCarousel({ className }: { className?: string }) {
  // Duplicate enough times for a seamless loop with a short logo set
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section
      className={cn(
        'relative overflow-hidden border-t border-white/8 bg-black py-10 sm:py-14',
        className,
      )}
      aria-label="Hiring partners and clients"
    >
      <div className="site-container mb-8 text-center sm:mb-10">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-green-accent">
          Our network
        </p>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
          Trusted by industry partners
        </h2>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-black to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-black to-transparent sm:w-24" />

      <div className="flex w-max animate-marquee-fast items-center">
        {track.map((logo, i) => (
          <div
            key={`${logo.src}-${i}`}
            className="mx-6 flex h-16 w-36 shrink-0 items-center justify-center sm:mx-10 sm:h-20 sm:w-44"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={176}
              height={80}
              className="h-10 w-auto max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-12"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
