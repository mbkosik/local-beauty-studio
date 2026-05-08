import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { HeaderWrapper } from '@/components/layout/HeaderWrapper'
import type { NavLink } from '@/sanity/custom-types'

export async function Navbar() {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } })

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
