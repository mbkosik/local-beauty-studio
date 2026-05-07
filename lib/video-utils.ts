/**
 * Parses YouTube or Vimeo URLs and returns an embed URL.
 * Uses youtube-nocookie.com for enhanced privacy.
 * Handles formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://vimeo.com/VIDEO_ID
 */
export function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&color=white`
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`
  }

  return null
}
