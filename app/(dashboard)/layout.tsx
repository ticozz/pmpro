import DashboardLayout from '@/components/layouts/dashboard-layout'
import { SidebarProvider } from '@/components/providers/sidebar-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  )
} 