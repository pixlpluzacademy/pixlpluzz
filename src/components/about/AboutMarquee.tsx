'use client'

import { cn } from '@/lib/utils'

interface AboutMarqueeProps {
  items: string[]
  className?: string
  speed?: 'slow' | 'fast'
}

export function AboutMarquee({ items, className, speed = 'slow' }: AboutMarqueeProps) {
  const track = [...items, ...items]

  return (
    <div className={cn('overflow-hidden border-y border-blue-primary/20 select-none', className)} aria-hidden>
      <div
        className={cn(
          'flex w-max items-center py-5',
          speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee',
        )}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-10 shrink-0 text-[11px] font-medium uppercase tracking-[0.45em] text-blue-light/35"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
