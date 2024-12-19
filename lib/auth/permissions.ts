import { Permission, RoleType, DEFAULT_ROLES } from "@/types/rbac";
import { prisma } from "@/lib/prisma";
import { ROLE_PERMISSIONS } from "@/config/permissions";

export async function verifyOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if ((user?.role as unknown as string) === DEFAULT_ROLES.SUPERADMIN) {
    return true;
  }

  // For other roles, check organization membership
  return !!(await prisma.user.findFirst({
    where: {
      id: userId,
      organizationId: organizationId,
    },
  }));
}

export async function checkPermission(
  userId: string,
  organizationId: string,
  permission: Permission
): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return false;

  // SUPERADMIN has all permissions
  if ((user.role as unknown as string) === DEFAULT_ROLES.SUPERADMIN) {
    return true;
  }

  // For other roles, check specific permissions
  const permissions = ROLE_PERMISSIONS[user.role as RoleType];
  return permissions.includes(permission);
}
