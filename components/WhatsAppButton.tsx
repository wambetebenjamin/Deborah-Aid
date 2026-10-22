'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_HREF =
  'https://wa.me/254112272061?text=Hi%20Deborah%20Aid%2C%20I%20need%20help%20finding%20legal%20support'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="bottom-safe fixed right-6 z-[9998] flex items-center">
      {hovered && (
        <span
          role="tooltip"
          className="mr-3 whitespace-nowrap rounded-md bg-[#072366] px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        >
          Chat with us on WhatsApp
        </span>
      )}

      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{
          scale: [0.85, 1.12, 1],
          opacity: 1,
        }}
        transition={{
          duration: 0.75,
          ease: 'easeOut',
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex h-14 w-14 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#09cc7f] text-white shadow-[0_10px_25px_rgba(9,204,127,0.4)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        <motion.span
          aria-hidden="true"
          initial={{ scale: 1, opacity: 0.75 }}
          animate={{ scale: [1, 1.5, 1.6], opacity: [0.7, 0.25, 0] }}
          transition={{ duration: 1.4, repeat: 2, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#09cc7f]"
        />
        <MessageCircle className="h-6 w-6 fill-current" aria-hidden="true" />
      </motion.a>
    </div>
  )
}
