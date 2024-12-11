'use client';

import { useSearchParams } from 'next/navigation';
import { BulkUnitForm } from '@/components/units/bulk-unit-form';

export default function BulkCreateUnitsPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const count = parseInt(searchParams.get('count') || '0');

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Units</h1>
        <p className="text-muted-foreground">
          Create {count} units for your property
        </p>
      </div>
      <BulkUnitForm propertyId={params.id} unitCount={count} />
    </div>
  );
} 