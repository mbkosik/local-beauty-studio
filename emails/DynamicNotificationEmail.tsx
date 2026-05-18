import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export interface DynamicNotificationEmailProps {
  formTitle: string
  emailIntro?: string
  fields: Array<{ label: string; value: string }>
}

export function DynamicNotificationEmail({
  formTitle,
  emailIntro,
  fields,
}: DynamicNotificationEmailProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Nowe zgłoszenie z formularza: {formTitle}</Preview>
      <Tailwind>
        <Body style={{ backgroundColor: '#fafafa', margin: '0', padding: '0' }}>
          <Container
            style={{
              backgroundColor: '#ffffff',
              maxWidth: '600px',
              margin: '40px auto',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <Section style={{ backgroundColor: '#c9a0a0', padding: '24px 32px' }}>
              <Text
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '22px',
                  color: '#ffffff',
                  margin: '0',
                  fontWeight: 'bold',
                }}
              >
                {formTitle}
              </Text>
            </Section>

            <Section style={{ padding: '32px' }}>
              {emailIntro && (
                <Text
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '15px',
                    color: '#444444',
                    lineHeight: '1.7',
                    margin: '0 0 24px',
                  }}
                >
                  {emailIntro}
                </Text>
              )}

              {fields.map(({ label, value }) => (
                <Section key={label} style={{ marginBottom: '16px' }}>
                  <Text
                    style={{
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontSize: '13px',
                      color: '#888888',
                      margin: '0 0 4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontSize: '15px',
                      color: '#1a1a1a',
                      margin: '0',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {value}
                  </Text>
                </Section>
              ))}
            </Section>

            <Hr style={{ borderColor: '#f0e8e8', margin: '0' }} />

            <Section style={{ padding: '20px 32px' }}>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '12px',
                  color: '#aaaaaa',
                  margin: '0',
                  textAlign: 'center',
                }}
              >
                Wiadomość wysłana przez formularz na stronie
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default DynamicNotificationEmail
