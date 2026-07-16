"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface AdminPromptRecord {
  id: string;
  clerkUserId: string;
  userEmail: string;
  title: string;
  content: string;
  version: number;
  rootPromptId: string | null;
  createdAt: string;
}

const ADMIN_IDS = (process.env.ADMIN_USER_IDS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function isAdmin(userId: string) {
  return ADMIN_IDS.includes(userId);
}

export async function listAllPromptsAdminAction(): Promise<{
  prompts?: AdminPromptRecord[];
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) return { error: "Unauthorized" };

  const rows = await prisma.prompt.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      clerkUserId: true,
      title: true,
      content: true,
      version: true,
      rootPromptId: true,
      createdAt: true,
    },
  });

  const uniqueUserIds = [...new Set(rows.map((r) => r.clerkUserId))];
  const clerk = await clerkClient();
  const clerkUsers = await clerk.users.getUserList({
    userId: uniqueUserIds,
    limit: 200,
  });
  const emailMap = new Map(
    clerkUsers.data.map((u) => [
      u.id,
      u.primaryEmailAddress?.emailAddress ?? u.id,
    ])
  );

  return {
    prompts: rows.map((r) => ({
      ...r,
      userEmail: emailMap.get(r.clerkUserId) ?? r.clerkUserId,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}
