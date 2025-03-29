'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/providers/sidebar-provider';
import {
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Settings,
  FileText,
  Wrench,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { designSystem } from '@/lib/design-system';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Properties',
    icon: Building2,
    href: '/properties',
  },
  {
    label: 'Maintenance',
    icon: Wrench,
    href: '/maintenance',
  },
  {
    label: 'Documents',
    icon: FileText,
    href: '/documents',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(r => r + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside>
      <div className="relative flex flex-col h-full">
        <div className={cn(
          "flex flex-col gap-4 p-4 flex-1",
          isExpanded ? "w-60" : "w-16"
        )}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors",
                pathname === route.href && "bg-accent",
                !isExpanded && "justify-center"
              )}
            >
              <route.icon size={20} />
              {isExpanded && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
        
        <div className={cn("flex-shrink-0 border-t p-4", designSystem.colors.background.card)}>
          {user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ) : null}
        </div>

        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className={cn(
            "absolute -right-3 top-6 rounded-full p-2",
            !isExpanded && "rotate-180"
          )}
        >
          <ChevronLeft size={16} />
        </Button>
      </div>
    </aside>
  );
} 