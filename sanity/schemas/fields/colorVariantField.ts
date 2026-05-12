import { defineField } from 'sanity'

export const colorVariantField = defineField({
  name: 'colorVariant',
  title: 'Wariant kolorystyczny',
  type: 'string',
  options: {
    list: [
      { title: 'Jasny (domyślny)', value: 'light' },
      { title: 'Subtelny (szare tło)', value: 'muted' },
      { title: 'Ciemny (odwrócone kolory)', value: 'dark' },
      { title: 'Brand (różowe tło)', value: 'brand' },
    ],
    layout: 'radio',
  },
  initialValue: 'light',
})
