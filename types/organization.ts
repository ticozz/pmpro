import { OrgType } from "@prisma/client";

export interface Organization {
  id: string;
  name: string;
  type: OrgType;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: "owner" | "admin" | "member";
  createdAt: Date;
}
