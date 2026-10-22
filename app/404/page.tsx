import type { Metadata } from 'next'
import NotFound from '@/app/not-found'

export const metadata: Metadata = {
  title: '404 Page Not Found',
}

export default function Custom404Page() {
  return <NotFound />
}
