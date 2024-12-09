'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Store user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(data.user));
      
      // Set default sidebar state if it doesn't exist
      if (!localStorage.getItem('sidebarExpanded')) {
        localStorage.setItem('sidebarExpanded', 'true');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const formFields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email address',
      autoComplete: 'off'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'new-password'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.form 
        onSubmit={onSubmit} 
        className="space-y-6" 
        noValidate 
        autoComplete="off"
        animate={{
          scale: error ? [1, 1.01, 1] : 1,
          x: error ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="error" title="Error">
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required
              disabled={isLoading}
              autoComplete={field.autoComplete}
              className="bg-white/50 backdrop-blur-sm transition-all duration-200 focus:scale-[1.02] focus:ring-2 ring-blue-500/20"
            />
          </motion.div>
        ))}

        <motion.div
          animate={{
            scale: isLoading ? [1, 0.98] : 1,
            opacity: isLoading ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Don't have an account?{' '}
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/auth/register" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </motion.span>
        </motion.p>
      </motion.form>
    </motion.div>
  );
} 