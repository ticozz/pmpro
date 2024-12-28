"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface OrganizationContextType {
  organization: {
    id: string;
    name: string;
  } | null;
  organizations: Array<{
    id: string;
    name: string;
  }>;
  setCurrentOrganization: (org: { id: string; name: string }) => void;
  isLoading: boolean;
  error: Error | null;
}

export const OrganizationContext = createContext<OrganizationContextType>({
  organization: null,
  organizations: [],
  setCurrentOrganization: () => {},
  isLoading: true,
  error: null
});

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [organization, setOrganization] = useState<{ id: string; name: string } | null>(null);
  const [organizations, setOrganizations] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (session?.user?.organizationId) {
      fetch(`/api/organizations/${session.user.organizationId}`)
        .then(res => res.json())
        .then(data => {
          setOrganization({ id: data.id, name: data.name });
        });

      fetch('/api/organizations')
        .then(res => res.json())
        .then(data => setOrganizations(data.map((org: any) => ({ id: org.id, name: org.name }))));
    }
  }, [session?.user?.organizationId]);

  const value = {
    organization,
    organizations,
    setCurrentOrganization: setOrganization,
    isLoading,
    error
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