'use client'

import type { ReactNode } from 'react'

/** Kept as a no-op wrapper so existing imports keep working. */
export function SiteLoaderProvider({ children }: { children: ReactNode }) {
  return children
}

/** Site loader removed — animations can start immediately. */
export function useSiteReady() {
  return true
}

/** @deprecated Site loader removed */
export function useSiteLoaderControl() {
  return {
    isSiteReady: true,
    setSiteReady: (_ready: boolean) => {},
  }
}
