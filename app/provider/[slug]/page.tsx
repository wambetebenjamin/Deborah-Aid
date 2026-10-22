import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { getProviderBySlug, LEGAL_PROVIDERS } from '@/data/providers'
import CallbackRequestForm from '@/components/CallbackRequestForm'

interface ProviderPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LEGAL_PROVIDERS.map((provider) => ({
    slug: provider.slug,
  }))
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { slug } = await params
  const provider = getProviderBySlug(slug)
  if (!provider) {
    return { title: 'Provider Not Found' }
  }
  return {
    title: `${provider.name} (${provider.county} County)`,
    description: provider.description,
  }
}

export default async function ProviderProfilePage({ params }: ProviderPageProps) {
  const { slug } = await params
  const provider = getProviderBySlug(slug)

  if (!provider) {
    notFound()
  }

  return (
    <div className="w-full bg-[#f8fcff] py-10 sm:py-14">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/find-help"
          className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-sm font-bold text-[#072366] hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Search &amp; Directory
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Complete Verified Profile */}
          <div className="lg:col-span-7 space-y-6">
            <section className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#e6faf2] px-3.5 py-1 text-xs font-extrabold text-[#072366]">
                  {provider.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f4fa] px-3 py-1 text-xs font-bold text-[#072366]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
                  Verified {provider.verifiedYear}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#57667e]">
                  <MapPin className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
                  {provider.county} County
                  {provider.servesAllCounties ? ' (Serves All 47 Counties)' : ''}
                </span>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002d5b]">
                {provider.name}
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#57667e]">
                {provider.description}
              </p>

              {/* Issue Areas Covered Tag List */}
              <div className="mt-6">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#072366]">
                  Issue Areas Covered
                </h2>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {provider.issueAreas.map((issue) => (
                    <span
                      key={issue}
                      className="rounded-md border border-[#09cc7f]/35 bg-[#e6faf2]/65 px-3 py-1.5 text-xs sm:text-sm font-bold text-[#072366]"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact, Address, Languages, Operating Hours */}
              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#eceff8] pt-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                      Physical Address
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-medium text-[#10285d]">
                      {provider.physicalAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                      Operating Hours
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-medium text-[#10285d]">
                      {provider.operatingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                      Direct Telephone
                    </p>
                    <a
                      href={`tel:${provider.phone.replace(/\s+/g, '')}`}
                      className="mt-0.5 inline-flex min-h-[44px] items-center text-base font-bold text-[#072366] underline decoration-[#09cc7f] underline-offset-4 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      {provider.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                      Email Intake Desk
                    </p>
                    <a
                      href={`mailto:${provider.email}`}
                      className="mt-0.5 inline-flex min-h-[44px] items-center break-all text-sm sm:text-base font-bold text-[#072366] underline decoration-[#09cc7f] underline-offset-4 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      {provider.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <Globe className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                      Languages Spoken
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#10285d]">
                      {provider.languages.join(' and ')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Access Section */}
            <section className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
                How to Access Support
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {provider.accessMethods.map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e6faf2] px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#072366]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
                    {method}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#57667e]">
                {provider.accessInstructions}
              </p>
              <div className="mt-4 rounded-lg border border-[#eceff8] bg-[#f8fcff] p-4 text-sm text-[#10285d]">
                <strong className="font-bold text-[#072366]">Cost &amp; Eligibility: </strong>
                {provider.eligibilityNote}
              </div>
            </section>
          </div>

          {/* Right 5 Columns: Request Callback Form */}
          <div className="lg:col-span-5">
            <CallbackRequestForm
              providerSlug={provider.slug}
              providerName={provider.name}
              defaultIssueCategory={provider.issueAreas[0]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
