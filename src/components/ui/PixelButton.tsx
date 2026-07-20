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
  'inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase text-sm transition-[filter,background-color,color,transform,box-shadow,border-color] duration-200 cursor-pointer select-none'

const variants = {
  primary:
    'btn-glaze btn-primary-fill',
  outline:
    'btn-glaze btn-outline-bright border-2',
  ghost:
    'text-white underline underline-offset-4 hover:text-green-accent',
  green:
    'btn-glaze bg-green-accent text-navy-950 hover:brightness-110 shadow-[0_0_0_1px_rgba(84,227,70,0.5),0_8px_22px_rgba(84,227,70,0.25)]',
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
  const content = <span className="relative z-1 inline-flex items-center gap-2">{children}</span>

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  )
}
