'use client'

import { useForm } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { toast } from 'sonner'
import type { Form as SanityForm } from '@/sanity.types'
import { trackEvent } from '@/lib/gtm'
import { buildZodSchema } from '@/lib/validations/dynamic-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type SanityFormFields = NonNullable<SanityForm['fields']>

interface DynamicFormProps {
  fields: SanityFormFields
  formId: string
  successMessage: string
  hasConfirmation: boolean
}

export function DynamicForm({ fields, formId, successMessage }: DynamicFormProps) {
  const schema = buildZodSchema(fields)

  const fieldDefaults = Object.fromEntries(fields.map((f) => [f._key, '']))
  const defaultValues = {
    ...fieldDefaults,
    address_line_2: '',
    loadedAt: new Date().toISOString(),
  }

  const form = useForm({
    resolver: standardSchemaResolver(schema),
    defaultValues,
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const res = await fetch(`/api/forms/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success(successMessage)
      trackEvent('form_submit', { form_name: formId })
      form.reset({ ...fieldDefaults, address_line_2: '', loadedAt: new Date().toISOString() })
    } catch {
      toast.error('Wystąpił błąd. Spróbuj ponownie.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <input
          type="text"
          {...form.register('address_line_2')}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute opacity-0"
        />

        {fields.map((field) => {
          if (!field._key || !field.fieldType) return null

          const label = field.label ?? field._key
          const required = field.required ?? false

          if (field.fieldType === 'select') {
            return (
              <FormField
                key={field._key}
                control={form.control}
                name={field._key}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && <span aria-hidden="true"> *</span>}
                    </FormLabel>
                    <Select onValueChange={formField.onChange} value={formField.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder ?? 'Wybierz opcję'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(field.options ?? []).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          if (field.fieldType === 'textarea') {
            return (
              <FormField
                key={field._key}
                control={form.control}
                name={field._key}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {label}
                      {required && <span aria-hidden="true"> *</span>}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={field.placeholder ?? ''}
                        rows={4}
                        required={required}
                        {...formField}
                        value={formField.value as string}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          const inputType =
            field.fieldType === 'number'
              ? 'number'
              : field.fieldType === 'email'
                ? 'email'
                : field.fieldType === 'tel'
                  ? 'tel'
                  : 'text'

          return (
            <FormField
              key={field._key}
              control={form.control}
              name={field._key}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={inputType}
                      placeholder={field.placeholder ?? ''}
                      required={required}
                      {...formField}
                      value={formField.value as string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Wysyłanie…' : 'Wyślij wiadomość'}
        </Button>
      </form>
    </Form>
  )
}
