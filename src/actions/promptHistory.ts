"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PromptRecord } from "@/types/prompt";
import type { SiteFormData } from "@/types/form";

const MAX_CONTENT_LENGTH = 50_000;

function toRecord(p: {
  id: string;
  clerkUserId: string;
  title: string;
  content: string;
  formData: unknown;
  version: number;
  rootPromptId: string | null;
  parentPromptId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): PromptRecord {
  return {
    id: p.id,
    clerkUserId: p.clerkUserId,
    title: p.title,
    content: p.content,
    formData: (p.formData as Record<string, unknown>) ?? null,
    version: p.version,
    rootPromptId: p.rootPromptId,
    parentPromptId: p.parentPromptId,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function savePromptAction(
  content: string,
  form: SiteFormData,
  title?: string
): Promise<{ id?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  if (content.length > MAX_CONTENT_LENGTH) return { error: "Content too long" };

  const autoTitle = form.name && form.role
    ? `${form.name} – ${form.role} Website Prompt`
    : form.name
    ? `${form.name} – Personal Website Prompt`
    : "Personal Website Prompt";

  try {
    const prompt = await prisma.prompt.create({
      data: {
        clerkUserId: userId,
        title: title ?? autoTitle,
        content,
        formData: form as unknown as Parameters<typeof prisma.prompt.create>[0]["data"]["formData"],
        version: 1,
        rootPromptId: null,
        parentPromptId: null,
      },
    });
    revalidatePath("/history");
    return { id: prompt.id };
  } catch (err) {
    console.error("[savePromptAction]", err);
    return { error: "Failed to save" };
  }
}

export async function listPromptsAction(): Promise<{
  prompts?: PromptRecord[];
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const prompts = await prisma.prompt.findMany({
      where: { clerkUserId: userId },
      orderBy: { createdAt: "desc" },
      take: 25,
    });
    return { prompts: prompts.map(toRecord) };
  } catch (err) {
    console.error("[listPromptsAction]", err);
    return { error: "Failed to load history" };
  }
}

export async function getPromptAction(id: string): Promise<{
  prompt?: PromptRecord;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const prompt = await prisma.prompt.findFirst({
      where: { id, clerkUserId: userId },
    });
    if (!prompt) return { error: "Not found" };
    return { prompt: toRecord(prompt) };
  } catch (err) {
    console.error("[getPromptAction]", err);
    return { error: "Failed to load prompt" };
  }
}

export async function createVersionAction(
  sourceId: string,
  content: string,
  title?: string
): Promise<{ id?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  if (content.length > MAX_CONTENT_LENGTH) return { error: "Content too long" };

  try {
    const newPrompt = await prisma.$transaction(async (tx) => {
      const source = await tx.prompt.findFirst({
        where: { id: sourceId, clerkUserId: userId },
      });
      if (!source) throw new Error("Not found");

      const rootId = source.rootPromptId ?? source.id;

      const maxVersionRecord = await tx.prompt.findFirst({
        where: { OR: [{ id: rootId }, { rootPromptId: rootId }] },
        orderBy: { version: "desc" },
      });
      const maxVersion = maxVersionRecord?.version ?? 1;

      return tx.prompt.create({
        data: {
          clerkUserId: userId,
          title: title ?? source.title,
          content,
          formData: source.formData,
          version: maxVersion + 1,
          rootPromptId: rootId,
          parentPromptId: sourceId,
        },
      });
    });

    revalidatePath("/history");
    revalidatePath(`/history/${sourceId}`);
    return { id: newPrompt.id };
  } catch (err) {
    console.error("[createVersionAction]", err);
    return { error: "Failed to create version" };
  }
}
