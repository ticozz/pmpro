"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      const userData = JSON.parse(userStr);
      // Calculate initials from first and last name
      const initials = `${userData.firstName?.[0] || ""}${
        userData.lastName?.[0] || ""
      }`.toUpperCase();
      setUser({ ...userData, initials });
    }
    setIsLoading(false);
  }, []);

  return { user, isLoading };
}
