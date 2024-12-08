'use client'

import { Sidebar } from '@/components/layouts/dashboard-sidebar'
import { DashboardHeaderClient } from '@/components/layouts/dashboard-header-client'
import { SidebarProvider } from '@/components/providers/sidebar-provider'

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeaderClient onMenuClick={() => {}} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
} 