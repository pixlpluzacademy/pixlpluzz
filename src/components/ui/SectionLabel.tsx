import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest',
        light
          ? 'bg-white/10 text-white backdrop-blur-sm'
          : 'bg-blue-primary/10 text-blue-primary dark:bg-green-accent/15 dark:text-green-accent',
        className
      )}
    >
      <Pencil size={10} />
      {children}
    </div>
  )
}
