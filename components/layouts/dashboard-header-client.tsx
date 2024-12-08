'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu } from 'lucide-react'
import { UserNav } from '@/components/layouts/user-nav'
import { NotificationBell } from '@/components/layouts/notification-bell'
import { useSidebar } from '@/components/providers/sidebar-provider'

interface DashboardHeaderClientProps {
  onMenuClick?: () => void;
}

export function DashboardHeaderClient({ onMenuClick }: DashboardHeaderClientProps) {
  const { setIsOpen } = useSidebar();

  const handleClick = () => {
    if (onMenuClick) onMenuClick();
    else setIsOpen(true);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={handleClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <Input type="search" placeholder="Search..." className="md:w-[200px] lg:w-[300px]" />
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  )
} 