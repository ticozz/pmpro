import { Permission, RoleType } from "@/types/rbac";
import { prisma } from "../prisma";
import { ROLE_PERMISSIONS } from "@/config/permissions";

export async function verifyOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const member = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: organizationId,
    },
  });

  return !!member;
}

export async function checkPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: organizationId,
    },
  });

  if (!user) return false;

  const permissions = ROLE_PERMISSIONS[user.role as RoleType];
  return permissions.includes(permission);
}
