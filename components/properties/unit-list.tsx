import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { UnitCard } from './unit-card';
import { UnitForm } from "./unit-form";

interface UnitListProps {
  propertyId: string;
  units: any[]; // Replace with proper type
  onUnitAdded: () => void;
}

export function UnitList({ propertyId, units, onUnitAdded }: UnitListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Units</h3>
        <UnitForm propertyId={propertyId} onSuccess={onUnitAdded} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
} 