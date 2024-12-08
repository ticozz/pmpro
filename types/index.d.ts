declare module '@/lib/utils' {
  import { type ClassValue } from 'clsx';
  
  export function cn(...inputs: ClassValue[]): string;
  export function formatDate(date: string | Date): string;
  export function formatCurrency(amount: number): string;
  export function generateSlug(str: string): string;
  export function truncate(str: string, length: number): string;
}

declare module '@/lib/auth' {
  
  export function auth(): Promise<Session | null>;
  export const authOptions: any;
}

declare module '@/lib/prisma' {
  import { PrismaClient } from '@prisma/client';
  
  export const prisma: PrismaClient;
}

declare module '@/hooks/use-auth' {
  export function useAuth(): {
    signIn: (credentials: { email: string; password: string }) => Promise<void>;
    signOut: () => Promise<void>;
    error: string | null;
    isLoading: boolean;
  };
} 