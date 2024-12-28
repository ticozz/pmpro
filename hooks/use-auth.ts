import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { user: null, isLoading: true, isAuthenticated: false };
  }

  return {
    user: (session?.user as User) || null,
    isLoading: false,
    isAuthenticated: status === "authenticated",
  };
}
