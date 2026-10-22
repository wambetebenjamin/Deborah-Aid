import nodemailer from 'nodemailer'

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface SendMailPayload {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

export async function sendTransactionalEmail(payload: SendMailPayload): Promise<{ delivered: boolean; mode: 'smtp' | 'logged' }> {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || 'Deborah Aid <no-reply@deborahaid.org>'

  if (!host || !user || !pass) {
    // Safe fallback when SMTP environment credentials are not set in local preview
    console.info('[Deborah Aid Mail Fallback]', {
      to: payload.to,
      subject: payload.subject,
    })
    return { delivered: true, mode: 'logged' }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  await transporter.sendMail({
    from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  })

  return { delivered: true, mode: 'smtp' }
}
