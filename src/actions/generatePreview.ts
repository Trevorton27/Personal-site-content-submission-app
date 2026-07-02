"use server";

import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { PREVIEW_GENERATION_PROMPT } from "@/lib/systemPrompt";

// Simple in-memory rate limit: one preview per userId per 5 minutes
const lastPreviewTime = new Map<string, number>();
const RATE_LIMIT_MS = 5 * 60 * 1000;

function extractHtml(text: string): string {
  // Strip ```html ... ``` fences
  const fencedMatch = text.match(/```html\s*([\s\S]*?)```/);
  if (fencedMatch) return fencedMatch[1].trim();
  // Strip plain ``` ... ``` fences
  const plainMatch = text.match(/```\s*([\s\S]*?)```/);
  if (plainMatch) return plainMatch[1].trim();
  // If it looks like raw HTML, return as-is
  const trimmed = text.trim();
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
    return trimmed;
  }
  return trimmed;
}

export async function generatePreviewAction(
  userPrompt: string
): Promise<{ html?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  // Rate limit check
  const now = Date.now();
  const last = lastPreviewTime.get(userId) ?? 0;
  if (now - last < RATE_LIMIT_MS) {
    const waitSecs = Math.ceil((RATE_LIMIT_MS - (now - last)) / 1000);
    return { error: `Please wait ${waitSecs} seconds before generating another preview.` };
  }
  lastPreviewTime.set(userId, now);

  try {
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: PREVIEW_GENERATION_PROMPT,
      prompt: userPrompt,
      maxOutputTokens: 8000,
    });

    return { html: extractHtml(text) };
  } catch (err) {
    console.error("[generatePreviewAction] Failed:", err);
    return { error: "Failed to generate preview. Please try again." };
  }
}
