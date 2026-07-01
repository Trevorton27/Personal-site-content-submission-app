"use client";

import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";

export default function TopBar() {
  const { lang, theme, toggleTheme, toggleLang } = useApp();
  const t = translations[lang];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
            {t.siteTitle}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {t.siteTagline}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {t.langToggleLabel}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
            className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "light" ? t.themeLightLabel : t.themeDarkLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
