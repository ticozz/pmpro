"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@/hooks/useOrganization";

interface CTAButtonProps {
  translations: any;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export function CTAButton({ translations, className, variant, size }: CTAButtonProps) {
  const { organization } = useOrganization();
  const href = organization 
    ? "/dashboard"
    : "/auth/register";

  return (
    <Link href={href}>
      <Button 
        variant={variant} 
        size={size} 
        className={className}
      >
        {translations['hero.cta']}
      </Button>
    </Link>
  );
} 