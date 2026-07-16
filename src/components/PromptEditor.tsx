"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";
import { createVersionAction } from "@/actions/promptHistory";
import type { PromptRecord } from "@/types/prompt";

const MAX = 50_000;

interface PromptEditorProps {
  prompt: PromptRecord;
}

export default function PromptEditor({ prompt }: PromptEditorProps) {
  const { lang } = useApp();
  const t = translations[lang];
  const router = useRouter();
  const [content, setContent] = useState(prompt.content);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (!content.trim()) return;
    setError("");
    startTransition(async () => {
      const result = await createVersionAction(prompt.id, content);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push(`/history/${result.id}`);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t.historyEditHint(prompt.version)}
      </p>

      <div className="flex flex-col gap-1.5">
        <textarea
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={MAX}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
          {t.historyCharCount(content.length, MAX)}
        </p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending || content.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {isPending ? "Saving…" : t.historyEditSubmitBtn}
        </button>
        <Link
          href={`/history/${prompt.id}`}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {t.historyEditCancelBtn}
        </Link>
      </div>
    </div>
  );
}
