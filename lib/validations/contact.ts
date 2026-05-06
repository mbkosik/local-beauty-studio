import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  message: z.string().min(10).max(2000),
  address_line_2: z.string().default(''),
  loadedAt: z.number(),
})

export type ContactFormData = z.infer<typeof contactSchema>
