'use client'

import { useState } from 'react'

export default function CookiePreferencesReset() {
  const [resetDone, setResetDone] = useState(false)

  const handleReset = () => {
    try {
      window.localStorage.removeItem('deborah-aid-cookie-consent')
      setResetDone(true)
      window.location.reload()
    } catch {
      setResetDone(true)
    }
  }

  return (
    <div className="rounded-lg border border-[#d6deee] bg-[#f8fcff] p-4 sm:p-5">
      <p className="text-sm sm:text-base text-[#10285d]">
        Want to change your previous analytics choice right now? Resetting re-opens the Cookie Banner immediately at the bottom of your screen.
      </p>
      <button
        type="button"
        onClick={handleReset}
        className="boxed-btn-charity mt-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-5 py-2 text-sm font-bold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        {resetDone ? 'Preferences Reset' : 'Reset Cookie Preference'}
      </button>
    </div>
  )
}
