"use client";

import Link from 'next/link';
import { PublicNavigation } from "./public-navigation";
import { BuildingsPattern } from '@/components/ui/buildings-pattern';
import { PlatformDemo } from "@/components/marketing/platform-demo";
import { useLanguage } from '@/contexts/language-context';

export function HomeContent() {
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                PropertyPro
              </Link>
            </div>
            <PublicNavigation translations={translations} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-b from-blue-50 via-white to-blue-50 py-24">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {translations['hero.title']}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              {translations['hero.description']}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <BuildingsPattern />
        </div>
      </section>

      {/* Platform Demo */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PlatformDemo />
        </div>
      </section>
    </div>
  );
} 