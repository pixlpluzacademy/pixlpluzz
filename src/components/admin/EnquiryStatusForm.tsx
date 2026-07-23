'use client'

import { useTransition } from 'react'
import { updateEnquiryStatus } from '@/app/admin/actions'
import type { EnquiryStatus } from '@/lib/supabase/types'

export function EnquiryStatusForm({
  id,
  status,
}: {
  id: string
  status: EnquiryStatus
}) {
  const [pending, start] = useTransition()

  return (
    <form
      className="flex flex-wrap items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const next = fd.get('status') as EnquiryStatus
        start(async () => {
          await updateEnquiryStatus(id, next)
        })
      }}
    >
      <label className="text-[10px] font-bold uppercase tracking-wider text-white/40">
        Status
      </label>
      <select
        name="status"
        defaultValue={status}
        className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
      >
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="closed">Closed</option>
      </select>
      <button
        type="submit"
        disabled={pending}
        className="border border-green-accent/40 bg-green-accent/10 px-4 py-2 text-sm font-bold text-green-accent disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Update'}
      </button>
    </form>
  )
}
