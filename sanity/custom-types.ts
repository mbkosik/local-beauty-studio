import {
  BlogCategoriesQueryResult,
  BlogListingQueryResult,
  PageQueryResult,
  PostBySlugQueryResult,
  SiteSettingsQueryResult,
} from '@/sanity.types'

export type NavLink = NonNullable<NonNullable<SiteSettingsQueryResult>['navLinks']>[number]

export type PageBlock = NonNullable<NonNullable<PageQueryResult>['pageBuilder']>[number]
export type ServicesSectionData = Extract<PageBlock, { _type: 'sectionServices' }>
export type TestimonialsSectionData = Extract<PageBlock, { _type: 'sectionTestimonials' }>

export type BlogPost = NonNullable<BlogListingQueryResult>['posts'][number]
export type BlogCategory = BlogCategoriesQueryResult[number]
export type SinglePost = NonNullable<PostBySlugQueryResult>
