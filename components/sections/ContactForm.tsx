'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { toast } from 'sonner'
import { Mail, MapPin, Phone } from 'lucide-react'

import {
  contactSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/lib/validations/contact'
import type { SectionContact } from '@/sanity.types'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type BodyBlock = NonNullable<SectionContact['body']>[number]

const sidebarComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value?.href as string) ?? '#'
      const isExternal = (value?.blank as boolean) === true || href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

interface ContactFormProps {
  businessName: string
  email: string
  phone?: string
  address?: string
  body?: BodyBlock[]
}

export function ContactForm({ businessName, email, phone, address, body }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetCount, setResetCount] = useState(0)

  const form = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: standardSchemaResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      address_line_2: '',
      loadedAt: 0,
    },
  })

  const { register, setValue, reset } = form

  useEffect(() => {
    setValue('loadedAt', Date.now())
  }, [setValue, resetCount])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success('Wiadomość wysłana!', {
        description: 'Odezwiemy się wkrótce.',
      })
      reset()
      setResetCount((c) => c + 1)
    } catch {
      toast.error('Coś poszło nie tak.', {
        description: 'Spróbuj ponownie lub zadzwoń do nas.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <div className="mb-8 space-y-4">
          <a
            href={`mailto:${email}`}
            className="text-foreground hover:text-primary flex items-center gap-3 transition-colors"
          >
            <Mail className="text-primary shrink-0" size={20} aria-hidden="true" />
            <span>{email}</span>
          </a>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-foreground hover:text-primary flex items-center gap-3 transition-colors"
            >
              <Phone className="text-primary shrink-0" size={20} aria-hidden="true" />
              <span>{phone}</span>
            </a>
          )}

          {address && (
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5 shrink-0" size={20} aria-hidden="true" />
              <span className="text-foreground">{address}</span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <input
              type="text"
              {...register('address_line_2')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię i nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Anna Kowalska" autoComplete="name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="anna@example.pl"
                      autoComplete="email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Telefon <span className="text-muted-foreground font-normal">(opcjonalnie)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+48 123 456 789" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wiadomość</FormLabel>
                  <FormControl>
                    <Textarea placeholder="W czym możemy Ci pomóc?" rows={5} required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </Button>
          </form>
        </Form>
      </div>

      <AnimatedSection className="flex flex-col justify-center" delay={0.15}>
        <h3 className="font-heading mb-6 text-2xl font-semibold">{businessName}</h3>
        {body && body.length > 0 ? (
          <PortableText value={body} components={sidebarComponents} />
        ) : null}
      </AnimatedSection>
    </div>
  )
}
