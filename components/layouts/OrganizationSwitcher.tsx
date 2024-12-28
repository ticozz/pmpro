"use client";

import {
  Selectui,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganization } from "@/components/providers/organization-provider";

export function OrganizationSwitcher() {
  const { organization, organizations, setCurrentOrganization } = useOrganization();

  if (!organization) return null;

  return (
    <div className="flex items-center">
      <h2 className="text-lg font-semibold mr-4">{organization.name}</h2>
      {organizations.length > 1 && (
        <Selectui
          value={organization.id}
          onValueChange={(value) => {
            const org = organizations.find((org) => org.id === value);
            if (org) setCurrentOrganization(org);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Selectui>
      )}
    </div>
  );
} 