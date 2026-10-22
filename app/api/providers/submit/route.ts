import { NextResponse } from 'next/server'
import { submitProviderSchema } from '@/lib/validations'
import { verifyRecaptchaSubmission } from '@/lib/recaptcha'
import { escapeHtml, sendTransactionalEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Verify reCAPTCHA v3 first; score < 0.5 triggers visible v2 challenge
    const captcha = await verifyRecaptchaSubmission({
      recaptchaToken: body?.recaptchaToken,
      recaptchaV2Token: body?.recaptchaV2Token,
      expectedAction: 'provider_submit',
    })

    if (!captcha.success) {
      return NextResponse.json(
        {
          success: false,
          requiresV2: captcha.requiresV2,
          score: captcha.score,
          error: captcha.errorMessage || 'Security verification required.',
        },
        { status: 428 }
      )
    }

    // 2. Validate payload with Zod
    const parsed = submitProviderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check all required organisation details and try again.',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data
    const adminEmail = process.env.ADMIN_EMAIL || 'verification@deborahaid.org'
    const submissionId = `DA-PRV-${Date.now().toString(36).toUpperCase()}`

    const safeOrg = escapeHtml(data.organisationName)
    const safeType = escapeHtml(data.type)
    const safeCounty = escapeHtml(data.county)
    const safeAddress = escapeHtml(data.physicalAddress)
    const safePhone = escapeHtml(data.phone)
    const safeEmail = escapeHtml(data.email)
    const safeWebsite = escapeHtml(data.website || 'Not provided')
    const safeLanguages = escapeHtml(data.languages.join(', '))
    const safeIssues = escapeHtml(data.issueAreas.join(', '))
    const safeDesc = escapeHtml(data.description)

    // 3. Send admin review notification
    await sendTransactionalEmail({
      to: adminEmail,
      replyTo: data.email,
      subject: `[Deborah Aid Provider Review ${submissionId}] ${data.organisationName} (${data.county})`,
      text: `New Provider Listing Submission (${submissionId})\nOrganisation: ${data.organisationName}\nType: ${data.type}\nCounty: ${data.county}\nAddress: ${data.physicalAddress}\nPhone: ${data.phone}\nEmail: ${data.email}\nLanguages: ${data.languages.join(', ')}\nIssue Areas: ${data.issueAreas.join(', ')}\nWebsite: ${data.website || 'N/A'}\nDescription: ${data.description}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 640px;">
          <h2 style="color: #072366;">New Pro Bono Provider Submission (${submissionId})</h2>
          <p><strong>Organisation:</strong> ${safeOrg}</p>
          <p><strong>Provider Type:</strong> ${safeType}</p>
          <p><strong>County:</strong> ${safeCounty}</p>
          <p><strong>Physical Address:</strong> ${safeAddress}</p>
          <p><strong>Phone:</strong> ${safePhone} | <strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Website:</strong> ${safeWebsite}</p>
          <p><strong>Languages:</strong> ${safeLanguages}</p>
          <p><strong>Issue Areas:</strong> ${safeIssues}</p>
          <p><strong>Service Description:</strong><br/>${safeDesc}</p>
        </div>
      `,
    })

    // 4. Send confirmation email to submitting organisation
    await sendTransactionalEmail({
      to: data.email,
      subject: `Provider Listing Application Received (${submissionId}) - Deborah Aid`,
      text: `Dear ${data.organisationName},\n\nThank you for submitting your organisation to the Deborah Aid free legal aid directory in Kenya (Reference: ${submissionId}).\n\nOur verification team checks LSK practising status, CSO registration, or clinic accreditation before publishing listings publicly. We typically complete verification within 3 to 5 business days.\n\nWarm regards,\nDeborah Aid Verification Desk`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 600px;">
          <h2 style="color: #072366;">Thank You for Joining the Access to Justice Network</h2>
          <p>Dear ${safeOrg},</p>
          <p>We have received your directory listing submission under reference <strong>${submissionId}</strong> for <strong>${safeCounty} County</strong>.</p>
          <p>All submissions are reviewed by our verification team before going live on Deborah Aid so Kenyans seeking help can rely on accurate, free pro bono services.</p>
          <p style="font-size: 13px; color: #57667e;">Warm regards,<br/>Deborah Aid Verification Team</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      submissionId,
      message: `Thank you. Your submission (${submissionId}) has been received and sent for verification before going live.`,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to submit provider details right now. Please try again shortly.',
      },
      { status: 500 }
    )
  }
}
