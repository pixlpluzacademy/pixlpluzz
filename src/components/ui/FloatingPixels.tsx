'use client'

import { cn } from '@/lib/utils'

interface Pixel {
  size: number
  top: string
  left?: string
  right?: string
  delay: string
  color: 'blue' | 'green' | 'white'
  speed: 'fast' | 'normal' | 'slow'
}

const DEFAULT_PIXELS: Pixel[] = [
  { size: 8,  top: '10%', left: '5%',   delay: '0s',    color: 'green', speed: 'normal' },
  { size: 12, top: '20%', right: '8%',  delay: '0.5s',  color: 'blue',  speed: 'slow'   },
  { size: 6,  top: '60%', left: '3%',   delay: '1s',    color: 'green', speed: 'fast'   },
  { size: 10, top: '70%', right: '5%',  delay: '1.5s',  color: 'white', speed: 'normal' },
  { size: 14, top: '40%', left: '92%',  delay: '0.8s',  color: 'blue',  speed: 'slow'   },
  { size: 8,  top: '85%', left: '15%',  delay: '0.3s',  color: 'green', speed: 'normal' },
  { size: 6,  top: '30%', left: '88%',  delay: '1.2s',  color: 'white', speed: 'fast'   },
  { size: 10, top: '50%', left: '2%',   delay: '0.7s',  color: 'blue',  speed: 'normal' },
]

const colorMap = {
  blue:  'bg-blue-primary',
  green: 'bg-green-accent',
  white: 'bg-white/30',
}

const speedMap = {
  fast:   'animate-float-fast',
  normal: 'animate-float',
  slow:   'animate-float-slow',
}

export function FloatingPixels({ pixels = DEFAULT_PIXELS }: { pixels?: Pixel[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pixels.map((p, i) => (
        <div
          key={i}
          className={cn('absolute opacity-60', colorMap[p.color], speedMap[p.speed])}
          style={{
            width:  p.size,
            height: p.size,
            top:    p.top,
            left:   p.left,
            right:  p.right,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
