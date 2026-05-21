"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type WhatsappThemeMode = "dark" | "light";

type WhatsappThemeContextValue = {
  mode: WhatsappThemeMode;
  setMode: (mode: WhatsappThemeMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = "cee-whatsapp-theme";

const WhatsappThemeContext = createContext<WhatsappThemeContextValue | null>(null);

export function WhatsappThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<WhatsappThemeMode>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY);
    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [isMounted, mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark"))
    }),
    [mode]
  );

  return (
    <WhatsappThemeContext.Provider value={value}>
      <div className="whatsapp-shell" data-mode={mode}>
        {children}
      </div>
    </WhatsappThemeContext.Provider>
  );
}

export function useWhatsappTheme() {
  const context = useContext(WhatsappThemeContext);

  if (!context) {
    throw new Error("useWhatsappTheme must be used within WhatsappThemeProvider.");
  }

  return context;
}
