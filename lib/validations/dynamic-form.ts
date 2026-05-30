import { z } from 'zod'
import { stegaClean } from '@sanity/client/stega'

import { Form } from '@/sanity.types'

const PATTERNS = {
  polishPhone: /^\+?[\d\s-]{9,}/,
  postalCode: /^\d{2}-\d{3}$/,
  nip: /^\d{10}$/,
  url: /^https?:\/\/.+/,
}

type FormField = NonNullable<Form['fields']>[number]

export function buildZodSchema(fields: FormField[]): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    if (!field.fieldType || !field._key) continue

    const fieldType = stegaClean(field.fieldType) ?? field.fieldType
    const errorMessage = field.validation?.errorMessage

    let schema: z.ZodTypeAny

    switch (fieldType) {
      case 'text':
      case 'tel':
      case 'textarea': {
        let s = z.string()
        if (field.validation?.minLength != null) {
          s = s.min(field.validation.minLength, errorMessage)
        }
        if (field.validation?.maxLength != null) {
          s = s.max(field.validation.maxLength, errorMessage)
        }
        if (field.validation?.pattern) {
          s = s.regex(PATTERNS[field.validation.pattern], errorMessage)
        }
        schema = s
        break
      }
      case 'email': {
        schema = errorMessage ? z.email({ message: errorMessage }) : z.email()
        break
      }
      case 'number': {
        let n = z.coerce.number()
        if (field.validation?.min != null) {
          n = n.min(field.validation.min, errorMessage)
        }
        if (field.validation?.max != null) {
          n = n.max(field.validation.max, errorMessage)
        }
        schema = n
        break
      }
      case 'select': {
        schema = z.string()
        break
      }
      default:
        continue
    }

    if (!field.required) {
      if (fieldType === 'text' || fieldType === 'tel' || fieldType === 'textarea') {
        // HTML inputs submit '' for empty fields; treat it as "not provided"
        schema = schema.or(z.literal(''))
      }

      schema = schema.optional()
    }

    shape[field._key] = schema
  }

  shape['address_line_2'] = z.string().max(0)
  shape['loadedAt'] = z.string()

  return z.object(shape)
}
