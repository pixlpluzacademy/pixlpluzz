import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider }  from '@/components/ThemeProvider'
import { SiteShell }      from '@/components/layout/SiteShell'
import { SiteLoaderProvider } from '@/components/providers/SiteLoaderProvider'
import { SiteLoader }     from '@/components/layout/SiteLoader'
import { LenisProvider }  from '@/components/providers/LenisProvider'

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Red Hat Display will be loaded from /public/fonts once added */}
        <style>{`
          @font-face {
            font-family: 'Red Hat Display';
            src: url('/fonts/RedHatDisplay-VariableFont_wght.ttf') format('truetype');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
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
