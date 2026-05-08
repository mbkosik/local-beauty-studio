import { Mail, Phone, MapPin } from 'lucide-react'
import { sanityFetch } from '@/sanity/live'
import { footerQuery } from '@/sanity/queries'
import { SanityImage } from '@/components/shared/SanityImage'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { TikTokIcon } from '@/components/icons/TikTokIcon'

export async function Footer() {
  const { data: settings } = await sanityFetch({ query: footerQuery })

  const year = new Date().getFullYear()
  const {
    businessName,
    tagline,
    logoLight,
    logoDark,
    email,
    phone,
    address,
    googleMapsUrl,
    social,
  } = settings ?? {}

  const hasLogos = Boolean(logoLight?.asset && logoDark?.asset)

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            {hasLogos ? (
              <>
                <SanityImage
                  image={logoLight}
                  alt={businessName ?? 'Logo'}
                  width={140}
                  height={36}
                  className="block dark:hidden"
                />
                <SanityImage
                  image={logoDark}
                  alt={businessName ?? 'Logo'}
                  width={140}
                  height={36}
                  className="hidden dark:block"
                />
              </>
            ) : (
              <span className="font-heading text-foreground text-xl font-semibold">
                {businessName ?? ''}
              </span>
            )}
            {tagline && <p className="text-muted-foreground text-sm">{tagline}</p>}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Kontakt</h3>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Mail size={15} aria-hidden="true" />
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Phone size={15} aria-hidden="true" />
                {phone}
              </a>
            )}
            {address && googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-start gap-2 text-sm transition-colors"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {address}
              </a>
            )}
            {address && !googleMapsUrl && (
              <p className="text-muted-foreground flex items-start gap-2 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {address}
              </p>
            )}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Znajdź nas</h3>
            <div className="flex gap-4">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FacebookIcon size={20} />
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <InstagramIcon size={20} />
                </a>
              )}
              {social?.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SectionDivider className="mb-6" />
          <p className="text-muted-foreground text-center text-sm">
            &copy; {year} {businessName}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
