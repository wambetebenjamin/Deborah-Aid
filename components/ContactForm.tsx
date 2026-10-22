'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import {
  getRecaptchaV3Token,
  RecaptchaV2Fallback,
} from '@/components/RecaptchaV2Fallback'

const SUBJECT_OPTIONS = [
  'General Enquiry',
  'Report an Issue',
  'Provider Submission Follow-up',
  'Partnership',
] as const

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<(typeof SUBJECT_OPTIONS)[number]>('General Enquiry')
  const [message, setMessage] = useState('')
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
      const recaptchaToken = await getRecaptchaV3Token('contact_enquiry')
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
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
        setErrorMessage(data.error || 'Please review your form inputs and try again.')
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors)
        }
        setSubmitting(false)
        return
      }

      setSuccessMessage(data.message)
      setName('')
      setEmail('')
      setMessage('')
      setRequiresV2(false)
      setV2Token('')
    } catch {
      setErrorMessage(
        'Connection interrupted. Please try again or reach us directly via WhatsApp (+254 112 272 061).'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-xl border border-[#eceff8] bg-[#f7fdff] p-6 sm:p-8 shadow-xs">
      <h2 className="text-xl sm:text-2xl font-extrabold text-[#072366]">
        Send Us a Message
      </h2>
      <p className="mt-1 text-sm sm:text-base text-[#57667e]">
        Share feedback, report outdated clinic hours, follow up on a listing, or explore partnerships.
      </p>

      {successMessage ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-[#09cc7f] bg-white p-6"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#09cc7f]" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold text-[#072366]">Enquiry Received</h3>
              <p className="mt-1 text-sm sm:text-base text-[#57667e]">{successMessage}</p>
              <button
                type="button"
                onClick={() => setSuccessMessage('')}
                className="boxed-btn-charity mt-4 min-h-[44px] min-w-[44px] rounded-md px-5 py-2 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {errorMessage && (
            <div
              role="alert"
              className="rounded-md border border-[#dc3545]/40 bg-white px-4 py-3 text-sm font-semibold text-[#b02a37]"
            >
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold text-[#072366]">
                Your Name <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kamau Njoroge"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.name?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.name[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-bold text-[#072366]">
                Email Address <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              />
              {fieldErrors.email?.[0] && (
                <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.email[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm font-bold text-[#072366]">
              Subject <span className="text-[#dc3545]">*</span>
            </label>
            <select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value as (typeof SUBJECT_OPTIONS)[number])}
              className="mt-1.5 w-full min-h-[48px] rounded-md border border-[#d6deee] bg-white px-4 py-2.5 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-bold text-[#072366]">
              Message <span className="text-[#dc3545]">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question, feedback, or partnership message here..."
              className="mt-1.5 w-full rounded-md border border-[#d6deee] bg-white p-4 text-base text-[#10285d] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            />
            {fieldErrors.message?.[0] && (
              <p className="mt-1 text-xs font-semibold text-[#b02a37]">{fieldErrors.message[0]}</p>
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
            className="btn-charity inline-flex min-h-[50px] min-w-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-md px-8 py-3 text-base font-bold disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {submitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}
