export interface RecaptchaVerificationResult {
  success: boolean
  score: number
  requiresV2: boolean
  errorMessage?: string
}

export async function verifyRecaptchaSubmission(params: {
  recaptchaToken?: string
  recaptchaV2Token?: string
  expectedAction: string
}): Promise<RecaptchaVerificationResult> {
  const { recaptchaToken, recaptchaV2Token, expectedAction } = params
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  // Support deterministic testing of the low-score v2 fallback branch
  if (recaptchaToken === 'simulate-low-score' && !recaptchaV2Token) {
    return {
      success: false,
      score: 0.2,
      requiresV2: true,
      errorMessage: 'Security verification score was below 0.5. Please complete the checkbox verification below.',
    }
  }

  // If v2 fallback token was completed by user
  if (recaptchaV2Token) {
    if (!secretKey) {
      return { success: true, score: 1.0, requiresV2: false }
    }

    try {
      const body = new URLSearchParams({
        secret: secretKey,
        response: recaptchaV2Token,
      })
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      const data = (await response.json()) as { success?: boolean }
      if (!data.success) {
        return {
          success: false,
          score: 0,
          requiresV2: true,
          errorMessage: 'Checkbox verification expired or failed. Please try again.',
        }
      }
      return { success: true, score: 1.0, requiresV2: false }
    } catch {
      return {
        success: false,
        score: 0,
        requiresV2: true,
        errorMessage: 'Unable to verify checkbox challenge at this moment. Please try again.',
      }
    }
  }

  if (!recaptchaToken) {
    return {
      success: false,
      score: 0,
      requiresV2: true,
      errorMessage: 'Security token missing. Please complete the verification step below.',
    }
  }

  // Graceful development fallback when RECAPTCHA_SECRET_KEY is not configured in local environment
  if (!secretKey) {
    return {
      success: true,
      score: 0.9,
      requiresV2: false,
    }
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: recaptchaToken,
    })

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    const data = (await response.json()) as {
      success?: boolean
      score?: number
      action?: string
    }

    const score = typeof data.score === 'number' ? data.score : 0

    if (!data.success || (data.action && data.action !== expectedAction)) {
      return {
        success: false,
        score,
        requiresV2: true,
        errorMessage: 'Automated security check could not confirm your request. Please complete the checkbox below.',
      }
    }

    if (score < 0.5) {
      return {
        success: false,
        score,
        requiresV2: true,
        errorMessage: 'Additional verification required. Please tick the verification checkbox below.',
      }
    }

    return {
      success: true,
      score,
      requiresV2: false,
    }
  } catch {
    return {
      success: false,
      score: 0,
      requiresV2: true,
      errorMessage: 'Security verification service was unreachable. Please complete the fallback check below.',
    }
  }
}
