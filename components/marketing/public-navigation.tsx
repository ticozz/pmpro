"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from '@/components/ui/language-selector';

export function PublicNavigation({ translations }: { translations: any }) {
  return (
    <div className="flex items-center space-x-4">
      <LanguageSelector />
      <Link href="/(auth)/login">
        <Button variant="ghost">{translations['nav.signin']}</Button>
      </Link>
      <Link href="/(auth)/register">
        <Button>{translations['nav.getStarted']}</Button>
      </Link>
    </div>
  );
} 