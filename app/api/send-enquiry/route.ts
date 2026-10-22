import { NextResponse } from 'next/server'
import { sendEnquirySchema } from '@/lib/validations'
import { verifyRecaptchaSubmission } from '@/lib/recaptcha'
import { escapeHtml, sendTransactionalEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Verify reCAPTCHA v3 first; score < 0.5 triggers visible v2 challenge
    const captcha = await verifyRecaptchaSubmission({
      recaptchaToken: body?.recaptchaToken,
      recaptchaV2Token: body?.recaptchaV2Token,
      expectedAction: 'contact_enquiry',
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

    // 2. Validate inputs with Zod
    const parsed = sendEnquirySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your form details and try again.',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@deborahaid.org'
    const ticketId = `DA-ENQ-${Date.now().toString(36).toUpperCase()}`

    const safeName = escapeHtml(data.name)
    const safeEmail = escapeHtml(data.email)
    const safeSubject = escapeHtml(data.subject)
    const safeMessage = escapeHtml(data.message)

    await sendTransactionalEmail({
      to: adminEmail,
      replyTo: data.email,
      subject: `[Deborah Aid ${data.subject} - ${ticketId}] From ${data.name}`,
      text: `Ticket: ${ticketId}\nSubject: ${data.subject}\nFrom: ${data.name} (${data.email})\n\nMessage:\n${data.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 600px;">
          <h2 style="color: #072366;">New Deborah Aid Enquiry (${ticketId})</h2>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
          <p><strong>Message:</strong><br/>${safeMessage}</p>
        </div>
      `,
    })

    await sendTransactionalEmail({
      to: data.email,
      subject: `We Received Your Message (${ticketId}) - Deborah Aid`,
      text: `Hello ${data.name},\n\nThank you for contacting Deborah Aid regarding "${data.subject}". Your reference number is ${ticketId}.\n\nOur team responds within 2 working days. For urgent safety matters, call GVRC on 0800 720 090 or Childline Kenya on 116.\n\nWarm regards,\nDeborah Aid Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #10285d; max-width: 600px;">
          <h2 style="color: #072366;">Message Received (${ticketId})</h2>
          <p>Hello ${safeName},</p>
          <p>Thank you for writing to Deborah Aid regarding <strong>${safeSubject}</strong>. Our team will respond within 2 business days.</p>
          <p style="font-size: 12px; color: #57667e;">Processed in accordance with the Kenya Data Protection Act, 2019.</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Thank you, ${data.name}. Your message (${ticketId}) has been received and our team will reply shortly.`,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong while sending your message. Please try again or reach us on WhatsApp.',
      },
      { status: 500 }
    )
  }
}
