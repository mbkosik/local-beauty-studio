import { draftMode } from 'next/headers'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { VisualEditingLoader } from '@/components/shared/VisualEditingLoader'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {isEnabled && <VisualEditingLoader />}
    </>
  )
}
