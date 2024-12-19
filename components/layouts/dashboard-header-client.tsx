'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu } from 'lucide-react'
import { NotificationBell } from '@/components/layouts/notification-bell'
import { useSidebar } from '@/components/providers/sidebar-provider'
import { OrganizationSwitcher } from '@/components/layouts/OrganizationSwitcher'
import { designSystem } from '@/lib/design-system'
import { cn } from '@/lib/utils'


export function DashboardHeaderClient() {
  const { setIsOpen } = useSidebar();

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <header className={cn(
      designSystem.layout.header,
      "border-b",
      designSystem.colors.background.overlay,
      designSystem.effects.blur,
      "supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="flex h-14 items-center px-4 gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={handleClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <OrganizationSwitcher />
        <div className="flex-1">
          <Input 
            type="search" 
            placeholder="Search..." 
            className={cn(
              "md:w-[200px] lg:w-[300px]",
              "bg-white/50",
              designSystem.effects.blur
            )}
          />
        </div>
        <NotificationBell />
      </div>
    </header>
  )
} 