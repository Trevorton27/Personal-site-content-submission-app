import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";
import type { SiteFormData } from "@/types/form";

interface FormDataEmailProps {
  form: SiteFormData;
  userId: string;
  timestamp: string;
}

export function FormDataEmail({ form, userId, timestamp }: FormDataEmailProps) {
  const projects = form.projects.filter((p) => p.title.trim());
  const posts = form.blogPosts.filter((p) => p.title.trim());

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
          <Heading style={{ fontSize: "20px", color: "#111827", marginBottom: "4px" }}>
            New Form Submission
          </Heading>
          <Text style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 24px" }}>
            {new Date(timestamp).toLocaleString()} · userId: {userId}
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
              Identity
            </Heading>
            <Row>
              <Column><Text style={labelStyle}>Name</Text></Column>
              <Column><Text style={valueStyle}>{form.name || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Role</Text></Column>
              <Column><Text style={valueStyle}>{form.role || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Email</Text></Column>
              <Column><Text style={valueStyle}>{form.userEmail || "—"}</Text></Column>
            </Row>
            {form.avatarUrl && (
              <Row>
                <Column><Text style={labelStyle}>Avatar URL</Text></Column>
                <Column>
                  <Text style={valueStyle}>
                    <a href={form.avatarUrl} style={{ color: "#2563eb" }}>View photo</a>
                  </Text>
                </Column>
              </Row>
            )}
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
              Hero
            </Heading>
            <Row>
              <Column><Text style={labelStyle}>Headline</Text></Column>
              <Column><Text style={valueStyle}>{form.headline || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Bio</Text></Column>
              <Column><Text style={valueStyle}>{form.heroBio || "—"}</Text></Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
              About
            </Heading>
            <Text style={valueStyle}>{form.aboutP1 || "—"}</Text>
            {form.aboutP2 && <Text style={valueStyle}>{form.aboutP2}</Text>}
          </Section>

          {projects.length > 0 && (
            <>
              <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />
              <Section>
                <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
                  Projects ({projects.length})
                </Heading>
                {projects.map((p, i) => (
                  <div key={i} style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: "3px solid #e5e7eb" }}>
                    <Text style={{ fontWeight: "600", margin: "0 0 4px", color: "#111827" }}>{p.title}</Text>
                    {p.description && <Text style={{ ...valueStyle, margin: "0 0 2px" }}>{p.description}</Text>}
                    {p.techStack && <Text style={{ ...valueStyle, color: "#6b7280", margin: 0 }}>{p.techStack}</Text>}
                  </div>
                ))}
              </Section>
            </>
          )}

          {posts.length > 0 && (
            <>
              <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />
              <Section>
                <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
                  Blog Posts ({posts.length})
                </Heading>
                {posts.map((p, i) => (
                  <div key={i} style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: "3px solid #e5e7eb" }}>
                    <Text style={{ fontWeight: "600", margin: "0 0 4px", color: "#111827" }}>{p.title}</Text>
                    {p.excerpt && <Text style={{ ...valueStyle, margin: "0 0 2px" }}>{p.excerpt}</Text>}
                    {p.content && (
                      <Text style={{ ...valueStyle, color: "#6b7280", margin: 0 }}>
                        {p.content.slice(0, 500)}{p.content.length > 500 ? "..." : ""}
                      </Text>
                    )}
                  </div>
                ))}
              </Section>
            </>
          )}

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Heading as="h2" style={{ fontSize: "16px", color: "#374151", margin: "0 0 12px" }}>
              Design
            </Heading>
            <Row>
              <Column><Text style={labelStyle}>Vibe</Text></Column>
              <Column><Text style={valueStyle}>{form.vibeCustom || form.vibe || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Colors</Text></Column>
              <Column><Text style={valueStyle}>{form.colorPalette || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Accent</Text></Column>
              <Column><Text style={valueStyle}>{form.accentColor || "—"}</Text></Column>
            </Row>
            <Row>
              <Column><Text style={labelStyle}>Background</Text></Column>
              <Column><Text style={valueStyle}>{form.backgroundPref || "—"}</Text></Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const labelStyle = {
  fontSize: "13px",
  color: "#6b7280",
  fontWeight: "500" as const,
  margin: "0 0 2px",
  minWidth: "120px",
};

const valueStyle = {
  fontSize: "13px",
  color: "#111827",
  margin: "0 0 8px",
};
