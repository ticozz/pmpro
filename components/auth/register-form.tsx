'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Link from 'next/link';
import { motion } from "framer-motion";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          password: formData.get('password'),
          confirmPassword: formData.get('confirmPassword'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      router.push('/auth/login?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={onSubmit} className="space-y-6" noValidate autoComplete="off">
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              name="firstName"
              placeholder="First name"
              required
              disabled={isLoading}
              className="bg-white/50 backdrop-blur-sm"
              autoComplete="off"
            />
          </div>
          <div>
            <Input
              name="lastName"
              placeholder="Last name"
              required
              disabled={isLoading}
              className="bg-white/50 backdrop-blur-sm"
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
            autoComplete="off"
          />
        </div>

        <div>
          <Input
            name="password"
            type="password"
            placeholder="Create password"
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
            autoComplete="new-password"
          />
        </div>

        <div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
            disabled={isLoading}
            className="bg-white/50 backdrop-blur-sm"
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
} 