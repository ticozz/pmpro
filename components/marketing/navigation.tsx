"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@/hooks/useOrganization";
import { LanguageSelector } from '@/components/ui/language-selector';

export function Navigation({ translations }: { translations: any }) {
  const { organization } = useOrganization();
  const getStartedHref = organization 
    ? "/dashboard"
    : "/auth/register";

  return (
    <div className="flex items-center space-x-4">
      <LanguageSelector />
      <Link href="/(auth)/login">
        <Button variant="ghost">{translations['nav.signin']}</Button>
      </Link>
      <Link href={getStartedHref}>
        <Button>{translations['nav.getStarted']}</Button>
      </Link>
    </div>
  );
} 