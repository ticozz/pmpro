'use client';

import { LucideIcon, Building2, Users, Settings, BarChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { designSystem } from "@/lib/design-system";

interface AdminRoute {
  label: string;
  icon: LucideIcon;
  href: string;
  items: {
    label: string;
    href: string;
  }[];
}

const adminRoutes: AdminRoute[] = [
  {
    label: "Organizations",
    icon: Building2,
    href: "/admin/organizations",
    items: [
      { label: "All Organizations", href: "/admin/organizations" },
      { label: "Create Organization", href: "/admin/organizations/new" },
      { label: "Limits & Features", href: "/admin/organizations/limits" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    items: [
      { label: "All Users", href: "/admin/users" },
      { label: "Audit Logs", href: "/admin/users/audit-logs" },
    ],
  },
  {
    label: "System",
    icon: Settings,
    href: "/admin/system",
    items: [
      { label: "Feature Flags", href: "/admin/system/features" },
      { label: "Global Settings", href: "/admin/system/settings" },
      { label: "Pricing Plans", href: "/admin/system/pricing" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
    items: [
      { label: "Dashboard", href: "/admin/analytics" },
      { label: "Usage Stats", href: "/admin/analytics/usage" },
      { label: "Performance", href: "/admin/analytics/performance" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "w-64 h-screen border-r",
      designSystem.colors.background.card
    )}>
      <div className="h-14 flex items-center px-4 border-b">
        <h1 className={cn("text-lg font-semibold", designSystem.colors.primary.text)}>
          Admin Portal
        </h1>
      </div>
      <nav className="p-4 space-y-2">
        {adminRoutes.map((route) => (
          <div key={route.href} className="space-y-1">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg",
              pathname?.startsWith(route.href) && designSystem.colors.primary.light,
              designSystem.colors.primary.lightHover
            )}>
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </div>
            {route.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-9 py-2 rounded-lg text-sm",
                  pathname === item.href && designSystem.colors.primary.light,
                  designSystem.colors.primary.lightHover
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
} 