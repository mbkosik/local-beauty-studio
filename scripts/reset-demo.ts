/**
 * Reset the `demo` Sanity dataset: delete all documents, then re-seed from production.
 * Run: pnpm tsx scripts/reset-demo.ts
 *
 * Required in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_API_VERSION
 *   SANITY_DEMO_TOKEN  (Editor role, access to both datasets)
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

import { seedDemo } from './seed-demo'

dotenv.config({ path: '.env.local' })

// ── Config ────────────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'
const token = process.env.SANITY_DEMO_TOKEN

const MUTATION_BATCH = 250

// ── Delete all demo documents ─────────────────────────────────────────────────

async function deleteDemoDocuments(): Promise<void> {
  if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  if (!token) throw new Error('Missing SANITY_DEMO_TOKEN in .env.local')

  const client = createClient({ projectId, dataset: 'demo', apiVersion, useCdn: false, token })

  // Fetch all deletable document IDs:
  //   - content documents + their drafts
  //   - asset documents (sanity.imageAsset, sanity.fileAsset)
  // Skip internal system config docs (_.preferences.*)
  console.warn('🗑  Fetching all documents from demo...')
  const ids = await client.fetch<string[]>(`*[!(_id in path("_.preferences.*"))][].  _id`)
  console.warn(`   Found ${ids.length} documents to delete\n`)

  if (ids.length === 0) {
    console.warn('   Demo dataset is already empty\n')
    return
  }

  // Delete content documents first (they reference assets), then assets
  const contentIds = ids.filter((id) => !id.startsWith('image-') && !id.startsWith('file-'))
  const assetIds = ids.filter((id) => id.startsWith('image-') || id.startsWith('file-'))

  let deleted = 0
  const total = ids.length

  const deleteInBatches = async (idsToDelete: string[]) => {
    for (let i = 0; i < idsToDelete.length; i += MUTATION_BATCH) {
      const batch = idsToDelete.slice(i, i + MUTATION_BATCH)
      const tx = client.transaction()
      for (const id of batch) {
        tx.delete(id)
      }
      await tx.commit()
      deleted += batch.length
      process.stdout.write(`   ✓ [${deleted}/${total}]\r`)
    }
  }

  await deleteInBatches(contentIds)
  await deleteInBatches(assetIds)

  console.warn(`\n   Deleted ${deleted} documents\n`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function resetDemo(): Promise<void> {
  console.warn('\n🔄 Reset demo dataset — Beauty Studio\n')
  console.warn('════════════════════════════════════════')

  await deleteDemoDocuments()

  console.warn('════════════════════════════════════════\n')

  await seedDemo()

  console.warn('🎉 Demo dataset reset complete\n')
}

resetDemo().catch((err: Error) => {
  console.error('\n❌ Fatal error:', err.message)
  process.exit(1)
})
