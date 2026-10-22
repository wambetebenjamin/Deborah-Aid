import { CanonicalCategoryKey } from './categories'

export type ResourceType = 'Guide' | 'Template Letter' | 'FAQ' | 'Checklist'

export interface ResourceSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface LegalResource {
  slug: string
  title: string
  swahiliTitle: string
  categoryKey: CanonicalCategoryKey
  categoryBadge:
    | 'Land'
    | 'Employment'
    | 'Family'
    | 'Criminal'
    | 'Consumer'
    | 'Gender-Based Violence'
    | 'Tenancy'
    | 'Business'
  type: ResourceType
  readTime: string
  summary: string
  swahiliSummary: string
  sections: ResourceSection[]
  templateText?: string
  citations: {
    statute: string
    sectionNote: string
  }[]
  relatedSlugs: string[]
}

export const LEGAL_RESOURCES: LegalResource[] = [
  {
    slug: 'protecting-family-and-ancestral-land-rights-in-kenya',
    title: 'Protecting Family and Ancestral Land Against Unlawful Sale or Eviction',
    swahiliTitle: 'Kulinda Ardhi ya Familia Dhidi ya Uuzaji Haramu au Kufukuzwa',
    categoryKey: 'land',
    categoryBadge: 'Land',
    type: 'Guide',
    readTime: '6 min read',
    summary:
      'Step-by-step plain-language guide on conducting an official Ardhisasa or land registry search, placing a caution or restriction, and stopping secret sales of family or succession land.',
    swahiliSummary:
      'Mwongozo rahisi kuhusu jinsi ya kufanya utafiti rasmi wa cheti cha ardhi, kuweka tahadhari (caution) katika sajili ya ardhi, na kuzuia ardhi ya familia kuuzwa bila idhini ya wanandoa au warithi.',
    sections: [
      {
        heading: '1. Verify Ownership Through an Official Search First',
        paragraphs: [
          'Before paying a single shilling for land or responding to someone claiming ownership over your family plot, apply for an Official Search at the County Land Registry or online through the Ardhisasa platform using the parcel title number.',
          'An official search certificate reveals the registered proprietor, approximate acreage, and whether any bank charge, court inhibition, caution, or restriction exists on the parcel.',
        ],
        bullets: [
          'Never rely solely on a paper title deed shown to you in person without verifying the green card or digital register.',
          'Keep certified copies of death certificates, chief letters, and family agreements safe if the registered owner has passed away.',
          'Selling deceased family land before obtaining a confirmed Grant of Letters of Administration is unlawful intermeddling.',
        ],
      },
      {
        heading: '2. Spousal Consent and Placing a Caution (Tahadhari)',
        paragraphs: [
          'Under Kenyan land law, matrimonial land where a spouse lives or farms cannot be validly sold, charged, or transferred without genuine spousal consent.',
          'If you discover plans to sell disputed family land secretly, visit the Land Registrar with your National ID, marriage proof or chief letter, and file Form LRA 68 to register a Caution or ask the Land Registrar to place a Restriction.',
        ],
        bullets: [
          'A Caution blocks any new transfer on that parcel until you are notified and given a chance to be heard.',
          'If someone threatens forced eviction, report immediately at the nearest police station for an OB number and approach the Environment and Land Court or Magistrate Court.',
        ],
      },
      {
        heading: '3. Muhtasari kwa Kiswahili (Key Steps in Kiswahili)',
        paragraphs: [
          'Usikubali kuondolewa kwa nguvu bila amri halali ya mahakama. Kama mtu anajaribu kuuza shamba la urithi kabla ya kesi ya mirathi kukamilika, nenda kwa Msajili wa Ardhi wa Kaunti uweke Caution au Restriction mara moja.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Constitution of Kenya, 2010 (Article 40 & Article 60)',
        sectionNote: 'Protects the right to own property lawfully and promotes equitable, secure access to land.',
      },
      {
        statute: 'Land Registration Act, 2012 (Sections 71 to 78 & Section 93)',
        sectionNote: 'Governs cautions, restrictions against fraud or improper dealings, and spousal rights over land.',
      },
      {
        statute: 'Land Act, 2012 (Section 152A to 152G)',
        sectionNote: 'Sets strict notice and legal procedures prohibiting arbitrary or violent evictions.',
      },
      {
        statute: 'Law of Succession Act (Cap. 160, Section 45)',
        sectionNote: 'Prohibits intermeddling with deceased estate property prior to a grant of representation.',
      },
    ],
    relatedSlugs: [
      'unlawful-eviction-demand-letter-kenya',
      'child-maintenance-and-matrimonial-rights-faq',
      'small-claims-court-checklist-kenya',
    ],
  },
  {
    slug: 'unfair-termination-and-unpaid-wages-guide',
    title: 'Unfair Dismissal and Unpaid Wages: What Every Worker in Kenya Should Know',
    swahiliTitle: 'Kufutwa Kazi Kimakosa na Kudai Mshahara Usiolipwa',
    categoryKey: 'employment',
    categoryBadge: 'Employment',
    type: 'Guide',
    readTime: '5 min read',
    summary:
      'Understand valid reasons and fair hearing rules before termination, notice pay, accrued leave days, service pay, and even verbal employment contracts.',
    swahiliSummary:
      'Jua haki zako chini ya Sheria ya Ajira ikiwa umefutwa kazi ghafla bila kusikilizwa, hata kama hukuwa na mkataba wa maandishi.',
    sections: [
      {
        heading: '1. Verbal Workers Have Full Rights Under Kenyan Law',
        paragraphs: [
          'Many domestic workers, security guards, shop attendants, casual labourers, and drivers think they have no case because their boss never gave them a written contract. That is false.',
          'Under the Employment Act 2007, if you have worked continuously for three months or perform ongoing duties, the law protects you. MPESA statements, WhatsApp instructions, gate logs, and witness statements can prove your employment.',
        ],
      },
      {
        heading: '2. Two Requirements for Lawful Termination: Valid Reason and Fair Procedure',
        paragraphs: [
          'An employer cannot fire you on the spot by text message or anger. Before dismissing you for misconduct or poor performance, the employer must explain the accusation in a language you understand (with another employee or union representative present if you wish) and listen to your response.',
        ],
        bullets: [
          'Salary for all days already worked in the month.',
          'Payment in lieu of notice (usually at least one month salary if paid monthly).',
          'Cash value of untaken annual leave days.',
          'Service pay (typically 15 days pay for each completed year worked where NSSF was not remitted).',
          'Certificate of Service, which every employee who worked over four weeks is entitled to receive.',
        ],
      },
      {
        heading: '3. Strict Time Limit (Limitation Period)',
        paragraphs: [
          'Do not wait too long. Employment claims must be filed within three years from the date of dismissal or non-payment under Section 90 of the Employment Act. County Labour Officers can also summon employers for free conciliation.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Constitution of Kenya, 2010 (Article 41)',
        sectionNote: 'Guarantees every person the right to fair labour practices and reasonable working conditions.',
      },
      {
        statute: 'Employment Act, 2007 (Sections 35, 41, 43, 45, 49 & 51)',
        sectionNote: 'Establishes notice periods, mandatory disciplinary hearing procedure, unfair termination remedies, and Certificates of Service.',
      },
    ],
    relatedSlugs: [
      'unpaid-salary-demand-letter-template',
      'small-claims-court-checklist-kenya',
      'protecting-family-and-ancestral-land-rights-in-kenya',
    ],
  },
  {
    slug: 'unpaid-salary-demand-letter-template',
    title: 'Template Letter: Demand for Unpaid Wages and Terminal Dues',
    swahiliTitle: 'Barua ya Kielelezo: Kudai Mshahara na Malipo ya Mwisho wa Kazi',
    categoryKey: 'employment',
    categoryBadge: 'Employment',
    type: 'Template Letter',
    readTime: '4 min read',
    summary:
      'Ready-to-fill plain-English formal demand letter to send to a former employer requesting unpaid salary, leave pay, notice pay, and your Certificate of Service within 14 days.',
    swahiliSummary:
      'Mfano wa barua rasmi ya kumwandikia mwajiri wako wa zamani ukidai mshahara uliosalia, malipo ya notisi, na cheti cha kazi ndani ya siku 14.',
    sections: [
      {
        heading: 'How to Use This Template Safely',
        paragraphs: [
          'Replace every item inside square brackets with your accurate dates and amounts. Deliver two copies: ask the employer or receptionist to sign and date your copy, or send via registered post / official email / WhatsApp so you keep proof of delivery.',
          'If the employer does not pay or negotiate within 14 days, take your copy to the County Labour Office or request free help from a legal clinic on Deborah Aid.',
        ],
      },
    ],
    templateText: `[Your Full Name]
[Your Phone Number]
[Your County / Town]
Date: [Insert Date]

To: The Managing Director / Employer
[Name of Employer or Company]
[Physical Address or P.O. Box]

RE: FORMAL DEMAND FOR UNPAID SALARY AND TERMINAL DUES

Dear Sir or Madam,

I was employed by you as a [Your Job Role] from [Start Date] until [End Date], earning a gross monthly salary of KES [Monthly Amount].

Following the termination of my employment on [End Date], the following lawful dues remain unpaid:
1. Unpaid salary for [Month/Days worked]: KES [Amount]
2. One month pay in lieu of notice (Section 35, Employment Act 2007): KES [Amount]
3. Accrued untaken annual leave ([Number] days): KES [Amount]
TOTAL AMOUNT CLAIMED: KES [Total Amount]

Take notice that unless the sum of KES [Total Amount] together with my Certificate of Service under Section 51 of the Employment Act 2007 is released within fourteen (14) days of this letter via MPESA or bank transfer, I shall refer this dispute to the County Labour Officer and seek legal redress without further reference to you.

Yours faithfully,

[Signature]
[Your Full Name]`,
    citations: [
      {
        statute: 'Employment Act, 2007 (Sections 18, 35 & 51)',
        sectionNote: 'Requires prompt payment of wages due on termination, notice pay, and issuance of a Certificate of Service.',
      },
    ],
    relatedSlugs: [
      'unfair-termination-and-unpaid-wages-guide',
      'small-claims-court-checklist-kenya',
      'consumer-protection-digital-loans-guide',
    ],
  },
  {
    slug: 'child-maintenance-and-matrimonial-rights-faq',
    title: 'Child Maintenance, Custody, and Family Law Frequently Asked Questions',
    swahiliTitle: 'Maswali Yanayoulizwa Mara kwa Mara Kuhusu Matunzo na Ulezi wa Watoto',
    categoryKey: 'family',
    categoryBadge: 'Family',
    type: 'FAQ',
    readTime: '6 min read',
    summary:
      'Clear answers on equal parental responsibility, how the Children Court calculates upkeep, what documents to carry to the Children Officer, and matrimonial property protection.',
    swahiliSummary:
      'Majibu wazi kuhusu jukumu sawa la wazazi chini ya Katiba, jinsi Mahakama ya Watoto inavyoamua matunzo, na namna ya kuanza kupitia Afisa wa Watoto bila malipo.',
    sections: [
      {
        heading: 'Must Parents Be Married for a Child to Receive Maintenance?',
        paragraphs: [
          'No. Article 53(1)(e) of the Constitution of Kenya 2010 states clearly that every child has the right to parental care and protection, which includes equal responsibility of the mother and father to provide for the child, whether they are married to each other or not.',
        ],
      },
      {
        heading: 'Where Should I Start Before Going to Court?',
        paragraphs: [
          'Visit the nearest Sub-County Children Office first. Children Officers are public officers who summon both parents for free mediation and record a formal Parental Responsibility Agreement at zero cost.',
          'If the other parent refuses to attend or fails to honour the agreement, a legal clinic can help you file a maintenance and custody application at the Children Court.',
        ],
        bullets: [
          'Bring a copy of the child birth certificate or clinic notification card.',
          'Prepare a realistic monthly budget covering food, housing, school fees, clothing, and medical care.',
          'Bring any proof of the other parent income or lifestyle if known, though the court can order financial disclosure.',
        ],
      },
      {
        heading: 'How Does the Law Treat Matrimonial Property Upon Separation?',
        paragraphs: [
          'Under the Matrimonial Property Act 2013, courts recognize both monetary contributions (salary, business income) and non-monetary contributions (childcare, domestic management, farming, and improving family property).',
        ],
      },
    ],
    citations: [
      {
        statute: 'Constitution of Kenya, 2010 (Article 45 & Article 53)',
        sectionNote: 'Establishes best interests of the child as paramount and equal parental responsibility regardless of marital status.',
      },
      {
        statute: 'Children Act, 2022 (Part III & Part VII)',
        sectionNote: 'Details parental responsibility agreements, custody orders, and child maintenance enforcement.',
      },
      {
        statute: 'Matrimonial Property Act, 2013 (Sections 6, 7 & 12)',
        sectionNote: 'Defines matrimonial property and protects non-monetary family contributions and spousal consent.',
      },
    ],
    relatedSlugs: [
      'protection-orders-gender-based-violence-checklist',
      'protecting-family-and-ancestral-land-rights-in-kenya',
      'arrest-and-police-bond-rights-kenya',
    ],
  },
  {
    slug: 'arrest-and-police-bond-rights-kenya',
    title: 'Arrested in Kenya? Your Constitutional Rights at the Police Station and Court',
    swahiliTitle: 'Haki Zako za Kikatiba Ukikamatwa na Polisi na Dhamana ya Bure',
    categoryKey: 'criminal',
    categoryBadge: 'Criminal',
    type: 'Guide',
    readTime: '5 min read',
    summary:
      'Know the 24-hour court rule, your right to remain silent, free police bond, how to read charges in a language you understand, and when never to plead guilty under pressure.',
    swahiliSummary:
      'Fahamu sheria ya saa 24 kufikishwa mahakamani, haki ya kunyamaza, dhamana ya polisi bila hongo, na jinsi ya kuomba hati za mashtaka kabla ya kujibu shtaka.',
    sections: [
      {
        heading: '1. Immediate Rights at the Moment of Arrest (Article 49)',
        paragraphs: [
          'Every arrested person in Kenya has constitutional rights that cannot be taken away at a police post or station. You have the right to be told promptly, in English, Kiswahili, or a language you understand, the exact reason for your arrest.',
        ],
        bullets: [
          'You have the right to remain silent and not to make a confession that can be used against you.',
          'You have the right to communicate with an advocate, family member, or paralegal immediately.',
          'You must NOT be held in police custody for more than 24 hours without being brought before a court (or the end of the next court day if the 24 hours expire on a weekend or public holiday).',
          'Police bond at the station is FREE by policy; if cash bail is paid at court or officially receipted, always demand an official government receipt.',
        ],
      },
      {
        heading: '2. First Appearance in Court (Plea Taking)',
        paragraphs: [
          'When your name is called in court, listen carefully to every word of the charge sheet. If you do not understand English, politely ask the magistrate for Kiswahili or local interpretation.',
          'Do NOT plead guilty simply because someone promised a small fine. If you are unsure or dispute the facts, enter a plea of Not Guilty and ask the court for reasonable bail or free bond plus copies of witness statements under Article 50(2)(j).',
        ],
      },
    ],
    citations: [
      {
        statute: 'Constitution of Kenya, 2010 (Article 49 & Article 50)',
        sectionNote: 'Guarantees rights of arrested persons, 24-hour presentation rule, right to bail on reasonable conditions, and fair trial.',
      },
      {
        statute: 'Criminal Procedure Code (Cap. 75, Sections 36, 123 & 207)',
        sectionNote: 'Governs police bond, court bail, and plea-taking procedure before magistrates.',
      },
      {
        statute: 'Legal Aid Act, 2016 (Sections 36 & 43)',
        sectionNote: 'Provides state-funded legal aid and court duty counsel for qualifying unrepresented accused persons.',
      },
    ],
    relatedSlugs: [
      'police-station-arrest-checklist',
      'protection-orders-gender-based-violence-checklist',
      'child-maintenance-and-matrimonial-rights-faq',
    ],
  },
  {
    slug: 'police-station-arrest-checklist',
    title: 'Emergency Checklist: When a Family Member Is Arrested',
    swahiliTitle: 'Orodha ya Hatua za Haraka Mtu wa Familia Akikamatwa',
    categoryKey: 'criminal',
    categoryBadge: 'Criminal',
    type: 'Checklist',
    readTime: '3 min read',
    summary:
      'Practical 7-point checklist for relatives visiting a police station in Kenya so you protect your loved one safely and lawfully.',
    swahiliSummary:
      'Hatua saba muhimu za kufuata unapofuatilia ndugu au jamaa aliyekamatwa kituoni cha polisi.',
    sections: [
      {
        heading: 'Step-by-Step Station Checklist',
        paragraphs: [
          'Stay calm, polite, and firm when visiting the report desk. Take a notebook and pen to write down official details.',
        ],
        bullets: [
          'Confirm the exact police station where the person is booked and request the Occurrence Book (OB) number.',
          'Ask the Officer Commanding Station (OCS) or Investigating Officer what offence is being investigated.',
          'Ensure any medical need, prescription medicine, or injury is recorded in the OB immediately.',
          'Request release on free Police Bond if the offence is minor or investigations are ongoing.',
          'Never pay unreceipted money to intermediaries outside the station.',
          'If held overnight, attend the Magistrate Court registry by 8:30 AM the next working morning with original IDs of family sureties.',
          'Contact a criminal defence clinic on Deborah Aid if the person cannot afford an advocate.',
        ],
      },
    ],
    citations: [
      {
        statute: 'National Police Service Act, 2011 (Fifth Schedule)',
        sectionNote: 'Sets standards for humane custody, medical attention, and custody records.',
      },
      {
        statute: 'Constitution of Kenya, 2010 (Article 49(1)(h))',
        sectionNote: 'Establishes the right to release on bond or bail, including free bond for petty offences.',
      },
    ],
    relatedSlugs: [
      'arrest-and-police-bond-rights-kenya',
      'protection-orders-gender-based-violence-checklist',
      'unlawful-eviction-demand-letter-kenya',
    ],
  },
  {
    slug: 'consumer-protection-digital-loans-guide',
    title: 'Defective Goods, Unfair Billing, and Digital Loan Harassment Rights',
    swahiliTitle: 'Haki za Mtumiaji: Bidhaa Mbovu na Unyanyasaji wa Mikopo ya Simu',
    categoryKey: 'consumer',
    categoryBadge: 'Consumer',
    type: 'Guide',
    readTime: '5 min read',
    summary:
      'How Kenyan law protects you against counterfeit or faulty products, hidden mobile loan charges, and illegal debt shaming messages sent to your phone contacts.',
    swahiliSummary:
      'Sheria za Kenya zinavyokulinda dhidi ya bidhaa hafifu na wakopeshaji wa simu wanaowapigia au kuwadhalilisha watu kwenye orodha yako ya simu.',
    sections: [
      {
        heading: '1. Debt Shaming by Digital Lenders Is Illegal',
        paragraphs: [
          'Digital Credit Providers regulated by the Central Bank of Kenya and bound by the Data Protection Act 2019 are strictly prohibited from accessing your phone contact list to message your employer, friends, or relatives about a loan.',
          'Save screenshots of any threatening messages, caller numbers, and app names. You can file a formal complaint online with the Office of the Data Protection Commissioner (ODPC) and report unlicensed digital lenders to the Central Bank of Kenya.',
        ],
      },
      {
        heading: '2. Faulty Goods and Misleading Receipts',
        paragraphs: [
          'Under Article 46 of the Constitution and the Consumer Protection Act 2012, consumers are entitled to goods of reasonable quality, accurate pricing disclosures, and repair, replacement, or refund where defective goods are sold.',
        ],
        bullets: [
          'Always keep MPESA confirmation messages, ETR receipts, warranty cards, and photos of the defect.',
          'Write to the seller immediately stating the defect and giving 7 to 14 days to replace or refund.',
          'Unresolved claims under KES 1,000,000 can be heard rapidly at the Small Claims Court within 60 days.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Constitution of Kenya, 2010 (Article 46)',
        sectionNote: 'Guarantees consumer rights to goods and services of reasonable quality and honest information.',
      },
      {
        statute: 'Consumer Protection Act, 2012 (Part II & Part III)',
        sectionNote: 'Prohibits unfair, unconscionable, or false trade representations and provides buyer remedies.',
      },
      {
        statute: 'Data Protection Act, 2019 & CBK Digital Credit Providers Regulations, 2022',
        sectionNote: 'Outlaws unauthorized contact scraping, debt shaming, and abusive collection tactics.',
      },
    ],
    relatedSlugs: [
      'small-claims-court-checklist-kenya',
      'unlawful-eviction-demand-letter-kenya',
      'unpaid-salary-demand-letter-template',
    ],
  },
  {
    slug: 'protection-orders-gender-based-violence-checklist',
    title: 'Safety & Legal Checklist: Gender-Based Violence Protection Orders in Kenya',
    swahiliTitle: 'Usalama na Amri ya Ulinzi Dhidi ya Ukatili wa Kijinsia',
    categoryKey: 'gbv',
    categoryBadge: 'Gender-Based Violence',
    type: 'Checklist',
    readTime: '5 min read',
    summary:
      'Immediate safety numbers (GVRC 0800 720 090, Childline 116), free medical documentation (PRC & P3 forms), and obtaining an urgent court Protection Order.',
    swahiliSummary:
      'Nambari za dharura za bure (GVRC 0800 720 090 na Childline 116), matibabu ya haraka, fomu za PRC na P3, na jinsi ya kupata Amri ya Ulinzi mahakamani.',
    sections: [
      {
        heading: '1. Immediate Safety and Medical Care Come First',
        paragraphs: [
          'If you or a child are in immediate danger, move to a safe neighbour, public hospital gender desk, chief camp, or police gender desk and call the toll-free Gender Violence Recovery Centre line on 0800 720 090 or Childline Kenya on 116.',
          'In sexual assault cases, seek medical care within 72 hours at any public hospital or GVRC facility BEFORE washing clothes if possible. Emergency Post-Exposure Prophylaxis (PEP), emergency contraception, and completion of the Post-Rape Care (PRC) form are free at public health facilities.',
        ],
      },
      {
        heading: '2. Getting an Interim Protection Order Under PADVA 2015',
        paragraphs: [
          'Under the Protection Against Domestic Violence Act 2015, physical abuse, threats, stalking, economic deprivation, emotional abuse, and forced eviction from the matrimonial home all qualify for a court Protection Order.',
        ],
        bullets: [
          'An Interim Protection Order can be issued urgently the same day without the abuser being present (ex parte) when there is imminent risk of harm.',
          'A child, relative, police officer, social worker, or legal aid advocate can apply on a survivor behalf.',
          'Court fees can be waived, and FIDA Kenya or Kituo Cha Sheria clinics prepare applications free of charge.',
          'Breaching a Protection Order is a criminal arrestable offence punishable by fine or imprisonment.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Protection Against Domestic Violence Act, 2015 (Sections 3, 8, 12 & 19)',
        sectionNote: 'Defines domestic violence broadly and empowers courts to issue urgent interim and final protection orders.',
      },
      {
        statute: 'Sexual Offences Act, 2006',
        sectionNote: 'Criminalizes sexual violence and provides witness protection and free medical treatment frameworks.',
      },
      {
        statute: 'Children Act, 2022',
        sectionNote: 'Provides urgent care and protection orders for children at risk of abuse or neglect.',
      },
    ],
    relatedSlugs: [
      'child-maintenance-and-matrimonial-rights-faq',
      'police-station-arrest-checklist',
      'tenant-rights-lockouts-and-deposit-faq',
    ],
  },
  {
    slug: 'tenant-rights-lockouts-and-deposit-faq',
    title: 'Tenant Rights in Kenya: Illegal Lockouts, Rent Deposits, and Eviction Notice Rules',
    swahiliTitle: 'Haki za Mpangaji: Kufungiwa Nyumba Kimakosa na Kurudishiwa Amana (Deposit)',
    categoryKey: 'tenancy',
    categoryBadge: 'Tenancy',
    type: 'FAQ',
    readTime: '5 min read',
    summary:
      'Can a caretaker weld your door, remove your roof, disconnect water, or seize household beds? Know what Kenyan tenancy law forbids and how the Rent Restriction Tribunal helps.',
    swahiliSummary:
      'Je, mwenye nyumba au caretaker ana haki ya kufunga mlango kwa kufuli lake, kukata maji au stima, au kuchukua vyombo vya nyumba? Jua haki zako za kisheria.',
    sections: [
      {
        heading: 'Can My Landlord Lock My Door, Cut Water, or Remove Iron Sheets?',
        paragraphs: [
          'No. Locking a tenant out, disconnecting water or electricity to force payment, or removing doors and roofing is unlawful constructive eviction and harassment.',
          'For residential tenancies within the jurisdiction of the Rent Restriction Tribunal, a landlord cannot evict a tenant or increase controlled rent arbitrarily without an order of the Tribunal.',
        ],
      },
      {
        heading: 'Can a Landlord or Agent Seize My Household Goods Without an Auctioneer?',
        paragraphs: [
          'Under the Distress for Rent Act (Cap. 293), only a licensed auctioneer following proper statutory notice and inventory rules may levy distress, and essential tools of trade, bedding, clothes, and children school books are exempt from seizure.',
        ],
      },
      {
        heading: 'How Do I Recover My Security Deposit When Moving Out?',
        paragraphs: [
          'Give full notice according to your tenancy agreement (usually one calendar month), take clear dated photos of clean painted walls, meter readings, and cleared utility bills, and hand keys over with a signed handover note. If the landlord withholds your deposit unfairly, file at the Rent Restriction Tribunal or Small Claims Court.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Rent Restriction Act (Cap. 296)',
        sectionNote: 'Protects residential tenants against unlawful eviction, harassment, and unapproved rent hikes.',
      },
      {
        statute: 'Distress for Rent Act (Cap. 293, Section 16)',
        sectionNote: 'Regulates lawful distress through licensed auctioneers and exempts bedding, clothing, and tools of trade.',
      },
      {
        statute: 'Landlord and Tenant (Shops, Hotels and Catering Establishments) Act (Cap. 301)',
        sectionNote: 'Protects controlled small business tenants via the Business Premises Rent Tribunal (BPRT) requiring two months statutory notice.',
      },
    ],
    relatedSlugs: [
      'unlawful-eviction-demand-letter-kenya',
      'small-claims-court-checklist-kenya',
      'consumer-protection-digital-loans-guide',
    ],
  },
  {
    slug: 'unlawful-eviction-demand-letter-kenya',
    title: 'Template Letter: Objection to Unlawful Lockout or Deposit Withholding',
    swahiliTitle: 'Barua ya Kielelezo: Kupinga Kufungiwa Nyumba au Kunyimwa Deposit',
    categoryKey: 'tenancy',
    categoryBadge: 'Tenancy',
    type: 'Template Letter',
    readTime: '4 min read',
    summary:
      'Plain-language written notice for residential or shop tenants demanding immediate reopening of locked premises or refund of a security deposit.',
    swahiliSummary:
      'Barua ya kielelezo kwa mwenye nyumba au wakala wake kudai kufunguliwa nyumba iliyofungwa kinyume cha sheria au kurejeshewa amana ya kodi.',
    sections: [
      {
        heading: 'When to Send This Notice',
        paragraphs: [
          'Send a copy by WhatsApp, email, or physical delivery whenever a caretaker locks your house without a Tribunal order or refuses to refund your refundable deposit after you clear utility bills.',
        ],
      },
    ],
    templateText: `[Your Full Name]
[House / Stall Number & Estate Name]
[Phone Number]
Date: [Insert Date]

To: [Landlord / Managing Agent Name]
[Phone / Address]

RE: DEMAND TO CEASE UNLAWFUL INTERFERENCE / REFUND SECURITY DEPOSIT

Dear [Landlord / Agent Name],

I am the lawful tenant of House / Shop No. [Number] at [Estate / Building Name, County], paying a monthly rent of KES [Amount].

[Option A - Lockout:] On [Date], your caretaker / agent unlawfully placed a padlock on my premises / disconnected water without an order from the Rent Restriction Tribunal or Court, denying my family access to essential belongings.

[Option B - Deposit Refund:] Having vacated the premises peacefully on [Date] after giving due notice and clearing all water and electricity bills, my refundable security deposit of KES [Deposit Amount] remains unpaid.

Take notice that unless access is restored immediately / my deposit of KES [Amount] is refunded within seven (7) days via MPESA to [Phone Number], I shall lodge an urgent complaint at the Rent Restriction Tribunal / Small Claims Court and seek costs and damages.

Yours faithfully,

[Your Full Name]`,
    citations: [
      {
        statute: 'Rent Restriction Act (Cap. 296)',
        sectionNote: 'Empowers the Tribunal to order immediate restoration of tenancy possession and refund of deposits.',
      },
      {
        statute: 'Small Claims Court Act, 2016',
        sectionNote: 'Provides fast-track recovery for unpaid refundable tenancy deposits below KES 1,000,000.',
      },
    ],
    relatedSlugs: [
      'tenant-rights-lockouts-and-deposit-faq',
      'small-claims-court-checklist-kenya',
      'protecting-family-and-ancestral-land-rights-in-kenya',
    ],
  },
  {
    slug: 'small-claims-court-checklist-kenya',
    title: 'Small Business Checklist: Filing a Debt or Contract Claim at the Small Claims Court',
    swahiliTitle: 'Orodha ya Biashara Ndogo: Kudai Deni Katika Mahakama ya Madai Madogo',
    categoryKey: 'business',
    categoryBadge: 'Business',
    type: 'Checklist',
    readTime: '5 min read',
    summary:
      'Recover unpaid invoices, supplier deposits, chama debts, or damaged goods under KES 1,000,000 within 60 days without needing expensive legal technicalities.',
    swahiliSummary:
      'Hatua rahisi kwa wafanyabiashara wadogo na vikundi kufungua kesi ya deni chini ya KES 1,000,000 kupitia mfumo wa e-Filing na kupata uamuzi ndani ya siku 60.',
    sections: [
      {
        heading: 'Why the Small Claims Court Helps Small Kenyan Traders',
        paragraphs: [
          'The Small Claims Court hears civil and commercial claims worth up to KES 1,000,000 without strict technical evidence rules, allows self-representation in English or Kiswahili, and aims to conclude every case within 60 days.',
        ],
        bullets: [
          'Confirm your claim involves unpaid money, goods supplied, contract breach, rent deposit, or property damage not exceeding KES 1,000,000.',
          'Send a brief written Demand Notice giving the debtor 7 to 14 days to settle before filing.',
          'Gather MPESA statements, invoices, delivery notes, WhatsApp chats, or witness names into one clean PDF.',
          'Log in to the Judiciary e-Filing portal using your eCitizen details, complete the Statement of Claim form, and pay the modest filing fee (starting from a few hundred shillings depending on claim value).',
          'Serve the stamped Statement of Claim and Notice of Mention on the Respondent and file an Affidavit of Service.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Small Claims Court Act, 2016 (Sections 12, 17, 24 & 34)',
        sectionNote: 'Establishes pecuniary jurisdiction up to KES 1,000,000, informal procedure, and 60-day determination timeline.',
      },
      {
        statute: 'Law of Contract Act (Cap. 23) & Sale of Goods Act (Cap. 31)',
        sectionNote: 'Governs commercial agreements and supply of goods obligations in Kenya.',
      },
    ],
    relatedSlugs: [
      'business-premises-and-county-permits-guide',
      'consumer-protection-digital-loans-guide',
      'unpaid-salary-demand-letter-template',
    ],
  },
  {
    slug: 'business-premises-and-county-permits-guide',
    title: 'Protecting Your Kiosk, Shop Lease, and Chama Agreements',
    swahiliTitle: 'Kulinda Duka Lako la Biashara na Mikataba ya Vikundi (Chama)',
    categoryKey: 'business',
    categoryBadge: 'Business',
    type: 'Guide',
    readTime: '5 min read',
    summary:
      'Plain-language guidance for shopkeepers, mama mboga, bodaboda SACCOs, and chamas on controlled business tenancies (BPRT), simple written contracts, and county inspectorate rights.',
    swahiliSummary:
      'Mwongozo kwa wafanyabiashara wadogo kuhusu ulinzi wa duka kupitia BPRT, uandishi rahisi wa makubaliano ya biashara, na haki unapokaguliwa na askari wa kaunti.',
    sections: [
      {
        heading: '1. Protection for Shop & Stall Tenants (Controlled Tenancies)',
        paragraphs: [
          'If you rent a shop, salon, workshop, hotel, or kiosk without a written lease exceeding five years (or where the written lease contains a break clause), your tenancy is generally a Controlled Tenancy protected by the Business Premises Rent Tribunal (BPRT).',
          'Your landlord cannot raise shop rent overnight or lock your shop door without issuing a two-month statutory notice in the prescribed BPRT form.',
        ],
      },
      {
        heading: '2. Putting Chama & Supplier Deals in Simple Writing',
        paragraphs: [
          'Every business payment should state what it is for. Even a one-page agreement signed by both parties and two witnesses listing full names, ID numbers, total price, delivery date, and refund terms can save months of disputes.',
        ],
      },
      {
        heading: '3. Dealing With County Inspectorate (Kanjo) Arrests or Confiscations',
        paragraphs: [
          'Display your Single Business Permit visibly, pay county cess or market fees ONLY through official county shortcodes, and insist on an official inventory receipt if goods are impounded.',
        ],
      },
    ],
    citations: [
      {
        statute: 'Landlord and Tenant (Shops, Hotels and Catering Establishments) Act (Cap. 301, Section 4)',
        sectionNote: 'Mandates formal two-month Tribunal notice before termination or rent alteration of controlled business premises.',
      },
      {
        statute: 'Micro and Small Enterprises Act, 2012',
        sectionNote: 'Provides registration, dispute resolution through the MSE Tribunal, and support for small enterprises.',
      },
      {
        statute: 'Constitution of Kenya, 2010 (Article 47)',
        sectionNote: 'Guarantees every citizen fair, lawful, and reasonable administrative action by county officials.',
      },
    ],
    relatedSlugs: [
      'small-claims-court-checklist-kenya',
      'tenant-rights-lockouts-and-deposit-faq',
      'unlawful-eviction-demand-letter-kenya',
    ],
  },
]

export function getResourceBySlug(slug: string): LegalResource | undefined {
  return LEGAL_RESOURCES.find((r) => r.slug === slug)
}
