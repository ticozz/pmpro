import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Users, DollarSign } from 'lucide-react';

interface UnitCardProps {
  unit: any; // Replace with proper type
}

export function UnitCard({ unit }: UnitCardProps) {
  const statusColors = {
    VACANT: 'bg-yellow-100 text-yellow-800',
    OCCUPIED: 'bg-green-100 text-green-800',
    MAINTENANCE: 'bg-red-100 text-red-800',
    RESERVED: 'bg-blue-100 text-blue-800',
  };

  return (
    <Card>
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Unit {unit.unitNumber}</h3>
          <Badge className={statusColors[unit.status as keyof typeof statusColors]}>
            {unit.status}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-2" />
            <span>
              {unit.bedrooms} bed • {unit.bathrooms} bath • {unit.size} sqft
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>${unit.rent.toLocaleString()}/month</span>
          </div>
          {unit.status === 'OCCUPIED' && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>
                {unit.currentLease?.tenant.firstName}{' '}
                {unit.currentLease?.tenant.lastName}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
} 