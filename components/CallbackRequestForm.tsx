'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, PhoneOutgoing } from 'lucide-react'
import { ISSUE_CATEGORIES } from '@/data/categories'
import {
  getRecaptchaV3Token,
  RecaptchaV2Fallback,
} from '@/components/RecaptchaV2Fallback'

interface CallbackRequestFormProps {
  providerSlug: string
  providerName: string
  defaultIssueCategory?: string
}

export default function CallbackRequestForm({
  providerSlug,
  providerName,
  defaultIssueCategory,
}: CallbackRequestFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [issueCategory, setIssueCategory] = useState(
    defaultIssueCategory || ISSUE_CATEGORIES[0].homeLabel
  )
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [requiresV2, setRequiresV2] = useState(false)
  const [v2Token, setV2Token] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setFieldErrors({})

    try {
      const recaptchaToken = await getRecaptchaV3Token('callback_request')
      const response = await fetch('/api/callback/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerSlug,
          providerName,
          name,
          phone,
          email,
          issueCategory,
          description,
          recaptchaToken,
          recaptchaV2Token: v2Token || undefined,
        }),
      })

      const data = await response.json()

      if (response.status === 428 || data.requiresV2) {
        setRequiresV2(true)
        setErrorMessage(
          data.error || 'Please tick the verification checkbox below and submit again.'
        )
        setSubmitting(false)
        return
      }

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Please check the form details below.')
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors)
        }
        setSubmitting(false)
        return
      }

      setSuccessMessage(data.message)
      setName('')
      setPhone('')
      setEmail('')
      setDescription('')
      setRequiresV2(false)
      setV2Token('')
    } catch {
      setErrorMessage(
        'Connection interrupted. Please try again or message us on WhatsApp at +254 112 272 061.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-[#eceff8] bg-[#f7fdff] p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6faf2] text-[#09cc7f]">
          <PhoneOutgoing className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
            Request a Free Callback
          </h2>
          <p className="text-sm text-[#57667e]">
            Ask <strong>{providerName}</strong> to call your line at zero cost.
          </p>
        </div>
      </div>

      {successMessage ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-[#09cc7f] bg-white p-5 text-[#10285d]"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#09cc7f]" aria-hidden="true" />
            <div>
              <p className="font-bold text-[#072366]">Callback Request Sent</p>
              <p className="mt-1 text-sm sm:text-base text-[#57667e]">{successMessage}</p>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="boxed-btn-charity mt-4 min-h-[44px] min-w-[44px] rounded-md px-4 py-2 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Send Another Request
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Animation 8: Callback request form fields sequential fade-in on mount */
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {errorMessage && (
            <div
              role="alert"
              className="rounded-md border border-[#dc3545]/40 bg-white px-4 py-3 text-sm font-semibold text-[#b02a37]"
            >
              {errorMessage}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <label htmlFor="cb-name" className="block text-sm font-bold text-[#072366]">
              Your Full Name <span className="text-[#dc3545]">*</span>
            </label>
            <input
              id="cb-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Achieng Otieno"
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.name?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.name[0]}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <label htmlFor="cb-phone" className="block text-sm font-bold text-[#072366]">
              Phone Number for Callback <span className="text-[#dc3545]">*</span>
            </label>
            <input
              id="cb-phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0712 345 678"
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.phone?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.phone[0]}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
          >
            <label htmlFor="cb-email" className="block text-sm font-bold text-[#072366]">
              Email Address (Optional, for written confirmation)
            </label>
            <input
              id="cb-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.email?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.email[0]}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 }}
          >
            <label htmlFor="cb-category" className="block text-sm font-bold text-[#072366]">
              Issue Category <span className="text-[#dc3545]">*</span>
            </label>
            <select
              id="cb-category"
              name="issueCategory"
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value)}
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              {ISSUE_CATEGORIES.map((cat) => (
                <option key={cat.key} value={cat.homeLabel}>
                  {cat.homeLabel}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <label htmlFor="cb-description" className="block text-sm font-bold text-[#072366]">
              Brief Description of Your Issue <span className="text-[#dc3545]">*</span>
            </label>
            <textarea
              id="cb-description"
              name="description"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened, the county involved, and any upcoming court or notice date..."
              className="mt-1.5 w-full rounded-md border border-[#d6deee] bg-white p-4 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.description?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">
                {fieldErrors.description[0]}
              </p>
            )}
          </motion.div>

          <RecaptchaV2Fallback
            visible={requiresV2}
            verified={Boolean(v2Token)}
            onVerify={setV2Token}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.36 }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="btn-charity flex min-h-[50px] min-w-[44px] w-full items-center justify-center rounded-md px-6 py-3 text-base font-bold disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              {submitting ? 'Submitting Callback Request...' : 'Request Free Callback'}
            </button>
            <p className="mt-2.5 text-xs text-[#57667e]">
              Protected by Google reCAPTCHA v3. Personal information is used solely to connect you with legal support under the Kenya Data Protection Act, 2019.
            </p>
          </motion.div>
        </form>
      )}
    </div>
  )
}
