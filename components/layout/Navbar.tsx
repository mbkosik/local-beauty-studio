import { sanityFetch } from '@/sanity/live'
import { siteSettingsQuery } from '@/sanity/queries'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import type { NavLink } from '@/sanity/custom-types'

export async function Navbar() {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery })

  const navLinks: NavLink[] = settings?.navLinks ?? []

  return (
    <HeaderWrapper
      businessName={settings?.businessName ?? null}
      logoLight={settings?.logoLight ?? null}
      logoDark={settings?.logoDark ?? null}
      navLinks={navLinks}
    />
  )
}
