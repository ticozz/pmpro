'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Building2, MapPin, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { PropertyTabs } from "./property-tabs";

interface PropertyDetailsProps {
  property: {
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    createdAt: string;
    manager: {
      firstName: string;
      lastName: string;
    };
    units: any[];
  };
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{property.name}</h2>
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>
                {property.address.street}, {property.address.city},{' '}
                {property.address.state} {property.address.zipCode}, {property.address.country}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Added {formatDate(property.createdAt)}
            </div>
            <div className="flex items-center mt-1">
              <User className="w-4 h-4 mr-2" />
              Managed by {property.manager.firstName} {property.manager.lastName}
            </div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Total Units</div>
            <div className="mt-1 text-2xl font-semibold">
              {property.units.length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Occupied Units</div>
            <div className="mt-1 text-2xl font-semibold">
              {property.units.filter((unit: any) => unit.status === 'OCCUPIED').length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Vacant Units</div>
            <div className="mt-1 text-2xl font-semibold">
              {property.units.filter((unit: any) => unit.status === 'VACANT').length}
            </div>
          </div>
        </div>
      </Card>
   </div>
  );
} 