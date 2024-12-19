"use client";

import { AuthSessionProvider } from "./session-provider";
import { LanguageProvider } from "@/contexts/language-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthSessionProvider>
  );
} 