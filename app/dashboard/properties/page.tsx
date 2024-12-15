'use client';
import { PropertyListContainer } from '@/components/properties/property-list-container';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={cn(
            "text-2xl font-bold",
            designSystem.colors.text.primary
          )}>
            Properties
          </h1>
          <p className={designSystem.colors.text.secondary}>
            Manage your property portfolio
          </p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button
            className={cn(
              "gap-2",
              designSystem.colors.primary.gradient,
              "text-white hover:opacity-90"
            )}
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Button>
        </Link>
      </div>
      <PropertyListContainer />
    </div>
  );
} 