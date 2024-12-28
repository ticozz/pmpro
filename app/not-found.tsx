'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function NotFound() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          <p className="text-gray-500">The page you are looking for does not exist.</p>
        </div>
        <Link
          href={session ? "/dashboard" : "/"}
          className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          {session ? "Go to Dashboard" : "Go Home"}
        </Link>
      </div>
    </div>
  );
} 
