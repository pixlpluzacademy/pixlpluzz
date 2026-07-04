'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PixelButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost' | 'green'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase text-sm transition-all duration-200 cursor-pointer select-none'

const variants = {
  primary:
    'bg-blue-primary text-white hover:brightness-110 active:scale-95',
  outline:
    'bg-white/10 text-white hover:bg-blue-primary hover:text-white',
  ghost:
    'text-white underline underline-offset-4 hover:text-green-accent',
  green:
    'bg-green-accent text-navy-900 hover:brightness-110 active:scale-95',
}

const sizes = {
  sm:  'px-4 py-2 text-xs',
  md:  'px-6 py-3 text-sm',
  lg:  'px-8 py-4 text-base',
}

export function PixelButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
}: PixelButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
