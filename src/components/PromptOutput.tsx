"use client";

import Link from "next/link";
import { useState } from "react";
import { downloadPromptAs } from "@/lib/downloadPrompt";
import type { TranslationShape } from "@/types/translations";

interface PromptOutputProps {
  prompt: string;
  t: TranslationShape;
  savedPromptId?: string;
}

export default function PromptOutput({ prompt, t, savedPromptId }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-5 border-t-2 border-blue-500 pt-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.promptReady}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{t.promptDesc}</p>
      </div>

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
          onClick={() => downloadPromptAs(prompt, "md", "my-personal-website-prompt")}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {t.downloadBtn}
        </button>
        <button
          type="button"
          onClick={() => downloadPromptAs(prompt, "txt", "my-personal-website-prompt")}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {t.downloadTxtBtn}
        </button>
        {savedPromptId && (
          <Link
            href={`/history/${savedPromptId}`}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
          >
            {t.historyViewInHistory}
          </Link>
        )}
      </div>

      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-6 text-xs leading-relaxed overflow-auto max-h-[600px] whitespace-pre-wrap font-mono">
        {prompt}
      </pre>
    </div>
  );
}
