"use client";

import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";

export default function FooterBar() {
  const { lang } = useApp();
  const t = translations[lang];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-24">
      <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
        {t.footerText}
      </div>
    </footer>
  );
}
