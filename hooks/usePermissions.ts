import { useSession } from "next-auth/react";
import { useOrganization } from "@/hooks/useOrganization";
import { Permission, RoleType } from "@/types/rbac";
import { ROLE_PERMISSIONS } from "@/config/permissions";
import { UserRole } from "@prisma/client";

export function usePermissions() {
  const { data: session } = useSession();
  const { organization } = useOrganization();

  const hasPermission = (permission: Permission): boolean => {
    if (!session?.user || !organization) return false;

    const userRole = session.user.role;
    if (!userRole) return false;

    const permissions = ROLE_PERMISSIONS[userRole as RoleType];
    return permissions.includes(permission);
  };

  return {
    hasPermission,
    isOwner: organization ? session?.user?.role === UserRole.ADMIN : false,
    isAdmin: organization ? session?.user?.role === UserRole.ADMIN : false,
  };
}
