import { ReactNode } from "react";
import { Permission } from "../../types/rbac";
import { usePermissions } from "../../hooks/usePermissions";
import { useSession } from "next-auth/react";

interface PermissionGuardProps {
  children: ReactNode;
  requiredRole: Permission;
}

export function PermissionGuard({
  children,
  requiredRole,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();
  const { data: session } = useSession();

  console.log("PermissionGuard - Current session:", session);
  console.log("PermissionGuard - Required role:", requiredRole);
  console.log("PermissionGuard - Has permission:", hasPermission(requiredRole));

  if (!session) {
    console.log("PermissionGuard - No session, redirecting...");
    return null;
  }

  if (!hasPermission(requiredRole)) {
    console.log("PermissionGuard - Permission denied");
    return null;
  }

  return <>{children}</>;
} 