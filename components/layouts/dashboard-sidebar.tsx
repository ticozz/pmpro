'use client'

import { cn } from '@/lib/utils';
import { navigation } from '@/config/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/providers/sidebar-provider';
import { 
  ArrowLeftToLine, 
  ArrowRightToLine,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  Building2,
  Wallet,
  Users,
  Hammer,
  BarChart3,
  Banknote,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from '@/hooks/use-user';
import { designSystem } from '@/lib/design-system'
import { useState, useRef } from 'react';
import { signOut } from "next-auth/react";

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Route {
  name: string;
  href: string;
  icon: LucideIcon;
  submenu?: Array<{ name: string; href: string; }>;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();
  const { user, isLoading } = useUser();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const isOpenValue = open ?? isOpen;
  const setIsOpenValue = onOpenChange ?? setIsOpen;

  const toggleSubmenu = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [itemName]
    );
  };

  const handleMouseLeave = () => {
    setExpandedItems([]);
  };

  const routes: Route[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home
    },
    {
      name: "Properties",
      href: "/dashboard/properties",
      icon: Building2
    },
    {
      name: "Accounting",
      href: "#",
      icon: Banknote,
      submenu: [
        {
          name: "Bank Accounts",
          href: "/dashboard/accounting/bank-accounts",
        },
        {
          name: "Transactions",
          href: "/dashboard/accounting/transactions",
        },
        {
          name: "Invoices",
          href: "/dashboard/accounting/invoices",
        },
        {
          name: "Reports",
          href: "/dashboard/accounting/reports",
        }
      ]
    },
    {
      name: "Finance",
      href: "/dashboard/finance",
      icon: Wallet
    },
    {
      name: "Tenants",
      href: "/dashboard/tenants",
      icon: Users
    },
    {
      name: "Maintenance",
      href: "/dashboard/maintenance",
      icon: Hammer
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3
    }
  ];

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/",  // Redirect to root after sign out
      redirect: true 
    });
  };

  return (
    <aside 
      ref={sidebarRef}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "fixed inset-y-0 left-0 z-30",
        designSystem.colors.background.card,
        "border-r transition-all duration-200 ease-in-out flex flex-col h-screen",
        isOpenValue ? "w-64" : "w-16",
        "md:sticky md:top-0"
      )}
    >
      <div className="h-14 flex-shrink-0 flex items-center border-b">
        {isOpenValue && (
          <div className="px-4 flex-1">
            <h1 className={cn("text-xl font-bold", designSystem.colors.primary.text)}>
              PropertyPro
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpenValue(!isOpenValue)}
          className="px-2 mx-auto"
          aria-label={isOpenValue ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpenValue ? (
            <ArrowLeftToLine className="h-4 w-4" />
          ) : (
            <ArrowRightToLine className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0 relative">
        {routes.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.submenu?.some(subItem => pathname === subItem.href));
          const isExpanded = expandedItems.includes(item.name);
          
          return (
            <div 
              key={item.name} 
              className="relative"
            >
              {item.submenu ? (
                <button
                  ref={(el) => {
                    if (el) itemRefs.current[item.name] = el;
                  }}
                  onClick={() => toggleSubmenu(item.name)}
                  className={cn(
                    "flex items-center w-full",
                    "gap-2 p-2 rounded-lg",
                    designSystem.colors.primary.lightHover,
                    (isActive || isExpanded) && designSystem.colors.primary.light
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? designSystem.colors.primary.text : designSystem.colors.text.muted
                  )} />
                  {isOpenValue && (
                    <div className="flex items-center justify-between flex-1">
                      <span className={cn(
                        "transition-opacity duration-200",
                        isActive ? designSystem.colors.primary.text : designSystem.colors.text.secondary
                      )}>
                        {item.name}
                      </span>
                      <ChevronRight className={cn(
                        "h-4 w-4 ml-2 transition-transform",
                        isExpanded && "transform rotate-90"
                      )} />
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg",
                    designSystem.colors.primary.lightHover,
                    isActive && designSystem.colors.primary.light
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? designSystem.colors.primary.text : designSystem.colors.text.muted
                  )} />
                  <span className={cn(
                    "transition-opacity duration-200",
                    !isOpenValue && "opacity-0 w-0",
                    isActive ? designSystem.colors.primary.text : designSystem.colors.text.secondary
                  )}>
                    {item.name}
                  </span>
                </Link>
              )}

              {item.submenu && isOpenValue && isExpanded && (
                <div 
                  className={cn(
                    "fixed w-48 rounded-md shadow-lg",
                    "z-[9999]",
                    designSystem.colors.background.card,
                    "border py-1",
                    "animate-in slide-in-from-left-1"
                  )}
                  style={{ 
                    left: `${isOpenValue ? "256px" : "64px"}`,
                    top: itemRefs.current[item.name]?.getBoundingClientRect().top ?? 0,
                    transform: 'translateY(0)',
                  }}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center px-4 py-2",
                        designSystem.colors.primary.lightHover,
                        pathname === subItem.href && designSystem.colors.primary.light,
                        pathname === subItem.href ? designSystem.colors.primary.text : designSystem.colors.text.secondary
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={cn("flex-shrink-0 border-t p-4", designSystem.colors.background.card)}>
        {isLoading ? (
          <div className="animate-pulse flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            {isOpenValue && (
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            )}
          </div>
        ) : user ? (
          isOpenValue ? (
            <div className={cn(
              "flex items-center gap-3 p-2 rounded-lg",
              designSystem.colors.primary.lightHover
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                designSystem.colors.primary.gradient
              )}>
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", designSystem.colors.text.primary)}>
                  {`${user.firstName} ${user.lastName}`}
                </p>
                <p className={cn("text-xs truncate", designSystem.colors.text.muted)}>
                  {user.email}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className={cn("h-4 w-4", designSystem.colors.text.muted)} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className={cn(designSystem.dropdown.content.base)}
                >
                  <div className={designSystem.dropdown.content.header}>
                    <p className={designSystem.dropdown.text.title}>
                      {`${user.firstName} ${user.lastName}`}
                    </p>
                    <p className={designSystem.dropdown.text.subtitle}>
                      {user.email}
                    </p>
                  </div>
                  <div className={designSystem.dropdown.content.inner}>
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/account"
                        className={cn(
                          designSystem.dropdown.content.item.base,
                          designSystem.dropdown.content.item.hover
                        )}
                      >
                        <User className={designSystem.dropdown.content.item.icon} />
                        <span className={designSystem.dropdown.text.item}>Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={cn(
                        designSystem.dropdown.content.item.base,
                        designSystem.dropdown.content.item.hover
                      )}
                    >
                      <Settings className={designSystem.dropdown.content.item.icon} />
                      <span className={designSystem.dropdown.text.item}>Settings</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className={designSystem.dropdown.content.separator} />
                  <div className={designSystem.dropdown.content.inner}>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className={cn(
                        designSystem.dropdown.content.item.base,
                        designSystem.dropdown.content.item.danger
                      )}
                    >
                      <LogOut className={designSystem.dropdown.content.item.icon} />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm",
                    designSystem.colors.primary.gradient
                  )}>
                    {user.initials}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className={cn(designSystem.dropdown.content.base)}
              >
                <div className={designSystem.dropdown.content.header}>
                  <p className={designSystem.dropdown.text.title}>
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                  <p className={designSystem.dropdown.text.subtitle}>
                    {user.email}
                  </p>
                </div>
                <div className={designSystem.dropdown.content.inner}>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/account"
                      className={cn(
                        designSystem.dropdown.content.item.base,
                        designSystem.dropdown.content.item.hover
                      )}
                    >
                      <User className={designSystem.dropdown.content.item.icon} />
                      <span className={designSystem.dropdown.text.item}>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={cn(
                      designSystem.dropdown.content.item.base,
                      designSystem.dropdown.content.item.hover
                    )}
                  >
                    <Settings className={designSystem.dropdown.content.item.icon} />
                    <span className={designSystem.dropdown.text.item}>Settings</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className={designSystem.dropdown.content.separator} />
                <div className={designSystem.dropdown.content.inner}>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className={cn(
                      designSystem.dropdown.content.item.base,
                      designSystem.dropdown.content.item.danger
                    )}
                  >
                    <LogOut className={designSystem.dropdown.content.item.icon} />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        ) : (
          <Link 
            href="/auth/login" 
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg",
              designSystem.colors.primary.lightHover
            )}
          >
            <LogOut className={cn("h-5 w-5", designSystem.colors.text.muted)} />
            {isOpenValue && (
              <span className={designSystem.colors.text.secondary}>Sign in</span>
            )}
          </Link>
        )}
      </div>
    </aside>
  );
}