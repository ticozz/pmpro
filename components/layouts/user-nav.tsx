'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserNav() {
  const { data: session } = useSession();
  console.log("UserNav - Session Data:", session);
  const router = useRouter();

  const getInitials = () => {
    if (!session?.user) return 'U';
    return `${session.user.firstName?.[0] || ''}${session.user.lastName?.[0] || ''}`.toUpperCase();
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/login' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage 
              src="/avatars/default.svg" 
              alt={session?.user?.firstName || 'User'} 
              onError={(e) => {
                e.currentTarget.src = '/avatars/default.svg';
              }}
            />
            <AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal p-4 pb-2">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">
              {session?.user?.firstName} {session?.user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/account">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-2 cursor-pointer">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-1">
          <DropdownMenuItem 
            className="py-2 text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
            onClick={handleLogout}
          >
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 