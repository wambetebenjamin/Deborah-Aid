import { CanonicalCategoryKey } from './categories'

export type ProviderType = 'Law Firm' | 'Legal Clinic' | 'Paralegal' | 'NGO Legal Service'
export type SupportedLanguage = 'English' | 'Kiswahili'
export type AccessMethod = 'Walk-in' | 'Appointment' | 'Online Request'

export interface LegalProvider {
  slug: string
  name: string
  type: ProviderType
  county: string
  servesAllCounties?: boolean
  physicalAddress: string
  phone: string
  email: string
  website?: string
  languages: SupportedLanguage[]
  categoryKeys: CanonicalCategoryKey[]
  issueAreas: string[]
  operatingHours: string
  accessMethods: AccessMethod[]
  accessInstructions: string
  description: string
  eligibilityNote: string
  verifiedYear: number
}

export const LEGAL_PROVIDERS: LegalProvider[] = [
  {
    slug: 'kituo-cha-sheria-nairobi-clinic',
    name: 'Kituo Cha Sheria Community Justice Centre',
    type: 'NGO Legal Service',
    county: 'Nairobi',
    servesAllCounties: true,
    physicalAddress: 'Ole Odume Road, off Argwings Kodhek Road, Kilimani, Nairobi',
    phone: '+254 720 806 531',
    email: 'intake@kituojustice-ke.org',
    website: 'https://kituochasheria.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['land', 'employment', 'tenancy', 'criminal'],
    issueAreas: ['Land Disputes', 'Employment Rights', 'Tenant Rights', 'Criminal Defence'],
    operatingHours: 'Monday to Friday, 8:00 AM to 5:00 PM',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Walk-in legal aid screening runs Monday, Wednesday, and Friday mornings starting at 8:00 AM. Carry copies of any contracts, court summons, demand letters, or police OB numbers. Residents outside Nairobi can request a telephone callback or mobile SMS guidance.',
    description:
      'Provides free legal advice, document drafting, mediation support, and pro bono court representation for low-income workers, informal settlement tenants, and families facing unlawful land dispossession across Kenya.',
    eligibilityNote: 'Open free of charge to low-income individuals earning below KES 30,000 per month or facing urgent human rights violations.',
    verifiedYear: 2026,
  },
  {
    slug: 'fida-kenya-womens-legal-aid-nairobi',
    name: 'FIDA Kenya Women Legal Aid Clinic',
    type: 'NGO Legal Service',
    county: 'Nairobi',
    servesAllCounties: true,
    physicalAddress: 'Amboseli Road, off Gitanga Road, Lavington, Nairobi',
    phone: '+254 800 720 501',
    email: 'legalaid@fidaclinic-ke.org',
    website: 'https://www.fidakenya.org',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['gbv', 'family', 'land'],
    issueAreas: ['Gender-Based Violence', 'Family Law', 'Land Disputes'],
    operatingHours: 'Monday to Friday, 8:30 AM to 4:30 PM (Toll-free helpline open daily)',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Survivors requiring urgent protection orders are seen the same day without prior booking. Self-representation workshops and family mediation sessions can be scheduled by calling the toll-free desk or submitting a callback request below.',
    description:
      'Dedicated legal aid service supporting women and children across Kenya with domestic violence protection orders, child maintenance petitions, custody agreements, matrimonial property claims, and succession rights.',
    eligibilityNote: 'Free legal aid for women, girls, and indigent caregivers unable to afford private advocates.',
    verifiedYear: 2026,
  },
  {
    slug: 'coast-pro-bono-advocates-mombasa',
    name: 'Pwani Pro Bono Advocates Chamber',
    type: 'Law Firm',
    county: 'Mombasa',
    physicalAddress: '3rd Floor, Ambalal House, Nkrumah Road, Mombasa CBD',
    phone: '+254 711 442 890',
    email: 'probono@pwaniadvocates.co.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['land', 'tenancy', 'business', 'criminal'],
    issueAreas: ['Land Disputes', 'Tenant Rights', 'Business Disputes', 'Criminal Defence'],
    operatingHours: 'Monday to Friday, 8:30 AM to 5:00 PM',
    accessMethods: ['Appointment', 'Online Request'],
    accessInstructions:
      'Request a callback through Deborah Aid or telephone the pro bono clerk to receive a Thursday or Friday clinic slot. Please bring your National ID copy and all relevant title searches, leases, or charge sheets.',
    description:
      'Law Society of Kenya accredited advocates offering dedicated weekly pro bono hours for coastal residents dealing with community land tenure, Rent Restriction Tribunal disputes, bail applications, and micro-trader commercial claims.',
    eligibilityNote: 'Pro bono intake assessed on financial need; zero legal consultation or representation fee for qualifying applicants.',
    verifiedYear: 2026,
  },
  {
    slug: 'lake-basin-legal-clinic-kisumu',
    name: 'Victoria Basin Community Legal Clinic',
    type: 'Legal Clinic',
    county: 'Kisumu',
    physicalAddress: 'Ground Floor, Mega Plaza Wing B, Oginga Odinga Street, Kisumu',
    phone: '+254 733 519 204',
    email: 'helpdesk@victorialegalclinic.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['family', 'land', 'employment', 'gbv'],
    issueAreas: ['Family Law', 'Land Disputes', 'Employment Rights', 'Gender-Based Violence'],
    operatingHours: 'Monday to Friday, 8:00 AM to 4:30 PM; Saturday 9:00 AM to 12:30 PM',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Walk in any weekday morning or Saturday morning, or submit an online callback request so a paralegal officer can review your documents ahead of your visit.',
    description:
      'Serves widows, domestic workers, fishermen, and low-income households around Kisumu and neighbouring Lake Region counties with succession cause filings, land family mediation, unfair dismissal claims, and protection orders.',
    eligibilityNote: 'Completely free clinic services; clients only pay statutory court filing fees if not waived by the court registrar.',
    verifiedYear: 2026,
  },
  {
    slug: 'rift-valley-paralegal-network-nakuru',
    name: 'Rift Valley Community Paralegal Network',
    type: 'Paralegal',
    county: 'Nakuru',
    physicalAddress: '2nd Floor, Gate House, Kenyatta Avenue, Nakuru City',
    phone: '+254 722 691 340',
    email: 'desk@riftparalegals.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['tenancy', 'consumer', 'land', 'family'],
    issueAreas: ['Tenant Rights', 'Consumer Rights', 'Land Disputes', 'Family Law'],
    operatingHours: 'Monday to Friday, 8:30 AM to 5:00 PM',
    accessMethods: ['Walk-in', 'Online Request'],
    accessInstructions:
      'Visit the community paralegal desk on Kenyatta Avenue for immediate plain-language guidance in English or Kiswahili, or request a callback for telephone triage.',
    description:
      'Trained community paralegals assisting tenants locked out illegally, borrowers harassed by unlicensed digital lenders, agricultural workers, and families preparing Children Court and succession paperwork.',
    eligibilityNote: 'Open to all members of the public at zero cost.',
    verifiedYear: 2026,
  },
  {
    slug: 'north-rift-justice-clinic-uasin-gishu',
    name: 'Eldoret Pro Bono Legal Aid Clinic',
    type: 'Legal Clinic',
    county: 'Uasin Gishu',
    physicalAddress: '1st Floor, KVDA Plaza, Oloo Street, Eldoret',
    phone: '+254 728 310 775',
    email: 'clinic@eldoretlegalaid.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['employment', 'land', 'business', 'consumer'],
    issueAreas: ['Employment Rights', 'Land Disputes', 'Business Disputes', 'Consumer Rights'],
    operatingHours: 'Monday to Friday, 8:30 AM to 4:30 PM',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Walk-in triage runs Tuesday and Thursday from 8:30 AM to 1:00 PM. Callback requests are answered within two working days.',
    description:
      'University-affiliated pro bono clinic supervised by practising High Court advocates, helping farm workers, market vendors, and families resolve wage arrears, subdivision disputes, and Small Claims Court filings.',
    eligibilityNote: 'Free legal assistance for low-income individuals and registered self-help groups.',
    verifiedYear: 2026,
  },
  {
    slug: 'mount-kenya-advocates-aid-nyeri',
    name: 'Wanjiru & Associates Pro Bono Desk',
    type: 'Law Firm',
    county: 'Nyeri',
    physicalAddress: 'Suite 204, Prestige Plaza, Kimathi Way, Nyeri Town',
    phone: '+254 714 908 212',
    email: 'aid@wanjiruadvocates.co.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['land', 'family', 'business'],
    issueAreas: ['Land Disputes', 'Family Law', 'Business Disputes'],
    operatingHours: 'Monday to Friday, 9:00 AM to 5:00 PM',
    accessMethods: ['Appointment', 'Online Request'],
    accessInstructions:
      'Submit a callback request or call our pro bono coordinator to schedule a 45-minute document review session.',
    description:
      'Private legal practice dedicating 20 percent of chamber hours to free representation in family land succession, coffee and dairy cooperative disputes, and Small Claims Court commercial matters.',
    eligibilityNote: 'Means-tested free representation for households without legal insurance or retained counsel.',
    verifiedYear: 2026,
  },
  {
    slug: 'northern-frontier-legal-aid-garissa',
    name: 'Northern Frontier Justice & Paralegal Aid',
    type: 'Paralegal',
    county: 'Garissa',
    physicalAddress: 'Community Resource Wing, Kismayo Road, Garissa Town',
    phone: '+254 725 480 119',
    email: 'support@northernjustice.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['criminal', 'gbv', 'family', 'land'],
    issueAreas: ['Criminal Defence', 'Gender-Based Violence', 'Family Law', 'Land Disputes'],
    operatingHours: 'Monday to Friday, 8:00 AM to 4:00 PM',
    accessMethods: ['Walk-in', 'Online Request'],
    accessInstructions:
      'Walk-in support is available daily at our Kismayo Road desk, with urgent police station paralegal accompaniment for arrested youths and survivors of violence.',
    description:
      'Community paralegal unit serving pastoralist families, women, and young people across Garissa, Wajir, and Mandera with bail applications, civil registration guidance, family mediation, and referral to pro bono advocates.',
    eligibilityNote: '100 percent free community paralegal support.',
    verifiedYear: 2026,
  },
  {
    slug: 'western-workers-justice-centre-kakamega',
    name: 'Ingo Workers & Tenants Legal Aid Clinic',
    type: 'Legal Clinic',
    county: 'Kakamega',
    physicalAddress: 'Ground Floor, Cannon Awori Street, opposite Muliro Gardens, Kakamega',
    phone: '+254 719 635 804',
    email: 'advice@ingolegalaid.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['employment', 'tenancy', 'consumer'],
    issueAreas: ['Employment Rights', 'Tenant Rights', 'Consumer Rights'],
    operatingHours: 'Monday to Friday, 8:30 AM to 5:00 PM',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Bring payslips, MPESA wage statements, rent receipts, or loan messages when visiting or let our intake paralegal call you back first.',
    description:
      'Assists domestic staff, security guards, sugar-belt casual workers, and urban tenants with unpaid terminal dues, unlawful rent distress, and unfair digital credit practices.',
    eligibilityNote: 'Free legal advice and demand letter drafting for all qualifying applicants.',
    verifiedYear: 2026,
  },
  {
    slug: 'lower-eastern-legal-aid-machakos',
    name: 'Ukambani Community Legal Aid NGO',
    type: 'NGO Legal Service',
    county: 'Machakos',
    physicalAddress: '1st Floor, Shanbad House, Syokimau Avenue, Machakos Town',
    phone: '+254 706 774 391',
    email: 'intake@ukambanilegalaid.or.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['land', 'family', 'consumer', 'business'],
    issueAreas: ['Land Disputes', 'Family Law', 'Consumer Rights', 'Business Disputes'],
    operatingHours: 'Monday to Friday, 8:00 AM to 5:00 PM',
    accessMethods: ['Walk-in', 'Appointment', 'Online Request'],
    accessInstructions:
      'Walk-in consultations run every weekday morning; outreach clinics rotate across Machakos, Kitui, and Makueni market days.',
    description:
      'Supports rural landholders, women groups, and small traders across Machakos, Makueni, and Kitui with fraudulent land sale prevention, succession grants, and Small Claims Court debt recovery.',
    eligibilityNote: 'Free to all low-income residents across Lower Eastern counties.',
    verifiedYear: 2026,
  },
  {
    slug: 'kilifi-coastal-paralegal-desk',
    name: 'Bahari Paralegal & Survivor Support Desk',
    type: 'Paralegal',
    county: 'Kilifi',
    physicalAddress: 'Biashara Street near Kilifi Law Courts, Kilifi Town',
    phone: '+254 717 209 653',
    email: 'help@bahariparalegals.or.ke',
    languages: ['Kiswahili', 'English'],
    categoryKeys: ['gbv', 'criminal', 'family', 'land'],
    issueAreas: ['Gender-Based Violence', 'Criminal Defence', 'Family Law', 'Land Disputes'],
    operatingHours: 'Monday to Friday, 8:00 AM to 4:30 PM',
    accessMethods: ['Walk-in', 'Online Request'],
    accessInstructions:
      'Situated two minutes from Kilifi Law Courts for immediate court user orientation in Kiswahili and English, P3 form follow-up guidance, and callback requests.',
    description:
      'Provides survivor-centred paralegal accompaniment, Children Court support, criminal plea rights education, and land dispute referrals for residents across Kilifi, Kwale, and Tana River.',
    eligibilityNote: 'Free service for all community members.',
    verifiedYear: 2026,
  },
  {
    slug: 'national-legal-aid-pro-bono-panel-nairobi',
    name: 'Haki Zetu Pro Bono Advocates Chambers',
    type: 'Law Firm',
    county: 'Kisii',
    servesAllCounties: true,
    physicalAddress: '2nd Floor, Gusii Deluxe Building, Hospital Road, Kisii Town',
    phone: '+254 702 885 416',
    email: 'desk@hakizetuchambers.co.ke',
    languages: ['English', 'Kiswahili'],
    categoryKeys: ['criminal', 'employment', 'tenancy', 'business'],
    issueAreas: ['Criminal Defence', 'Employment Rights', 'Tenant Rights', 'Business Disputes'],
    operatingHours: 'Monday to Friday, 8:30 AM to 5:00 PM',
    accessMethods: ['Appointment', 'Online Request'],
    accessInstructions:
      'Submit a callback request online or telephone our intake clerk for virtual or in-person legal consultations across all 47 Kenyan counties.',
    description:
      'Accredited pro bono litigation chamber handling virtual e-filing, Small Claims Court representation, Employment and Labour Relations Court claims, and criminal bail applications nationwide.',
    eligibilityNote: 'Zero legal fees for indigent litigants across all 47 counties.',
    verifiedYear: 2026,
  },
]

export function getProviderBySlug(slug: string): LegalProvider | undefined {
  return LEGAL_PROVIDERS.find((p) => p.slug === slug)
}
