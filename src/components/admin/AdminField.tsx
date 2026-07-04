export const ADMIN_INPUT =
  'w-full px-4 py-2.5 bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-primary dark:focus:border-green-accent pixel-corner-sm text-sm'

export function AdminField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {hint && <p className="mb-2 text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  )
}

export function AdminFormError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
      {message}
    </div>
  )
}
