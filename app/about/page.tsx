import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Info } from 'lucide-react'
import EmergencyContactsSection from '@/components/EmergencyContactsSection'

export const metadata: Metadata = {
  title: 'About Deborah Aid',
  description:
    'Learn about Deborah Aid mission to connect low-income Kenyans across all 47 counties with free pro bono lawyers, legal clinics, and plain-language justice resources.',
}

const TEAM_MEMBERS = [
  {
    name: 'Wanjiku Mwangi',
    role: 'Executive Director & Access to Justice Lead',
    bio: 'Advocate of the High Court of Kenya with 11 years coordinating county legal aid clinics and community land rights education.',
    image: '/images/team-1.jpg',
    alt: 'Portrait of Wanjiku Mwangi standing in a legal library office',
  },
  {
    name: 'Otieno Ochieng',
    role: 'Head of County Clinic Verification',
    bio: 'Oversees annual verification of pro bono chambers, university legal clinics, and court user desks across all 47 counties.',
    image: '/images/team-2.jpg',
    alt: 'Smiling portrait of Otieno Ochieng in formal suit',
  },
  {
    name: 'Amina Hassan',
    role: 'Community Paralegal & Kiswahili Editor',
    bio: 'Leads plain-language English and Kiswahili translation so legal guides can be understood by every Kenyan household.',
    image: '/images/team-3.jpg',
    alt: 'Portrait of Amina Hassan outdoors in Nairobi',
  },
  {
    name: 'Kipchoge Kiptoo',
    role: 'Public Partnerships & Referral Coordinator',
    bio: 'Coordinates referral pathways between community paralegal networks, Children Officers, and pro bono litigation panels.',
    image: '/images/team-4.jpg',
    alt: 'Portrait of Kipchoge Kiptoo in black blazer',
  },
]

const PARTNER_ORGANISATIONS = [
  {
    name: 'Law Society of Kenya',
    description:
      'Supports advocate verification standards and annual pro bono legal awareness weeks across regional chapters.',
  },
  {
    name: 'Kenya National Commission on Human Rights',
    description:
      'Constitutional human rights body promoting Article 48 access to justice and public human rights education.',
  },
  {
    name: 'Federation of Women Lawyers (FIDA Kenya)',
    description:
      'Provides free legal representation, mediation, and self-representation training for women and children nationwide.',
  },
]

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      {/* Mission Hero Section */}
      <section className="border-b border-[#eceff8] bg-[#f8fcff] py-14 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
                About Our Mission
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#002d5b]">
                Justice Is a Constitutional Right, Not a Privilege.
              </h1>
              <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[#57667e]">
                Article 48 of the Constitution of Kenya guarantees access to justice for all persons. Yet millions of hardworking Kenyans give up on valid land, wage, family, or tenancy rights simply because they do not know where free, trustworthy help exists.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#57667e]">
                Deborah Aid bridges that gap at zero cost by bringing verified pro bono lawyers, university clinics, community paralegals, and plain-language Kenyan law guides together in one dignified, easy-to-use directory.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/find-help"
                  className="btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Search Verified Help
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/submit-provider"
                  className="boxed-btn-charity inline-flex min-h-[48px] min-w-[44px] w-full sm:w-auto items-center justify-center rounded-md px-7 py-3 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Join as a Legal Provider
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-l-4 border-b-4 border-[#09cc7f] shadow-md">
                <Image
                  src="/images/community-clinic.jpg"
                  alt="Community legal aid outreach team collaborating in an office session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Legal Advisory Note */}
      <section className="py-12 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="note"
            className="w-full rounded-xl border-2 border-[#072366]/20 bg-[#f8fcff] p-6 sm:p-8"
          >
            <div className="flex items-start gap-3.5">
              <Info className="mt-1 h-6 w-6 shrink-0 text-[#072366]" aria-hidden="true" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
                  Important Legal Advisory Note
                </h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#10285d]">
                  <strong>Deborah Aid is a public legal directory service, not a law firm, and does not provide legal advice or legal representation.</strong> Submitting a callback enquiry or reading a Know Your Rights guide on Deborah Aid does not create an advocate-client relationship with Deborah Aid. Legal advice and representation are provided independently by the verified advocates, legal clinics, and accredited organisations listed in the directory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Verification Works */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#eceff8]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#eceff8] shadow-xs">
                <Image
                  src="/images/document-review.jpg"
                  alt="Legal professional carefully reviewing documents at an office desk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
                How Deborah Aid Works
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]">
                Every Listing Checked for Trust, Dignity, and Zero Fee Exploitation
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  'We verify current Law Society of Kenya practising status, NGO Coordination Board / Public Benefit Organisation credentials, or accredited community paralegal supervision.',
                  'Every listed clinic commits to transparent zero-fee intake for qualifying low-income residents with zero hidden brokerage charges.',
                  'Guides in our Know Your Rights library cite actual Kenyan statutes clearly while explaining steps in everyday English and Kiswahili.',
                  'No account sign-up is ever required, protecting the privacy and dignity of people facing sensitive family, land, or criminal matters.',
                ].map((point) => (
                  <li key={point.slice(0, 32)} className="flex items-start gap-3 text-sm sm:text-base text-[#454d72]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section matching CharityWorks _team.scss */}
      <section aria-labelledby="team-heading" className="bg-[#f8fcff] py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              Our Stewardship Team
            </span>
            <h2
              id="team-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
            >
              People Serving Access to Justice in Kenya
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="group overflow-hidden rounded-xl border border-[#eceff8] bg-white shadow-xs transition hover:shadow-md"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f1f4fa]">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-[#072366]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#069c60]">
                    {member.role}
                  </p>
                  <p className="mt-2.5 text-sm text-[#57667e]">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organisations */}
      <section className="py-16 bg-white border-t border-[#eceff8]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366] text-center">
            Partner Organisations
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PARTNER_ORGANISATIONS.map((org) => (
              <div
                key={org.name}
                className="rounded-xl border border-[#eceff8] bg-[#f8fcff] p-6"
              >
                <h3 className="text-lg sm:text-xl font-extrabold text-[#072366]">
                  {org.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#57667e]">
                  {org.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmergencyContactsSection />
    </div>
  )
}
