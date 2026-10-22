import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy (KDPA 2019)',
  description:
    'Deborah Aid Privacy Policy aligned with the Kenya Data Protection Act, 2019 (Act No. 24 of 2019).',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#f8fcff] py-12 sm:py-16">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-10 shadow-2xs space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#069c60]">
              Kenya Data Protection Act, 2019 Compliant
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#002d5b]">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-[#687693]">
              Effective Date: October 2026 | Applies to all 47 Counties of Kenya
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              1. Commitment to Data Minimization &amp; Dignity
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Deborah Aid (&ldquo;Justice is for everyone.&rdquo;) operates in strict compliance with Article 31(c) and (d) of the Constitution of Kenya and the <strong>Kenya Data Protection Act, 2019 (Act No. 24 of 2019)</strong>. Browse access to our directory and Know Your Rights library requires zero registration, zero account sign-up, and zero personal identification.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              <strong>No personal data is stored in any persistent public database beyond transmitting your voluntary form submission.</strong> When you request a callback, submit a provider listing, or send an enquiry, your submission is transmitted securely over TLS directly to the relevant verified intake desk and our coordination inbox solely to fulfill your request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              2. Personal Data Collected When You Submit a Form
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-[#454d72]">
              <li>
                <strong>Callback Request Form:</strong> Your name, telephone number, optional confirmation email address, general issue category, and brief summary so the chosen legal aid provider can phone you back.
              </li>
              <li>
                <strong>Submit a Provider Form:</strong> Organisation name, provider category, county, office address, intake phone, email, languages spoken, legal issue areas, website, and service description for verification.
              </li>
              <li>
                <strong>Contact &amp; Feedback Form:</strong> Your name, email address, enquiry category, and message so our coordination team can reply.
              </li>
              <li>
                <strong>Anti-Abuse Protection:</strong> Google reCAPTCHA v3/v2 verification tokens to protect vulnerable users and clinics from automated spam.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              3. Lawful Basis &amp; Zero Commercial Sharing
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Under Section 30 of the Kenya Data Protection Act, 2019, we process form details strictly on the basis of your explicit consent and at your direct request before connecting you with a pro bono provider. Deborah Aid never sells, rents, trades, or monetizes personal information under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
              4. Your Rights Under the Kenya Data Protection Act, 2019 (Including Right to Erasure)
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              Under Sections 26 and 40 of the Kenya Data Protection Act, 2019, every user in Kenya holds the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-[#454d72]">
              <li>Be informed of the exact use to which your personal data is put.</li>
              <li>Access any email record holding your enquiry or callback request.</li>
              <li>Object to processing or withdraw consent at any moment without penalty.</li>
              <li>Correct inaccurate or outdated provider or contact details.</li>
              <li>
                <strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request immediate permanent deletion of any correspondence or form email held by Deborah Aid, fulfilled free of charge within 14 days.
              </li>
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-[#454d72]">
              To exercise your right to erasure, access, or correction, email{' '}
              <a
                href="mailto:hello@deborahaid.org"
                className="font-bold text-[#072366] underline decoration-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                hello@deborahaid.org
              </a>{' '}
              or use our{' '}
              <Link
                href="/contact"
                className="font-bold text-[#072366] underline decoration-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Contact Form
              </Link>
              . You may also lodge complaints directly with the Office of the Data Protection Commissioner (ODPC) in Kenya.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
