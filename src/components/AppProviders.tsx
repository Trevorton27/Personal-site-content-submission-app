"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AppContextValue {
  lang: string;
  theme: string;
  toggleTheme: () => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  function toggleLang() {
    const next = lang === "en" ? "ja" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  }

  return (
    <AppContext.Provider value={{ lang, theme, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext)!;
}
