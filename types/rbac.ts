export type Permission =
  | "system.manage"
  | "organizations.manage"
  | "properties.view"
  | "properties.create"
  | "properties.edit"
  | "properties.delete"
  | "units.view"
  | "units.create"
  | "units.edit"
  | "units.delete"
  | "leases.view"
  | "leases.create"
  | "leases.edit"
  | "leases.delete"
  | "reports.view"
  | "reports.create"
  | "payments.view"
  | "payments.create"
  | "users.invite"
  | "users.manage";

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
  organizationId: string;
};

export const DEFAULT_ROLES = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  USER: "USER",
} as const;

export type RoleType = keyof typeof DEFAULT_ROLES;
