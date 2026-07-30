import type { Metadata } from 'next'
import { Caveat, Red_Hat_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider }  from '@/components/ThemeProvider'
import { SiteShell }      from '@/components/layout/SiteShell'
import { SiteLoaderProvider } from '@/components/providers/SiteLoaderProvider'
import { LenisProvider }  from '@/components/providers/LenisProvider'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-red-hat',
  display: 'swap',
})

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
    icon: [
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${redHatDisplay.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <LenisProvider>
          <ThemeProvider>
            <SiteLoaderProvider>
              <SiteShell>{children}</SiteShell>
            </SiteLoaderProvider>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
