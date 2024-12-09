'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { designSystem } from '@/lib/design-system'
import { cn } from '@/lib/utils'

const notifications = [
  {
    id: 1,
    title: 'New Maintenance Request',
    description: 'Unit 204 reported a leaking faucet',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Payment Received',
    description: 'Rent payment received from John Doe',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Lease Expiring Soon',
    description: 'Unit 305 lease expires in 30 days',
    time: '2 hours ago',
    unread: false,
  },
] as const

export function NotificationBell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className={cn(designSystem.dropdown.content.base)}
      >
        <div className={designSystem.dropdown.content.header}>
          <p className={designSystem.dropdown.text.title}>
            Notifications
          </p>
          <p className={designSystem.dropdown.text.subtitle}>
            You have {notifications.filter(n => n.unread).length} unread messages
          </p>
        </div>
        <div className={designSystem.dropdown.content.inner}>
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={cn(
                designSystem.dropdown.content.item.base,
                designSystem.dropdown.content.item.hover,
                "flex-col items-start gap-1"
              )}
            >
              <div className="flex items-center gap-2 w-full">
                <span className={cn(
                  designSystem.dropdown.text.title,
                  "text-sm"
                )}>
                  {notification.title}
                </span>
                {notification.unread && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                )}
              </div>
              <p className={cn(
                designSystem.dropdown.text.subtitle,
                "text-xs"
              )}>
                {notification.description}
              </p>
              <p className={cn(
                designSystem.dropdown.text.subtitle,
                "text-[10px]"
              )}>
                {notification.time}
              </p>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className={designSystem.dropdown.content.separator} />
        <div className={designSystem.dropdown.content.inner}>
          <DropdownMenuItem
            className={cn(
              designSystem.dropdown.content.item.base,
              designSystem.dropdown.content.item.hover,
              "justify-center font-medium"
            )}
          >
            View all notifications
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 