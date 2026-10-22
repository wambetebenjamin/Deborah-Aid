'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyTemplateButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="boxed-btn-charity inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-md px-4 py-2 text-xs sm:text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[#09cc7f]" aria-hidden="true" />
          Template Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy Letter Template
        </>
      )}
    </button>
  )
}
