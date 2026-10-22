import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Deborah Aid public legal aid directory and Know Your Rights library in Kenya.',
}

export default function TermsPage() {
  return (
    <div className="w-full bg-[#f8fcff] py-12 sm:py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-10 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#069c60]">
              Public Directory Terms
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#002d5b]">
              Terms of Use
            </h1>
            <p className="mt-2 text-sm text-[#687693]">
              Last Updated: October 2026 | Governing Law: Laws of the Republic of Kenya
            </p>
          </div>

          <section className="rounded-lg border-2 border-[#072366]/20 bg-[#f8fcff] p-5">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#072366]">
              Important Legal Status Notice: Not a Law Firm
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#10285d]">
              <strong>Deborah Aid is a free public directory service, not a law firm, and does not provide legal advice or legal representation.</strong> Browsing this website, downloading or copying letter templates, reading Know Your Rights guides, or submitting a callback form does not create an advocate-client relationship between you and Deborah Aid.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              1. Purpose of Know Your Rights Materials
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              All guides, checklists, FAQs, statutory citations, and letter templates on Deborah Aid are published strictly for general public legal awareness in plain English and Kiswahili. Because court rules, filing deadlines, and facts differ in every case, always consult a qualified Advocate of the High Court of Kenya or accredited clinic before taking court action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              2. Independent Legal Aid Providers
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Listed law firms, university legal clinics, community paralegals, and NGO legal services operate independently of Deborah Aid. While we review credentials prior to listing, each provider independently determines case eligibility, conflicts of interest, scheduling, and representation terms. If a listed provider ever requests improper fees contrary to its free pro bono listing, please report it immediately on our{' '}
              <Link
                href="/contact"
                className="font-bold text-[#072366] underline decoration-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Contact &amp; Feedback
              </Link>{' '}
              page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              3. Acceptable Public Use
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              You agree not to submit false provider applications, impersonate advocates or clinics, scrape intake telephone lines for commercial solicitation, or send abusive or fraudulent callback requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              4. Governing Law
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              These Terms of Use are governed by and construed in accordance with the Laws of the Republic of Kenya.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
