import { render } from '@react-email/components'
import { Resend } from 'resend'

import { DynamicConfirmationEmail } from '@/emails/DynamicConfirmationEmail'
import { DynamicNotificationEmail } from '@/emails/DynamicNotificationEmail'
import { buildZodSchema } from '@/lib/validations/dynamic-form'
import { client } from '@/sanity/client'
import { Form } from '@/sanity.types'

const resend = new Resend(process.env.RESEND_API_KEY)

const MIN_FORM_FILL_MS = 3000

export async function POST(request: Request, props: { params: Promise<{ formId: string }> }) {
  if (!process.env.CONTACT_FROM_EMAIL) {
    return Response.json({ error: 'Brak konfiguracji email' }, { status: 500 })
  }

  const { formId } = await props.params

  const formConfig = await client.fetch<Form | null>(`*[_type == "form" && _id == $formId][0]`, {
    formId,
  })

  if (!formConfig) {
    return Response.json({ error: 'Formularz nie istnieje' }, { status: 404 })
  }

  const schema = buildZodSchema(formConfig.fields ?? [])

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return Response.json({ errors: result.error.issues }, { status: 400 })
  }

  const data = result.data as Record<string, unknown>

  if (data.address_line_2 !== '') {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  if (Date.now() - new Date(data.loadedAt as string).getTime() < MIN_FORM_FILL_MS) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  const notificationFields = (formConfig.fields ?? [])
    .filter((f) => data[f._key] != null && data[f._key] !== '')
    .map((f) => ({
      label: f.label ?? f._key,
      value: String(data[f._key]),
    }))

  const emailField = formConfig.fields?.find((f) => f.fieldType === 'email')
  const userEmail = emailField ? (data[emailField._key] as string | undefined) : undefined

  const notificationHtml = await render(
    DynamicNotificationEmail({
      formTitle: formConfig.title ?? 'Nowe zgłoszenie',
      emailIntro: formConfig.emailIntro ?? undefined,
      fields: notificationFields,
    })
  )

  const sends: Promise<unknown>[] = [
    resend.emails.send({
      from: `Formularz <${process.env.CONTACT_FROM_EMAIL}>`,
      to: formConfig.recipientEmail!,
      subject: formConfig.emailSubject ?? `Nowe zgłoszenie: ${formConfig.title}`,
      html: notificationHtml,
    }),
  ]

  if (formConfig.confirmationSubject && userEmail) {
    const confirmationHtml = await render(
      DynamicConfirmationEmail({
        formTitle: formConfig.title ?? '',
        confirmationIntro: formConfig.confirmationIntro ?? undefined,
      })
    )
    sends.push(
      resend.emails.send({
        from: `${formConfig.title} <${process.env.CONTACT_FROM_EMAIL}>`,
        to: userEmail,
        replyTo: formConfig.recipientEmail ?? undefined,
        subject: formConfig.confirmationSubject,
        html: confirmationHtml,
      })
    )
  }

  const results = await Promise.allSettled(sends)
  results.forEach((r) => {
    if (r.status === 'rejected') {
      console.error('Email send failed:', r.reason)
    }
  })

  return Response.json({
    success: true,
    message: formConfig.successMessage ?? 'Dziękujemy! Odezwiemy się wkrótce.',
  })
}
