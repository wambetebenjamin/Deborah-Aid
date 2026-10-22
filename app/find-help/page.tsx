import type { Metadata } from 'next'
import FindHelpClient from '@/components/FindHelpClient'

export const metadata: Metadata = {
  title: 'Find Free Legal Help Across All 47 Counties',
  description:
    'Search pro bono lawyers, legal clinics, paralegals, and NGO legal aid desks across all 47 Kenyan counties by legal issue and language.',
}

interface FindHelpPageProps {
  searchParams: Promise<{
    category?: string
    county?: string
    q?: string
  }>
}

export default async function FindHelpPage({ searchParams }: FindHelpPageProps) {
  const params = await searchParams
  return (
    <FindHelpClient
      initialCategory={params.category}
      initialCounty={params.county}
      initialQuery={params.q}
    />
  )
}
