import type { PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="font-heading mt-8 mb-4 text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="font-heading mt-8 mb-4 text-2xl font-bold">{children}</h3>,
    h4: ({ children }) => (
      <h4 className="font-heading mt-8 mb-4 text-xl font-semibold">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-primary my-6 border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted rounded px-1 font-mono text-sm">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const isExternal = value?.blank === true || href.startsWith('http')
      return (
        <Link
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className="relative my-8 aspect-video w-full overflow-hidden rounded-lg">
          <SanityImage
            image={value as SanityImageData}
            // alt="" — obrazek dekoracyjny gdy redaktor nie wypełnił pola alt w Sanity
            // Redaktorzy powinni zawsze wypełniać pole alt dla obrazków w treści bloga
            alt={value.alt ?? ''}
            width={1200}
            height={675}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        </div>
      )
    },
  },
}
