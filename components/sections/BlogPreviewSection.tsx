import type { LatestPostsQueryResult } from '@/sanity.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogPreviewSection({
  data: _data,
  posts: _posts,
}: {
  data: any
  posts: LatestPostsQueryResult | null | undefined
}) {
  return <div>TODO: BlogPreviewSection</div>
}
