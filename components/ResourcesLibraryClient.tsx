'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Search } from 'lucide-react'
import {
  CanonicalCategoryKey,
  ISSUE_CATEGORIES,
  normalizeCategoryKey,
} from '@/data/categories'
import { LEGAL_RESOURCES } from '@/data/resources'
import EmergencyContactsSection from '@/components/EmergencyContactsSection'

interface ResourcesLibraryClientProps {
  initialCategory?: string
}

export default function ResourcesLibraryClient({
  initialCategory,
}: ResourcesLibraryClientProps) {
  const [activeCategory, setActiveCategory] = useState<CanonicalCategoryKey | 'all'>(
    normalizeCategoryKey(initialCategory) || 'all'
  )
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return LEGAL_RESOURCES.filter((res) => {
      if (activeCategory !== 'all' && res.categoryKey !== activeCategory) {
        return false
      }
      if (!q) return true
      return (
        res.title.toLowerCase().includes(q) ||
        res.swahiliTitle.toLowerCase().includes(q) ||
        res.summary.toLowerCase().includes(q) ||
        res.swahiliSummary.toLowerCase().includes(q) ||
        res.categoryBadge.toLowerCase().includes(q) ||
        res.type.toLowerCase().includes(q)
      )
    })
  }, [activeCategory, searchTerm])

  return (
    <div className="w-full bg-[#f8fcff]">
      {/* Page Hero Banner */}
      <section className="border-b border-[#eceff8] bg-white py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
            Know Your Rights Library (Fahamu Haki Zako)
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
            Plain-Language Kenyan Law Guides &amp; Templates
          </h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-[#57667e]">
            Free practical guides, demand letter templates, checklists, and answers written in clear English and Kiswahili for everyday Kenyans. No legal background required.
          </p>

          {/* Search input */}
          <div className="mt-6 max-w-xl relative">
            <label htmlFor="resources-search" className="sr-only">
              Search Know Your Rights guides
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#687693]"
              aria-hidden="true"
            />
            <input
              id="resources-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides, template letters, checklists, or Kiswahili topics..."
              className="w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white py-2.5 pr-4 pl-12 text-base text-[#10285d] placeholder:text-[#687693] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
          </div>

          {/* Issue Category Filter Tabs: Land, Employment, Family, Criminal, Consumer, Gender-Based Violence, Tenancy, Business */}
          <div
            role="tablist"
            aria-label="Filter resources by legal category"
            className="mt-6 flex flex-wrap gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`min-h-[44px] min-w-[44px] rounded-md px-4 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                activeCategory === 'all'
                  ? 'bg-[#09cc7f] text-white'
                  : 'border border-[#d6deee] bg-[#f8fcff] text-[#072366] hover:border-[#09cc7f]'
              }`}
            >
              All Topics
            </button>

            {ISSUE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`min-h-[44px] min-w-[44px] rounded-md px-4 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                  activeCategory === cat.key
                    ? 'bg-[#09cc7f] text-white'
                    : 'border border-[#d6deee] bg-[#f8fcff] text-[#072366] hover:border-[#09cc7f]'
                }`}
              >
                {cat.resourceLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Cards Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, idx) => (
              /* Animation 6: Resource cards gentle scale-in on scroll */
              <motion.article
                key={resource.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="flex flex-col justify-between rounded-xl border border-[#eceff8] bg-white p-6 shadow-xs transition hover:border-[#09cc7f] hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#e6faf2] px-3 py-1 text-xs font-extrabold text-[#072366]">
                      {resource.categoryBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#f1f4fa] px-2.5 py-1 text-xs font-bold text-[#10285d]">
                      <FileText className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
                      {resource.type}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg sm:text-xl font-bold text-[#072366]">
                    <Link
                      href={`/resources/${resource.slug}`}
                      className="hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      {resource.title}
                    </Link>
                  </h2>

                  <p className="mt-1.5 text-xs font-bold text-[#069c60]">
                    Kiswahili: {resource.swahiliTitle}
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-[#57667e] leading-relaxed">
                    {resource.summary}
                  </p>

                  <p className="mt-2.5 rounded-md bg-[#f8fcff] p-3 text-xs leading-relaxed text-[#454d72] border border-[#eceff8]">
                    <strong className="text-[#072366]">Muhtasari: </strong>
                    {resource.swahiliSummary}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#eceff8] pt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#687693]">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {resource.readTime}
                  </span>

                  <Link
                    href={`/resources/${resource.slug}`}
                    className="btn-charity inline-flex min-h-[44px] min-w-[88px] items-center justify-center gap-1.5 rounded-md px-5 py-2 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Read
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency contacts section repeated at bottom */}
      <EmergencyContactsSection />
    </div>
  )
}
