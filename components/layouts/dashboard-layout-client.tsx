'use client'

import { Sidebar } from '@/components/layouts/dashboard-sidebar'
import { DashboardHeaderClient } from '@/components/layouts/dashboard-header-client'
import { designSystem } from '@/lib/design-system'
import { OrganizationProvider } from '@/components/providers/organization-provider'
import { SidebarProvider } from '@/components/providers/sidebar-provider'
import { useAuthContext } from '@/components/providers/auth-provider'

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated, user } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <OrganizationProvider>
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden z-20">
            <DashboardHeaderClient />
            <main className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-50/30 to-white">
              <div className={designSystem.layout.container + " py-6"}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </OrganizationProvider>
  );
}