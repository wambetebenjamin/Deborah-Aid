'use client'

import Link from 'next/link'
import { Home, MessageCircle, RefreshCw } from 'lucide-react'

const WHATSAPP_SUPPORT_URL =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="w-full bg-[#f8fcff] py-20 sm:py-28">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-[#eceff8] bg-white p-8 sm:p-12 shadow-xs">
          <span className="inline-block rounded-full bg-[#e6faf2] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#072366]">
            500 Unexpected Error
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#002d5b]">
            Something Interrupted Your Request
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#57667e]">
            Please try loading the page again, return to the home directory, or message our support desk directly on WhatsApp at +254 112 272 061 for immediate assistance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </button>

            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="boxed-btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <MessageCircle className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
              WhatsApp +254 112 272 061
            </a>

            <Link
              href="/"
              className="inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#d6deee] px-6 py-3 text-base font-bold text-[#072366] hover:border-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
