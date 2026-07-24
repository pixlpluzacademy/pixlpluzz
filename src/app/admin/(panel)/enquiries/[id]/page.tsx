import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createStaffDataClient } from '@/lib/supabase/staff-data'
import { EnquiryStatusForm } from '@/components/admin/EnquiryStatusForm'
import type { Enquiry } from '@/lib/supabase/types'

export const metadata = { title: 'Enquiry detail' }
export const dynamic = 'force-dynamic'

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let supabase
  try {
    ;({ supabase } = await createStaffDataClient())
  } catch {
    redirect('/admin/login')
  }

  const { data } = await supabase.from('enquiries').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const enquiry = data as Enquiry

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/enquiries" className="text-sm text-white/45 hover:text-green-accent">
        ← Back to enquiries
      </Link>

      <h1 className="mt-4 text-2xl font-black text-white">{enquiry.full_name}</h1>
      <p className="mt-1 text-sm text-white/45">
        {enquiry.source} · {new Date(enquiry.created_at).toLocaleString()}
      </p>

      <dl className="mt-8 space-y-4 border border-white/10 bg-[#0c0c0c] p-6 text-sm">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">Email</dt>
          <dd className="mt-1 text-white">
            <a href={`mailto:${enquiry.email}`} className="hover:text-green-accent">
              {enquiry.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">Phone</dt>
          <dd className="mt-1 text-white">
            <a href={`tel:${enquiry.phone}`} className="hover:text-green-accent">
              {enquiry.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">City</dt>
          <dd className="mt-1 text-white">{enquiry.city || '—'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">Interest</dt>
          <dd className="mt-1 text-white">{enquiry.interest || '—'}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">Message</dt>
          <dd className="mt-1 whitespace-pre-wrap text-white/80">{enquiry.message || '—'}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <EnquiryStatusForm id={enquiry.id} status={enquiry.status} />
      </div>
    </div>
  )
}
