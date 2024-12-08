import React from 'react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Create an account"
      description="Get started with your property management journey"
    >
      <RegisterForm />
    </AuthLayout>
  );
} 