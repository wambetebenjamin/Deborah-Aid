'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, Scale, X } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/find-help', label: 'Find Help' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/submit-provider', label: 'Submit Provider' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_10px_15px_rgba(25,25,25,0.06)]">
      {/* CharityWorks Top Info Bar (desktop lg+) */}
      <div className="hidden border-b border-[#f0f1f2] bg-white lg:block">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-2 text-xs font-medium text-[#687693] sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 border-r border-[#d6deee] pr-5">
              <Phone className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
              GVRC Emergency: <strong className="text-[#072366]">0800 720 090</strong>
            </span>
            <span className="border-r border-[#d6deee] pr-5">
              Childline Kenya: <strong className="text-[#072366]">116</strong>
            </span>
            <span>Free Across All 47 Kenyan Counties</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[#57667e]">English &amp; Kiswahili</span>
            <Link
              href="/submit-provider"
              className="border-l border-[#d6deee] pl-5 font-semibold text-[#072366] transition hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              List Your Legal Clinic
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark matching CharityWorks logo.png */}
        <Link
          href="/"
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e6faf2] text-[#09cc7f]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-[#002d5b] lg:text-2xl">
            Deborah Aid<span className="text-[#09cc7f]">.</span>
          </span>
        </Link>

        {/* Desktop Links: hidden md:flex */}
        <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-1 lg:gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-[44px] items-center px-2 py-2 text-sm font-semibold whitespace-nowrap transition lg:px-3 lg:text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                  isActive
                    ? 'text-[#09cc7f]'
                    : 'text-[#072366] hover:text-[#09cc7f]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden lg:flex lg:items-center lg:shrink-0">
          <Link
            href="/find-help"
            className="btn-charity inline-flex min-h-[46px] min-w-[44px] items-center justify-center px-6 py-3 text-sm font-bold whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            Find Legal Help
          </Link>
        </div>

        {/* Mobile Hamburger Button: md:hidden */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#eceff8] text-[#072366] transition hover:border-[#09cc7f] hover:text-[#09cc7f] md:hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="border-t border-[#eceff8] bg-white px-4 pb-6 pt-3 shadow-lg md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[46px] items-center rounded-md px-3 text-base font-semibold transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                    isActive
                      ? 'bg-[#e6faf2] text-[#072366]'
                      : 'text-[#072366] hover:bg-[#f8fcff] hover:text-[#09cc7f]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 border-t border-[#eceff8] pt-4">
            <Link
              href="/find-help"
              onClick={() => setMobileOpen(false)}
              className="btn-charity flex min-h-[48px] w-full items-center justify-center rounded-md px-5 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              Find Legal Help
            </Link>
            <p className="mt-3 text-center text-xs font-semibold text-[#57667e]">
              Emergency Toll-Free: GVRC <a href="tel:0800720090" className="text-[#072366] underline">0800 720 090</a> | Childline <a href="tel:116" className="text-[#072366] underline">116</a>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
