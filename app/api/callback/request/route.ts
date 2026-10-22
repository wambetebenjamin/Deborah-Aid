import { NextResponse } from 'next/server'
import { callbackRequestSchema } from '@/lib/validations'
import { verifyRecaptchaSubmission } from '@/lib/recaptcha'
import { escapeHtml, sendTransactionalEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Verify reCAPTCHA v3 first; score < 0.5 triggers visible v2 challenge
    const captcha = await verifyRecaptchaSubmission({
      recaptchaToken: body?.recaptchaToken,
      recaptchaV2Token: body?.recaptchaV2Token,
      expectedAction: 'callback_request',
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
    const parsed = callbackRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please review the highlighted fields and try again.',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data
    const adminEmail = process.env.ADMIN_EMAIL || 'intake@deborahaid.org'
    const referenceCode = `DA-CB-${Date.now().toString(36).toUpperCase()}`

    const safeName = escapeHtml(data.name)
    const safePhone = escapeHtml(data.phone)
    const safeProvider = escapeHtml(data.providerName)
    const safeIssue = escapeHtml(data.issueCategory)
    const safeDesc = escapeHtml(data.description)

    // 3. Notify intake desk via Nodemailer
    await sendTransactionalEmail({
      to: adminEmail,
      replyTo: data.email || undefined,
      subject: `[Deborah Aid Callback ${referenceCode}] ${data.issueCategory} - ${data.providerName}`,
      text: `Callback Request Reference: ${referenceCode}\nProvider: ${data.providerName} (${data.providerSlug})\nClient Name: ${data.name}\nPhone: ${data.phone}\nIssue Category: ${data.issueCategory}\nSummary: ${data.description}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 600px;">
          <h2 style="color: #072366;">New Legal Aid Callback Request (${referenceCode})</h2>
          <p><strong>Selected Provider:</strong> ${safeProvider}</p>
          <p><strong>Applicant Name:</strong> ${safeName}</p>
          <p><strong>Callback Phone:</strong> ${safePhone}</p>
          <p><strong>Issue Category:</strong> ${safeIssue}</p>
          <p><strong>Brief Description:</strong><br/>${safeDesc}</p>
          <hr style="border-color: #eceff8;" />
          <p style="font-size: 12px; color: #57667e;">Handled in compliance with the Kenya Data Protection Act, 2019.</p>
        </div>
      `,
    })

    // Send confirmation email to applicant if they provided an email address
    if (data.email) {
      await sendTransactionalEmail({
        to: data.email,
        subject: `Your Callback Request Has Been Received (${referenceCode})`,
        text: `Hello ${data.name},\n\nWe have shared your callback request (${referenceCode}) regarding ${data.issueCategory} with ${data.providerName} for telephone number ${data.phone}.\n\nIf you face an immediate safety emergency, call the Gender Violence Recovery Centre toll-free on 0800 720 090 or Childline Kenya on 116.\n\nWarm regards,\nDeborah Aid Directory Team`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 600px;">
            <h2 style="color: #072366;">Callback Request Confirmed (${referenceCode})</h2>
            <p>Hello ${safeName},</p>
            <p>Your free callback request for <strong>${safeProvider}</strong> regarding <strong>${safeIssue}</strong> has been logged for <strong>${safePhone}</strong>.</p>
            <p style="background: #f8fcff; padding: 12px; border-left: 4px solid #09cc7f;">
              <strong>Urgent Safety Helplines (Free 24/7):</strong> Gender Violence Recovery Centre: <strong>0800 720 090</strong> | Childline Kenya: <strong>116</strong>
            </p>
            <p style="font-size: 12px; color: #57667e;">Deborah Aid is a free public directory and not a law firm.</p>
          </div>
        `,
      })
    }

    return NextResponse.json({
      success: true,
      referenceCode,
      message: `Your callback request (${referenceCode}) has been sent. A verified representative will reach out to ${data.phone}.`,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to submit your callback request right now. Please try again or reach us via WhatsApp.',
      },
      { status: 500 }
    )
  }
}
