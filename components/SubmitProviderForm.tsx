'use client'

import { useState } from 'react'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { KENYA_COUNTIES } from '@/data/counties'
import { ISSUE_CATEGORIES } from '@/data/categories'
import { ProviderType, SupportedLanguage } from '@/data/providers'
import {
  getRecaptchaV3Token,
  RecaptchaV2Fallback,
} from '@/components/RecaptchaV2Fallback'

const PROVIDER_TYPES: ProviderType[] = [
  'Law Firm',
  'Legal Clinic',
  'Paralegal',
  'NGO Legal Service',
]

const LANGUAGES: SupportedLanguage[] = ['English', 'Kiswahili']

export default function SubmitProviderForm() {
  const [organisationName, setOrganisationName] = useState('')
  const [type, setType] = useState<ProviderType>('Legal Clinic')
  const [county, setCounty] = useState('Nairobi')
  const [physicalAddress, setPhysicalAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [languages, setLanguages] = useState<SupportedLanguage[]>(['English', 'Kiswahili'])
  const [issueAreas, setIssueAreas] = useState<string[]>(['Land Disputes'])
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [requiresV2, setRequiresV2] = useState(false)
  const [v2Token, setV2Token] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const toggleLanguage = (lang: SupportedLanguage) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

  const toggleIssueArea = (label: string) => {
    setIssueAreas((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setFieldErrors({})

    try {
      const recaptchaToken = await getRecaptchaV3Token('provider_submit')
      const response = await fetch('/api/providers/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organisationName,
          type,
          county,
          physicalAddress,
          phone,
          email,
          languages,
          issueAreas,
          website,
          description,
          recaptchaToken,
          recaptchaV2Token: v2Token || undefined,
        }),
      })

      const data = await response.json()

      if (response.status === 428 || data.requiresV2) {
        setRequiresV2(true)
        setErrorMessage(
          data.error || 'Please complete the checkbox verification below and submit again.'
        )
        setSubmitting(false)
        return
      }

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Please review the highlighted fields below.')
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors)
        }
        setSubmitting(false)
        return
      }

      setSuccessMessage(data.message)
      setOrganisationName('')
      setPhysicalAddress('')
      setPhone('')
      setEmail('')
      setWebsite('')
      setDescription('')
      setRequiresV2(false)
      setV2Token('')
    } catch {
      setErrorMessage('Network error while submitting listing. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-[#eceff8] bg-white p-6 sm:p-10 shadow-xs">
      {/* Review Notice Banner */}
      <div className="mb-8 rounded-lg border-l-4 border-[#09cc7f] bg-[#f8fcff] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#09cc7f]" aria-hidden="true" />
          <p className="text-sm sm:text-base font-medium text-[#10285d]">
            <strong className="font-bold text-[#072366]">Verification Policy: </strong>
            All provider submissions are reviewed before going live. Our team confirms Law Society of Kenya practising status, NGO/CSO registration, or legal aid clinic accreditation to protect Kenyans seeking free help.
          </p>
        </div>
      </div>

      {successMessage ? (
        <div
          role="status"
          className="rounded-xl border border-[#09cc7f] bg-[#f8fcff] p-6 sm:p-8 text-center"
        >
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#09cc7f]" aria-hidden="true" />
          <h2 className="mt-3 text-xl sm:text-2xl font-extrabold text-[#072366]">
            Application Submitted for Review
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[#57667e]">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="btn-charity mt-6 inline-flex min-h-[46px] min-w-[44px] items-center justify-center rounded-md px-6 py-2.5 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            Submit Another Branch or Clinic
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {errorMessage && (
            <div
              role="alert"
              className="rounded-md border border-[#dc3545]/40 bg-[#fff8f8] px-4 py-3 text-sm font-semibold text-[#b02a37]"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="org-name"
                className="block text-sm font-bold text-[#072366]"
              >
                Organisation or Chamber Name <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="org-name"
                type="text"
                required
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                placeholder="e.g. Rift Valley Pro Bono Legal Clinic"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.organisationName?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                  {fieldErrors.organisationName[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="org-type"
                className="block text-sm font-bold text-[#072366]"
              >
                Provider Type <span className="text-[#dc3545]">*</span>
              </label>
              <select
                id="org-type"
                value={type}
                onChange={(e) => setType(e.target.value as ProviderType)}
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                {PROVIDER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="org-county"
                className="block text-sm font-bold text-[#072366]"
              >
                Primary County <span className="text-[#dc3545]">*</span>
              </label>
              <select
                id="org-county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                {KENYA_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="org-address"
                className="block text-sm font-bold text-[#072366]"
              >
                Physical Address <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="org-address"
                type="text"
                required
                value={physicalAddress}
                onChange={(e) => setPhysicalAddress(e.target.value)}
                placeholder="Street, building, floor, town"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.physicalAddress?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                  {fieldErrors.physicalAddress[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="org-phone"
                className="block text-sm font-bold text-[#072366]"
              >
                Intake Phone Number <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="org-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 712 345 678"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.phone?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                  {fieldErrors.phone[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="org-email"
                className="block text-sm font-bold text-[#072366]"
              >
                Official Email Address <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="org-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="intake@organisation.or.ke"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.email?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Languages Checkboxes */}
          <fieldset>
            <legend className="text-sm font-bold text-[#072366]">
              Languages Spoken at Intake <span className="text-[#dc3545]">*</span>
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-3">
              {LANGUAGES.map((lang) => (
                <label
                  key={lang}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-md border border-[#d6deee] bg-[#f8fcff] px-4 py-2 text-base font-medium text-[#10285d]"
                >
                  <input
                    type="checkbox"
                    checked={languages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                    className="h-5 w-5 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  />
                  {lang}
                </label>
              ))}
            </div>
            {fieldErrors.languages?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                {fieldErrors.languages[0]}
              </p>
            )}
          </fieldset>

          {/* Issue Areas Checkboxes */}
          <fieldset>
            <legend className="text-sm font-bold text-[#072366]">
              Legal Issue Areas Covered <span className="text-[#dc3545]">*</span>
            </legend>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ISSUE_CATEGORIES.map((cat) => (
                <label
                  key={cat.key}
                  className="flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-md border border-[#d6deee] bg-[#f8fcff] px-3.5 py-2 text-sm font-semibold text-[#10285d]"
                >
                  <input
                    type="checkbox"
                    checked={issueAreas.includes(cat.homeLabel)}
                    onChange={() => toggleIssueArea(cat.homeLabel)}
                    className="h-5 w-5 shrink-0 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  />
                  <span>{cat.homeLabel}</span>
                </label>
              ))}
            </div>
            {fieldErrors.issueAreas?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                {fieldErrors.issueAreas[0]}
              </p>
            )}
          </fieldset>

          <div>
            <label
              htmlFor="org-website"
              className="block text-sm font-bold text-[#072366]"
            >
              Website URL (Optional)
            </label>
            <input
              id="org-website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.yourclinic.or.ke"
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.website?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                {fieldErrors.website[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="org-description"
              className="block text-sm font-bold text-[#072366]"
            >
              Brief Description of Free / Pro Bono Services <span className="text-[#dc3545]">*</span>
            </label>
            <textarea
              id="org-description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe eligibility criteria, clinic walk-in days, languages supported, and types of assistance offered free of charge..."
              className="mt-1.5 w-full rounded-md border border-[#d6deee] bg-white p-4 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.description?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                {fieldErrors.description[0]}
              </p>
            )}
          </div>

          <RecaptchaV2Fallback
            visible={requiresV2}
            verified={Boolean(v2Token)}
            onVerify={setV2Token}
          />

          <button
            type="submit"
            disabled={submitting}
            className="btn-charity flex min-h-[52px] min-w-[44px] w-full sm:w-auto items-center justify-center rounded-md px-8 py-3.5 text-base font-bold disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {submitting ? 'Submitting Provider Application...' : 'Submit Provider for Review'}
          </button>
        </form>
      )}
    </div>
  )
}
