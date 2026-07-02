"use server";

import { auth } from "@clerk/nextjs/server";
import { put, del } from "@vercel/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 4 * 1024 * 1024; // 4 MB

export async function uploadAvatarAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const file = formData.get("file") as File | null;
  if (!file || !file.name) return { error: "No file provided" };

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Invalid file type. JPEG, PNG, or WebP only." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "File too large. Maximum size is 4 MB." };
  }

  // Delete old blob if a replacement is being uploaded
  const oldUrl = formData.get("oldUrl") as string | null;
  if (oldUrl) {
    try {
      await del(oldUrl);
    } catch {
      // Best-effort deletion — don't block upload if old blob is already gone
    }
  }

  const ext = file.type.split("/")[1];
  const blob = await put(`avatars/${userId}/avatar.${ext}`, file, {
    access: "public",
  });

  return { url: blob.url };
}
