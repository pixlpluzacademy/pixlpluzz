import { createClient } from '@supabase/supabase-js'

/** Academy software Supabase — server only. Form values → admission_enquiry. */
export function createAcademyClient() {
  const url = process.env.ACADEMY_API_URL
  const key = process.env.ACADEMY_SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing ACADEMY_API_URL or ACADEMY_SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
