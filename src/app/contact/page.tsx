import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/ui/PageHeader'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Pixl Pluz Academy — call, email, or visit us in Kochi.',
}

const CONTACT_ITEMS = [
  {
    icon: '/icons/map.svg',
    label: 'Address',
    value: 'Pixl Pluz Academy, Kochi, Kerala, India',
  },
  {
    icon: '/icons/phone.svg',
    label: 'Phone',
    value: '+91 98765 43210',
  },
  {
    icon: '/icons/mail.svg',
    label: 'Email',
    value: 'info@pixlpluz.com',
  },
  {
    icon: '/icons/clock.svg',
    label: 'Office Hours',
    value: 'Mon – Sat, 9:00 AM – 6:00 PM',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="Have questions about courses, scholarship, or admissions? We're here to help."
      />

      <section className="relative overflow-hidden bg-white pt-14 dark:bg-navy-950 sm:pt-20">
        {/* Drifting brand pixels — kept near the edges so they never sit under the form */}
        <FloatingPixels pixels={[
          { size: 10, top: '6%',  left: '4%',   delay: '0s',   color: 'green', speed: 'slow'   },
          { size: 6,  top: '14%', right: '6%',  delay: '0.6s', color: 'blue',  speed: 'normal' },
          { size: 8,  top: '28%', left: '2%',   delay: '1.1s', color: 'blue',  speed: 'fast'   },
          { size: 12, top: '38%', right: '3%',  delay: '0.3s', color: 'green', speed: 'slow'   },
          { size: 6,  top: '52%', left: '5%',   delay: '1.5s', color: 'green', speed: 'normal' },
          { size: 8,  top: '64%', right: '7%',  delay: '0.9s', color: 'blue',  speed: 'fast'   },
          { size: 10, top: '78%', left: '3%',   delay: '0.4s', color: 'blue',  speed: 'normal' },
          { size: 6,  top: '88%', right: '4%',  delay: '1.3s', color: 'green', speed: 'slow'   },
          { size: 8,  top: '94%', left: '48%',  delay: '0.7s', color: 'green', speed: 'normal' },
        ]} />

        <div className="site-container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: info */}
            <div data-no-blur-text>
              <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="mb-10 leading-relaxed text-gray-500 dark:text-gray-400">
                Whether you want to enrol, apply for a scholarship, or just want more information,
                reach out and we will get back to you within one business day.
              </p>

              <div className="space-y-5">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-primary/10 pixel-corner-sm dark:bg-green-accent/10">
                      <Image
                        src={item.icon}
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Full-bleed map — edge to edge, flush with footer */}
        <div className="relative z-10 mt-12 h-72 w-full overflow-hidden sm:mt-16 sm:h-96 lg:h-[28rem]">
          <iframe
            title="Pixl Pluz Academy location — Kochi, Kerala"
            src="https://www.google.com/maps?q=Pixl+Pluz+Academy,+Kochi,+Kerala,+India&z=15&hl=en&output=embed"
            className="absolute inset-0 h-full w-full border-0 contrast-[1.05] saturate-[0.85]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Brand green shade */}
          <div
            className="pointer-events-none absolute inset-0 bg-green-accent/25 mix-blend-color"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-green-accent/10 mix-blend-multiply"
            aria-hidden
          />
        </div>
      </section>
    </>
  )
}
