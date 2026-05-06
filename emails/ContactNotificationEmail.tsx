import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export interface ContactEmailProps {
  name: string
  email: string
  message: string
}

export function ContactNotificationEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Nowa wiadomość od {name}</Preview>
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
                Nowa wiadomość z formularza
              </Text>
            </Section>

            <Section style={{ padding: '32px' }}>
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
                Od
              </Text>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '16px',
                  color: '#1a1a1a',
                  margin: '0 0 4px',
                }}
              >
                {name}
              </Text>
              <Link
                href={`mailto:${email}`}
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#c9a0a0',
                  textDecoration: 'none',
                }}
              >
                {email}
              </Link>

              <Hr style={{ borderColor: '#f0e8e8', margin: '24px 0' }} />

              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '13px',
                  color: '#888888',
                  margin: '0 0 8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Treść wiadomości
              </Text>
              <Text
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontSize: '15px',
                  color: '#333333',
                  lineHeight: '1.7',
                  margin: '0',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message}
              </Text>
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
                Wiadomość wysłana przez formularz kontaktowy na stronie
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ContactNotificationEmail
