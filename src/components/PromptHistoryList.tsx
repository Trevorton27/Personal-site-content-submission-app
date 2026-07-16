"use client";

import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";
import PromptHistoryCard from "@/components/PromptHistoryCard";
import type { PromptRecord } from "@/types/prompt";

interface PromptHistoryListProps {
  prompts: PromptRecord[];
}

const chainKey = (p: PromptRecord) => p.rootPromptId ?? p.id;

export default function PromptHistoryList({ prompts }: PromptHistoryListProps) {
  const { lang } = useApp();
  const t = translations[lang];

  if (prompts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {t.historyEmptyTitle}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.historyEmptyBody}</p>
      </div>
    );
  }

  // Group by chain
  const chainMap = new Map<string, PromptRecord[]>();
  for (const p of prompts) {
    const key = chainKey(p);
    if (!chainMap.has(key)) chainMap.set(key, []);
    chainMap.get(key)!.push(p);
  }

  // Sort each bucket by version ASC
  for (const bucket of chainMap.values()) {
    bucket.sort((a, b) => a.version - b.version);
  }

  // Sort buckets by latest version's createdAt DESC
  const chains = Array.from(chainMap.values()).sort((a, b) => {
    const aLatest = a[a.length - 1].createdAt;
    const bLatest = b[b.length - 1].createdAt;
    return bLatest.localeCompare(aLatest);
  });

  return (
    <div className="flex flex-col gap-8">
      {chains.map((chain) => {
        const root = chain[0];
        if (chain.length === 1) {
          return <PromptHistoryCard key={root.id} prompt={root} isLatest />;
        }

        const latest = chain[chain.length - 1];
        return (
          <div key={root.id} className="flex flex-col gap-2">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              {t.historyVersionCount(chain.length)}
            </p>
            <div className="flex flex-col gap-2 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
              {chain.map((p) => (
                <PromptHistoryCard key={p.id} prompt={p} isLatest={p.id === latest.id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
