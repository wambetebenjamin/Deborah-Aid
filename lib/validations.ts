import { z } from 'zod'
import { KENYA_COUNTIES } from '@/data/counties'

export const callbackRequestSchema = z.object({
  providerSlug: z.string().min(1, 'Provider identifier is required'),
  providerName: z.string().min(2, 'Provider name is required'),
  name: z.string().trim().min(2, 'Please enter your full name').max(100),
  phone: z
    .string()
    .trim()
    .min(9, 'Please enter a valid Kenyan phone number')
    .max(20)
    .regex(/^[+0-9\s()-]{9,20}$/, 'Enter digits such as 0712 345 678 or +254712345678'),
  email: z.string().trim().email('Enter a valid email address').optional().or(z.literal('')),
  issueCategory: z.string().min(2, 'Please choose an issue category'),
  description: z
    .string()
    .trim()
    .min(15, 'Please briefly describe your legal issue (at least 15 characters)')
    .max(1200, 'Please keep the summary under 1200 characters'),
  recaptchaToken: z.string().optional(),
  recaptchaV2Token: z.string().optional(),
})

export const submitProviderSchema = z.object({
  organisationName: z.string().trim().min(3, 'Enter the organisation or chamber name').max(140),
  type: z.enum(['Law Firm', 'Legal Clinic', 'Paralegal', 'NGO Legal Service']),
  county: z.string().refine((val) => KENYA_COUNTIES.includes(val), 'Select a valid Kenyan county'),
  physicalAddress: z.string().trim().min(5, 'Enter the physical office or desk location').max(220),
  phone: z
    .string()
    .trim()
    .min(9, 'Enter a valid telephone number')
    .max(20)
    .regex(/^[+0-9\s()-]{9,20}$/, 'Enter a valid Kenyan phone number'),
  email: z.string().trim().email('Enter a valid organisation email address'),
  languages: z.array(z.enum(['English', 'Kiswahili'])).min(1, 'Select at least one language offered'),
  issueAreas: z.array(z.string().min(2)).min(1, 'Select at least one legal issue area covered'),
  website: z
    .string()
    .trim()
    .url('Enter a complete URL starting with https:// or leave blank')
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .trim()
    .min(25, 'Provide a clear description of pro bono services offered (minimum 25 characters)')
    .max(1500, 'Description must be under 1500 characters'),
  recaptchaToken: z.string().optional(),
  recaptchaV2Token: z.string().optional(),
})

export const sendEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email address'),
  subject: z.enum([
    'General Enquiry',
    'Report an Issue',
    'Provider Submission Follow-up',
    'Partnership',
  ]),
  message: z
    .string()
    .trim()
    .min(15, 'Please write a message of at least 15 characters')
    .max(1500, 'Please keep your message under 1500 characters'),
  recaptchaToken: z.string().optional(),
  recaptchaV2Token: z.string().optional(),
})

export type CallbackRequestInput = z.infer<typeof callbackRequestSchema>
export type SubmitProviderInput = z.infer<typeof submitProviderSchema>
export type SendEnquiryInput = z.infer<typeof sendEnquirySchema>
