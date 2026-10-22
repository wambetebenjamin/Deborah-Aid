'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Filter,
  Globe,
  MapPin,
  Phone,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { KENYA_COUNTIES } from '@/data/counties'
import {
  CanonicalCategoryKey,
  ISSUE_CATEGORIES,
  normalizeCategoryKey,
} from '@/data/categories'
import {
  LEGAL_PROVIDERS,
  ProviderType,
  SupportedLanguage,
} from '@/data/providers'

const PROVIDER_TYPES: ProviderType[] = [
  'Law Firm',
  'Legal Clinic',
  'Paralegal',
  'NGO Legal Service',
]

const LANGUAGES: SupportedLanguage[] = ['English', 'Kiswahili']

interface FindHelpClientProps {
  initialCategory?: string
  initialCounty?: string
  initialQuery?: string
}

export default function FindHelpClient({
  initialCategory,
  initialCounty,
  initialQuery,
}: FindHelpClientProps) {
  const [query, setQuery] = useState(initialQuery || '')
  const [selectedCounty, setSelectedCounty] = useState(initialCounty || 'All')
  const [selectedCategory, setSelectedCategory] = useState<CanonicalCategoryKey | 'all'>(
    normalizeCategoryKey(initialCategory) || 'all'
  )
  const [selectedType, setSelectedType] = useState<ProviderType | 'All'>('All')
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | 'All'>('All')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filteredProviders = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LEGAL_PROVIDERS.filter((provider) => {
      if (
        selectedCounty !== 'All' &&
        provider.county !== selectedCounty &&
        !provider.servesAllCounties
      ) {
        return false
      }

      if (selectedCategory !== 'all' && !provider.categoryKeys.includes(selectedCategory)) {
        return false
      }

      if (selectedType !== 'All' && provider.type !== selectedType) {
        return false
      }

      if (
        selectedLanguage !== 'All' &&
        !provider.languages.includes(selectedLanguage)
      ) {
        return false
      }

      if (q) {
        const haystack = [
          provider.name,
          provider.county,
          provider.type,
          provider.physicalAddress,
          provider.description,
          ...provider.issueAreas,
        ]
          .join(' ')
          .toLowerCase()

        return haystack.includes(q)
      }

      return true
    })
  }, [query, selectedCounty, selectedCategory, selectedType, selectedLanguage])

  const resetFilters = () => {
    setQuery('')
    setSelectedCounty('All')
    setSelectedCategory('all')
    setSelectedType('All')
    setSelectedLanguage('All')
  }

  const filterKey = `${query}-${selectedCounty}-${selectedCategory}-${selectedType}-${selectedLanguage}`

  const renderFilterControls = (idPrefix: string) => (
    <div className="space-y-5">
      {/* County Dropdown: All 47 Kenyan counties alphabetically, native select with text-base min-h-[44px] */}
      <div>
        <label
          htmlFor={`${idPrefix}-county`}
          className="block text-sm font-bold text-[#072366]"
        >
          County (All 47 Counties)
        </label>
        <select
          id={`${idPrefix}-county`}
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="mt-1.5 w-full min-h-[46px] rounded-md border border-[#d6deee] bg-white px-3.5 py-2.5 text-base font-medium text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <option value="All">All 47 Counties</option>
          {KENYA_COUNTIES.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      {/* Issue Category Filter */}
      <div>
        <label
          htmlFor={`${idPrefix}-category`}
          className="block text-sm font-bold text-[#072366]"
        >
          Legal Issue Category
        </label>
        <select
          id={`${idPrefix}-category`}
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as CanonicalCategoryKey | 'all')
          }
          className="mt-1.5 w-full min-h-[46px] rounded-md border border-[#d6deee] bg-white px-3.5 py-2.5 text-base font-medium text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <option value="all">All Issue Areas</option>
          {ISSUE_CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.homeLabel}
            </option>
          ))}
        </select>
      </div>

      {/* Provider Type Filter */}
      <div>
        <span className="block text-sm font-bold text-[#072366]">Provider Type</span>
        <div className="mt-2 space-y-2">
          <button
            type="button"
            onClick={() => setSelectedType('All')}
            className={`flex min-h-[44px] w-full items-center justify-between rounded-md border px-3.5 py-2 text-left text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
              selectedType === 'All'
                ? 'border-[#09cc7f] bg-[#e6faf2] text-[#072366]'
                : 'border-[#eceff8] bg-white text-[#57667e] hover:border-[#09cc7f]'
            }`}
          >
            All Provider Types
          </button>
          {PROVIDER_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`flex min-h-[44px] w-full items-center justify-between rounded-md border px-3.5 py-2 text-left text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                selectedType === type
                  ? 'border-[#09cc7f] bg-[#e6faf2] text-[#072366]'
                  : 'border-[#eceff8] bg-white text-[#57667e] hover:border-[#09cc7f]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div>
        <span className="block text-sm font-bold text-[#072366]">Language Spoken</span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSelectedLanguage('All')}
            className={`min-h-[44px] rounded-md border px-2 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
              selectedLanguage === 'All'
                ? 'border-[#09cc7f] bg-[#09cc7f] text-white'
                : 'border-[#d6deee] bg-white text-[#072366]'
            }`}
          >
            Both
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`min-h-[44px] rounded-md border px-2 py-2 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                selectedLanguage === lang
                  ? 'border-[#09cc7f] bg-[#09cc7f] text-white'
                  : 'border-[#d6deee] bg-white text-[#072366]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-[#d6deee] bg-[#f8fcff] px-4 py-2.5 text-sm font-bold text-[#072366] hover:border-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset All Filters
      </button>
    </div>
  )

  return (
    <div className="w-full bg-[#f8fcff] pb-20">
      {/* Page Header Banner */}
      <div className="border-b border-[#eceff8] bg-white py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
            Free Pro Bono Directory
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
            Find Free Legal Help Near You
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#57667e]">
            Search verified pro bono law firms, community legal clinics, trained paralegals, and NGO legal desks serving residents across all 47 Kenyan counties.
          </p>

          {/* Search Bar + Mobile Filter Trigger */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="directory-search" className="sr-only">
                Search by legal issue, town, or provider name
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#687693]"
                aria-hidden="true"
              />
              <input
                id="directory-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by issue (land, rent, wages, custody) or town/county..."
                className="w-full min-h-[50px] rounded-md border border-[#d6deee] bg-white py-3 pr-4 pl-12 text-base text-[#10285d] placeholder:text-[#687693] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
            </div>

            {/* Mobile Filter Button (lg:hidden) opening bottom sheet */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="btn-charity inline-flex min-h-[50px] min-w-[44px] items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-bold lg:hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Filter className="h-5 w-5" aria-hidden="true" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Directory Container: flex flex-col lg:flex-row gap-6 */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar: hidden on mobile (hidden lg:block) */}
          <aside
            aria-label="Filter legal providers"
            className="hidden lg:block lg:w-80 lg:shrink-0"
          >
            <div className="sticky top-24 rounded-xl border border-[#eceff8] bg-white p-6 shadow-2xs">
              <div className="mb-5 flex items-center gap-2 border-b border-[#eceff8] pb-3.5">
                <SlidersHorizontal className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
                <h2 className="text-lg font-extrabold text-[#072366]">Filter Directory</h2>
              </div>
              {renderFilterControls('desktop')}
            </div>
          </aside>

          {/* Results Column */}
          <div className="flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm sm:text-base font-semibold text-[#072366]">
                Showing <strong>{filteredProviders.length}</strong> verified legal{' '}
                {filteredProviders.length === 1 ? 'provider' : 'providers'}
                {selectedCounty !== 'All' ? ` serving ${selectedCounty} County` : ' across Kenya'}
              </p>

              {(selectedCounty !== 'All' ||
                selectedCategory !== 'all' ||
                selectedType !== 'All' ||
                selectedLanguage !== 'All' ||
                query.trim() !== '') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[44px] min-w-[44px] px-3 text-sm font-bold text-[#069c60] underline hover:text-[#072366] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Clear active filters
                </button>
              )}
            </div>

            {filteredProviders.length === 0 ? (
              <div className="rounded-xl border border-[#eceff8] bg-white p-8 text-center sm:p-12">
                <h3 className="text-lg sm:text-xl font-bold text-[#072366]">
                  No providers matched that exact filter combination
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#57667e]">
                  Reset your filters to see nationwide pro bono legal aid clinics serving all 47 counties by phone and online callback.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-charity mt-6 inline-flex min-h-[46px] min-w-[44px] items-center justify-center rounded-md px-6 py-2.5 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Show All Verified Providers
                </button>
              </div>
            ) : (
              /* Animation 10: Search results list stagger-in on filter change */
              <div
                key={filterKey}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProviders.map((provider, idx) => (
                  <motion.article
                    key={provider.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.35) }}
                    className="flex flex-col justify-between rounded-xl border border-[#eceff8] bg-white p-6 shadow-xs transition hover:border-[#09cc7f] hover:shadow-md"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[#e6faf2] px-3 py-1 text-xs font-bold text-[#072366]">
                          {provider.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#57667e]">
                          <MapPin className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
                          {provider.county}
                          {provider.servesAllCounties ? ' + Nationwide' : ''}
                        </span>
                      </div>

                      <h2 className="mt-4 text-lg sm:text-xl font-bold text-[#072366]">
                        <Link
                          href={`/provider/${provider.slug}`}
                          className="hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                        >
                          {provider.name}
                        </Link>
                      </h2>

                      <p className="mt-2 text-sm text-[#57667e] line-clamp-3">
                        {provider.description}
                      </p>

                      <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#687693]">
                          Issues Covered
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {provider.issueAreas.map((issue) => (
                            <span
                              key={issue}
                              className="rounded bg-[#f1f4fa] px-2.5 py-1 text-xs font-semibold text-[#10285d]"
                            >
                              {issue}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#57667e]">
                        <Globe className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
                        <span>Languages: {provider.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#eceff8] pt-4 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${provider.phone.replace(/\s+/g, '')}`}
                        aria-label={`Call ${provider.name}`}
                        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#d6deee] px-3 py-2 text-xs font-bold text-[#072366] hover:border-[#09cc7f] hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </a>

                      <Link
                        href={`/provider/${provider.slug}`}
                        className="btn-charity flex-1 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                      >
                        Contact &amp; Profile
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Filter Modal (items-end, rounded-t-2xl) */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-sheet-title"
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-[#040c1e]/60 sm:items-center sm:p-4 lg:hidden"
        >
          <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-[#eceff8] pb-3.5">
              <h2 id="mobile-filter-sheet-title" className="text-lg font-extrabold text-[#072366]">
                Filter Legal Providers
              </h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filter sheet"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#57667e] hover:bg-[#f8fcff] hover:text-[#072366] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4">{renderFilterControls('mobile')}</div>

            <div className="mt-6 pt-3 border-t border-[#eceff8]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="btn-charity flex min-h-[48px] w-full items-center justify-center rounded-md px-6 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                View {filteredProviders.length} Matching Providers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
