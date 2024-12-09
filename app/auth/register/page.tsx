import React from 'react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/components/auth/register-form';
import { Metadata } from 'next';

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
    </AuthLayout>
  );
} 