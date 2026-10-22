import { PhoneCall, ShieldAlert } from 'lucide-react'

interface EmergencyContactsSectionProps {
  compactHeading?: boolean
}

export default function EmergencyContactsSection({
  compactHeading = false,
}: EmergencyContactsSectionProps) {
  return (
    <section
      aria-labelledby="emergency-helplines-heading"
      className="w-full py-12 sm:py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-xl bg-[#072366] px-6 py-8 text-white shadow-[0_20px_50px_rgba(7,35,102,0.14)] sm:px-10 sm:py-10"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(7,35,102,0.96) 0%, rgba(0,45,91,0.93) 65%, rgba(9,204,127,0.9) 100%), url('/assets/img/gallery/section_bg02.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <ShieldAlert className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
                24/7 Free National Emergency Helplines
              </div>
              <h2
                id="emergency-helplines-heading"
                className={`${
                  compactHeading ? 'text-2xl sm:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                } mt-3 font-extrabold text-white`}
              >
                Need Immediate Safety or Crisis Support Right Now?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">
                Both national helplines below are free from Safaricom, Airtel, and Telkom lines across all 47 counties, 24 hours a day.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:shrink-0">
              <a
                href="tel:0800720090"
                className="flex min-h-[64px] min-w-[44px] flex-col justify-center rounded-lg bg-white px-5 py-3.5 text-[#072366] shadow-md transition hover:bg-[#e6faf2] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-[#57667e]">
                  Gender Violence Recovery Centre
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-xl font-bold text-[#072366] sm:text-2xl">
                  <PhoneCall className="h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  0800 720 090
                </span>
              </a>

              <a
                href="tel:116"
                className="flex min-h-[64px] min-w-[44px] flex-col justify-center rounded-lg bg-white px-5 py-3.5 text-[#072366] shadow-md transition hover:bg-[#e6faf2] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-[#57667e]">
                  Childline Kenya (Toll-Free)
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-xl font-bold text-[#072366] sm:text-2xl">
                  <PhoneCall className="h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                  116
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
