import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, MessageCircle, PhoneCall } from 'lucide-react'

export const metadata: Metadata = {
  title: '500 Server Error',
}

const WHATSAPP_SUPPORT_URL =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function Custom500Page() {
  return (
    <section className="w-full bg-[#f8fcff] py-20 sm:py-28">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-[#eceff8] bg-white p-8 sm:p-12 shadow-xs">
          <span className="inline-block rounded-full bg-[#e6faf2] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#072366]">
            500 Service Interruption
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
            Temporary Server Interruption
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#57667e]">
            We are working to restore this page quickly. If you need help finding free legal assistance right now, message us directly on WhatsApp or call Kenya&apos;s toll-free emergency lines below.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp +254 112 272 061
            </a>

            <Link
              href="/"
              className="boxed-btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Return to Home
            </Link>
          </div>

          <div className="mt-8 border-t border-[#eceff8] pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-bold text-[#072366]">
            <a
              href="tel:0800720090"
              className="inline-flex min-h-[44px] items-center gap-2 underline decoration-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <PhoneCall className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
              GVRC Toll-Free: 0800 720 090
            </a>
            <a
              href="tel:116"
              className="inline-flex min-h-[44px] items-center gap-2 underline decoration-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <PhoneCall className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
              Childline Kenya: 116
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
