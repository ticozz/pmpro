'use client';

import { useProperties } from '@/lib/hooks/use-properties';
import { PropertyCard } from './property-card';
import { PropertyListItem } from './property-list-item';
import { PropertyWithAddress } from '@/types/property';

interface PropertyListProps {
  viewType: 'grid' | 'list';
}

export function PropertyList({ viewType }: PropertyListProps) {
  const { properties, isLoading, isError } = useProperties();

  if (isLoading) {
    return (
      <div className={viewType === 'grid' ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`${viewType === 'grid' ? 'h-[200px]' : 'h-[100px]'} rounded-lg bg-gray-100 animate-pulse`}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load properties</p>
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No properties found</p>
      </div>
    );
  }

  return (
    <div className={viewType === 'grid' ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
      {properties.map((property: PropertyWithAddress) => (
        viewType === 'grid' ? (
          <PropertyCard key={property.id} property={property} />
        ) : (
          <PropertyListItem key={property.id} property={property} />
        )
      ))}
    </div>
  );
} 