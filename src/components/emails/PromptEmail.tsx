import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
} from "@react-email/components";

interface PromptEmailProps {
  prompt: string;
  recipientType: "admin" | "user";
  userId?: string;
  timestamp?: string;
  userName?: string;
}

export function PromptEmail({ prompt, recipientType, userId, timestamp, userName }: PromptEmailProps) {
  const isAdmin = recipientType === "admin";

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
          {isAdmin ? (
            <>
              <Heading style={{ fontSize: "20px", color: "#111827", marginBottom: "4px" }}>
                [Admin] Prompt Generated
              </Heading>
              <Text style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 8px" }}>
                {timestamp ? new Date(timestamp).toLocaleString() : ""}
              </Text>
              {userId && (
                <Text style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 24px" }}>
                  userId: {userId}
                </Text>
              )}
            </>
          ) : (
            <>
              <Heading style={{ fontSize: "20px", color: "#111827", marginBottom: "4px" }}>
                Your personal website prompt is ready!
              </Heading>
              <Text style={{ color: "#374151", fontSize: "14px", margin: "0 0 24px" }}>
                {userName ? `Hi ${userName},` : "Hi there,"} here is the AI prompt you generated
                with the Personal Website Builder. Copy it and paste it into Claude, ChatGPT, or
                any AI assistant to customize your personal website.
              </Text>
            </>
          )}

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "15px", color: "#374151", margin: "0 0 12px" }}>
              Generated Prompt
            </Heading>
            <div
              style={{
                backgroundColor: "#111827",
                borderRadius: "8px",
                padding: "16px",
                overflowX: "auto",
              }}
            >
              <Text
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#f3f4f6",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {prompt}
              </Text>
            </div>
          </Section>

          {!isAdmin && (
            <>
              <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />
              <Text style={{ color: "#6b7280", fontSize: "12px", textAlign: "center" as const }}>
                Personal Website Builder · Built for the personal website course
              </Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
}
