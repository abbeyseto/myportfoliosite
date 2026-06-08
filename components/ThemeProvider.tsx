import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "dark" | "light";

type ThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const storageKey = "portfolio-theme";

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
