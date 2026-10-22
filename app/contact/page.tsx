import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact & Feedback',
  description:
    'Get in touch with Deborah Aid to report directory updates, follow up on provider verification, or discuss legal aid partnerships in Kenya.',
}

const WHATSAPP_URL =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function ContactPage() {
  return (
    <div className="w-full bg-[#f8fcff] py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
            Contact &amp; Feedback
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
            Reach the Deborah Aid Directory Desk
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#57667e]">
            Have a question about using the directory, want to report an inaccurate listing, or looking to partner with us across Kenya? Send a note below or reach us on WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="overflow-hidden rounded-xl border border-[#eceff8] bg-white shadow-xs">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/nairobi-cityscape.jpg"
                  alt="Aerial view of Nairobi city skyline in Kenya"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <h2 className="text-base font-bold text-[#072366]">Coordination Desk</h2>
                    <p className="text-sm text-[#57667e]">
                      Upper Hill Legal Innovation Hub, Nairobi County, Kenya (Serving all 47 Counties)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-base font-bold text-[#072366]">WhatsApp Help Desk</h2>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center text-base font-bold text-[#072366] underline decoration-[#09cc7f] underline-offset-4 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      +254 112 272 061
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <h2 className="text-base font-bold text-[#072366]">Email</h2>
                    <a
                      href="mailto:hello@deborahaid.org"
                      className="inline-flex min-h-[44px] items-center text-base font-bold text-[#072366] underline decoration-[#09cc7f] underline-offset-4 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      hello@deborahaid.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#072366] p-6 text-white">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                24/7 Emergency Helplines
              </h2>
              <p className="mt-1 text-sm text-white/85">
                If someone is in immediate danger, please call directly free of charge:
              </p>
              <div className="mt-4 space-y-2.5">
                <a
                  href="tel:0800720090"
                  className="flex min-h-[48px] items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xl sm:text-2xl font-bold text-white hover:bg-[#09cc7f]/25 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  <PhoneCall className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
                  GVRC: 0800 720 090
                </a>
                <a
                  href="tel:116"
                  className="flex min-h-[48px] items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xl sm:text-2xl font-bold text-white hover:bg-[#09cc7f]/25 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  <PhoneCall className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
                  Childline Kenya: 116
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
