"use client";

import { useState, useMemo } from "react";
import type { AdminPromptRecord } from "@/actions/admin";

function downloadSelected(prompts: AdminPromptRecord[], selected: Set<string>) {
  const chosen = prompts.filter((p) => selected.has(p.id));
  const SEP = "\n\n" + "=".repeat(60) + "\n\n";
  const body = chosen
    .map(
      (p) =>
        `Title: ${p.title}\nUser: ${p.userEmail}\nVersion: ${p.version}\nCreated: ${p.createdAt}\n\n${p.content}`
    )
    .join(SEP);
  const blob = new Blob([body], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `admin-prompts-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPromptTable({
  prompts,
}: {
  prompts: AdminPromptRecord[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, AdminPromptRecord[]>();
    for (const p of prompts) {
      const list = map.get(p.userEmail) ?? [];
      list.push(p);
      map.set(p.userEmail, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [prompts]);

  const allIds = prompts.map((p) => p.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (prompts.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">No prompts found.</p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleAll}
          className="w-4 h-4 rounded"
          aria-label="Select all prompts"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Select all ({allIds.length} prompts)
        </span>
      </div>

      {grouped.map(([email, userPrompts]) => (
        <div key={email} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({userPrompts.length} prompt{userPrompts.length !== 1 ? "s" : ""})
            </span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {userPrompts.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  onChange={() => toggleOne(p.id)}
                  className="w-4 h-4 rounded shrink-0"
                />
                <span className="flex-1 text-sm text-gray-900 dark:text-gray-100 truncate">
                  {p.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                  v{p.version}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                  {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {selected.size > 0 && (
        <div className="sticky bottom-4 flex items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-lg">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {selected.size} selected
          </span>
          <button
            onClick={() => downloadSelected(prompts, selected)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Download .txt
          </button>
        </div>
      )}
    </div>
  );
}
