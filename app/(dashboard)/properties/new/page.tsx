'use client';

import { PropertyForm } from '@/components/properties/property-form';

export default function NewPropertyPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Property</h1>
        <p className="text-muted-foreground">
          Add a new property to your portfolio
        </p>
      </div>
      <PropertyForm />
    </div>
  );
} 