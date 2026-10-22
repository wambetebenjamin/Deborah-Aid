'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showSkipHint, setShowSkipHint] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    if (sessionStorage.getItem('deborah-aid-loaded') === 'true') {
      setVisible(false)
      return
    }

    const skipTimer = window.setTimeout(() => {
      setShowSkipHint(true)
    }, 3000)

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval)
          sessionStorage.setItem('deborah-aid-loaded', 'true')
          window.setTimeout(() => setVisible(false), 260)
          return 100
        }
        return Math.min(100, prev + 8)
      })
    }, 75)

    return () => {
      window.clearTimeout(skipTimer)
      window.clearInterval(interval)
    }
  }, [])

  const handleSkip = () => {
    sessionStorage.setItem('deborah-aid-loaded', 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader-active"
          role="status"
          aria-live="polite"
          aria-label={`Loading Deborah Aid ${progress}%`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f7f7f7] px-4"
        >
          {reducedMotion ? (
            <div className="text-center">
              <p className="text-xl font-bold text-[#072366]">Loading Deborah Aid: {progress}%</p>
              <button
                type="button"
                onClick={handleSkip}
                className="mt-4 min-h-[44px] min-w-[88px] rounded-md border border-[#072366] bg-white px-4 py-2 text-sm font-semibold text-[#072366] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Skip
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* CharityWorks circular preloader frame with balancing SVG weighing scales */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_6px_24px_rgba(7,35,102,0.09)]">
                <span
                  aria-hidden="true"
                  className="cw-preloader-ring pointer-events-none absolute inset-0 rounded-full border-2 border-transparent border-t-[#09cc7f]"
                />
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Pillar & Base */}
                  <line x1="40" y1="16" x2="40" y2="64" stroke="#072366" strokeWidth="3" strokeLinecap="round" />
                  <path d="M26 65H54" stroke="#072366" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="40" cy="15" r="3.5" fill="#09cc7f" />

                  {/* Gently Balancing Beam & Pans */}
                  <motion.g
                    initial={{ rotate: -9 }}
                    animate={{ rotate: [9, -6, 3, 0] }}
                    transition={{ duration: 1.15, ease: 'easeInOut' }}
                    style={{ originX: '40px', originY: '20px' }}
                  >
                    <line x1="15" y1="20" x2="65" y2="20" stroke="#09cc7f" strokeWidth="2.8" strokeLinecap="round" />
                    {/* Left Scale Pan */}
                    <line x1="18" y1="20" x2="12" y2="41" stroke="#072366" strokeWidth="1.6" />
                    <line x1="18" y1="20" x2="24" y2="41" stroke="#072366" strokeWidth="1.6" />
                    <path d="M10 41C10 45.5 26 45.5 26 41H10Z" fill="#09cc7f" />
                    {/* Right Scale Pan */}
                    <line x1="62" y1="20" x2="56" y2="41" stroke="#072366" strokeWidth="1.6" />
                    <line x1="62" y1="20" x2="68" y2="41" stroke="#072366" strokeWidth="1.6" />
                    <path d="M54 41C54 45.5 70 45.5 70 41H54Z" fill="#09cc7f" />
                  </motion.g>
                </svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="mt-5 text-center"
              >
                <span className="text-2xl font-extrabold tracking-tight text-[#002d5b]">
                  Deborah Aid<span className="text-[#09cc7f]">.</span>
                </span>
                <p className="mt-1 text-sm font-medium text-[#57667e]">
                  Justice is for everyone ({progress}%)
                </p>
              </motion.div>

              <button
                type="button"
                onClick={handleSkip}
                className={`mt-5 min-h-[44px] min-w-[100px] rounded-md border border-[#072366]/20 bg-white px-5 py-2 text-sm font-semibold text-[#072366] transition hover:border-[#09cc7f] hover:text-[#09cc7f] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                  showSkipHint ? 'opacity-100 ring-2 ring-[#09cc7f]' : 'opacity-85'
                }`}
              >
                Skip Intro
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
