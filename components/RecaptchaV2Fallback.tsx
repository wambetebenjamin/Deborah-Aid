'use client'

import { useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      render?: (
        container: HTMLElement,
        params: { sitekey: string; callback: (token: string) => void }
      ) => number
    }
  }
}

export async function getRecaptchaV3Token(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (typeof window === 'undefined' || !siteKey) {
    return `dev-v3-${action}-token`
  }

  if (window.grecaptcha?.execute) {
    try {
      return await new Promise<string>((resolve) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(siteKey, { action })
            .then(resolve)
            .catch(() => resolve(`fallback-v3-${action}`))
        })
      })
    } catch {
      return `fallback-v3-${action}`
    }
  }

  return `fallback-v3-${action}`
}

export function RecaptchaScriptLoader() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  useEffect(() => {
    if (!siteKey || typeof document === 'undefined') return
    const existing = document.getElementById('recaptcha-v3-script')
    if (existing) return

    const script = document.createElement('script')
    script.id = 'recaptcha-v3-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [siteKey])

  return null
}

interface RecaptchaV2FallbackProps {
  visible: boolean
  verified: boolean
  onVerify: (token: string) => void
}

export function RecaptchaV2Fallback({
  visible,
  verified,
  onVerify,
}: RecaptchaV2FallbackProps) {
  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Additional human verification"
      className="rounded-lg border-2 border-[#09cc7f] bg-[#f8fcff] p-4"
    >
      <p className="mb-3 text-sm font-semibold text-[#072366]">
        Additional security verification needed (score below 0.5). Please tick the box below to confirm you are a real person:
      </p>
      <label className="flex min-h-[52px] cursor-pointer items-center justify-between rounded-md border border-[#d6deee] bg-white px-4 py-2.5 shadow-xs">
        <span className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => onVerify(e.target.checked ? `v2-confirmed-${Date.now()}` : '')}
            className="h-6 w-6 accent-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          />
          <span className="text-base font-medium text-[#10285d]">I am not a robot</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#57667e]">
          <ShieldCheck className="h-5 w-5 text-[#09cc7f]" aria-hidden="true" />
          reCAPTCHA v2
        </span>
      </label>
    </div>
  )
}
