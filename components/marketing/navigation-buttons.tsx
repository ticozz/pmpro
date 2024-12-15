"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@/hooks/useOrganization";

export function NavigationButtons({ translations }: { translations: any }) {
  const { organization } = useOrganization();
  const getStartedHref = organization 
    ? "/dashboard"
    : "/auth/register";

  return (
    <>
      <Link href="/(auth)/login">
        <Button variant="ghost">{translations['nav.signin']}</Button>
      </Link>
      <Link href={getStartedHref}>
        <Button>{translations['nav.getStarted']}</Button>
      </Link>
    </>
  );
} 