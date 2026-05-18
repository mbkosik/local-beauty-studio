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

export interface DynamicConfirmationEmailProps {
  formTitle: string
  confirmationIntro?: string
}

export function DynamicConfirmationEmail({
  formTitle,
  confirmationIntro,
}: DynamicConfirmationEmailProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Twoje zgłoszenie zostało przyjęte</Preview>
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
                Dziękujemy za zgłoszenie
              </Text>
            </Section>

            <Section style={{ padding: '32px' }}>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0 0 12px',
                }}
              >
                Twoje zgłoszenie zostało przyjęte. Odezwiemy się tak szybko, jak to możliwe.
              </Text>

              {confirmationIntro && (
                <Text
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '15px',
                    color: '#444444',
                    lineHeight: '1.7',
                    margin: '0',
                  }}
                >
                  {confirmationIntro}
                </Text>
              )}
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
                {formTitle}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default DynamicConfirmationEmail
