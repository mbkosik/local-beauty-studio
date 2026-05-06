/**
 * Skrypt do importu postów blogowych do Sanity
 * Uruchomienie: npx tsx scripts/import-posts.ts
 *
 * Wymagane zmienne w .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_SEED_API_TOKEN   (uprawnienie Editor lub wyższe)
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

// ---------------------------------------------------------------------------
// Konfiguracja klienta
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_SEED_API_TOKEN!,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Typy pomocnicze
// ---------------------------------------------------------------------------
interface PostData {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  featured: boolean
  body: unknown[]
}

interface SanityRef {
  _type: 'reference'
  _ref: string
}

// ---------------------------------------------------------------------------
// Pomocnik: pobierz lub utwórz autorów
// ---------------------------------------------------------------------------
async function getOrCreateAuthors(): Promise<SanityRef[]> {
  const existing = await client.fetch<{ _id: string }[]>(`*[_type == "author"]{ _id }`)

  if (existing.length > 0) {
    console.log(`✓ Znaleziono ${existing.length} istniejących autorów`)
    return existing.map((a) => ({ _type: 'reference', _ref: a._id }))
  }

  console.log('Brak autorów — tworzę domyślnych...')

  const defaultAuthors = [
    {
      _type: 'author',
      name: 'Anna Kowalska',
      bio: [
        {
          _type: 'block',
          _key: 'bio1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'biospan1',
              text: 'Doświadczona kolorystka i stylistka z 10-letnim stażem. Specjalizuje się w technikach balayage i glossingu.',
            },
          ],
        },
      ],
    },
    {
      _type: 'author',
      name: 'Marta Wiśniewska',
      bio: [
        {
          _type: 'block',
          _key: 'bio2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'biospan2',
              text: 'Kosmetolog i ekspert pielęgnacji skóry. Absolwentka kierunku kosmetologia z pasją do składników aktywnych.',
            },
          ],
        },
      ],
    },
    {
      _type: 'author',
      name: 'Karolina Nowak',
      bio: [
        {
          _type: 'block',
          _key: 'bio3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'biospan3',
              text: 'Stylistka paznokci i nail art artist. Tworzy unikatowe zdobienia dla klientek ceniących detale.',
            },
          ],
        },
      ],
    },
  ]

  const created: SanityRef[] = []
  for (const author of defaultAuthors) {
    const doc = await client.create(author)
    created.push({ _type: 'reference', _ref: doc._id })
    console.log(`  ✓ Autor: ${author.name}`)
  }

  return created
}

// ---------------------------------------------------------------------------
// Pomocnik: pobierz lub utwórz kategorie
// ---------------------------------------------------------------------------
async function getOrCreateCategories(): Promise<SanityRef[]> {
  const existing = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "category"]{ _id, title }`
  )

  if (existing.length > 0) {
    console.log(`✓ Znaleziono ${existing.length} istniejących kategorii`)
    return existing.map((c) => ({ _type: 'reference', _ref: c._id }))
  }

  console.log('Brak kategorii — tworzę domyślne...')

  const defaultCategories = [
    { _type: 'category', title: 'Koloryzacja', slug: { _type: 'slug', current: 'koloryzacja' } },
    {
      _type: 'category',
      title: 'Pielęgnacja włosów',
      slug: { _type: 'slug', current: 'pielegnacja-wlosow' },
    },
    {
      _type: 'category',
      title: 'Pielęgnacja skóry',
      slug: { _type: 'slug', current: 'pielegnacja-skory' },
    },
    { _type: 'category', title: 'Paznokcie', slug: { _type: 'slug', current: 'paznokcie' } },
    { _type: 'category', title: 'Makijaż', slug: { _type: 'slug', current: 'makijaz' } },
  ]

  const created: SanityRef[] = []
  for (const cat of defaultCategories) {
    const doc = await client.create(cat)
    created.push({ _type: 'reference', _ref: doc._id })
    console.log(`  ✓ Kategoria: ${cat.title}`)
  }

  return created
}

// ---------------------------------------------------------------------------
// Mapowanie: przypisz kategorię na podstawie slug posta
// ---------------------------------------------------------------------------
function pickCategories(slug: string, allCategories: SanityRef[]): SanityRef[] {
  // Zwracamy 1-2 kategorie losowo — wystarczy dla demo
  const count = Math.random() > 0.5 ? 2 : 1
  const shuffled = [...allCategories].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((c) => ({ ...c, _key: Math.random().toString(36).slice(2) }))
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('\n🌸 Import postów do Sanity — Beauty Studio\n')

  // Walidacja env
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Brak NEXT_PUBLIC_SANITY_PROJECT_ID w .env.local')
  }
  if (!process.env.SANITY_SEED_API_TOKEN) {
    throw new Error('Brak SANITY_SEED_API_TOKEN w .env.local')
  }

  // Wczytaj dane postów
  const dataPath = process.argv[2] ? path.resolve(process.argv[2]) : null

  if (!dataPath) {
    console.error('❌ Podaj ścieżkę do pliku JSON jako argument')
    console.error('   Użycie: npx tsx scripts/import-posts.ts <ścieżka-do-pliku.json>')
    process.exit(1)
  }
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Nie znaleziono pliku ${dataPath}`)
  }
  const posts: PostData[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  console.log(`📄 Wczytano ${posts.length} postów z pliku JSON\n`)

  // Pobierz lub utwórz autorów i kategorie
  const authors = await getOrCreateAuthors()
  const categories = await getOrCreateCategories()
  console.log()

  // Import postów
  let imported = 0
  let errors = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]

    try {
      const author = authors[i % authors.length]

      const doc = {
        _type: 'post',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        featured: post.featured,
        body: post.body,
        author: { _type: 'reference', _ref: author._ref },
        categories: pickCategories(post.slug, categories),
      }

      await client.create(doc)
      imported++
      console.log(`  ✓ [${imported}/${posts.length}] ${post.title}`)
    } catch (err) {
      errors++
      console.error(`  ✗ [${i + 1}/${posts.length}] ${post.title}`)
      console.error(`    Błąd: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // Summary
  console.log('\n─────────────────────────────────────────')
  console.log(`✅ Zaimportowano: ${imported}/${posts.length} postów`)
  if (errors > 0) {
    console.log(`❌ Błędy: ${errors}`)
  }
  console.log('─────────────────────────────────────────\n')
}

main().catch((err) => {
  console.error('\n❌ Błąd krytyczny:', err.message)
  process.exit(1)
})
