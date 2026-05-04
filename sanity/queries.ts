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
    "navLinks": navLinks[] {
      label,
      href,
      openInNewTab
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

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    description,
    icon,
    image { ..., asset-> }
  }
`)

export const allTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt asc) {
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

export const latestPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    mainImage { ..., asset-> },
    publishedAt,
    "author": author-> { name },
    "categories": categories[]-> { title, slug }
  }
`)

export const allPagesSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current) && slug.current != "home"] {
    "slug": slug.current
  }
`)

export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo,
    pageBuilder[] {
      _type,
      _key,
      _type == "sectionHero" => {
        heading,
        subheading,
        primaryCta,
        secondaryCta,
        backgroundImage { ..., asset-> }
      },
      _type == "sectionTextImage" => {
        heading,
        body,
        image { ..., asset-> },
        imagePosition
      },
      _type == "sectionServices" => {
        heading,
        subheading,
        services[]-> {
          _id, title, description, icon,
          image { ..., asset-> }
        }
      },
      _type == "sectionPricing" => {
        heading,
        subheading,
        items
      },
      _type == "sectionTestimonials" => {
        heading,
        testimonials[]-> {
          _id, authorName, position, company, content, rating,
          photo { ..., asset-> }
        }
      },
      _type == "sectionStats" => {
        heading,
        items
      },
      _type == "sectionGallery" => {
        heading,
        images[] { ..., asset-> }
      },
      _type == "sectionBlogPreview" => {
        heading,
        count
      },
      _type == "sectionCta" => {
        heading,
        subheading,
        primaryCta,
        secondaryCta,
        variant
      },
      _type == "sectionContact" => {
        heading,
        subheading
      }
    }
  }
`)
