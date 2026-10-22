'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FileSearch,
  Globe2,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { ISSUE_CATEGORIES } from '@/data/categories'
import { LEGAL_PROVIDERS } from '@/data/providers'
import CategoryIcon from '@/components/CategoryIcon'
import EmergencyContactsSection from '@/components/EmergencyContactsSection'

const TRUST_ITEMS = [
  {
    label: 'Free to Use',
    detail: 'Zero directory or referral charges',
    Icon: CheckCircle2,
  },
  {
    label: '47 Counties Covered',
    detail: 'Nationwide clinics & phone desks',
    Icon: Globe2,
  },
  {
    label: 'Verified Legal Professionals',
    detail: 'LSK advocates & accredited clinics',
    Icon: ShieldCheck,
  },
  {
    label: 'Kenya Law Aligned',
    detail: 'Grounded in Kenyan statutes',
    Icon: Award,
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Search for Help by Issue or County',
    description:
      'Choose your county from all 47 Kenyan counties or select your issue area, whether land, employment, family, tenancy, or criminal defence.',
    Icon: Search,
  },
  {
    step: '02',
    title: 'View Verified Providers and Clinics',
    description:
      'Compare pro bono law firms, legal aid clinics, community paralegals, and NGO legal desks offering help in English and Kiswahili.',
    Icon: FileSearch,
  },
  {
    step: '03',
    title: 'Contact Directly or Request a Callback',
    description:
      'Visit walk-in clinic hours, telephone the intake desk directly, or send a free callback request so an advocate or paralegal calls your line.',
    Icon: UserCheck,
  },
]

const TESTIMONIALS = [
  {
    quote:
      'After my husband passed away, relatives tried to fence off our homestead without succession papers. Through Deborah Aid, I found a free clinic that helped me place a caution at the land registry and protect my children home.',
    attribution: 'Resident from Kisumu',
    issueTag: 'Land & Succession Support',
    initials: 'RK',
  },
  {
    quote:
      'A supplier disappeared with goods worth KES 180,000 and I thought hiring a lawyer would cost more than my shop made all year. The Small Claims Court checklist and clinic guidance helped me file and recover my money within two months.',
    attribution: 'Small business owner from Mombasa',
    issueTag: 'Small Claims Recovery',
    initials: 'SM',
  },
  {
    quote:
      'When our caretaker welded my door over a disputed water bill, I had nowhere to sleep with my baby. Reading the tenant rights guide and calling a paralegal desk got my door opened lawfully the very next afternoon.',
    attribution: 'Tenant from Nairobi',
    issueTag: 'Tenant Rights Protection',
    initials: 'TN',
  },
]

const PARTNER_ORGANISATIONS = [
  {
    name: 'Law Society of Kenya',
    role: 'Statutory bar association supporting pro bono legal aid weeks and advocate verification across Kenya.',
  },
  {
    name: 'Kenya National Commission on Human Rights',
    role: 'Constitutional human rights institution advancing public justice education and redress across all counties.',
  },
  {
    name: 'Federation of Women Lawyers (FIDA Kenya)',
    role: 'Leading women legal aid organisation offering free family law, land rights, and survivor protection support.',
  },
]

export default function HomePageClient() {
  const categoriesRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animation 4: Issue category grid icons stagger-bounce in on scroll (GSAP)
      if (categoriesRef.current) {
        const badges = categoriesRef.current.querySelectorAll('.cat-icon-badge')
        gsap.fromTo(
          badges,
          { scale: 0.72, y: 14 },
          {
            scale: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        )
      }

      // Animation 7: How-it-works steps draw-in left to right (GSAP ScrollTrigger)
      if (stepsContainerRef.current) {
        const stepCards = stepsContainerRef.current.querySelectorAll('.how-step-card')
        if (progressLineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stepsContainerRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          )
        }

        gsap.fromTo(
          stepCards,
          { x: -24, opacity: 0.25 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const featuredProviders = LEGAL_PROVIDERS.slice(0, 3)

  return (
    <div className="w-full overflow-x-clip">
      {/* HERO SECTION: CharityWorks h1_hero pure white canvas + curved right portrait with #09cc7f arc */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        {/* Soft pastel mint geometric corner wave inherited from CharityWorks h1_hero.png */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#e6faf2]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 left-6 hidden h-20 w-20 rounded-full border-4 border-dashed border-[#09cc7f]/20 lg:block"
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Hero Left Copy */}
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-block rounded-full bg-[#e6faf2] px-4 py-1.5 text-sm font-bold tracking-wide text-[#072366]"
              >
                Justice is for everyone.
              </motion.span>

              {/* Animation 3: Hero headline fade-slide up on mount (Framer Motion) */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
                className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-[#002d5b]"
              >
                Know your rights. Find free legal help.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
                className="mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#57667e]"
              >
                Deborah Aid connects low-income Kenyans with verified pro bono lawyers, community legal clinics, and paralegal support across all 47 counties at zero cost. No legal jargon. No upfront fees. Just clear, dignified help when you need it most.
              </motion.p>

              {/* Hero CTA Buttons: flex flex-col sm:flex-row gap-3 sm:gap-4 & w-full sm:w-auto */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link
                  href="/find-help"
                  className="btn-charity inline-flex min-h-[52px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-8 py-3.5 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Find Legal Help
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>

                <Link
                  href="/resources"
                  className="boxed-btn-charity inline-flex min-h-[52px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-8 py-3.5 text-base font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  Browse Resources
                </Link>
              </motion.div>

              {/* CharityWorks .cal-btn toll-free reminder strip */}
              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-[#57667e]">
                <a
                  href="tel:0800720090"
                  className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[#072366] hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                >
                  <PhoneCall className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
                  <span>Urgent Safety Helpline: 0800 720 090 (Free)</span>
                </a>
              </div>
            </div>

            {/* Hero Right Curved Portrait matching CharityWorks h1_hero.png */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="overflow-hidden rounded-[2rem] rounded-bl-[5rem] border-l-[6px] border-b-[6px] border-[#09cc7f] bg-[#f8fcff] shadow-[0_24px_60px_rgba(7,35,102,0.12)]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/hero-consultation.jpg"
                      alt="East African legal aid advocate reviewing documents with a client in a bright consultation room"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Floating verification card anchored bottom-right */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#eceff8] bg-white px-5 py-3.5 shadow-md sm:mt-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#069c60]">
                      All 47 Counties Covered
                    </p>
                    <p className="text-sm font-bold text-[#072366]">
                      English &amp; Kiswahili Pro Bono Intake
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e6faf2] px-3 py-1 text-xs font-extrabold text-[#072366]">
                    KES 0 Fee
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section aria-label="Platform trust guarantees" className="border-y border-[#eceff8] bg-[#f1f4fa] py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ label, detail, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-lg bg-white px-4 py-3.5 shadow-2xs border border-[#eceff8]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6faf2] text-[#09cc7f]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-base font-extrabold text-[#072366]">{label}</p>
                  <p className="text-xs text-[#57667e]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISSUE CATEGORIES SECTION: grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 */}
      <section
        aria-labelledby="issue-categories-heading"
        className="section-bg-pattern py-16 sm:py-20"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              What Do You Need Help With?
            </span>
            <h2
              id="issue-categories-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
            >
              Browse Free Legal Guidance by Issue
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57667e]">
              Select a legal issue below to read plain-language rights guides in English and Kiswahili or connect with a pro bono lawyer.
            </p>
          </div>

          <div
            ref={categoriesRef}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {ISSUE_CATEGORIES.map((category) => (
              <Link
                key={category.key}
                href={`/resources?category=${encodeURIComponent(category.homeLabel)}`}
                className="single-cat-card group flex min-h-[168px] min-w-[44px] flex-col justify-between p-5 sm:p-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <div>
                  <span className="cat-icon-badge inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#09cc7f] text-white transition-colors duration-300">
                    <CategoryIcon name={category.iconName} className="h-6 w-6" />
                  </span>
                  <h3 className="cat-title-text mt-4 text-lg sm:text-xl font-bold text-[#072366] transition-colors duration-300">
                    {category.homeLabel}
                  </h3>
                  <p className="cat-sub-text mt-1.5 hidden text-sm text-[#57667e] transition-colors duration-300 sm:block">
                    {category.shortDescription}
                  </p>
                </div>

                <span className="cat-sub-text mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#072366] transition-colors duration-300">
                  Explore Rights
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION: 3 steps drawing left to right */}
      <section aria-labelledby="how-it-works-heading" className="bg-white py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              Simple, Dignified Process
            </span>
            <h2
              id="how-it-works-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
            >
              How Deborah Aid Works in Three Clear Steps
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57667e]">
              You do not need an account, legal background, or referral letter to get started.
            </p>
          </div>

          <div ref={stepsContainerRef} className="relative mt-12">
            {/* Desktop connecting progress line drawn left to right */}
            <div
              ref={progressLineRef}
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute top-11 left-[16%] right-[16%] h-1 bg-[#09cc7f]/35"
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {HOW_IT_WORKS_STEPS.map(({ step, title, description, Icon }) => (
                <div
                  key={step}
                  className="how-step-card relative rounded-xl border border-[#eceff8] bg-[#f8fcff] p-6 sm:p-8 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#09cc7f] text-white shadow-sm">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-black text-[#072366]/15">{step}</span>
                  </div>
                  <h3 className="mt-6 text-lg sm:text-xl font-bold text-[#072366]">{title}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#57667e]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VERIFIED PROVIDERS PREVIEW */}
      <section aria-labelledby="featured-providers-heading" className="bg-[#f8fcff] py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
                Verified Legal Support
              </span>
              <h2
                id="featured-providers-heading"
                className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
              >
                Featured Pro Bono Clinics &amp; Advocates
              </h2>
            </div>
            <Link
              href="/find-help"
              className="boxed-btn-charity inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 self-start rounded-md px-5 py-2.5 text-sm font-bold sm:self-auto focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              View All 12+ Clinics
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Animation 5: Provider cards staggered fade-in on scroll into view */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider, idx) => (
              <motion.article
                key={provider.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between rounded-xl border border-[#eceff8] bg-white p-6 shadow-xs transition hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#e6faf2] px-3 py-1 text-xs font-bold text-[#072366]">
                      {provider.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#57667e]">
                      <MapPin className="h-3.5 w-3.5 text-[#09cc7f]" aria-hidden="true" />
                      {provider.county} County
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#072366]">
                    <Link
                      href={`/provider/${provider.slug}`}
                      className="hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    >
                      {provider.name}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-[#57667e] line-clamp-3">
                    {provider.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {provider.issueAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded bg-[#f1f4fa] px-2.5 py-1 text-xs font-semibold text-[#10285d]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-[#eceff8] pt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#57667e]">
                    {provider.languages.join(' • ')}
                  </span>
                  <Link
                    href={`/provider/${provider.slug}`}
                    className="btn-charity inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-4 py-2 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    Contact Clinic
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION: 3 anonymous quotes with abstract geometric avatars & alternating slide-in */}
      <section aria-labelledby="testimonials-heading" className="bg-[#f9fafc] py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              Community Impact Across Kenya
            </span>
            <h2
              id="testimonials-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
            >
              Stories of Dignity and Justice
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57667e]">
              Shared anonymously with permission to protect client privacy.
            </p>
          </div>

          {/* Animation 9: Testimonial cards fade-slide from alternating sides on scroll */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, idx) => (
              <motion.blockquote
                key={item.attribution}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="flex flex-col justify-between rounded-xl border border-[#eceff8] bg-white p-6 sm:p-7 shadow-xs"
              >
                <div>
                  <span className="inline-block rounded bg-[#e6faf2] px-2.5 py-1 text-xs font-bold text-[#072366]">
                    {item.issueTag}
                  </span>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#454d72]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <footer className="mt-6 flex items-center gap-3.5 border-t border-[#eceff8] pt-4">
                  {/* Abstract SVG geometric avatar placeholder */}
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#072366] to-[#09cc7f] text-sm font-extrabold text-white"
                  >
                    <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
                      <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                      <polygon
                        points="20,8 30,28 10,28"
                        fill="rgba(255,255,255,0.22)"
                      />
                      <text
                        x="20"
                        y="24"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="800"
                      >
                        {item.initials}
                      </text>
                    </svg>
                  </div>
                  <div>
                    <cite className="not-italic text-base font-bold text-[#072366]">
                      {item.attribution}
                    </cite>
                    <p className="text-xs text-[#57667e]">Verified Legal Aid Beneficiary</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER ORGANISATIONS LISTED AS TEXT */}
      <section aria-labelledby="partners-heading" className="bg-white py-14 sm:py-16 border-t border-[#eceff8]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-[#069c60]">
              Justice Ecosystem
            </span>
            <h2
              id="partners-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#072366]"
            >
              Partner &amp; Referral Organisations
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PARTNER_ORGANISATIONS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-[#eceff8] bg-[#f8fcff] p-6"
              >
                <h3 className="text-lg sm:text-xl font-extrabold text-[#072366]">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#57667e]">
                  {partner.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMINENT EMERGENCY CONTACTS SECTION (0800 720 090 & 116) */}
      <EmergencyContactsSection />
    </div>
  )
}
