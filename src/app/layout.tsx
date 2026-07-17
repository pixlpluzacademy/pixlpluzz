import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import './globals.css'
import { ThemeProvider }  from '@/components/ThemeProvider'
import { SiteShell }      from '@/components/layout/SiteShell'
import { SiteLoaderProvider } from '@/components/providers/SiteLoaderProvider'
import { SiteLoader }     from '@/components/layout/SiteLoader'
import { LenisProvider }  from '@/components/providers/LenisProvider'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pixl Pluz Academy | AI Integrated Courses in Kochi',
    template: '%s | Pixl Pluz Academy',
  },
  description:
    "Kerala's best AI-integrated digital marketing academy. ₹50 Lakh scholarship fund. Courses in Kochi, Thiruvananthapuram, and Calicut.",
  keywords: [
    'digital marketing course kochi',
    'AI integrated courses kerala',
    'scholarship based courses',
    'pixl pluz academy',
    'web development course kochi',
  ],
  icons: {
    icon: '/logo-icon.svg',
    shortcut: '/logo-icon.svg',
    apple: '/logo-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-display antialiased">
        <LenisProvider>
          <ThemeProvider>
            <SiteLoaderProvider>
              <SiteLoader />
              <SiteShell>{children}</SiteShell>
            </SiteLoaderProvider>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
