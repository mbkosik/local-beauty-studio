import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { Toaster } from '@/components/ui/sonner'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { buildOgImageUrl } from '@/lib/metadata'

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
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } })

  const siteName = settings?.businessName ?? 'Beauty Studio'
  const title = settings?.seo?.metaTitle ?? siteName
  const description = settings?.seo?.metaDescription ?? ''

  const ogImageUrl = buildOgImageUrl(settings?.seo?.ogImage)

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
      title,
      description,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
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
          <ScrollToTop />
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
