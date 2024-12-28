"use client";

import { type ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./auth-provider";
import { SidebarProvider } from "./sidebar-provider";
import { LanguageProvider } from "@/contexts/language-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SessionProvider>
        <AuthProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </AuthProvider>
      </SessionProvider>
    </LanguageProvider>
  );
} 