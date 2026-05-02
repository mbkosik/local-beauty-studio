import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { SanityLive, sanityFetch } from '@/sanity/live'
import { siteSettingsQuery } from '@/sanity/queries'

const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
})

const lato = Lato({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery })

  const siteName = settings?.businessName ?? 'Beauty Studio'
  const title = settings?.seo?.metaTitle ?? siteName
  const description = settings?.seo?.metaDescription ?? ''

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      siteName,
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning needed — next-themes sets class on html before hydration
    <html
      lang="pl"
      className={`${playfairDisplay.variable} ${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SanityLive />
      </body>
    </html>
  )
}
