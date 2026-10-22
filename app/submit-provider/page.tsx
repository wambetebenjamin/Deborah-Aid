import type { Metadata } from 'next'
import Image from 'next/image'
import SubmitProviderForm from '@/components/SubmitProviderForm'

export const metadata: Metadata = {
  title: 'Submit a Pro Bono Legal Provider',
  description:
    'Register your law firm pro bono desk, legal aid clinic, paralegal network, or NGO legal service on Deborah Aid.',
}

export default function SubmitProviderPage() {
  return (
    <div className="w-full bg-[#f8fcff] py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              Partner With Deborah Aid
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
              List Your Legal Clinic or Pro Bono Practice
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#57667e]">
              Help low-income Kenyans find verified legal assistance across all 47 counties. If your law chamber, university clinic, community paralegal office, or civil society organisation offers pro bono support, submit your details below for verification.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#eceff8] shadow-sm">
              <Image
                src="/images/justice-scales.jpg"
                alt="Scales of justice and gavel on a wooden desk in a legal chamber"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SubmitProviderForm />
        </div>
      </div>
    </div>
  )
}
