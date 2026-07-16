"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";
import { downloadPromptAs } from "@/lib/downloadPrompt";

interface PromptActionsProps {
  content: string;
  promptId?: string;
  filename?: string;
}

export default function PromptActions({
  content,
  promptId,
  filename = "my-personal-website-prompt",
}: PromptActionsProps) {
  const { lang } = useApp();
  const t = translations[lang];
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
      >
        {copied ? t.copiedBtn : t.copyBtn}
      </button>
      <button
        type="button"
        onClick={() => downloadPromptAs(content, "md", filename)}
        className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
      >
        {t.downloadBtn}
      </button>
      <button
        type="button"
        onClick={() => downloadPromptAs(content, "txt", filename)}
        className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
      >
        {t.downloadTxtBtn}
      </button>
      {promptId && (
        <Link
          href={`/history/${promptId}/edit`}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {t.historyEditBtn}
        </Link>
      )}
    </div>
  );
}
