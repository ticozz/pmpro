"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Organization } from "@prisma/client";

interface OrganizationContextType {
  organization: Organization | null;
  isLoading: boolean;
  error: Error | null;
  setOrganization: (org: Organization | null) => void;
}

export const OrganizationContext = createContext<OrganizationContextType>({
  organization: null,
  isLoading: true,
  error: null,
  setOrganization: () => {},
});

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchOrganization() {
      if (!session?.user?.organizationId || status !== "authenticated") {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`/api/organizations/${session.user.organizationId}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error("Failed to fetch organization");
        const data = await res.json();
        if (isMounted) {
          setOrganization(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching organization:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setIsLoading(false);
        }
      }
    }

    fetchOrganization();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.organizationId, status]);

  const value = {
    organization,
    isLoading,
    error,
    setOrganization,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider");
  }
  return context;
} 