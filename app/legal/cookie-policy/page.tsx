import type { Metadata } from 'next'
import CookiePreferencesReset from '@/components/CookiePreferencesReset'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How Deborah Aid uses strictly necessary storage and optional anonymous analytics cookies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-[#f8fcff] py-12 sm:py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-10 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#069c60]">
              Transparency &amp; Choice
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#002d5b]">
              Cookie Policy
            </h1>
            <p className="mt-2 text-sm text-[#687693]">
              Effective Date: October 2026
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              1. Strictly Essential Local Storage &amp; Security
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Deborah Aid stores a single preference entry (`deborah-aid-cookie-consent`) in your browser local storage to remember whether you selected <strong>Accept</strong> or <strong>Decline</strong> on our cookie banner. When you submit a form, Google reCAPTCHA sets strictly necessary anti-abuse security cookies to protect legal aid clinics from automated spam.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              2. Optional Anonymous Service Analytics
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Only if you explicitly click <strong>Accept</strong> on our banner do we activate privacy-friendly aggregate page analytics (Vercel Analytics and optional Google Analytics 4) to understand which counties and legal topics need more pro bono clinics. If you click <strong>Decline</strong> or take no action, zero analytics scripts are loaded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              3. Update Your Choice Anytime
            </h2>
            <CookiePreferencesReset />
          </section>
        </article>
      </div>
    </div>
  )
}
