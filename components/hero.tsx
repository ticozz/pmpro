'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/i18n/translations';
export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-5xl md:text-6xl">
          {language["hero.title"] || "Property Management Simplified"}
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {translations.en["hero.description"] || "Streamline your property management workflow with our comprehensive solution. From tenant screening to maintenance requests, we've got you covered."}
        </p>
      </div>

      <div className="mx-auto flex justify-center space-x-4">
        <Link href="/auth/register">
          <Button size="lg" className="h-11 px-8">
            {language["hero.getStarted"] || "Get Started"}
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="outline" size="lg" className="h-11 px-8">
            {language["hero.signIn"] || "Sign In"}
          </Button>
        </Link>
      </div>
    </section>
  );
} 