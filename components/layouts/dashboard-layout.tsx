'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/components/providers/auth-provider";
import { DashboardLayoutClient } from "./dashboard-layout-client";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login');
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </AuthProvider>
  );
} 