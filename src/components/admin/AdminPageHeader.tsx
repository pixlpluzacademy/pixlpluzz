import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  description?: string
  backHref: string
  backLabel?: string
  viewHref?: string
  viewLabel?: string
}

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = 'Back',
  viewHref,
  viewLabel = 'View on site',
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <Link
        href={backHref}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-primary dark:hover:text-green-accent"
      >
        <ArrowLeft size={14} />
        {backLabel}
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        {viewHref && (
          <Link
            href={viewHref}
            target="_blank"
            className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-colors pixel-corner-sm hover:border-blue-primary hover:text-blue-primary dark:border-white/10 dark:text-gray-300 dark:hover:border-green-accent dark:hover:text-green-accent"
          >
            {viewLabel}
            <ExternalLink size={12} />
          </Link>
        )}
      </div>
    </div>
  )
}
