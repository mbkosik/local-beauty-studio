/**
 * Seed the `demo` Sanity dataset with data from `production`.
 * Run: pnpm tsx scripts/seed-demo.ts
 *
 * Required in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_API_VERSION
 *   SANITY_DEMO_TOKEN  (Editor role, access to both datasets)
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ── Config ────────────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'
const token = process.env.SANITY_DEMO_TOKEN

const CONTENT_TYPES = [
  'page',
  'post',
  'service',
  'testimonial',
  'person',
  'pricingItem',
  'category',
  'siteSettings',
  'form',
]

const MUTATION_BATCH = 250

// ── Types ─────────────────────────────────────────────────────────────────────

type AnyDoc = Record<string, unknown>

type AssetDoc = {
  _id: string
  _type: 'sanity.imageAsset' | 'sanity.fileAsset'
  url: string
  mimeType: string
  originalFilename: string
  extension: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function collectAssetRefs(docs: AnyDoc[]): Set<string> {
  const refs = new Set<string>()

  function walk(val: unknown): void {
    if (!val || typeof val !== 'object') return
    if (Array.isArray(val)) {
      val.forEach(walk)
      return
    }
    const obj = val as Record<string, unknown>
    if (
      obj._type === 'reference' &&
      typeof obj._ref === 'string' &&
      (obj._ref.startsWith('image-') || obj._ref.startsWith('file-'))
    ) {
      refs.add(obj._ref)
    }
    Object.values(obj).forEach(walk)
  }

  docs.forEach(walk)
  return refs
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function seedDemo(): Promise<void> {
  if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  if (!token) throw new Error('Missing SANITY_DEMO_TOKEN in .env.local')

  const source = createClient({
    projectId,
    dataset: 'production',
    apiVersion,
    useCdn: false,
    token,
  })
  const target = createClient({ projectId, dataset: 'demo', apiVersion, useCdn: false, token })

  // ── Step 1: Fetch content documents ──────────────────────────────────────

  const typeFilter = CONTENT_TYPES.map((t) => `"${t}"`).join(', ')
  console.warn('📦 Fetching documents from production...')
  const docs = await source.fetch<AnyDoc[]>(
    `*[_type in [${typeFilter}] && !(_id in path("drafts.**"))]`
  )
  console.warn(`   Found ${docs.length} documents\n`)

  // ── Step 2: Upload assets ─────────────────────────────────────────────────

  const assetRefs = collectAssetRefs(docs)
  console.warn(`🖼  Found ${assetRefs.size} unique asset references`)

  if (assetRefs.size > 0) {
    const assetDocs = await source.fetch<AssetDoc[]>(
      `*[_id in $ids]{ _id, _type, url, mimeType, originalFilename, extension }`,
      { ids: Array.from(assetRefs) }
    )

    let uploaded = 0
    let assetErrors = 0

    for (const asset of assetDocs) {
      try {
        const res = await fetch(asset.url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const blob = await res.blob()
        const assetType = asset._type === 'sanity.imageAsset' ? 'image' : 'file'
        const filename = asset.originalFilename || `asset.${asset.extension}`

        // Sanity deduplicates by SHA1 — uploading same file returns same _id
        await target.assets.upload(assetType, blob, { filename, contentType: asset.mimeType })
        uploaded++
        process.stdout.write(`   ✓ [${uploaded}/${assetDocs.length}]\r`)
      } catch (err) {
        assetErrors++
        console.error(
          `\n   ✗ Asset ${asset._id}: ${err instanceof Error ? err.message : String(err)}`
        )
      }
    }

    console.warn(`\n   Uploaded ${uploaded}/${assetDocs.length} assets\n`)
    if (assetErrors > 0) {
      console.warn(`   ⚠ ${assetErrors} asset upload(s) failed — images may not render\n`)
    }
  }

  // ── Step 3: Import content documents ─────────────────────────────────────
  // Asset _ids are hash-based (image-{sha1}-{dim}-{ext}) so they're identical
  // across datasets for the same file — no ref remapping needed.

  console.warn('📥 Importing documents to demo...')
  let imported = 0
  let docErrors = 0

  for (let i = 0; i < docs.length; i += MUTATION_BATCH) {
    const batch = docs.slice(i, i + MUTATION_BATCH)
    const tx = target.transaction()
    for (const doc of batch) {
      tx.createOrReplace(doc as Parameters<typeof target.createOrReplace>[0])
    }
    try {
      await tx.commit()
      imported += batch.length
      process.stdout.write(`   ✓ [${imported}/${docs.length}]\r`)
    } catch {
      // Fall back to single-doc create to surface the specific failure
      for (const doc of batch) {
        try {
          await target.createOrReplace(doc as Parameters<typeof target.createOrReplace>[0])
          imported++
        } catch (singleErr) {
          docErrors++
          console.error(
            `\n   ✗ ${doc._type}/${doc._id}: ${singleErr instanceof Error ? singleErr.message : String(singleErr)}`
          )
        }
      }
    }
  }

  console.warn(`\n\n✅ Seed complete: ${imported}/${docs.length} documents imported`)
  if (docErrors > 0) console.error(`❌ Errors: ${docErrors}`)
  console.warn()
}

// Run directly when called as script (not when imported by reset-demo.ts)
if (process.argv[1]?.includes('seed-demo')) {
  console.warn('\n🌱 Seed demo dataset — Beauty Studio\n')
  seedDemo().catch((err: Error) => {
    console.error('\n❌ Fatal error:', err.message)
    process.exit(1)
  })
}
