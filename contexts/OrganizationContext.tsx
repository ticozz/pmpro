"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Organization } from "@/types/organization";

interface OrganizationContextType {
  currentOrganization: Organization | null;
  setCurrentOrganization: (org: Organization | null) => void;
  switchOrganization: (organizationId: string) => Promise<void>;
}

export const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);

  const switchOrganization = useCallback(async (organizationId: string) => {
    try {
      const response = await fetch(`/api/organizations/${organizationId}`);
      if (!response.ok) throw new Error('Failed to fetch organization');
      const org = await response.json();
      setCurrentOrganization(org);
    } catch (error) {
      console.error('Error switching organization:', error);
      setCurrentOrganization(null);
      throw error;
    }
  }, []);

  return (
    <OrganizationContext.Provider value={{ currentOrganization, setCurrentOrganization, switchOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}; 