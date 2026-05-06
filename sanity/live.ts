// Eksportujemy tylko sanityFetch — NIE SanityLive.
// Projekt nie używa live preview ani Presentation Tool.
// SanityLive w root layout powoduje przeładowania embedded Studio.
// sanityFetch zostaje dla cache tags (potrzebne przy ISR + webhook).
import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
})
