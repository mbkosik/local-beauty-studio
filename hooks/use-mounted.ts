'use client'
import { useSyncExternalStore } from 'react'

// Empty subscribe — browser mounting state never changes after init
const emptySubscribe = () => () => {}

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  )
}
