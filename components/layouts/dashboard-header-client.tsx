'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu } from 'lucide-react'
import { NotificationBell } from '@/components/layouts/notification-bell'
import { useSidebar } from '@/components/providers/sidebar-provider'
import { OrganizationSwitcher } from '@/components/layouts/OrganizationSwitcher'
import { designSystem } from '@/lib/design-system'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/components/providers/auth-provider'
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
}

export function DashboardHeaderClient() {
  const { setIsOpen } = useSidebar();
  const { user } = useAuthContext();

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
        {user && <OrganizationSwitcher />}
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

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading || !user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserButton afterSignOutUrl="/" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 