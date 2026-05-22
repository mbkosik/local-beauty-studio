import { CtaButton } from '@/components/shared/CtaButton'

interface PostCtaProps {
  cta: {
    heading?: string | null
    text?: string | null
    buttonLabel?: string | null
    buttonUrl?: string | null
  }
}

export function PostCta({ cta }: PostCtaProps) {
  return (
    <div className="bg-muted mt-12 rounded-xl border-l-4 border-(--color-brand,hsl(var(--primary))) p-8">
      {cta.heading && (
        <h3 className="font-heading text-foreground mb-3 text-xl font-semibold">{cta.heading}</h3>
      )}
      {cta.text && <p className="text-muted-foreground mb-6">{cta.text}</p>}
      {cta.buttonLabel && cta.buttonUrl && (
        <CtaButton href={cta.buttonUrl} label={cta.buttonLabel} section="post_cta" />
      )}
    </div>
  )
}
