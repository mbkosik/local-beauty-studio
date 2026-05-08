import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

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
    const payload = JSON.parse(body) as { _type?: string }
    const docType = payload._type ?? 'unknown'

    switch (docType) {
      case 'post':
        revalidateTag('post', {})
        break

      case 'page':
        revalidateTag('page', {})
        break

      case 'category':
        revalidateTag('post', {})
        break

      case 'siteSettings':
        revalidateTag('settings', {})
        break

      case 'service':
      case 'testimonial':
      case 'person':
      case 'pricingItem':
        revalidateTag('page', {})
        break

      default:
        revalidateTag('page', {})
        revalidateTag('post', {})
        revalidateTag('settings', {})
        break
    }

    return NextResponse.json({ revalidated: true, type: docType, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
