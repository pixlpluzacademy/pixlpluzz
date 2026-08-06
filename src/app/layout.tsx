import type { Metadata } from 'next'
import { Caveat, Red_Hat_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider }  from '@/components/ThemeProvider'
import { SiteShell }      from '@/components/layout/SiteShell'
import { SiteLoaderProvider } from '@/components/providers/SiteLoaderProvider'
import { LenisProvider }  from '@/components/providers/LenisProvider'
import { JsonLd } from '@/components/seo/JsonLd'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site'
import { globalSchemas } from '@/lib/schema'

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

const defaultTitle = 'Pixl Pluz Academy | AI Integrated Courses in Kochi'
const defaultDescription =
  "Kerala's AI-integrated digital marketing and tech academy in Kochi. Practical courses, mentorship, and a merit-based scholarship program."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: '%s | Pixl Pluz Academy',
  },
  description: defaultDescription,
  keywords: [
    'digital marketing course kochi',
    'AI integrated courses kerala',
    'scholarship based courses',
    'pixl pluz academy',
    'web development course kochi',
  ],
  // Relative './' resolves against metadataBase per route (Next Metadata API).
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Pixl Pluz Academy',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Pixl Pluz Academy campus in Kochi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
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
        <JsonLd data={globalSchemas()} />
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
