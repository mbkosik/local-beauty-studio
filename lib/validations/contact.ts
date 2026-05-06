import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Imię i nazwisko musi mieć co najmniej 2 znaki')
    .max(100, 'Imię i nazwisko jest za długie'),
  email: z.email({ error: 'Podaj prawidłowy adres email' }),
  phone: z.string().max(20, 'Numer telefonu jest za długi').optional(),
  message: z
    .string()
    .min(10, 'Wiadomość musi mieć co najmniej 10 znaków')
    .max(2000, 'Wiadomość jest za długa'),
  address_line_2: z.string().default(''),
  loadedAt: z.number(),
})

// Input = raw form values (before defaults); Output = parsed values (after defaults)
export type ContactFormInput = z.input<typeof contactSchema>
export type ContactFormData = z.infer<typeof contactSchema>
