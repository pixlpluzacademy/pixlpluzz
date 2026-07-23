import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createStaffDataClient } from '@/lib/supabase/staff-data'
import type { Enquiry, EnquirySource, EnquiryStatus } from '@/lib/supabase/types'

export const metadata = { title: 'Enquiries' }
export const dynamic = 'force-dynamic'

type Search = { source?: string; status?: string; q?: string }

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const params = await searchParams
  let supabase
  try {
    ;({ supabase } = await createStaffDataClient())
  } catch {
    redirect('/admin/login')
  }

  let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false })

  if (params.source === 'home' || params.source === 'contact') {
    query = query.eq('source', params.source as EnquirySource)
  }
  if (params.status === 'new' || params.status === 'read' || params.status === 'closed') {
    query = query.eq('status', params.status as EnquiryStatus)
  }
  if (params.q?.trim()) {
    const q = params.q.trim().replace(/[%_,]/g, '')
    if (q) {
      query = query.or(
        `full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,interest.ilike.%${q}%`,
      )
    }
  }

  const { data, error } = await query.limit(200)
  const rows = (data ?? []) as Enquiry[]

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Student enquiries</h1>
      <p className="mt-1 text-sm text-white/50">
        Live submissions from the homepage and contact forms.
      </p>
      {error && (
        <p className="mt-3 text-sm text-red-400">Could not load enquiries: {error.message}</p>
      )}

      <form className="mt-6 flex flex-wrap items-end gap-3" method="get">
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
            Search
          </label>
          <input
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Name, email, phone…"
            className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
            Source
          </label>
          <select
            name="source"
            defaultValue={params.source ?? ''}
            className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
          >
            <option value="">All</option>
            <option value="home">Home</option>
            <option value="contact">Contact</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/40">
            Status
          </label>
          <select
            name="status"
            defaultValue={params.status ?? ''}
            className="border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-green-accent"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button
          type="submit"
          className="border border-green-accent/40 bg-green-accent/10 px-4 py-2 text-sm font-bold text-green-accent"
        >
          Filter
        </button>
        <Link href="/admin/enquiries" className="px-3 py-2 text-sm text-white/45 hover:text-white">
          Reset
        </Link>
      </form>

      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-white/45">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Interest</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-white/40">
                  No matching enquiries.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/enquiries/${row.id}`}
                      className="font-medium text-white hover:text-green-accent"
                    >
                      {row.full_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-white/60">{row.email}</td>
                  <td className="px-4 py-3 text-white/60">{row.phone}</td>
                  <td className="px-4 py-3 capitalize text-white/60">{row.source}</td>
                  <td className="px-4 py-3 text-white/60">{row.interest || '—'}</td>
                  <td className="px-4 py-3 capitalize text-white/70">{row.status}</td>
                  <td className="px-4 py-3 text-white/45">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
