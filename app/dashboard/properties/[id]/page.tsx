import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PropertyDetails } from '@/components/properties/property-details';
import { UnitList } from '@/components/properties/unit-list';
import { PropertyTabs } from '@/components/properties/property-tabs';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      units: true,
      address: true,
      manager: true,
      amenities: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PropertyDetails property={property} />
      <PropertyTabs property={property} />
    </div>
  );
} 