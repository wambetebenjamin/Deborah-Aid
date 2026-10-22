'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, X } from 'lucide-react'

const STORAGE_KEY = 'deborah-aid-cookie-consent'

interface CookiePreferences {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export default function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [functional, setFunctional] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setBannerOpen(true)
    } else {
      try {
        const parsed = JSON.parse(saved) as Partial<CookiePreferences>
        setFunctional(Boolean(parsed.functional))
        setAnalytics(Boolean(parsed.analytics))
        setMarketing(Boolean(parsed.marketing))
      } catch {
        setBannerOpen(true)
      }
    }

    const handleOpenPreferences = () => {
      setModalOpen(true)
    }

    window.addEventListener('open-cookie-preferences', handleOpenPreferences)
    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences)
    }
  }, [])

  const savePreferences = (prefs: Omit<CookiePreferences, 'timestamp'>) => {
    const payload: CookiePreferences = {
      ...prefs,
      timestamp: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setBannerOpen(false)
    setModalOpen(false)
  }

  const handleAcceptAll = () => {
    setFunctional(true)
    setAnalytics(true)
    setMarketing(true)
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    })
  }

  const handleSaveSelected = () => {
    savePreferences({
      necessary: true,
      functional,
      analytics,
      marketing,
    })
  }

  return (
    <>
      {bannerOpen && !modalOpen && (
        <aside
          aria-label="Cookie consent notice"
          className="pb-safe fixed inset-x-0 bottom-0 z-[9995] border-t border-[#eceff8] bg-white pt-4 shadow-[0_-10px_30px_rgba(7,35,102,0.08)]"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e6faf2] text-[#069c60]">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-[#10285d] sm:text-base">
                We respect your privacy under the{' '}
                <strong className="font-semibold text-[#072366]">Kenya Data Protection Act, 2019</strong>. We use
                essential cookies to keep forms secure and optional cookies to improve accessibility. Read our{' '}
                <Link
                  href="/legal/cookie-policy"
                  className="font-semibold text-[#072366] underline decoration-[#09cc7f] underline-offset-4 hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:shrink-0">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="boxed-btn-charity min-h-[44px] min-w-[44px] rounded-md px-5 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-charity min-h-[44px] min-w-[44px] rounded-md px-6 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-heading"
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-[#040c1e]/60 p-0 sm:items-center sm:p-4"
        >
          <div className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-[#eceff8] pb-4">
              <h2 id="cookie-modal-heading" className="text-xl font-bold text-[#072366]">
                Cookie Preferences (KDPA 2019)
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close cookie preferences"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#57667e] hover:bg-[#f8fcff] hover:text-[#072366] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-[#eceff8] bg-[#f8fcff] p-3.5">
                <div className="pr-3">
                  <p className="font-bold text-[#072366]">Necessary Cookies</p>
                  <p className="text-xs text-[#57667e]">
                    Required for spam protection, form security, and remembering your consent choice.
                  </p>
                </div>
                <span className="rounded bg-[#072366] px-2.5 py-1 text-xs font-semibold text-white">
                  Always Active
                </span>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[#eceff8] p-3.5 hover:bg-[#f8fcff]">
                <span className="pr-3">
                  <span className="block font-bold text-[#072366]">Functional Cookies</span>
                  <span className="block text-xs text-[#57667e]">
                    Remembers language preference and voice tour mute state across visits.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="h-6 w-6 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[#eceff8] p-3.5 hover:bg-[#f8fcff]">
                <span className="pr-3">
                  <span className="block font-bold text-[#072366]">Analytics Cookies</span>
                  <span className="block text-xs text-[#57667e]">
                    Aggregated anonymous page counts so we know which county guides are most needed.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-6 w-6 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[#eceff8] p-3.5 hover:bg-[#f8fcff]">
                <span className="pr-3">
                  <span className="block font-bold text-[#072366]">Marketing Cookies</span>
                  <span className="block text-xs text-[#57667e]">
                    Used only for public legal aid awareness campaigns. Never sold to third parties.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-6 w-6 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleSaveSelected}
                className="boxed-btn-charity min-h-[44px] min-w-[44px] rounded-md px-5 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-charity min-h-[44px] min-w-[44px] rounded-md px-6 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
