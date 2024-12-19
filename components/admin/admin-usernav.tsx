"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { User, Settings, LogOut, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";

interface AdminUserNavProps {
  className?: string;
}

export function AdminUserNav({ className }: AdminUserNavProps) {
  const { data: session } = useSession();
  const { isExpanded } = useSidebar();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "relative w-full gap-2",
            !isExpanded && "justify-center",
            isExpanded && "justify-start",
            "hover:bg-blue-50 hover:text-blue-700",
            className
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-blue-50 text-blue-700">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          {isExpanded && (
            <div className="flex flex-1 items-center justify-between overflow-hidden">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {user?.email}
                </span>
              </div>
              <ChevronUp className="h-4 w-4 opacity-50" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56" 
        align={isExpanded ? "end" : "start"} 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-700">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-700">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="hover:bg-blue-50 hover:text-blue-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 