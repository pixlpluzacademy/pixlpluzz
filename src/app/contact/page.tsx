import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FloatingPixels } from '@/components/ui/FloatingPixels'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Pixl Pluz Academy — call, email, or visit us in Kochi.',
}

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Pixl Pluz Academy, Kochi, Kerala, India',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@pixlpluz.com',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon – Sat, 9:00 AM – 6:00 PM',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Contact"
        title="Get in Touch"
        subtitle="Have questions about courses, scholarship, or admissions? We're here to help."
        noise
      />

      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-14 sm:py-20 px-4">
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

        <div className="relative z-10 mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: info */}
          <div data-no-blur-text>
            <SectionLabel className="mb-4">Contact Information</SectionLabel>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              We&apos;d love to hear from you.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              Whether you want to enrol, apply for a scholarship, or just want more information,
              reach out and we will get back to you within one business day.
            </p>

            <div className="space-y-5">
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-primary/10 dark:bg-green-accent/10 flex items-center justify-center pixel-corner-sm shrink-0">
                    <item.icon size={18} className="text-blue-primary dark:text-green-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 h-56 bg-gray-100 dark:bg-navy-800 pixel-corner flex items-center justify-center text-gray-400 dark:text-gray-600">
              <div className="text-center">
                <MapPin size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Map coming soon</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
