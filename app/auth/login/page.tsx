import React from 'react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | PropertyPro',
  description: 'Sign in to your PropertyPro account',
}

export default function LoginPage() {
  return (
    <AuthLayout 
      title={
        <span>
          Welcome back to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            PropertyPro
          </span>
        </span>
      }
      description="Sign in to your account to continue managing your properties"
    >
      <LoginForm />
    </AuthLayout>
  );
} 