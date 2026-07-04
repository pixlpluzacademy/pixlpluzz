import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { PixlLogo } from '@/components/ui/PixlLogo'

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const QUICK_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About Us',    href: '/about' },
  { label: 'Careers',     href: '/career' },
  { label: 'Instructors', href: '/about#team' },
  { label: 'FAQ',         href: '/#faq' },
]

const SERVICES = [
  { label: 'Courses',    href: '/courses' },
  { label: 'Scholarship',href: '/scholarship' },
  { label: 'Placement',  href: '/placement' },
  { label: 'Event',      href: '/event' },
  { label: 'Services',   href: '/services' },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PixlLogo variant="white" className="h-[46px] w-[120px]" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              PixlPluz Academy is a Kochi based digital marketing training institute built for practical skills,
              creative learning, AI-powered workflows, and career-focused training.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="p-2 border border-white/10 text-gray-400 hover:border-green-accent hover:text-green-accent transition-colors pixel-corner-sm">
                <IconFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="p-2 border border-white/10 text-gray-400 hover:border-green-accent hover:text-green-accent transition-colors pixel-corner-sm">
                <IconInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="p-2 border border-white/10 text-gray-400 hover:border-green-accent hover:text-green-accent transition-colors pixel-corner-sm">
                <IconLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Need Help?
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 text-green-accent shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Call us directly</p>
                  <a href="tel:+919999900000" className="text-sm font-semibold text-white hover:text-green-accent transition-colors">
                    (+91) XXXXX-XXXXX
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 text-green-accent shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Mail us directly</p>
                  <a href="mailto:info@pixlpluz.com" className="text-sm font-semibold text-white hover:text-green-accent transition-colors">
                    info@pixlpluz.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-green-accent shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Our location</p>
                  <p className="text-sm text-white">Kochi, Kerala, India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-xs text-gray-600">Pixlpluz &copy; {new Date().getFullYear()}</p>
          {/* <p className="text-xs text-gray-600">
            Built by{' '}
            <a href="https://latheifproductions.com" className="text-green-accent hover:underline">
              Latheif Productions
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  )
}
