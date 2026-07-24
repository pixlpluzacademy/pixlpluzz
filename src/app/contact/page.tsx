import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/contact/ContactForm'
import { PixelTrail } from '@/components/ui/PixelTrail'
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
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#1877F2"
          d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.56-4.7 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.97.93-1.97 1.89v2.26h3.35l-.54 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07"
        />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <path
          fill="url(#ig-grad)"
          d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
        />
      </svg>
    )
  }
  if (name === 'youtube') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#FF0000"
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8z"
        />
        <path fill="#fff" d="M9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"
      />
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
          <div className="absolute inset-0 bg-black/65" />
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
              <h2 className="relative mb-8 w-full text-center font-black uppercase leading-[1.1] tracking-tight text-[clamp(1.15rem,3.2vw,1.85rem)]">
                <PixelTrail />
                <span className="whitespace-nowrap text-white">Connect With </span>
                <span className="whitespace-nowrap">
                  <span className="text-green-accent">Pixl</span>{' '}
                  <span
                    className="career-outline-word"
                    style={{ WebkitTextStroke: '1.5px #54e345' }}
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
                      className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black/40 transition-colors hover:border-white/35 hover:bg-black/60"
                    >
                      <SocialIcon name={profile.icon} />
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
            Free Consultation
          </h2>
          <Link
            href="/whatsapp"
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
