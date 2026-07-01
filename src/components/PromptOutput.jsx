"use client";

import { useState } from "react";

export default function PromptOutput({ prompt, t }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([prompt], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-personal-website-prompt.md";
    a.click();
    URL.revokeObjectURL(url);
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
          onClick={handleDownload}
          className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
        >
          {t.downloadBtn}
        </button>
      </div>

      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-6 text-xs leading-relaxed overflow-auto max-h-[600px] whitespace-pre-wrap font-mono">
        {prompt}
      </pre>
    </div>
  );
}
