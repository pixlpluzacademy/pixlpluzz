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
        'inline-flex w-fit max-w-full items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest',
        'bg-blue-primary/10 text-blue-primary dark:bg-white/10 dark:text-white',
        className
      )}
    >
      <Pencil size={10} />
      {children}
    </div>
  )
}
