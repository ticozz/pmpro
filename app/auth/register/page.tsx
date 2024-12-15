import React from 'react';
import { RegisterForm } from '@/components/auth/register-form';
import { Metadata } from 'next';
import { AuthLayout } from '@/components/layouts/auth-layout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign up | PropertyPro',
  description: 'Create your PropertyPro account',
}

export default function RegisterPage() {
  return (
    <AuthLayout 
      title={
        <span>
          Create your{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            PropertyPro
          </span>
          {' '}account
        </span>
      }
      description="Start managing your properties more efficiently today"
    >
      <RegisterForm />
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link 
          href="/auth/login" 
          className="font-semibold text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
} 