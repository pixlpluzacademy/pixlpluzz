import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest',
        'bg-blue-primary/10 text-blue-primary dark:bg-green-accent/15 dark:text-green-accent',
        className
      )}
    >
      <Pencil size={10} />
      {children}
    </div>
  )
}
