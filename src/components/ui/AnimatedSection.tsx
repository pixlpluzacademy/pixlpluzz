'use client'

import { motion, type Variants } from 'framer-motion'
import { useSiteReady } from '@/components/providers/SiteLoaderProvider'
import { cn } from '@/lib/utils'

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp'

interface Props {
  children: React.ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  className?: string
}

const VARIANTS: Record<Variant, Variants> = {
  fadeUp:     { hidden: { opacity: 0, y: 40 },        visible: { opacity: 1, y: 0 } },
  fadeIn:     { hidden: { opacity: 0 },                visible: { opacity: 1 } },
  slideLeft:  { hidden: { opacity: 0, x: -60 },        visible: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: 60 },         visible: { opacity: 1, x: 0 } },
  scaleUp:    { hidden: { opacity: 0, scale: 0.93 },   visible: { opacity: 1, scale: 1 } },
}

export function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className,
}: Props) {
  const isSiteReady = useSiteReady()

  return (
    <motion.div
      className={cn(className)}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={isSiteReady ? undefined : 'hidden'}
      whileInView={isSiteReady ? 'visible' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      // Pre-promote to GPU compositor layer — prevents paint stutter on reveal
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
