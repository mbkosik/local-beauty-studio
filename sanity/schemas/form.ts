import { defineField, defineType } from 'sanity'

export const form = defineType({
  name: 'form',
  title: 'Formularz',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      fields: 'fields',
    },
    prepare({ title, fields }) {
      return {
        title: title ?? '(bez tytułu)',
        subtitle: `${(fields as unknown[])?.length ?? 0} pól`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa formularza',
      type: 'string',
      description: 'Wewnętrzna nazwa do identyfikacji w Studio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Pola formularza',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          title: 'Pole',
          preview: {
            select: {
              label: 'label',
              fieldType: 'fieldType',
              required: 'required',
            },
            prepare({ label, fieldType, required }) {
              return {
                title: label ?? '(bez etykiety)',
                subtitle: `${fieldType ?? '?'}${required ? ' · wymagane' : ''}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'fieldType',
              title: 'Typ pola',
              type: 'string',
              options: {
                list: [
                  { title: 'Tekst (krótki)', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Telefon', value: 'tel' },
                  { title: 'Tekst (długi / textarea)', value: 'textarea' },
                  { title: 'Lista wyboru (select)', value: 'select' },
                  { title: 'Liczba', value: 'number' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Etykieta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Pole wymagane',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'options',
              title: 'Opcje listy',
              description: 'Każda opcja w osobnej linii — widoczne tylko dla pola typu "select"',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.fieldType !== 'select',
            }),
            defineField({
              name: 'validation',
              title: 'Walidacja',
              type: 'object',
              fields: [
                defineField({
                  name: 'minLength',
                  title: 'Minimalna długość',
                  type: 'number',
                  hidden: ({ parent }) =>
                    ['email', 'select', 'number'].includes(parent?.fieldType ?? ''),
                }),
                defineField({
                  name: 'maxLength',
                  title: 'Maksymalna długość',
                  type: 'number',
                  hidden: ({ parent }) =>
                    ['email', 'select', 'number'].includes(parent?.fieldType ?? ''),
                }),
                defineField({
                  name: 'min',
                  title: 'Wartość minimalna',
                  type: 'number',
                  hidden: ({ parent }) => parent?.fieldType !== 'number',
                }),
                defineField({
                  name: 'max',
                  title: 'Wartość maksymalna',
                  type: 'number',
                  hidden: ({ parent }) => parent?.fieldType !== 'number',
                }),
                defineField({
                  name: 'pattern',
                  title: 'Wzorzec walidacji',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Polski numer telefonu', value: 'polishPhone' },
                      { title: 'Kod pocztowy (XX-XXX)', value: 'postalCode' },
                      { title: 'NIP', value: 'nip' },
                      { title: 'URL (https://...)', value: 'url' },
                    ],
                  },
                  hidden: ({ parent }) =>
                    ['email', 'select', 'number', 'textarea'].includes(parent?.fieldType ?? ''),
                }),
                defineField({
                  name: 'errorMessage',
                  title: 'Komunikat błędu',
                  type: 'string',
                  placeholder: 'Nadpisuje domyślny komunikat błędu',
                }),
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Adres email odbiorcy',
      type: 'string',
      description: 'Na ten adres trafią wypełnione formularze',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'emailSubject',
      title: 'Temat emaila',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailIntro',
      title: 'Wstęp emaila',
      type: 'text',
    }),
    defineField({
      name: 'confirmationSubject',
      title: 'Temat potwierdzenia (dla klienta)',
      type: 'string',
      description: 'Jeśli formularz zawiera pole email — wysyłane automatycznie',
    }),
    defineField({
      name: 'confirmationIntro',
      title: 'Treść potwierdzenia (dla klienta)',
      type: 'text',
    }),
    defineField({
      name: 'successMessage',
      title: 'Komunikat po wysłaniu',
      type: 'string',
      initialValue: 'Dziękujemy! Odezwiemy się wkrótce.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
