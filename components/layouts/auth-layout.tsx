import React from 'react';
import Link from 'next/link';
import { BuildingsPattern } from '@/components/ui/buildings-pattern';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PropertyPro
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {children}
        </div>
      </div>

      {/* Right side */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-blue-600 to-blue-500">
        <BuildingsPattern />
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Manage your properties with ease
          </h2>
          <p className="text-lg text-blue-100">
            Streamline your property management workflow with our comprehensive solution
          </p>
        </div>
      </div>
    </div>
  );
} 