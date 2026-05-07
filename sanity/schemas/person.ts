import { defineField, defineType } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Osoba',
  type: 'document',
  preview: {
    select: {
      name: 'name',
      role: 'role',
      photo: 'photo',
    },
    prepare({ name, role, photo }) {
      return {
        title: name ?? '(bez nazwy)',
        subtitle: role ?? '',
        media: photo,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Imię i nazwisko',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Stanowisko / rola',
      type: 'string',
      description: 'Np. "Stylistka", "Kosmetyczka"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Maks. ~300 znaków',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Media społecznościowe',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
      ],
    }),
  ],
})
