export type Permission =
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
  OWNER: "owner",
  ADMIN: "admin",
  PROPERTY_MANAGER: "property_manager",
  STAFF: "staff",
  VIEWER: "viewer",
} as const;

export type RoleType = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];
