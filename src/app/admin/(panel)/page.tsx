import { createStaffDataClient } from '@/lib/supabase/staff-data'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Enquiry } from '@/lib/supabase/types'

export const metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  let supabase
  try {
    ;({ supabase } = await createStaffDataClient())
  } catch {
    redirect('/admin/login')
  }

  const [
    { count: total },
    { count: newCount },
    { count: homeCount },
    { count: contactCount },
    recent,
    todayRes,
  ] = await Promise.all([
    supabase.from('enquiries').select('id', { count: 'exact', head: true }),
    supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('source', 'home'),
    supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('source', 'contact'),
    supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8),
    (() => {
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      return supabase
        .from('enquiries')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', todayStart.toISOString())
    })(),
  ])

  const rows = (recent.data ?? []) as Enquiry[]
  const todayCount = todayRes.count ?? 0

  const cards = [
    { label: 'Total enquiries', value: total ?? 0 },
    { label: 'New', value: newCount ?? 0 },
    { label: 'Today', value: todayCount },
    { label: 'Home form', value: homeCount ?? 0 },
    { label: 'Contact form', value: contactCount ?? 0 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-black text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">Live enquiry overview from all site forms.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div
            key={c.label}
            className="border border-white/10 bg-[#0c0c0c] px-4 py-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {c.label}
            </p>
            <p className="mt-2 text-3xl font-black text-green-accent">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent student enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="text-sm text-green-accent hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-white/45">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Interest</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                    No enquiries yet. Submit the home or contact form to see data here.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/enquiries/${row.id}`}
                        className="font-medium text-white hover:text-green-accent"
                      >
                        {row.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 capitalize text-white/60">{row.source}</td>
                    <td className="px-4 py-3 text-white/60">{row.interest || '—'}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={row.status} />
                    </td>
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
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === 'new'
      ? 'bg-green-accent/15 text-green-accent'
      : status === 'read'
        ? 'bg-blue-500/15 text-blue-300'
        : 'bg-white/10 text-white/50'
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles}`}>
      {status}
    </span>
  )
}
