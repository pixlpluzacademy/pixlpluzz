'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Academy credentials / certifications */
const CERTIFICATES = [
  { src: '/images/certificates/svg/nsdc-seeklogo-04.svg', alt: 'ISO 9001:2015' },
  { src: '/images/certificates/svg/nsdc-seeklogo-05.svg', alt: 'ISO 29993:2017' },
  { src: '/images/certificates/svg/nsdc-seeklogo-03.svg', alt: 'MSME' },
  { src: '/images/certificates/svg/nsdc-seeklogo-02.svg', alt: 'Startup India' },
  { src: '/images/certificates/svg/nsdc-seeklogo-01.svg', alt: 'NSDC' },
] as const

/** Enough logos that one half is always wider than the viewport */
const SEGMENT = Array.from({ length: 4 }, () => CERTIFICATES).flat()

export function CertificatesMarquee({ className }: { className?: string }) {
  // Two identical segments → translateX(-50%) loops with no empty gap
  const track = [...SEGMENT, ...SEGMENT]

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-black py-4 sm:py-5',
        className,
      )}
      aria-label="Certificates offered"
    >
      <div className="flex w-max animate-marquee-fast items-center [animation-duration:90s]">
        {track.map((cert, i) => (
          <div
            key={`${cert.src}-${i}`}
            className="mr-14 flex shrink-0 items-center justify-center sm:mr-20"
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={160}
              height={112}
              className="h-12 w-auto object-contain sm:h-14"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
