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

  return (
    <div className="relative">
      <div className={cn(
        "flex flex-col gap-4 p-4",
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
  );
} 