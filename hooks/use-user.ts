"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (session?.user) {
      const userData = {
        id: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        email: session.user.email,
        initials: `${session.user.firstName?.[0] || ""}${
          session.user.lastName?.[0] || ""
        }`.toUpperCase(),
      };

      // Update sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      sessionStorage.removeItem("user");
      setUser(null);
    }

    setIsLoading(false);
  }, [session, status]);

  return { user, isLoading: status === "loading" || isLoading };
}
