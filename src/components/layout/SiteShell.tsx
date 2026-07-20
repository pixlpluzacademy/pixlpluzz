'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { BlurTextProvider } from '@/components/providers/BlurTextProvider'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <BlurTextProvider />
      <Navbar />
      <main className="pt-[4.5rem] has-[[data-page-hero]]:pt-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
