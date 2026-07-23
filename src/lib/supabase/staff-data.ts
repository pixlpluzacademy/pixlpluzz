import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentProfile } from '@/lib/supabase/auth'
import type { Profile } from '@/lib/supabase/types'

/**
 * After verifying an active staff/admin session, return the secret-key client.
 * Admin panel reads/writes go through this so data is always live (no RLS gaps).
 */
export async function createStaffDataClient(): Promise<{
  profile: Profile
  supabase: ReturnType<typeof createAdminClient>
}> {
  const profile = await getCurrentProfile()
  if (!profile || !profile.is_active) {
    throw new Error('UNAUTHORIZED')
  }
  return { profile, supabase: createAdminClient() }
}
