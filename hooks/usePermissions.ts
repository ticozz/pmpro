import { useSession } from "next-auth/react";
import { Permission } from "@/types/rbac";

export function usePermissions() {
  const { data: session } = useSession();

  const hasPermission = (requiredRole: Permission): boolean => {
    console.log("usePermissions - Current user role:", session?.user?.role);
    console.log("usePermissions - Required role:", requiredRole);

    return session?.user?.role === requiredRole;
  };

  return { hasPermission };
}
