import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
}

export function CTA({ title, description, primaryAction, secondaryAction }: CTAProps) {
  return (
    <div className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-200">
            {description}
          </p>
        </div>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link href={primaryAction.href}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              {primaryAction.text}
            </Button>
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-500">
                {secondaryAction.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 