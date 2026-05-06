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

export interface ContactConfirmationEmailProps {
  name: string
  email: string
  message: string
  studioName: string
}

export function ContactConfirmationEmail({
  name,
  message,
  studioName,
}: ContactConfirmationEmailProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Dziękujemy za wiadomość, {name}</Preview>
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
            <Section
              style={{
                backgroundColor: '#c9a0a0',
                padding: '24px 32px',
              }}
            >
              <Text
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '22px',
                  color: '#ffffff',
                  margin: '0',
                  fontWeight: 'bold',
                }}
              >
                Dziękujemy za kontakt
              </Text>
            </Section>

            <Section style={{ padding: '32px' }}>
              <Text
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '20px',
                  color: '#1a1a1a',
                  margin: '0 0 16px',
                }}
              >
                Cześć, {name}!
              </Text>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0 0 12px',
                }}
              >
                Twoja wiadomość dotarła do nas. Dziękujemy za kontakt — odezwiemy się tak szybko,
                jak to możliwe.
              </Text>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#444444',
                  lineHeight: '1.7',
                  margin: '0',
                }}
              >
                Poniżej znajdziesz kopię swojej wiadomości.
              </Text>

              <Hr style={{ borderColor: '#f0e8e8', margin: '24px 0' }} />

              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '13px',
                  color: '#888888',
                  margin: '0 0 12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Twoja wiadomość
              </Text>

              <Section
                style={{
                  borderLeft: '3px solid #c9a0a0',
                  backgroundColor: '#faf6f6',
                  padding: '16px 20px',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '15px',
                    color: '#555555',
                    lineHeight: '1.7',
                    margin: '0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {message}
                </Text>
              </Section>
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
                {studioName}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ContactConfirmationEmail
