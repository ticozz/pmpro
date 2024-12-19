"use client";

import { usePathname } from "next/navigation";

export function useIsRootPage() {
  const pathname = usePathname();
  return pathname === "/";
}
