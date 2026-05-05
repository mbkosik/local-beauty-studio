'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="pl">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf8f7',
          fontFamily: 'system-ui, sans-serif',
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }} aria-hidden="true">
          ✦
        </div>

        <h1
          style={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#1a1a1a',
            margin: '0 0 1rem',
          }}
        >
          Coś poszło nie tak
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: '#6b6b6b',
            maxWidth: '28rem',
            margin: '0 0 2rem',
            lineHeight: 1.6,
          }}
        >
          Wystąpił nieoczekiwany błąd aplikacji. Możesz spróbować ponownie lub wrócić na stronę
          główną.
        </p>

        {error.digest && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#9a9490',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
            }}
          >
            ID błędu: {error.digest}
          </p>
        )}

        <div
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={reset}
            style={{
              backgroundColor: '#c9a0a0',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Spróbuj ponownie
          </button>

          <button
            onClick={() => {
              window.location.href = '/'
            }}
            style={{
              backgroundColor: 'transparent',
              color: '#1a1a1a',
              border: '1px solid #e8e0dc',
              borderRadius: '0.5rem',
              padding: '0.625rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Wróć na stronę główną
          </button>
        </div>
      </body>
    </html>
  )
}
