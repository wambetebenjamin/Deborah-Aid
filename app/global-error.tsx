'use client'

import Link from 'next/link'

const WHATSAPP_SUPPORT_URL =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fcff] text-[#10285d] flex items-center justify-center p-4">
        <div className="max-w-xl w-full rounded-2xl border border-[#eceff8] bg-white p-8 text-center shadow-sm">
          <span className="inline-block rounded-full bg-[#e6faf2] px-4 py-1 text-xs font-extrabold uppercase text-[#072366]">
            500 System Error
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#002d5b]">
            Deborah Aid Encountered a Temporary Error
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#57667e]">
            Please retry or contact us directly on WhatsApp (+254 112 272 061) if you urgently need legal directory assistance.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="min-h-[48px] min-w-[44px] rounded-md bg-[#09cc7f] px-6 py-3 text-base font-bold text-white"
            >
              Try Again
            </button>
            <a
              href={WHATSAPP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] min-w-[44px] rounded-md border border-[#09cc7f] px-6 py-3 text-base font-bold text-[#072366]"
            >
              WhatsApp +254 112 272 061
            </a>
            <Link
              href="/"
              className="min-h-[48px] min-w-[44px] rounded-md border border-[#d6deee] px-6 py-3 text-base font-bold text-[#072366]"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
