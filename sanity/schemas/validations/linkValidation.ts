import type { CustomValidator } from 'sanity'

export const isValidLinkHref: CustomValidator<string | undefined> = (value) => {
  if (!value) return true
  if (
    value.startsWith('/') ||
    value.startsWith('#') ||
    value.startsWith('tel:') ||
    value.startsWith('mailto:')
  )
    return true
  try {
    new URL(value)
    return true
  } catch {
    return 'Wpisz pełny URL (https://...), ścieżkę względną (/strona), tel:... lub mailto:...'
  }
}
