import { Clock, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { footerQuery } from '@/sanity/queries'
import { SanityImage } from '@/components/shared/SanityImage'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { TikTokIcon } from '@/components/icons/TikTokIcon'
import { PhoneLink } from '@/components/layout/PhoneLink'

export async function Footer() {
  const settings = await client.fetch(footerQuery, {}, { next: { tags: ['settings'] } })

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
    openingHours,
    footerLinks,
  } = settings ?? {}

  const hasLogos = Boolean(logoLight?.asset && logoDark?.asset)

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
            {phone && <PhoneLink phone={phone} />}
            {address && googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-start gap-2 text-sm transition-colors"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {address}
                <span className="sr-only">(otwiera nową kartę)</span>
              </a>
            )}
            {address && !googleMapsUrl && (
              <p className="text-muted-foreground flex items-start gap-2 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {address}
              </p>
            )}
          </div>

          {/* Opening Hours */}
          {openingHours && openingHours.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                <Clock size={14} className="mr-1.5 inline-block" aria-hidden="true" />
                Godziny otwarcia
              </h3>
              <dl className="space-y-1.5">
                {openingHours.map((entry, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-3">
                    <dt className="text-muted-foreground text-sm">{entry.days}</dt>
                    <dd className="text-muted-foreground shrink-0 text-sm font-medium">
                      {entry.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Znajdź nas</h3>
            <div className="flex gap-4">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (otwiera nową kartę)"
                  className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
                >
                  <FacebookIcon size={20} />
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (otwiera nową kartę)"
                  className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
                >
                  <InstagramIcon size={20} />
                </a>
              )}
              {social?.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok (otwiera nową kartę)"
                  className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
                >
                  <TikTokIcon size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SectionDivider className="mb-6" />
          {footerLinks && footerLinks.length > 0 && (
            <nav aria-label="Nawigacja w stopce" className="mb-6">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footerLinks.map((link, i) => {
                  if (!link.label || !link.url) return null
                  const isExternal = link.url.startsWith('http')
                  return (
                    <li key={i}>
                      {isExternal ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                          <span className="sr-only"> (otwiera nową kartę)</span>
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
          <p className="text-muted-foreground text-center text-sm">
            &copy; {year} {businessName}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
