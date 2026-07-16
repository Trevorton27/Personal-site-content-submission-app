"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";
import PromptTimestamp from "@/components/PromptTimestamp";
import type { PromptRecord } from "@/types/prompt";

interface PromptHistoryCardProps {
  prompt: PromptRecord;
  isLatest?: boolean;
}

export default function PromptHistoryCard({ prompt, isLatest = false }: PromptHistoryCardProps) {
  const { lang } = useApp();
  const t = translations[lang];
  const preview = prompt.content.slice(0, 200).trim();

  return (
    <Link
      href={`/history/${prompt.id}`}
      className="block border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug">
          {prompt.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {isLatest && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {t.historyLatestBadge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            v{prompt.version}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
        <PromptTimestamp iso={prompt.createdAt} />
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 font-mono">
        {preview}
        {prompt.content.length > 200 && "…"}
      </p>
    </Link>
  );
}
