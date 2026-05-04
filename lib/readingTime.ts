// Average adult reading speed in words per minute (Nielsen Norman Group research)
const WORDS_PER_MINUTE = 200

export function estimateReadingTime(body: unknown[]): number {
  const text = (body as Array<{ _type: string; children?: Array<{ text?: string }> }>)
    .filter((block) => block._type === 'block')
    .flatMap((block) => (block.children ?? []).map((child) => child.text ?? ''))
    .join(' ')

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}
