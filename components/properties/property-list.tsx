'use client';

import { useProperties } from '@/lib/hooks/use-properties';
import { PropertyListItem } from './property-list-item';
import { PropertyWithAddress } from '@/types/property';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';

export function PropertyList() {
  const { properties, isLoading, isError } = useProperties();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="h-[100px] rounded-lg bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn(
        "text-center py-10",
        designSystem.colors.text.primary
      )}>
        <p>Failed to load properties</p>
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className={cn(
        "text-center py-10",
        designSystem.colors.text.muted
      )}>
        <p>No properties found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property: PropertyWithAddress) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </div>
  );
} 