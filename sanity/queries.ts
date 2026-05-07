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

export const allPersonsQuery = defineQuery(`
  *[_type == "person"] | order(name asc) {
    _id,
    name,
    role,
    bio,
    photo { ..., asset-> },
    socialMedia
  }
`)

export const personQuery = defineQuery(`
  *[_type == "person" && _id == $id][0] {
    _id,
    name,
    role,
    bio,
    photo { ..., asset-> },
    socialMedia
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
      role,
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
      role,
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
      role,
      bio,
      photo { ..., asset-> },
      socialMedia
    },
    "categories": categories[]-> { _id, title, slug },
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
      role,
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

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(publishedAt desc) [0...2] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage { ..., asset-> },
    publishedAt,
    "categories": categories[]-> { title, "slug": slug.current }
  }
`)

export const latestPostsQuery = defineQuery(`
  *[_type == "post" && (!defined($excludeSlugs) || !(slug.current in $excludeSlugs))] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage { ..., asset-> },
    publishedAt,
    "categories": categories[]-> { title, "slug": slug.current }
  }
`)

export const blogListingQuery = defineQuery(`
  {
    "posts": *[_type == "post" && (!defined($category) || $category == "" || $category in categories[]->slug.current)] | order(publishedAt desc) [$from...$to] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage { ..., asset-> },
      publishedAt,
      "categories": categories[]-> { title, "slug": slug.current }
    },
    "total": count(*[_type == "post" && (!defined($category) || $category == "" || $category in categories[]->slug.current)])
  }
`)

export const blogCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`)

export const contactSiteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    businessName,
    email,
    phone,
    address
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
        anchor,
        heading,
        subheading,
        primaryCta,
        secondaryCta,
        backgroundImage { ..., asset-> }
      },
      _type == "sectionTextImage" => {
        anchor,
        heading,
        body,
        image { ..., asset-> },
        imagePosition
      },
      _type == "sectionServices" => {
        anchor,
        heading,
        subheading,
        services[]-> {
          _id, title, description, icon,
          image { ..., asset-> }
        }
      },
      _type == "sectionPricing" => {
        anchor,
        heading,
        subheading,
        items[]-> {
          _id,
          name,
          duration,
          price,
          description
        }
      },
      _type == "sectionTestimonials" => {
        anchor,
        heading,
        testimonials[]-> {
          _id, authorName, position, company, content, rating,
          photo { ..., asset-> }
        }
      },
      _type == "sectionStats" => {
        anchor,
        heading,
        items
      },
      _type == "sectionGallery" => {
        anchor,
        heading,
        images[] { ..., asset-> }
      },
      _type == "sectionBlogPreview" => {
        _type,
        anchor,
        heading,
        subheading,
        mode,
        showViewAll,
        "posts": select(
          mode == "manual" => posts[]->{
            _id, title, slug, excerpt, mainImage, publishedAt,
            "categories": categories[]->{title}
          },
          *[_type == "post"] | order(publishedAt desc) [0..2] {
            _id, title, slug, excerpt, mainImage, publishedAt,
            "categories": categories[]->{title}
          }
        )
      },
      _type == "sectionCta" => {
        anchor,
        heading,
        subheading,
        primaryCta,
        secondaryCta,
        variant
      },
      _type == "sectionContact" => {
        anchor,
        heading,
        subheading,
        body
      },
      _type == "sectionTeam" => {
        anchor,
        title,
        subtitle,
        members[]-> {
          _id,
          name,
          role,
          bio,
          photo { asset->, hotspot, crop },
          socialMedia
        }
      },
      _type == "sectionFaq" => {
        anchor,
        title,
        subtitle,
        items[] {
          question,
          answer
        }
      },
      _type == "sectionProcess" => {
        _type,
        anchor,
        title,
        subtitle,
        layout,
        steps[] {
          icon,
          title,
          description
        }
      }
    }
  }
`)
