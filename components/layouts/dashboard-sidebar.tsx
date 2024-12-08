'use client'

import { cn } from '@/lib/utils';
import { navigation } from '@/config/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/components/providers/sidebar-provider';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const isOpenValue = open ?? isOpen;
  const setIsOpenValue = onOpenChange ?? setIsOpen;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 bg-white border-r transition-all duration-200 ease-in-out md:translate-x-0 md:static flex flex-col",
      isOpenValue ? "w-64" : "w-16"
    )}>
      <div className="h-14 flex items-center border-b">
        {isOpenValue && (
          <div className="px-4 flex-1">
            <h1 className="text-xl font-bold">Property Pro</h1>
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

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100",
                pathname === item.href && "bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className={cn(
                "transition-opacity duration-200",
                !isOpenValue && "opacity-0 w-0"
              )}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}