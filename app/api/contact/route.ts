import { render } from '@react-email/components'
import { Resend } from 'resend'

import { ContactConfirmationEmail } from '@/emails/ContactConfirmationEmail'
import { ContactNotificationEmail } from '@/emails/ContactNotificationEmail'
import { contactSchema } from '@/lib/validations/contact'
import { client } from '@/sanity/client'

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = 'delivered@resend.dev'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return Response.json({ errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const data = result.data

  if (data.address_line_2 !== '') {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  if (Date.now() - data.loadedAt < 2000) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  const { businessName } = await client.fetch<{ businessName: string }>(
    `*[_type == "siteSettings"][0]{ businessName }`
  )

  const emailProps = { name: data.name, email: data.email, message: data.message }

  try {
    await Promise.all([
      resend.emails.send({
        from: 'Formularz kontaktowy <onboarding@resend.dev>',
        to: OWNER_EMAIL,
        subject: `Nowa wiadomość od: ${data.name}`,
        html: await render(ContactNotificationEmail(emailProps)),
      }),
      resend.emails.send({
        from: `${businessName} <onboarding@resend.dev>`,
        to: data.email,
        replyTo: OWNER_EMAIL,
        subject: `Dziękujemy za wiadomość, ${data.name}`,
        html: await render(ContactConfirmationEmail({ ...emailProps, studioName: businessName })),
      }),
    ])
  } catch {
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ success: true })
}
