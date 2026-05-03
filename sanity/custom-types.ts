import { PageQueryResult } from '@/sanity.types'

export type PageBlock = NonNullable<NonNullable<PageQueryResult>['pageBuilder']>[number]
export type ServicesSectionData = Extract<PageBlock, { _type: 'sectionServices' }>
export type TestimonialsSectionData = Extract<PageBlock, { _type: 'sectionTestimonials' }>
