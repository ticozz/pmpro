"use client";

import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { DEFAULT_ROLES } from "@/types/rbac";
import { Permission } from "@/types/rbac";
import { designSystem } from "@/lib/design-system";
import { SidebarProvider } from '@/components/providers/sidebar-provider';
import { useSidebar } from '@/components/providers/sidebar-provider';

export function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className={cn(
        "flex-1 flex flex-col",
        isExpanded ? "md:pl-64" : "md:pl-16",
        "transition-all duration-300"
      )}>
        <AdminHeader />
        <main className={cn(
          "flex-1 overflow-y-auto",
          "bg-gradient-to-b from-blue-50/30 to-white"
        )}>
          <div className={cn(
            designSystem.layout.container,
            "py-6"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PermissionGuard requiredRole={DEFAULT_ROLES.SUPERADMIN as Permission}>
      <SidebarProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </SidebarProvider>
    </PermissionGuard>
  );
} 