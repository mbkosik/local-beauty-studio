import { defineQuery } from 'next-sanity'

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    logoLight { alt, asset-> { _id, url, metadata { dimensions } } },
    logoDark { alt, asset-> { _id, url, metadata { dimensions } } },
    email,
    phone,
    address,
    googleMapsUrl,
    social {
      facebook,
      instagram,
      tiktok
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage { ..., asset-> }
    }
  }
`)

export const footerQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    logoLight { alt, asset-> { _id, url, metadata { dimensions } } },
    logoDark { alt, asset-> { _id, url, metadata { dimensions } } },
    email,
    phone,
    address,
    googleMapsUrl,
    social {
      facebook,
      instagram,
      tiktok
    }
  }
`)

export const featuredServicesQuery = defineQuery(`
  *[_type == "service" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    image { ..., asset-> },
    order,
    featured
  }
`)

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    image { ..., asset-> },
    order,
    featured
  }
`)

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && featured == true] {
    _id,
    authorName,
    position,
    company,
    content,
    rating,
    photo { ..., asset-> },
    publishedAt
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage { ..., asset-> },
    "author": author-> {
      name,
      photo { ..., asset-> }
    },
    "categories": categories[]-> { title, slug },
    publishedAt
  }
`)

export const featuredPostsQuery = defineQuery(`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage { ..., asset-> },
    "author": author-> {
      name,
      photo { ..., asset-> }
    },
    "categories": categories[]-> { title, slug },
    publishedAt
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage { ..., asset-> },
    body,
    "author": author-> {
      name,
      slug,
      bio,
      photo { ..., asset-> },
      social
    },
    "categories": categories[]-> { title, slug },
    publishedAt,
    featured,
    seo {
      metaTitle,
      metaDescription,
      ogImage { ..., asset-> }
    }
  }
`)

export const allPostsSlugsQuery = defineQuery(`
  *[_type == "post"] { "slug": slug.current }
`)

export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage { ..., asset-> },
    "author": author-> {
      name,
      photo { ..., asset-> }
    },
    "categories": categories[]-> { title, slug },
    publishedAt
  }
`)

export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`)
