import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
})
