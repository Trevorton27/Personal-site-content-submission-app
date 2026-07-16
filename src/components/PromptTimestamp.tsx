"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/components/AppProviders";

interface PromptTimestampProps {
  iso: string;
}

export default function PromptTimestamp({ iso }: PromptTimestampProps) {
  const { lang } = useApp();
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(
      new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(iso))
    );
  }, [iso, lang]);

  if (!formatted) return null;
  return <time dateTime={iso}>{formatted}</time>;
}
