"use client";

import { useOrganization } from "@/hooks/useOrganization";
import { useSession } from "next-auth/react";

export function OrganizationSwitcher() {
  const { data: session, status: sessionStatus } = useSession();
  const { organization, isLoading, error } = useOrganization();

  if (sessionStatus === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div>
      <span>{organization?.name}</span>
    </div>
  );
} 