'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const VOICE_SCRIPT =
  'Welcome to Deborah Aid. We believe every Kenyan deserves access to justice, regardless of their income. Deborah Aid is a free directory that connects you with pro bono lawyers, legal clinics, and paralegal volunteers across all 47 counties. Whether you are dealing with a land dispute, an employment issue, or a family matter, you can find verified help here at no cost. Scroll down to search for legal support near you.'

export default function VoiceTour() {
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(false)
  const [tourEnded, setTourEnded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const hasAutoRunRef = useRef(false)

  const speakScript = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(VOICE_SCRIPT)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.lang = 'en-KE'

    utterance.onstart = () => {
      setSpeaking(true)
      setMuted(false)
    }

    utterance.onend = () => {
      setSpeaking(false)
      setTourEnded(true)
    }

    utterance.onerror = () => {
      setSpeaking(false)
      setTourEnded(true)
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('deborah-aid-voice-ran') === 'true') {
      hasAutoRunRef.current = true
      setTourEnded(true)
      return
    }

    const triggerOnce = () => {
      if (hasAutoRunRef.current) return
      hasAutoRunRef.current = true
      sessionStorage.setItem('deborah-aid-voice-ran', 'true')
      speakScript()
    }

    window.addEventListener('scroll', triggerOnce, { once: true, passive: true })
    window.addEventListener('click', triggerOnce, { once: true })

    return () => {
      window.removeEventListener('scroll', triggerOnce)
      window.removeEventListener('click', triggerOnce)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [speakScript])

  const handleToggle = () => {
    hasAutoRunRef.current = true
    sessionStorage.setItem('deborah-aid-voice-ran', 'true')

    if (speaking && !muted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setSpeaking(false)
      setMuted(true)
      return
    }

    setMuted(false)
    speakScript()
  }

  const tooltipText = tourEnded && !speaking ? 'Replay tour' : 'Hear what this site is about'

  return (
    <div className="bottom-safe fixed left-6 z-[9998] flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label="Site voice tour, click to mute"
        title={tooltipText}
        className="relative flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#072366] text-white shadow-[0_10px_25px_rgba(7,35,102,0.3)] transition hover:bg-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        {speaking && (
          <span
            aria-hidden="true"
            className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full border-2 border-[#09cc7f]"
          />
        )}
        {muted ? (
          <VolumeX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Volume2 className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {hovered && (
        <span
          role="tooltip"
          className="ml-3 whitespace-nowrap rounded-md bg-[#072366] px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        >
          {tooltipText}
        </span>
      )}
    </div>
  )
}
