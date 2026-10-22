import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Info,
  Scale,
} from 'lucide-react'
import { getCategoryByKey } from '@/data/categories'
import { getResourceBySlug, LEGAL_RESOURCES } from '@/data/resources'
import CopyTemplateButton from '@/components/CopyTemplateButton'

interface ResourceDetailPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LEGAL_RESOURCES.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: ResourceDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  if (!resource) {
    return { title: 'Resource Not Found' }
  }
  return {
    title: resource.title,
    description: resource.summary,
  }
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  const categoryMeta = getCategoryByKey(resource.categoryKey)
  const relatedResources = resource.relatedSlugs
    .map((relSlug) => getResourceBySlug(relSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3)

  return (
    <div className="w-full bg-[#f8fcff] py-10 sm:py-14">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/resources"
          className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-sm font-bold text-[#072366] hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Know Your Rights Library
        </Link>

        {/* Main Resource Article Container */}
        <article className="mt-6 rounded-xl border border-[#eceff8] bg-white p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#e6faf2] px-3.5 py-1 text-xs font-extrabold text-[#072366]">
              {resource.categoryBadge}
            </span>
            <span className="rounded bg-[#f1f4fa] px-3 py-1 text-xs font-bold text-[#10285d]">
              {resource.type}
            </span>
            <span className="text-xs font-semibold text-[#687693]">{resource.readTime}</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002d5b]">
            {resource.title}
          </h1>

          <p className="mt-2 text-sm sm:text-base font-bold text-[#069c60]">
            Kiswahili: {resource.swahiliTitle}
          </p>

          {/* Full-width Legal Disclaimer Info Box per Step 4 & Step 18 */}
          <div
            role="note"
            aria-label="Legal guidance disclaimer"
            className="mt-6 w-full rounded-lg border-2 border-[#072366]/20 bg-[#f8fcff] p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#072366]" aria-hidden="true" />
              <p className="text-sm sm:text-base font-medium leading-relaxed text-[#072366]">
                This information is for general guidance only and does not constitute legal advice. Speak to a qualified lawyer for your specific situation.
              </p>
            </div>
          </div>

          {/* Bilingual Summary */}
          <div className="mt-6 rounded-lg bg-[#e6faf2]/50 p-5 border border-[#09cc7f]/30">
            <p className="text-sm sm:text-base font-semibold text-[#10285d]">
              {resource.summary}
            </p>
            <p className="mt-2 text-sm sm:text-base text-[#454d72]">
              <strong className="text-[#072366]">Muhtasari kwa Kiswahili: </strong>
              {resource.swahiliSummary}
            </p>
          </div>

          {/* Main Plain-Language Sections */}
          <div className="mt-8 space-y-8">
            {resource.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm sm:text-base leading-relaxed text-[#454d72]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 40)}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-[#10285d]"
                      >
                        <CheckCircle2
                          className="mt-1 h-4 w-4 shrink-0 text-[#09cc7f]"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Optional Ready-to-Use Template Letter */}
          {resource.templateText && (
            <section className="mt-8 rounded-xl border border-[#d6deee] bg-[#f8fcff] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#072366]">
                  Editable Plain-Language Letter Template
                </h2>
                <CopyTemplateButton text={resource.templateText} />
              </div>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg border border-[#eceff8] bg-white p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-[#10285d]">
                {resource.templateText}
              </pre>
            </section>
          )}

          {/* Kenyan Statutory References */}
          <section className="mt-10 border-t border-[#eceff8] pt-8">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
                Relevant Kenyan Laws &amp; Statutory References
              </h2>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-[#687693]">
              Listed strictly as public statutory references under the Laws of Kenya (Kenya Law), not individual legal advice:
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {resource.citations.map((cite) => (
                <div
                  key={cite.statute}
                  className="rounded-lg border border-[#eceff8] bg-[#f8fcff] p-4"
                >
                  <p className="text-sm sm:text-base font-bold text-[#072366]">
                    {cite.statute}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#57667e]">
                    {cite.sectionNote}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA: Find a Lawyer for This Issue */}
          <div className="mt-10 rounded-xl bg-[#072366] p-6 sm:p-8 text-white flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Need Personal Help With {categoryMeta.homeLabel}?
              </h2>
              <p className="mt-1 text-sm sm:text-base text-white/85">
                Connect free of charge with verified pro bono lawyers, clinics, and paralegals handling {categoryMeta.homeLabel.toLowerCase()} across Kenya.
              </p>
            </div>
            <Link
              href={`/find-help?category=${encodeURIComponent(categoryMeta.homeLabel)}`}
              className="btn-charity inline-flex min-h-[48px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Find a Lawyer for This Issue
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </article>

        {/* Related Resources: 3 linked cards at bottom */}
        <section aria-labelledby="related-resources-heading" className="mt-12">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
            <h2
              id="related-resources-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#072366]"
            >
              Related Know Your Rights Guides
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((rel) => (
              <Link
                key={rel.slug}
                href={`/resources/${rel.slug}`}
                className="flex flex-col justify-between rounded-xl border border-[#eceff8] bg-white p-6 shadow-xs transition hover:border-[#09cc7f] hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#e6faf2] px-3 py-1 text-xs font-extrabold text-[#072366]">
                      {rel.categoryBadge}
                    </span>
                    <span className="text-xs font-bold text-[#57667e]">{rel.type}</span>
                  </div>
                  <h3 className="mt-3 text-lg sm:text-xl font-bold text-[#072366]">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#57667e] line-clamp-3">{rel.summary}</p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#069c60]">
                  Read Guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
