import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PropertyDetails } from '@/components/properties/property-details';
import { UnitList } from '@/components/properties/unit-list';
import { PropertyTabs } from '@/components/properties/property-tabs';
import { MaintenanceList } from "@/components/maintenance/maintenance-list";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      units: {
        select: {
          id: true,
          unitNumber: true,
          bedrooms: true,
          bathrooms: true,
          size: true,
          rent: true,
          status: true,
          leases: {
            where: {
              status: 'ACTIVE'
            },
            select: {
              tenants: true
            },
            take: 1
          }
        }
      },
      address: true,
    },
  });

  if (!property) {
    notFound();
  }

  // Calculate derived values
  const enrichedProperty = {
    ...property,
    totalUnits: property.units.length,
    occupiedUnits: property.units.filter(unit => unit.status === 'OCCUPIED').length,
    monthlyRevenue: property.units.reduce((sum, unit) => sum + (unit.rent || 0), 0),
  };

  return (
    <div className="space-y-6">
      <PropertyDetails property={enrichedProperty} />
    </div>
  );
} 