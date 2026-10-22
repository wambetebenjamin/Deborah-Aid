export type CanonicalCategoryKey =
  | 'land'
  | 'employment'
  | 'family'
  | 'criminal'
  | 'consumer'
  | 'gbv'
  | 'tenancy'
  | 'business'

export interface IssueCategoryMeta {
  key: CanonicalCategoryKey
  homeLabel: string
  resourceLabel: string
  swahiliLabel: string
  shortDescription: string
  iconName:
    | 'MapPin'
    | 'Briefcase'
    | 'Users'
    | 'Scale'
    | 'ShieldCheck'
    | 'HeartHandshake'
    | 'Home'
    | 'Building2'
}

export const ISSUE_CATEGORIES: IssueCategoryMeta[] = [
  {
    key: 'land',
    homeLabel: 'Land Disputes',
    resourceLabel: 'Land',
    swahiliLabel: 'Migogoro ya Ardhi',
    shortDescription: 'Title deeds, succession land shares, boundary claims, and unlawful eviction.',
    iconName: 'MapPin',
  },
  {
    key: 'employment',
    homeLabel: 'Employment Rights',
    resourceLabel: 'Employment',
    swahiliLabel: 'Haki za Wafanyakazi',
    shortDescription: 'Unfair dismissal, unpaid wages, NSSF or SHIF deductions, and workplace safety.',
    iconName: 'Briefcase',
  },
  {
    key: 'family',
    homeLabel: 'Family Law',
    resourceLabel: 'Family',
    swahiliLabel: 'Sheria ya Familia',
    shortDescription: 'Child maintenance, custody, matrimonial property, and succession petitions.',
    iconName: 'Users',
  },
  {
    key: 'criminal',
    homeLabel: 'Criminal Defence',
    resourceLabel: 'Criminal',
    swahiliLabel: 'Utetezi wa Jinai',
    shortDescription: 'Arrest rights, police bond, bail applications, and fair trial representation.',
    iconName: 'Scale',
  },
  {
    key: 'consumer',
    homeLabel: 'Consumer Rights',
    resourceLabel: 'Consumer',
    swahiliLabel: 'Haki za Watumiaji',
    shortDescription: 'Defective goods, predatory digital loans, unfair billing, and refunds.',
    iconName: 'ShieldCheck',
  },
  {
    key: 'gbv',
    homeLabel: 'Gender-Based Violence',
    resourceLabel: 'Gender-Based Violence',
    swahiliLabel: 'Ukatili wa Kijinsia',
    shortDescription: 'Protection orders, urgent safe referrals, survivor support, and legal aid.',
    iconName: 'HeartHandshake',
  },
  {
    key: 'tenancy',
    homeLabel: 'Tenant Rights',
    resourceLabel: 'Tenancy',
    swahiliLabel: 'Haki za Wapangaji',
    shortDescription: 'Illegal lockouts, rent deposits, notice periods, and Rent Restriction Tribunal help.',
    iconName: 'Home',
  },
  {
    key: 'business',
    homeLabel: 'Business Disputes',
    resourceLabel: 'Business',
    swahiliLabel: 'Migogoro ya Biashara',
    shortDescription: 'Small Claims Court debt recovery, supplier contracts, chama disputes, and county permits.',
    iconName: 'Building2',
  },
]

export function normalizeCategoryKey(input?: string | null): CanonicalCategoryKey | null {
  if (!input) return null
  const cleaned = decodeURIComponent(input).trim().toLowerCase()
  if (!cleaned || cleaned === 'all') return null

  const found = ISSUE_CATEGORIES.find(
    (c) =>
      c.key === cleaned ||
      c.homeLabel.toLowerCase() === cleaned ||
      c.resourceLabel.toLowerCase() === cleaned
  )
  return found ? found.key : null
}

export function getCategoryByKey(key: CanonicalCategoryKey): IssueCategoryMeta {
  return ISSUE_CATEGORIES.find((c) => c.key === key) || ISSUE_CATEGORIES[0]
}
