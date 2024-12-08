'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-2 rounded">
          {error}
        </div>
      )}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
} 