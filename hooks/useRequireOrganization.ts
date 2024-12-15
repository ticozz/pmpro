"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@/hooks/useOrganization";

export function useRequireOrganization() {
  const { organization } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (!organization) {
      router.push("/auth/login");
    }
  }, [organization, router]);

  return organization;
}
