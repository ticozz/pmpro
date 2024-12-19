"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={false}
      // Skip initial session fetch for auth pages
      session={isAuthPage ? null : undefined}
    >
      {children}
    </SessionProvider>
  );
} 