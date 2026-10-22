import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import LoadingScreen from '@/components/LoadingScreen'
import CookieConsent from '@/components/CookieConsent'
import WhatsAppButton from '@/components/WhatsAppButton'
import VoiceTour from '@/components/VoiceTour'
import { RecaptchaScriptLoader } from '@/components/RecaptchaV2Fallback'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    default: 'Deborah Aid | Justice is for everyone.',
    template: '%s | Deborah Aid',
  },
  description:
    'Free legal aid directory connecting low-income Kenyans with verified pro bono lawyers, legal clinics, community paralegals, and Know Your Rights resources across all 47 counties.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-[#10285d] antialiased">
        <LoadingScreen />
        <SmoothScroll />
        <RecaptchaScriptLoader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:rounded-md focus:bg-[#072366] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <VoiceTour />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
