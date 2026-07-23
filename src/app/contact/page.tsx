import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/contact/ContactForm'
import { PixelTrail } from '@/components/ui/PixelTrail'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { SOCIAL_LINKS, type SocialIconName } from '@/lib/social'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Pixl Pluz Academy — call, email, or visit us in Kochi.',
}

const CONTACT_CARDS = [
  {
    icon: '/icons/phone.svg',
    label: 'Phone Number',
    value: '+91 77360 60370',
    href: 'tel:+917736060370',
  },
  {
    icon: '/icons/mail.svg',
    label: 'Email Address',
    value: 'office@pixlpluz.com',
    href: 'mailto:office@pixlpluz.com',
  },
  {
    icon: '/icons/map.svg',
    label: 'Location',
    value: 'Pixl Pluz Academy, Kochi, Kerala',
  },
] as const

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === 'facebook') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <div className="bg-black text-white" data-no-blur-text>
      {/* Hero — background image */}
      <section
        className="relative flex min-h-[clamp(18rem,48svh,28rem)] items-end overflow-hidden pb-12 pt-28 sm:pb-14 sm:pt-32"
        data-page-hero
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/background.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/85" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(20, 61, 143, 0.28) 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="site-container relative z-10 text-center">
          <h1 className="font-black uppercase tracking-tight text-[clamp(2.5rem,8vw,4.5rem)]">
            <span className="text-green-accent">Contact</span>{' '}
            <span className="text-white">Us</span>
          </h1>
        </div>
      </section>

      {/* Form + details */}
      <section className="relative overflow-x-clip bg-[#0a0a0a] py-[clamp(64px,6vw,96px)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 20% 20%, rgba(20, 61, 143, 0.12) 0%, transparent 55%)',
          }}
          aria-hidden
        />

        <div className="site-container relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
            {/* Left — form card */}
            <div className="border border-white/10 bg-[#141414] p-6 sm:p-8 lg:h-full lg:p-9">
              <h2 className="relative mb-10 w-full text-center font-black uppercase leading-[1.05] tracking-tight">
                <PixelTrail />
                <span className="mb-[0.18em] block text-[clamp(1.75rem,5.5vw,3.5rem)] text-white">
                  Connect With
                </span>
                <span className="block whitespace-nowrap text-[clamp(1.75rem,5.5vw,3.5rem)]">
                  <span className="text-green-accent">Pixl</span>{' '}
                  <span
                    className="career-outline-word"
                    style={{ WebkitTextStroke: '2px #54e345' }}
                  >
                    Pluz
                  </span>
                </span>
              </h2>
              <ContactForm />
            </div>

            {/* Right — intro, contact grid, map */}
            <div className="flex min-w-0 flex-col gap-8 lg:h-full">
              <p className="m-0 text-justify text-base leading-relaxed text-gray-400 sm:text-[1.05rem]">
                Whether you want to enrol, apply for a scholarship, or just want more information,
                reach out and we will get back to you within one business day.<br></br> Office hours:
                Mon – Sat, 9:00 AM – 6:00 PM.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
                {CONTACT_CARDS.map(item => {
                  const content = (
                    <>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center border border-white/15 bg-black/40">
                        <Image
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      </div>
                      <p className="mb-1 text-sm font-black tracking-tight text-white transition-colors group-hover:text-green-accent">
                        {item.label}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-400">{item.value}</p>
                    </>
                  )

                  if ('href' in item && item.href) {
                    return (
                      <a key={item.label} href={item.href} className="group block min-w-0">
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div key={item.label} className="block min-w-0">
                      {content}
                    </div>
                  )
                })}
              </div>

              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-green-accent">
                  Our Social Profiles
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map(profile => (
                    <a
                      key={profile.label}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.label}
                      className="inline-flex items-center gap-2 border border-white/15 bg-black/40 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-green-accent hover:text-green-accent"
                    >
                      <SocialIcon name={profile.icon} />
                      {profile.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative mt-2 min-h-56 w-full flex-1 overflow-hidden border border-white/10 sm:min-h-64 lg:min-h-[22rem]">
                <iframe
                  title="Pixl Pluz Academy location — Kochi, Kerala"
                  src="https://www.google.com/maps?q=Pixl+Pluz+Academy,+Kochi,+Kerala,+India&z=15&hl=en&output=embed"
                  className="absolute inset-0 h-full w-full border-0 contrast-[1.05] saturate-[0.85]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-green-accent/20 mix-blend-color"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — office image + WhatsApp consultation */}
      <section className="relative overflow-hidden py-[clamp(72px,8vw,120px)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/images/office/pixl-pluz-academy-reception.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/72" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20, 61, 143, 0.22) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="site-container relative z-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-green-accent">
            Talk To Us
          </p>
          <h2 className="mx-auto mb-8 max-w-3xl font-black uppercase leading-[1.1] tracking-tight text-[clamp(1.75rem,5vw,3.25rem)] text-white">
            Free Consultation Through WhatsApp
          </h2>
          <Link
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glaze btn-cta-green inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-widest pixel-corner-sm"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </section>
    </div>
  )
}
