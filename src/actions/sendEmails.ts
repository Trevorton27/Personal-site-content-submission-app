"use server";

import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { FormDataEmail } from "@/components/emails/FormDataEmail";
import { PromptEmail } from "@/components/emails/PromptEmail";
import type { SiteFormData } from "@/types/form";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
const EMAIL_ADMIN = process.env.EMAIL_ADMIN ?? "";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Feature 3: Email the admin a structured copy of the raw form data.
 * Fire-and-forget — errors are logged server-side, not surfaced to the user.
 */
export async function sendFormDataEmailAction(
  form: SiteFormData
): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  if (!EMAIL_ADMIN) return { error: "EMAIL_ADMIN not configured" };

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_ADMIN,
      subject: `New submission: ${form.name || "Anonymous"} — Personal Website Builder`,
      react: FormDataEmail({ form, userId, timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.error("[sendFormDataEmailAction] Failed to send:", err);
  }

  return {};
}

/**
 * Feature 2: Email the full system prompt to the admin and optionally to the user.
 */
export async function sendPromptEmailAction(
  prompt: string,
  userEmail: string,
  userName: string = ""
): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  if (!EMAIL_ADMIN) return { error: "EMAIL_ADMIN not configured" };

  const timestamp = new Date().toISOString();

  const sends = [
    resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_ADMIN,
      subject: `[Admin] Prompt generated — Personal Website Builder`,
      react: PromptEmail({ prompt, recipientType: "admin", userId, timestamp }),
    }),
  ];

  // Send user copy if they provided a valid email
  if (userEmail && isValidEmail(userEmail)) {
    sends.push(
      resend.emails.send({
        from: EMAIL_FROM,
        to: userEmail,
        subject: "Your personal website prompt is ready!",
        react: PromptEmail({ prompt, recipientType: "user", timestamp, userName }),
      })
    );
  }

  const results = await Promise.allSettled(sends);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[sendPromptEmailAction] Email ${i} failed:`, result.reason);
    }
  });

  return {};
}
