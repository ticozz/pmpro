"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/providers/sidebar-provider';
import { 
  ChevronDown,
  Settings,
  Users,
  Building2,
  BarChart3,
  Flag,
  CreditCard,
  LayoutDashboard,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { designSystem } from '@/lib/design-system';
import { useState } from 'react';
import { AdminUserNav } from '@/components/admin/admin-usernav';

interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
}

interface Route {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItem[];
}

const routes: Route[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    submenu: [
      { name: "All Users", href: "/admin/users" },
      { name: "Audit Logs", href: "/admin/users/audit-logs" }
    ]
  },
  {
    name: "Organizations",
    href: "/admin/organizations",
    icon: Building2,
    submenu: [
      { name: "All Organizations", href: "/admin/organizations" },
      { name: "Create Organization", href: "/admin/organizations/create" }
    ]
  },
  {
    name: "System",
    href: "/admin/system",
    icon: Settings,
    submenu: [
      { name: "Feature Flags", href: "/admin/system/features", icon: Flag },
      { name: "Global Settings", href: "/admin/system/settings", icon: Settings },
      { name: "Pricing Plans", href: "/admin/system/pricing", icon: CreditCard }
    ]
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    submenu: [
      { 
        name: "Overview", 
        href: "/admin/analytics" 
      },
      { 
        name: "User Activity", 
        href: "/admin/analytics/users" 
      },
      { 
        name: "System Metrics", 
        href: "/admin/analytics/metrics" 
      }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div 
      className={cn(
        "fixed top-0 z-30",
        "flex h-screen flex-col border-r transition-all",
        designSystem.colors.background.card,
        isExpanded ? "w-64" : "w-16"
      )}
      style={{ 
        ['--sidebar-width' as string]: isExpanded ? '16rem' : '4rem'
      }}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <h2 className={cn(
          "font-semibold transition-all",
          !isExpanded && "opacity-0"
        )}>
          Admin Portal
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "hover:bg-blue-50 hover:text-blue-700",
            !isExpanded && "absolute right-2"
          )}
          onClick={toggleSidebar}
        >
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            !isExpanded && "rotate-90",
            isExpanded && "-rotate-90"
          )} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-2 p-4">
          {routes.map((route) => (
            <div key={route.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === route.href && "bg-blue-50 text-blue-700 hover:bg-blue-50/80 hover:text-blue-700",
                  !isExpanded && "justify-center px-2"
                )}
                onClick={() => route.submenu && toggleSubmenu(route.name)}
              >
                <route.icon className={cn(
                  "h-4 w-4",
                  pathname === route.href && "text-blue-700"
                )} />
                {isExpanded && (
                  <>
                    <span className="flex-1 text-left">{route.name}</span>
                    {route.submenu && (
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.includes(route.name) && "rotate-180"
                      )} />
                    )}
                  </>
                )}
              </Button>

              {isExpanded && route.submenu && expandedItems.includes(route.name) && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {route.submenu?.map((item: NavItem) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        pathname === item.href 
                          ? "bg-blue-50 text-blue-700" 
                          : "text-muted-foreground hover:bg-blue-50/80 hover:text-blue-700",
                      )}
                    >
                      {item.icon && <item.icon className={cn(
                        "h-4 w-4",
                        pathname === item.href && "text-blue-700"
                      )} />}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <AdminUserNav className={cn(
          "w-full",
          !isExpanded && "justify-center px-0"
        )} />
      </div>
    </div>
  );
} 