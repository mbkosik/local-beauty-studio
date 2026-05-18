import { type SchemaTypeDefinition } from 'sanity'

import { siteSettings } from './siteSettings'
import { navLink } from './navLink'
import { service } from './service'
import { testimonial } from './testimonial'
import { post } from './post'
import { person } from './person'
import { category } from './category'
import { page } from './page'
import { pricingItem } from './pricingItem'
import { form } from './form'
import { sectionSchemas } from './sections'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettings,
    // Pages
    page,
    // Main content
    service,
    testimonial,
    post,
    pricingItem,
    person,
    // Forms
    form,
    // Auxiliary
    category,
    navLink,
    // Page builder sections
    ...sectionSchemas,
  ],
}
