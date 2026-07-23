import Image from 'next/image'
import Link from 'next/link'
import { PixlLogo } from '@/components/ui/PixlLogo'
import { SOCIAL_LINKS, type SocialIconName } from '@/lib/social'

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === 'facebook') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    )
  }
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
  { label: 'Scholarship', href: '/scholarship' },
  { label: 'Placements',  href: '/placement' },
]

const COURSES = [
  { label: 'AI Digital Marketing', href: '/courses/digital-marketing-course' },
  { label: 'AI Web Development', href: '/courses/ai-powered-web-development-course' },
  { label: 'AI Data Science', href: '/courses/data-science-ai-course' },
  { label: 'AI Cybersecurity', href: '/courses/cyber-security-course-with-ai' },
]

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="site-container py-12 sm:py-16">
        {/* Brand column gets more room; link columns share the rest evenly so
            the visual gutters between all four columns look consistent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 text-center sm:text-left">

          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="/" className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <PixlLogo variant="white" className="h-[46px] w-[120px]" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              PixlPluz Academy is a Kochi based digital marketing training institute built for practical skills,
              creative learning, AI-powered workflows, and career-focused training.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              {SOCIAL_LINKS.map(profile => (
                <a
                  key={profile.label}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.label}
                  className="p-2 border border-white/10 text-gray-400 hover:border-green-accent hover:text-green-accent transition-colors pixel-corner-sm"
                >
                  <SocialIcon name={profile.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-green-accent mb-4">
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

          {/* Courses */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-green-accent mb-4">
              Courses
            </h4>
            <ul className="space-y-2">
              {COURSES.map(l => (
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
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Image
                  src="/icons/phone.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden
                />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Call us directly</p>
                  <a href="tel:+917736060370" className="text-sm font-semibold text-white hover:text-green-accent transition-colors">
                    ( +91 ) 77360 60370
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Image
                  src="/icons/mail.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden
                />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Mail us directly</p>
                  <a href="mailto:office@pixlpluz.com" className="text-sm font-semibold text-white hover:text-green-accent transition-colors">
                    office@pixlpluz.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Image
                  src="/icons/map.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden
                />
                <div className="text-left">
                  <p className="text-xs text-gray-500">Our location</p>
                  <p className="text-sm text-white">Kochi, Kerala, India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="site-container flex flex-col items-center justify-center gap-2 py-4 sm:flex-row">
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
