import { sanityFetch } from '@/sanity/live'
import { siteSettingsQuery } from '@/sanity/queries'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'

export async function Navbar() {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery })

  return (
    <HeaderWrapper
      businessName={settings?.businessName ?? null}
      logoLight={settings?.logoLight ?? null}
      logoDark={settings?.logoDark ?? null}
    />
  )
}
