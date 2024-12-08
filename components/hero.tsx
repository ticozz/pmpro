import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Property Management Made Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your property management workflow with our comprehensive solution. 
              From tenant screening to maintenance requests, we've got you covered.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg">Get Started</Button>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="/images/hero.jpg"
            alt="Property Management"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
} 