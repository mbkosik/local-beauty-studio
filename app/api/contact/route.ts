import { Resend } from 'resend'

import { contactSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  try {
    await resend.emails.send({
      from: 'Formularz kontaktowy <onboarding@resend.dev>',
      to: 'delivered@resend.dev',
      subject: `Nowa wiadomość od: ${data.name}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch {
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ success: true })
}
