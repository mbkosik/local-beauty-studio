import { type SchemaTypeDefinition } from 'sanity'

import { siteSettings } from './siteSettings'
import { service } from './service'
import { testimonial } from './testimonial'
import { post } from './post'
import { author } from './author'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettings,
    // Main content
    service,
    testimonial,
    post,
    // Auxiliary
    author,
    category,
  ],
}
