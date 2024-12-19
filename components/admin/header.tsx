"use client";

import { AdminUserNav } from "@/components/admin/admin-usernav";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { designSystem } from "@/lib/design-system";
import { useSidebar } from '@/components/providers/sidebar-provider';

export function AdminHeader() {
  const { setIsOpen, isExpanded } = useSidebar();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className={cn(
      "sticky top-0 z-20",
      "border-b",
      "bg-white/75 backdrop-blur-lg dark:bg-slate-950/75",
      "supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="flex h-14 items-center gap-4 px-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">
            Admin Portal
          </h1>
          {user?.role === "SUPERADMIN" && (
            <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              Super Admin
            </span>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <ModeToggle />
          <AdminUserNav />
        </div>
      </div>
    </header>
  );
} 