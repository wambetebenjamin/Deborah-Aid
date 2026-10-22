'use client'

import Link from 'next/link'
import { Globe, MessageCircle, PhoneCall, Scale, Share2 } from 'lucide-react'

const WHATSAPP_URL =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function Footer() {
  const openCookieModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-cookie-preferences'))
    }
  }

  return (
    <footer className="footer-wrapper-charity text-white">
      <div className="w-full max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-[#09cc7f]">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Deborah Aid<span className="text-[#09cc7f]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#a8b2c1] sm:text-base">
              Justice is for everyone. Free public directory connecting low-income Kenyans with verified pro bono lawyers, legal clinics, and community paralegals across all 47 counties.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Deborah Aid"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.lsk.or.ke"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Law Society of Kenya resource link"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                aria-label="Share feedback with Deborah Aid"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 2: Directory & Help */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Directory Links</h3>
            <ul className="mt-5 space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/find-help"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Find Legal Help
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Know Your Rights Library
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-provider"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Submit a Legal Provider
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  About Deborah Aid
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Contact &amp; Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & KDPA Compliance */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Legal &amp; Privacy</h3>
            <ul className="mt-5 space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Privacy Policy (KDPA 2019)
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Terms of Use &amp; Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookie-policy"
                  className="inline-flex min-h-[44px] items-center text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookieModal}
                  className="inline-flex min-h-[44px] items-center text-left text-[#a8b2c1] transition hover:pl-1 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Manage Cookie Preferences
                </button>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-[#09cc7f] font-semibold transition hover:pl-1 hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  WhatsApp: +254 112 272 061
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Emergency Helplines Reminder (visible on all breakpoints at text-xl+) */}
          <div className="rounded-xl border border-white/15 bg-white/5 p-5">
            <h3 className="text-lg sm:text-xl font-bold text-white">Emergency Helplines</h3>
            <p className="mt-2 text-sm text-[#a8b2c1]">
              Free 24-hour crisis support across Kenya:
            </p>
            <div className="mt-4 space-y-3">
              <a
                href="tel:0800720090"
                className="block min-h-[48px] rounded-lg bg-white/10 px-3.5 py-2.5 transition hover:bg-[#09cc7f]/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <span className="block text-xs uppercase tracking-wide text-[#a8b2c1]">
                  Gender Violence Recovery Centre
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
                  <PhoneCall className="h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  0800 720 090
                </span>
              </a>

              <a
                href="tel:116"
                className="block min-h-[48px] rounded-lg bg-white/10 px-3.5 py-2.5 transition hover:bg-[#09cc7f]/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <span className="block text-xs uppercase tracking-wide text-[#a8b2c1]">
                  Childline Kenya Helpline
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
                  <PhoneCall className="h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  116
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 border-t border-[#2d3544] pt-6 text-sm text-[#868c98] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-white">Deborah Aid</strong>. Justice is for everyone. Deborah Aid is a free legal directory and does not provide legal advice.
          </p>
          <p className="text-xs text-[#868c98]">
            Aligned with the Constitution of Kenya 2010 &amp; Kenya Data Protection Act 2019.
          </p>
        </div>
      </div>
    </footer>
  )
}
