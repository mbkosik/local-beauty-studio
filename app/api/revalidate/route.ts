import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { client } from '@/sanity/client'

const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? ''

  if (!secret) {
    console.error('SANITY_REVALIDATE_SECRET is not set')
    return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 })
  }

  const valid = await isValidSignature(body, signature, secret)
  if (!valid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
  }

  try {
    const payload = JSON.parse(body) as { _type?: string; slug?: { current?: string } }
    const docType = payload._type ?? 'unknown'
    const slug = payload.slug?.current ?? ''

    const pageSlugs: string[] = await client.fetch(
      `*[_type == "page" && defined(slug.current)].slug.current`
    )

    switch (docType) {
      case 'post':
        revalidatePath('/blog')
        if (slug) revalidatePath(`/blog/${slug}`)
        break

      case 'page':
        revalidatePath(slug === 'home' ? '/' : `/${slug}`)
        break

      case 'category':
        revalidatePath('/blog')
        break

      case 'siteSettings':
        revalidatePath('/', 'layout')
        break

      // Types embedded in page builder — revalidate all pages
      case 'service':
      case 'testimonial':
      case 'person':
      case 'pricingItem':
      default:
        for (const pageSlug of pageSlugs) {
          revalidatePath(pageSlug === 'home' ? '/' : `/${pageSlug}`)
        }
        break
    }

    return NextResponse.json({ revalidated: true, type: docType, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
