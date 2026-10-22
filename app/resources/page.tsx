import type { Metadata } from 'next'
import ResourcesLibraryClient from '@/components/ResourcesLibraryClient'

export const metadata: Metadata = {
  title: 'Know Your Rights Library',
  description:
    'Free plain-language Kenyan legal rights guides, demand letter templates, FAQs, and checklists in English and Kiswahili.',
}

interface ResourcesPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams
  return <ResourcesLibraryClient initialCategory={params.category} />
}
