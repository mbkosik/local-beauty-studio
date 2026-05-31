/**
 * In-memory fixed-window rate limiter.
 * NOTE (Netlify): store lives in Lambda memory — not shared across instances,
 * not persisted across cold starts. Fine for low-traffic beauty salon.
 * For high-traffic production: replace with Upstash Redis.
 */

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

interface WindowEntry {
  count: number
  windowStart: number
}

const store = new Map<string, WindowEntry>()

function pruneExpired(now: number): void {
  for (const [key, entry] of store) {
    if (now - entry.windowStart >= WINDOW_MS) store.delete(key)
  }
}

interface RateLimitResult {
  limited: boolean
  retryAfterSeconds: number
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now()
  pruneExpired(now)

  const entry = store.get(ip)

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return { limited: false, retryAfterSeconds: 0 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      limited: true,
      retryAfterSeconds: Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000),
    }
  }

  entry.count += 1
  return { limited: false, retryAfterSeconds: 0 }
}
