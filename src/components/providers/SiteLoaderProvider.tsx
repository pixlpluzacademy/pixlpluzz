'use client'

import { createContext, useContext, useMemo, useState } from 'react'

type SiteLoaderContextValue = {
  isSiteReady: boolean
  setSiteReady: (ready: boolean) => void
}

const SiteLoaderContext = createContext<SiteLoaderContextValue | null>(null)

export function SiteLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isSiteReady, setSiteReady] = useState(false)

  const value = useMemo(
    () => ({ isSiteReady, setSiteReady }),
    [isSiteReady],
  )

  return (
    <SiteLoaderContext.Provider value={value}>
      {children}
    </SiteLoaderContext.Provider>
  )
}

export function useSiteReady() {
  const ctx = useContext(SiteLoaderContext)
  if (!ctx) {
    throw new Error('useSiteReady must be used within SiteLoaderProvider')
  }
  return ctx.isSiteReady
}

export function useSiteLoaderControl() {
  const ctx = useContext(SiteLoaderContext)
  if (!ctx) {
    throw new Error('useSiteLoaderControl must be used within SiteLoaderProvider')
  }
  return ctx
}
