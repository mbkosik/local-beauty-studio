import { PageQueryResult } from '@/sanity.types'

export type PageBlock = NonNullable<NonNullable<PageQueryResult>['pageBuilder']>[number]
export type ServicesSectionData = Extract<PageBlock, { _type: 'sectionServices' }>
