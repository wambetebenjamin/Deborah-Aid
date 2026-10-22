import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="w-full bg-[#f8fcff] py-20 sm:py-28">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-[#eceff8] bg-white p-8 sm:p-12 shadow-xs">
          <span className="inline-block rounded-full bg-[#e6faf2] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#072366]">
            404 Page Not Found
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
            We Could Not Find That Page
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#57667e]">
            The link may have moved or been mistyped. You can return home immediately or search free verified legal aid clinics across all 47 Kenyan counties.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              href="/find-help"
              className="boxed-btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Find Legal Help
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
